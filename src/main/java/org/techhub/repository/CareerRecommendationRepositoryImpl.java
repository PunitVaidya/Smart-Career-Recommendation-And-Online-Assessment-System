package org.techhub.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import org.techhub.entity.CareerRecommendation;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.CareerRecommendationRowMapper;

@Repository
public class CareerRecommendationRepositoryImpl
        implements CareerRecommendationRepository {

    private static final Logger LOGGER =
            ApplicationLogger.getLogger(
                    CareerRecommendationRepositoryImpl.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final CareerRecommendationRowMapper rowMapper =
            new CareerRecommendationRowMapper();


    // =========================================================
    // COMMON SELECT QUERY
    // =========================================================

    private String baseQuery() {

        return """
                SELECT
                    cr.recommendation_id,
                    cr.attempt_id,
                    cr.career_id,
                    c.career_name,
                    cr.match_percentage,
                    cr.rank_no,
                    cr.strengths,
                    cr.weaknesses,
                    cr.created_at
                FROM career_recommendation cr
                LEFT JOIN career c
                    ON cr.career_id = c.career_id
                """;
    }


    // =========================================================
    // SAVE
    // =========================================================

    @Override
    public boolean save(
            CareerRecommendation recommendation) {

        String sql = """
                INSERT INTO career_recommendation
                (
                    attempt_id,
                    career_id,
                    match_percentage,
                    rank_no,
                    strengths,
                    weaknesses
                )
                VALUES
                (
                    ?,?,?,?,?,?
                )
                """;

        KeyHolder keyHolder =
                new GeneratedKeyHolder();

        int count =
                jdbcTemplate.update(connection -> {

                    PreparedStatement ps =
                            connection.prepareStatement(
                                    sql,
                                    Statement.RETURN_GENERATED_KEYS);

                    ps.setInt(
                            1,
                            recommendation.getAttemptId());

                    ps.setInt(
                            2,
                            recommendation.getCareerId());

                    ps.setDouble(
                            3,
                            recommendation.getMatchPercentage() != null
                                    ? recommendation.getMatchPercentage()
                                    : 0.0);

                    ps.setInt(
                            4,
                            recommendation.getRankNo() != null
                                    ? recommendation.getRankNo()
                                    : 0);

                    ps.setString(
                            5,
                            recommendation.getStrengths());

                    ps.setString(
                            6,
                            recommendation.getWeaknesses());

                    return ps;

                }, keyHolder);


        if (count > 0) {

            Number generatedId =
                    keyHolder.getKey();

            if (generatedId != null) {

                recommendation.setRecommendationId(
                        generatedId.intValue());
            }

            LOGGER.info(
                    LogConstants.RECOMMENDATION_GENERATED);

            return true;
        }

        return false;
    }


    // =========================================================
    // UPDATE
    // =========================================================

    @Override
    public boolean update(
            CareerRecommendation recommendation) {

        String sql = """
                UPDATE career_recommendation
                SET
                    match_percentage=?,
                    rank_no=?,
                    strengths=?,
                    weaknesses=?
                WHERE recommendation_id=?
                """;

        return jdbcTemplate.update(
                sql,
                recommendation.getMatchPercentage(),
                recommendation.getRankNo(),
                recommendation.getStrengths(),
                recommendation.getWeaknesses(),
                recommendation.getRecommendationId()) > 0;
    }


    // =========================================================
    // DELETE
    // =========================================================

    @Override
    public boolean delete(
            Integer recommendationId) {

        return jdbcTemplate.update(
                """
                DELETE
                FROM career_recommendation
                WHERE recommendation_id=?
                """,
                recommendationId) > 0;
    }


    // =========================================================
    // FIND BY ID
    // =========================================================

    @Override
    public CareerRecommendation findById(
            Integer recommendationId) {

        String sql =
                baseQuery()
                +
                """
                WHERE cr.recommendation_id=?
                """;

        List<CareerRecommendation> list =
                jdbcTemplate.query(
                        sql,
                        rowMapper,
                        recommendationId);

        return list.isEmpty()
                ? null
                : list.get(0);
    }


    // =========================================================
    // FIND ALL
    // =========================================================

    @Override
    public List<CareerRecommendation> findAll() {

        String sql =
                baseQuery()
                +
                """
                ORDER BY cr.rank_no
                """;

        return jdbcTemplate.query(
                sql,
                rowMapper);
    }


    // =========================================================
    // FIND BY ATTEMPT
    // =========================================================

    @Override
    public List<CareerRecommendation> findByAttempt(
            Integer attemptId) {

        String sql =
                baseQuery()
                +
                """
                WHERE cr.attempt_id=?
                ORDER BY cr.rank_no
                """;

        return jdbcTemplate.query(
                sql,
                rowMapper,
                attemptId);
    }


    // =========================================================
    // FIND BY CAREER
    // =========================================================

    @Override
    public List<CareerRecommendation> findByCareer(
            Integer careerId) {

        String sql =
                baseQuery()
                +
                """
                WHERE cr.career_id=?
                ORDER BY cr.rank_no
                """;

        return jdbcTemplate.query(
                sql,
                rowMapper,
                careerId);
    }


    // =========================================================
    // CHECK DUPLICATE
    // =========================================================

    @Override
    public boolean exists(
            Integer attemptId,
            Integer careerId) {

        Integer count =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM career_recommendation
                        WHERE attempt_id=?
                        AND career_id=?
                        """,
                        Integer.class,
                        attemptId,
                        careerId);

        return count != null
                && count > 0;
    }
}