package org.techhub.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import org.techhub.dto.request.CareerRecommendationRequest;
import org.techhub.dto.response.CareerRecommendationResponse;
import org.techhub.entity.Career;
import org.techhub.entity.CareerRecommendation;
import org.techhub.entity.CareerSkill;
import org.techhub.entity.Category;
import org.techhub.exception.CareerRecommendationNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.mapper.CareerRecommendationMapper;
import org.techhub.repository.CareerRecommendationRepository;
import org.techhub.repository.CareerRepository;
import org.techhub.repository.CareerSkillRepository;
import org.techhub.repository.CategoryRepository;

@Service
public class CareerRecommendationServiceImpl
        implements CareerRecommendationService {

    @Autowired
    private CareerRecommendationRepository repository;

    @Autowired
    private CareerRecommendationMapper mapper;

    @Autowired
    private CareerRepository careerRepository;

    @Autowired
    private CareerSkillRepository careerSkillRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    // =========================================================
    // SAVE
    // =========================================================

    @Override
    public CareerRecommendationResponse save(
            CareerRecommendationRequest request) {

        if (repository.exists(
                request.getAttemptId(),
                request.getCareerId())) {

            throw new DuplicateRecordException(
                    "Recommendation already exists.");
        }

        CareerRecommendation recommendation =
                mapper.toEntity(request);

        boolean saved =
                repository.save(recommendation);

        if (!saved) {

            throw new RuntimeException(
                    "Unable to save career recommendation.");
        }

        CareerRecommendation savedRecommendation =
                repository.findByAttempt(
                        request.getAttemptId())
                .stream()
                .filter(r ->
                        r.getCareerId()
                                .equals(request.getCareerId()))
                .findFirst()
                .orElse(null);

        return mapper.toResponse(
                savedRecommendation);
    }


    // =========================================================
    // GENERATE RECOMMENDATIONS FOR ATTEMPT
    // =========================================================

    @Override
    public List<CareerRecommendationResponse>
            generateForAttempt(Integer attemptId) {

        // -----------------------------------------------------
        // GET ASSESSMENT ID
        // -----------------------------------------------------

        Integer assessmentId =
                jdbcTemplate.queryForObject(
                        """
                        SELECT assessment_id
                        FROM student_attempt
                        WHERE attempt_id = ?
                        """,
                        Integer.class,
                        attemptId);

        if (assessmentId == null) {

            throw new RuntimeException(
                    "Assessment attempt not found.");
        }


        // -----------------------------------------------------
        // CATEGORY PERFORMANCE
        // -----------------------------------------------------

        Map<Integer, Double> categoryScores =
                calculateCategoryScores(
                        attemptId,
                        assessmentId);


        // -----------------------------------------------------
        // ATTEMPTED CATEGORIES
        // -----------------------------------------------------

        Map<Integer, Boolean> attemptedCategories =
                calculateAttemptedCategories(
                        attemptId,
                        assessmentId);


        // -----------------------------------------------------
        // GET ACTIVE CAREERS
        // -----------------------------------------------------

        List<Career> careers =
                careerRepository.findActiveCareers();

        if (careers == null || careers.isEmpty()) {

            throw new RuntimeException(
                    "No active careers found.");
        }


        // -----------------------------------------------------
        // CALCULATE CAREER MATCH
        // -----------------------------------------------------

        List<CareerMatch> matches =
                new ArrayList<>();


        for (Career career : careers) {

            List<CareerSkill> careerSkills =
                    careerSkillRepository.findByCareer(
                            career.getCareerId());

            if (careerSkills == null
                    || careerSkills.isEmpty()) {

                continue;
            }


            double matchPercentage = 0.0;

            int totalWeight = 0;


            for (CareerSkill skill : careerSkills) {

                Integer categoryId =
                        skill.getCategoryId();

                Integer weight =
                        skill.getWeight();


                if (categoryId == null
                        || weight == null
                        || weight <= 0) {

                    continue;
                }


                double categoryScore =
                        categoryScores.getOrDefault(
                                categoryId,
                                0.0);


                /*
                 * Weighted career calculation:
                 *
                 * Category Performance
                 * × Career Weight
                 * ------------------
                 *        100
                 */
                matchPercentage +=
                        (categoryScore * weight)
                                / 100.0;


                totalWeight += weight;
            }


            /*
             * If total career weight is not 100,
             * normalize it.
             */
            if (totalWeight > 0
                    && totalWeight != 100) {

                matchPercentage =
                        (matchPercentage
                                / totalWeight)
                                * 100.0;
            }


            /*
             * Keep result between 0 and 100.
             */
            matchPercentage =
                    Math.max(
                            0.0,
                            Math.min(
                                    100.0,
                                    matchPercentage));


            matches.add(
                    new CareerMatch(
                            career,
                            matchPercentage));
        }


        // -----------------------------------------------------
        // SORT BY MATCH %
        // -----------------------------------------------------

        matches.sort(
                Comparator.comparing(
                        CareerMatch::getMatchPercentage)
                        .reversed());


        // -----------------------------------------------------
        // SAVE RECOMMENDATIONS
        // -----------------------------------------------------

        List<CareerRecommendationResponse>
                responses =
                new ArrayList<>();


        int rank = 1;


        for (CareerMatch match : matches) {

            Career career =
                    match.getCareer();


            // -------------------------------------------------
            // STRENGTHS
            // -------------------------------------------------

            String strengths =
                    buildStrengths(
                            career,
                            categoryScores,
                            attemptedCategories);


            // -------------------------------------------------
            // WEAKNESSES
            // -------------------------------------------------

            String weaknesses =
                    buildWeaknesses(
                            career,
                            categoryScores,
                            attemptedCategories);


            // -------------------------------------------------
            // CHECK EXISTING
            // -------------------------------------------------

            if (repository.exists(
                    attemptId,
                    career.getCareerId())) {

                CareerRecommendation existing =
                        repository.findByAttempt(
                                attemptId)
                        .stream()
                        .filter(r ->
                                r.getCareerId()
                                        .equals(
                                                career.getCareerId()))
                        .findFirst()
                        .orElse(null);


                if (existing != null) {

                    existing.setMatchPercentage(
                            round(
                                    match.getMatchPercentage()));


                    existing.setRankNo(rank);


                    existing.setStrengths(
                            strengths);


                    existing.setWeaknesses(
                            weaknesses);


                    repository.update(existing);


                    responses.add(
                            mapper.toResponse(
                                    repository.findById(
                                            existing
                                                    .getRecommendationId())));
                }

            } else {

                CareerRecommendation recommendation =
                        new CareerRecommendation();


                recommendation.setAttemptId(
                        attemptId);


                recommendation.setCareerId(
                        career.getCareerId());


                recommendation.setMatchPercentage(
                        round(
                                match.getMatchPercentage()));


                recommendation.setRankNo(rank);


                recommendation.setStrengths(
                        strengths);


                recommendation.setWeaknesses(
                        weaknesses);


                boolean saved =
                        repository.save(
                                recommendation);


                if (!saved) {

                    throw new RuntimeException(
                            "Unable to save career recommendation.");
                }


                CareerRecommendation savedRecommendation =
                        repository.findByAttempt(
                                attemptId)
                        .stream()
                        .filter(r ->
                                r.getCareerId()
                                        .equals(
                                                career.getCareerId()))
                        .findFirst()
                        .orElse(null);


                if (savedRecommendation != null) {

                    responses.add(
                            mapper.toResponse(
                                    savedRecommendation));
                }
            }


            rank++;
        }


        return responses;
    }


    // =========================================================
    // CATEGORY SCORE CALCULATION
    // =========================================================

    private Map<Integer, Double>
            calculateCategoryScores(
                    Integer attemptId,
                    Integer assessmentId) {

        Map<Integer, Double> categoryScores =
                new HashMap<>();


        /*
         * IMPORTANT:
         *
         * All questions belonging to the assessment
         * are included in the denominator.
         *
         * Therefore skipped questions are counted.
         *
         * Example:
         *
         * 10 questions
         * 5 correct
         *
         * Category score = 50%
         */
        String sql =
                """
                SELECT
                    q.category_id,

                    COALESCE(
                        SUM(q.marks),
                        0
                    ) AS total_category_marks,

                    COALESCE(
                        SUM(
                            CASE
                                WHEN sa.is_correct = 1
                                THEN q.marks
                                ELSE 0
                            END
                        ),
                        0
                    ) AS obtained_category_marks

                FROM assessment_question aq

                INNER JOIN question q
                    ON aq.question_id =
                       q.question_id

                LEFT JOIN student_answer sa
                    ON sa.question_id =
                       q.question_id
                    AND sa.attempt_id = ?

                WHERE aq.assessment_id = ?

                GROUP BY q.category_id
                """;


        List<Map<String, Object>> rows =
                jdbcTemplate.queryForList(
                        sql,
                        attemptId,
                        assessmentId);


        for (Map<String, Object> row : rows) {

            Integer categoryId =
                    ((Number) row.get(
                            "category_id"))
                            .intValue();


            double totalMarks =
                    ((Number) row.get(
                            "total_category_marks"))
                            .doubleValue();


            double obtainedMarks =
                    ((Number) row.get(
                            "obtained_category_marks"))
                            .doubleValue();


            double percentage = 0.0;


            if (totalMarks > 0) {

                percentage =
                        (obtainedMarks
                                / totalMarks)
                                * 100.0;
            }


            categoryScores.put(
                    categoryId,
                    percentage);
        }


        return categoryScores;
    }


    // =========================================================
    // ATTEMPTED CATEGORIES
    // =========================================================

    private Map<Integer, Boolean>
            calculateAttemptedCategories(
                    Integer attemptId,
                    Integer assessmentId) {

        Map<Integer, Boolean>
                attemptedCategories =
                new HashMap<>();


        /*
         * This identifies whether the student answered
         * at least one question from each category.
         *
         * Therefore:
         *
         * No answer = NOT EVALUATED
         *
         * and not a weakness.
         */
        String sql =
                """
                SELECT
                    q.category_id,
                    COUNT(sa.answer_id) AS answered_count

                FROM assessment_question aq

                INNER JOIN question q
                    ON aq.question_id =
                       q.question_id

                LEFT JOIN student_answer sa
                    ON sa.question_id =
                       q.question_id
                    AND sa.attempt_id = ?

                WHERE aq.assessment_id = ?

                GROUP BY q.category_id
                """;


        List<Map<String, Object>> rows =
                jdbcTemplate.queryForList(
                        sql,
                        attemptId,
                        assessmentId);


        for (Map<String, Object> row : rows) {

            Integer categoryId =
                    ((Number) row.get(
                            "category_id"))
                            .intValue();


            int answeredCount =
                    ((Number) row.get(
                            "answered_count"))
                            .intValue();


            attemptedCategories.put(
                    categoryId,
                    answeredCount > 0);
        }


        return attemptedCategories;
    }


    // =========================================================
    // BUILD STRENGTHS
    // =========================================================

    private String buildStrengths(
            Career career,
            Map<Integer, Double> categoryScores,
            Map<Integer, Boolean> attemptedCategories) {

        List<CareerSkill> skills =
                careerSkillRepository.findByCareer(
                        career.getCareerId());


        List<String> strengths =
                new ArrayList<>();


        for (CareerSkill skill : skills) {

            Integer categoryId =
                    skill.getCategoryId();


            /*
             * If the category was not attempted,
             * do not classify it.
             */
            boolean attempted =
                    attemptedCategories.getOrDefault(
                            categoryId,
                            false);


            if (!attempted) {

                continue;
            }


            double score =
                    categoryScores.getOrDefault(
                            categoryId,
                            0.0);


            /*
             * 50% OR ABOVE = STRENGTH
             */
            if (score >= 50.0) {

                Category category =
                        categoryRepository.findById(
                                categoryId);


                if (category != null) {

                    strengths.add(
                            category.getCategoryName());
                }
            }
        }


        if (strengths.isEmpty()) {

            return "No strong category identified yet.";
        }


        return String.join(
                ", ",
                strengths);
    }


    // =========================================================
    // BUILD WEAKNESSES
    // =========================================================

    private String buildWeaknesses(
            Career career,
            Map<Integer, Double> categoryScores,
            Map<Integer, Boolean> attemptedCategories) {

        List<CareerSkill> skills =
                careerSkillRepository.findByCareer(
                        career.getCareerId());


        List<String> weaknesses =
                new ArrayList<>();


        for (CareerSkill skill : skills) {

            Integer categoryId =
                    skill.getCategoryId();


            /*
             * If the student did not answer anything
             * from this category, ignore it.
             */
            boolean attempted =
                    attemptedCategories.getOrDefault(
                            categoryId,
                            false);


            if (!attempted) {

                continue;
            }


            double score =
                    categoryScores.getOrDefault(
                            categoryId,
                            0.0);


            /*
             * BELOW 50% = WEAKNESS
             */
            if (score < 50.0) {

                Category category =
                        categoryRepository.findById(
                                categoryId);


                if (category != null) {

                    weaknesses.add(
                            category.getCategoryName());
                }
            }
        }


        if (weaknesses.isEmpty()) {

            return "No major improvement area identified.";
        }


        return String.join(
                ", ",
                weaknesses);
    }


    // =========================================================
    // ROUND
    // =========================================================

    private double round(double value) {

        return Math.round(
                value * 100.0)
                / 100.0;
    }


    // =========================================================
    // CAREER MATCH CLASS
    // =========================================================

    private static class CareerMatch {

        private Career career;

        private double matchPercentage;


        public CareerMatch(
                Career career,
                double matchPercentage) {

            this.career = career;

            this.matchPercentage =
                    matchPercentage;
        }


        public Career getCareer() {

            return career;
        }


        public double getMatchPercentage() {

            return matchPercentage;
        }
    }


    // =========================================================
    // UPDATE
    // =========================================================

    @Override
    public CareerRecommendationResponse update(
            CareerRecommendationRequest request) {

        CareerRecommendation db =
                repository.findById(
                        request.getRecommendationId());


        if (db == null) {

            throw new CareerRecommendationNotFoundException(
                    "Recommendation not found.");
        }


        CareerRecommendation recommendation =
                mapper.toEntity(request);


        repository.update(
                recommendation);


        return mapper.toResponse(
                repository.findById(
                        request.getRecommendationId()));
    }


    // =========================================================
    // DELETE
    // =========================================================

    @Override
    public boolean delete(
            Integer recommendationId) {

        if (repository.findById(
                recommendationId) == null) {

            throw new CareerRecommendationNotFoundException(
                    "Recommendation not found.");
        }


        return repository.delete(
                recommendationId);
    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @Override
    public CareerRecommendationResponse getById(
            Integer recommendationId) {

        CareerRecommendation recommendation =
                repository.findById(
                        recommendationId);


        if (recommendation == null) {

            throw new CareerRecommendationNotFoundException(
                    "Recommendation not found.");
        }


        return mapper.toResponse(
                recommendation);
    }


    // =========================================================
    // GET ALL
    // =========================================================

    @Override
    public List<CareerRecommendationResponse>
            getAll() {

        return mapper.toResponse(
                repository.findAll());
    }


    // =========================================================
    // GET BY ATTEMPT
    // =========================================================

    @Override
    public List<CareerRecommendationResponse>
            getByAttempt(Integer attemptId) {

        return mapper.toResponse(
                repository.findByAttempt(
                        attemptId));
    }


    // =========================================================
    // GET BY CAREER
    // =========================================================

    @Override
    public List<CareerRecommendationResponse>
            getByCareer(Integer careerId) {

        return mapper.toResponse(
                repository.findByCareer(
                        careerId));
    }
}