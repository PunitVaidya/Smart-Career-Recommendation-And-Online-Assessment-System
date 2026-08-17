package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.techhub.entity.Assessment;
import org.techhub.entity.Question;
import org.techhub.entity.StudentAnswer;
import org.techhub.entity.StudentAttempt;

import org.techhub.dto.request.StudentAttemptRequest;
import org.techhub.dto.response.StudentAttemptResponse;

import org.techhub.repository.AssessmentRepository;
import org.techhub.repository.QuestionRepository;
import org.techhub.repository.StudentAnswerRepository;
import org.techhub.repository.StudentAttemptRepository;
import org.techhub.dto.request.StudentResultRequest;
import org.techhub.repository.StudentResultRepository;

@Service
public class StudentAttemptServiceImpl
        implements StudentAttemptService {


    @Autowired
    private StudentResultService studentResultService;


    @Autowired
    private StudentResultRepository studentResultRepository;


    @Autowired
    private StudentAttemptRepository repository;


    @Autowired
    private StudentAnswerRepository studentAnswerRepository;


    @Autowired
    private QuestionRepository questionRepository;


    @Autowired
    private AssessmentRepository assessmentRepository;


    @Autowired
    private CareerRecommendationService
            careerRecommendationService;


    // =========================================================
    // START ATTEMPT
    // =========================================================

    @Override
    public StudentAttemptResponse startAttempt(
            StudentAttemptRequest request) {


        StudentAttempt existing =
                repository.findByStudentAndAssessment(
                        request.getStudentId(),
                        request.getAssessmentId()
                );


        /*
         * If an unfinished attempt already exists,
         * continue that attempt.
         */

        if (existing != null) {

            return convert(existing);

        }


        // -----------------------------------------------------
        // CREATE NEW ATTEMPT
        // -----------------------------------------------------

        StudentAttempt attempt =
                new StudentAttempt();


        attempt.setStudentId(
                request.getStudentId()
        );


        attempt.setAssessmentId(
                request.getAssessmentId()
        );


        /*
         * Repository calculates actual attempt number.
         */

        attempt.setAttemptNumber(1);


        attempt.setAttemptStatus(
                "STARTED"
        );


        boolean saved =
                repository.save(attempt);


        if (!saved) {

            throw new RuntimeException(
                    "Unable to start assessment attempt."
            );

        }


        // -----------------------------------------------------
        // RELOAD CREATED ATTEMPT
        // -----------------------------------------------------

        StudentAttempt savedAttempt =
                repository.findById(
                        attempt.getAttemptId()
                );


        if (savedAttempt == null) {

            throw new RuntimeException(
                    "Unable to fetch created assessment attempt."
            );

        }


        return convert(savedAttempt);
    }


    // =========================================================
    // GET ATTEMPT
    // =========================================================

    @Override
    public StudentAttemptResponse getAttempt(
            Integer attemptId) {


        StudentAttempt attempt =
                repository.findById(attemptId);


        if (attempt == null) {

            throw new RuntimeException(
                    "Assessment attempt not found."
            );

        }


        return convert(attempt);
    }


    // =========================================================
    // SUBMIT ATTEMPT
    // =========================================================

    @Override
    public StudentAttemptResponse submitAttempt(
            Integer attemptId) {

        // =====================================================
        // STEP 1: FIND ATTEMPT
        // =====================================================

        StudentAttempt attempt =
                repository.findById(attemptId);


        if (attempt == null) {

            throw new RuntimeException(
                    "Assessment attempt not found."
            );

        }


        // =====================================================
        // GET ASSESSMENT
        // =====================================================

        Assessment assessment =
                assessmentRepository.findById(
                        attempt.getAssessmentId()
                );


        if (assessment == null) {

            throw new RuntimeException(
                    "Assessment not found."
            );

        }


        // =====================================================
        // STEP 2: IF ALREADY SUBMITTED
        // =====================================================

        if ("SUBMITTED".equalsIgnoreCase(
                attempt.getAttemptStatus())) {

            /*
             * Older attempts may already be SUBMITTED
             * but may not have a student_result record.
             *
             * Therefore create the missing result if required.
             */

            createStudentResultIfMissing(attempt);

            return convert(attempt);
        }


        // =====================================================
        // STEP 3: GET STUDENT ANSWERS
        // =====================================================

        List<StudentAnswer> answers =
                studentAnswerRepository.findByAttempt(
                        attemptId
                );


        // =====================================================
        // INITIALIZE COUNTERS
        // =====================================================

        int totalScore = 0;

        int correctCount = 0;

        int incorrectCount = 0;


        // =====================================================
        // TOTAL MARKS
        // =====================================================

        int totalMarks =
                assessment.getTotalMarks() != null
                        ? assessment.getTotalMarks()
                        : 0;


        // =====================================================
        // TOTAL QUESTIONS
        // =====================================================

        int totalQuestions =
                assessment.getTotalQuestions() != null
                        ? assessment.getTotalQuestions()
                        : 0;


        // =====================================================
        // STEP 4: EVALUATE EACH ANSWER
        // =====================================================

        for (StudentAnswer answer : answers) {

            Question question =
                    questionRepository.findById(
                            answer.getQuestionId()
                    );


            if (question == null) {

                continue;

            }


            // -------------------------------------------------
            // QUESTION MARKS
            // -------------------------------------------------

            int questionMarks =
                    question.getMarks() != null
                            ? question.getMarks()
                            : 0;


            // -------------------------------------------------
            // STUDENT ANSWER
            // -------------------------------------------------

            String selectedAnswer =
                    answer.getSelectedAnswer();


            String correctAnswer =
                    question.getCorrectAnswer();


            // -------------------------------------------------
            // CHECK CORRECT ANSWER
            // -------------------------------------------------

            boolean correct =
                    selectedAnswer != null
                    && !selectedAnswer.trim().isEmpty()
                    && correctAnswer != null
                    && !correctAnswer.trim().isEmpty()
                    && selectedAnswer
                            .trim()
                            .equalsIgnoreCase(
                                    correctAnswer.trim()
                            );


            // -------------------------------------------------
            // CALCULATE MARKS
            // -------------------------------------------------

            int marksObtained =
                    correct
                            ? questionMarks
                            : 0;


            // -------------------------------------------------
            // UPDATE ANSWER
            // -------------------------------------------------

            answer.setCorrect(correct);

            answer.setMarksObtained(
                    marksObtained
            );


            boolean updated =
                    studentAnswerRepository.update(
                            answer
                    );


            if (!updated) {

                throw new RuntimeException(
                        "Unable to update student answer for question "
                        + answer.getQuestionId()
                );

            }


            // -------------------------------------------------
            // COUNT CORRECT / INCORRECT
            // -------------------------------------------------

            if (correct) {

                correctCount++;

            }
            else {

                incorrectCount++;

            }


            // -------------------------------------------------
            // ADD SCORE
            // -------------------------------------------------

            totalScore += marksObtained;

        }


        // =====================================================
        // STEP 5: CALCULATE SKIPPED
        // =====================================================

        int answeredCount =
                correctCount + incorrectCount;


        int skippedCount =
                totalQuestions - answeredCount;


        if (skippedCount < 0) {

            skippedCount = 0;

        }


        // =====================================================
        // STEP 6: CALCULATE PERCENTAGE
        // =====================================================

        double percentage = 0.0;


        if (totalMarks > 0) {

            percentage =
                    (
                            (double) totalScore
                            / totalMarks
                    )
                    * 100.0;

        }


        // =====================================================
        // STEP 7: UPDATE STUDENT ATTEMPT
        // =====================================================

        boolean resultUpdated =
                repository.updateResult(
                        attemptId,
                        totalScore,
                        totalMarks,
                        percentage
                );


        if (!resultUpdated) {

            throw new RuntimeException(
                    "Unable to update assessment result."
            );

        }


        // =====================================================
        // STEP 8: RELOAD FINAL ATTEMPT
        // =====================================================

        StudentAttempt finalAttempt =
                repository.findById(
                        attemptId
                );


        if (finalAttempt == null) {

            throw new RuntimeException(
                    "Unable to fetch final assessment result."
            );

        }


        // =====================================================
        // STEP 9: CREATE STUDENT RESULT
        // =====================================================

        createStudentResultIfMissing(
                finalAttempt
        );


        // =====================================================
        // STEP 10: GENERATE CAREER RECOMMENDATIONS
        // =====================================================

        careerRecommendationService
                .generateForAttempt(
                        attemptId
                );


        // =====================================================
        // STEP 11: CONVERT RESPONSE
        // =====================================================

        StudentAttemptResponse response =
                convert(finalAttempt);


        response.setCorrectCount(
                correctCount
        );


        response.setIncorrectCount(
                incorrectCount
        );


        response.setSkippedCount(
                skippedCount
        );


        return response;
    }


    // =========================================================
    // CREATE STUDENT RESULT IF MISSING
    // =========================================================

    private void createStudentResultIfMissing(
            StudentAttempt attempt) {


        if (attempt == null) {

            return;

        }


        // -----------------------------------------------------
        // CHECK WHETHER RESULT ALREADY EXISTS
        // -----------------------------------------------------

        if (studentResultRepository.findByAttemptId(
                attempt.getAttemptId()) != null) {

            return;

        }


        // -----------------------------------------------------
        // CREATE RESULT REQUEST
        // -----------------------------------------------------

        StudentResultRequest request =
                new StudentResultRequest();


        request.setAttemptId(
                attempt.getAttemptId()
        );


        request.setStudentId(
                attempt.getStudentId()
        );


        request.setAssessmentId(
                attempt.getAssessmentId()
        );


        request.setScore(
                attempt.getScore()
        );


        request.setTotalMarks(
                attempt.getTotalMarks()
        );


        request.setPercentage(
                attempt.getPercentage()
        );


        // -----------------------------------------------------
        // RESULT STATUS
        // -----------------------------------------------------

        String resultStatus =
                attempt.getPercentage() >= 40.0
                        ? "PASS"
                        : "FAIL";


        request.setResultStatus(
                resultStatus
        );


        // -----------------------------------------------------
        // CAREER READINESS
        // -----------------------------------------------------

        request.setCareerReadiness(
                null
        );


        // -----------------------------------------------------
        // SAVE RESULT
        // -----------------------------------------------------

        studentResultService.save(request);
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private StudentAttemptResponse convert(
            StudentAttempt attempt) {


        if (attempt == null) {

            return null;

        }


        StudentAttemptResponse response =
                new StudentAttemptResponse();


        // -----------------------------------------------------
        // BASIC INFORMATION
        // -----------------------------------------------------

        response.setAttemptId(
                attempt.getAttemptId()
        );


        response.setStudentId(
                attempt.getStudentId()
        );


        response.setAssessmentId(
                attempt.getAssessmentId()
        );


        response.setAttemptNumber(
                attempt.getAttemptNumber()
        );


        // -----------------------------------------------------
        // TIME
        // -----------------------------------------------------

        response.setStartTime(
                attempt.getStartTime()
        );


        response.setEndTime(
                attempt.getEndTime()
        );


        // -----------------------------------------------------
        // RESULT
        // -----------------------------------------------------

        response.setScore(
                attempt.getScore()
        );


        response.setTotalMarks(
                attempt.getTotalMarks()
        );


        response.setPercentage(
                attempt.getPercentage()
        );


        // -----------------------------------------------------
        // STATUS
        // -----------------------------------------------------

        response.setAttemptStatus(
                attempt.getAttemptStatus()
        );


        // -----------------------------------------------------
        // CREATED DATE
        // -----------------------------------------------------

        response.setCreatedAt(
                attempt.getCreatedAt()
        );


        /*
         * -----------------------------------------------------
         * ANSWER STATISTICS
         * -----------------------------------------------------
         *
         * For an ACTIVE/STARTED attempt:
         *
         * is_correct = false does NOT mean
         * that the answer is incorrect.
         *
         * Answers are evaluated only during final submission.
         *
         * Therefore active attempts only need answered count.
         *
         * For SUBMITTED attempts:
         * correct / incorrect counts are calculated
         * from evaluated answers.
         */

        List<StudentAnswer> answers =
                studentAnswerRepository.findByAttempt(
                        attempt.getAttemptId()
                );


        int correctCount = 0;

        int incorrectCount = 0;


        boolean submitted =
                "SUBMITTED".equalsIgnoreCase(
                        attempt.getAttemptStatus()
                );


        if (submitted) {

            for (StudentAnswer answer : answers) {

                if (Boolean.TRUE.equals(
                        answer.getCorrect())) {

                    correctCount++;

                }
                else {

                    incorrectCount++;

                }

            }

        }


        response.setCorrectCount(
                correctCount
        );


        response.setIncorrectCount(
                incorrectCount
        );


        // -----------------------------------------------------
        // TOTAL QUESTIONS
        // -----------------------------------------------------

        Assessment assessment =
                assessmentRepository.findById(
                        attempt.getAssessmentId()
                );


        int totalQuestions = 0;


        if (assessment != null
                && assessment.getTotalQuestions() != null) {

            totalQuestions =
                    assessment.getTotalQuestions();

        }


        // -----------------------------------------------------
        // SKIPPED COUNT
        // -----------------------------------------------------
        //
        // For an active attempt:
        //
        // skipped = total questions - answered questions
        //
        // For a submitted attempt:
        //
        // skipped = total questions - evaluated answers
        //
        // Both use the number of saved answers because one
        // answer record represents one answered question.
        // -----------------------------------------------------

        int skippedCount =
                totalQuestions - answers.size();


        if (skippedCount < 0) {

            skippedCount = 0;

        }


        response.setSkippedCount(
                skippedCount
        );


        return response;
    }
}