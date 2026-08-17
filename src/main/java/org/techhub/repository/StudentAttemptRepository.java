package org.techhub.repository;

import org.techhub.entity.StudentAttempt;

public interface StudentAttemptRepository {

    // =========================================================
    // SAVE ATTEMPT
    // =========================================================

    boolean save(StudentAttempt attempt);


    // =========================================================
    // FIND ATTEMPT BY ID
    // =========================================================

    StudentAttempt findById(
            Integer attemptId
    );


    // =========================================================
    // FIND ACTIVE ATTEMPT
    // =========================================================

    StudentAttempt findByStudentAndAssessment(
            Integer studentId,
            Integer assessmentId
    );


    // =========================================================
    // UPDATE ATTEMPT
    // =========================================================

    boolean update(
            StudentAttempt attempt
    );


    // =========================================================
    // UPDATE FINAL RESULT
    // =========================================================

    boolean updateResult(
            Integer attemptId,
            Integer score,
            Integer totalMarks,
            Double percentage
    );

}