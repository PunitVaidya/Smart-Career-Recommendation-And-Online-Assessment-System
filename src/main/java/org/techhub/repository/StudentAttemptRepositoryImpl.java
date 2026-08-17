package org.techhub.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import org.techhub.entity.StudentAttempt;

@Repository
public class StudentAttemptRepositoryImpl
        implements StudentAttemptRepository {


    @Autowired
    private DataSource dataSource;


    // =========================================================
    // SAVE ATTEMPT
    // =========================================================

    @Override
    public boolean save(StudentAttempt attempt) {

        /*
         * =====================================================
         * IMPORTANT
         * =====================================================
         *
         * attempt_number is calculated from previous attempts
         * of the SAME student for the SAME assessment.
         *
         * Example:
         *
         * Existing:
         *
         * attempt 12 -> attempt_number 1
         * attempt 13 -> attempt_number 2
         *
         * New:
         *
         * attempt 29 -> attempt_number 3
         *
         * The database auto-increment attempt_id remains
         * completely independent.
         */

        String sql = """
                INSERT INTO student_attempt
                (
                    student_id,
                    assessment_id,
                    attempt_number,
                    start_time,
                    attempt_status,
                    score,
                    total_marks,
                    percentage
                )
                VALUES
                (
                    ?,
                    ?,
                    (
                        SELECT COALESCE(
                            MAX(previous_attempt.attempt_number),
                            0
                        ) + 1
                        FROM student_attempt previous_attempt
                        WHERE previous_attempt.student_id = ?
                        AND previous_attempt.assessment_id = ?
                    ),
                    CURRENT_TIMESTAMP,
                    ?,
                    ?,
                    ?,
                    ?
                )
                """;


        try (
                Connection con =
                        dataSource.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(
                                sql,
                                Statement.RETURN_GENERATED_KEYS
                        )
        ) {

            // -------------------------------------------------
            // STUDENT ID
            // -------------------------------------------------

            ps.setInt(
                    1,
                    attempt.getStudentId()
            );


            // -------------------------------------------------
            // ASSESSMENT ID
            // -------------------------------------------------

            ps.setInt(
                    2,
                    attempt.getAssessmentId()
            );


            // -------------------------------------------------
            // STUDENT ID FOR SUBQUERY
            // -------------------------------------------------

            ps.setInt(
                    3,
                    attempt.getStudentId()
            );


            // -------------------------------------------------
            // ASSESSMENT ID FOR SUBQUERY
            // -------------------------------------------------

            ps.setInt(
                    4,
                    attempt.getAssessmentId()
            );


            // -------------------------------------------------
            // STATUS
            // -------------------------------------------------

            ps.setString(
                    5,
                    "STARTED"
            );


            // -------------------------------------------------
            // SCORE
            // -------------------------------------------------

            ps.setInt(
                    6,
                    0
            );


            // -------------------------------------------------
            // TOTAL MARKS
            // -------------------------------------------------

            ps.setInt(
                    7,
                    0
            );


            // -------------------------------------------------
            // PERCENTAGE
            // -------------------------------------------------

            ps.setDouble(
                    8,
                    0.0
            );


            int result =
                    ps.executeUpdate();


            if (result > 0) {

                // -------------------------------------------------
                // GET AUTO GENERATED ATTEMPT ID
                // -------------------------------------------------

                try (
                        ResultSet rs =
                                ps.getGeneratedKeys()
                ) {

                    if (rs.next()) {

                        attempt.setAttemptId(
                                rs.getInt(1)
                        );

                    }

                }


                /*
                 * Reloading the record in service will obtain
                 * the actual attempt_number generated by SQL.
                 */

                return true;

            }

        }
        catch (Exception e) {

            e.printStackTrace();

        }


        return false;
    }


    // =========================================================
    // FIND ATTEMPT BY ID
    // =========================================================

    @Override
    public StudentAttempt findById(
            Integer id) {

        String sql = """
                SELECT
                    attempt_id,
                    student_id,
                    assessment_id,
                    attempt_number,
                    start_time,
                    end_time,
                    score,
                    total_marks,
                    percentage,
                    attempt_status,
                    created_at
                FROM student_attempt
                WHERE attempt_id = ?
                """;


        try (
                Connection con =
                        dataSource.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            ps.setInt(
                    1,
                    id
            );


            try (
                    ResultSet rs =
                            ps.executeQuery()
            ) {

                if (rs.next()) {

                    return mapRow(rs);

                }

            }

        }
        catch (Exception e) {

            e.printStackTrace();

        }


        return null;
    }


    // =========================================================
    // FIND ACTIVE ATTEMPT
    // =========================================================

    @Override
    public StudentAttempt findByStudentAndAssessment(
            Integer studentId,
            Integer assessmentId) {

        String sql = """
                SELECT
                    attempt_id,
                    student_id,
                    assessment_id,
                    attempt_number,
                    start_time,
                    end_time,
                    score,
                    total_marks,
                    percentage,
                    attempt_status,
                    created_at
                FROM student_attempt
                WHERE student_id = ?
                AND assessment_id = ?
                AND attempt_status = 'STARTED'
                ORDER BY attempt_id DESC
                LIMIT 1
                """;


        try (
                Connection con =
                        dataSource.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            ps.setInt(
                    1,
                    studentId
            );


            ps.setInt(
                    2,
                    assessmentId
            );


            try (
                    ResultSet rs =
                            ps.executeQuery()
            ) {

                if (rs.next()) {

                    return mapRow(rs);

                }

            }

        }
        catch (Exception e) {

            e.printStackTrace();

        }


        return null;
    }


    // =========================================================
    // UPDATE ATTEMPT STATUS / END TIME
    // =========================================================

    @Override
    public boolean update(
            StudentAttempt attempt) {

        String sql = """
                UPDATE student_attempt
                SET
                    attempt_status = ?,
                    end_time = ?
                WHERE attempt_id = ?
                """;


        try (
                Connection con =
                        dataSource.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            ps.setString(
                    1,
                    attempt.getAttemptStatus()
            );


            if (attempt.getEndTime() != null) {

                ps.setTimestamp(
                        2,
                        attempt.getEndTime()
                );

            }
            else {

                ps.setNull(
                        2,
                        java.sql.Types.TIMESTAMP
                );

            }


            ps.setInt(
                    3,
                    attempt.getAttemptId()
            );


            int result =
                    ps.executeUpdate();


            return result > 0;

        }
        catch (Exception e) {

            e.printStackTrace();

        }


        return false;
    }


    // =========================================================
    // UPDATE FINAL RESULT
    // =========================================================

    @Override
    public boolean updateResult(
            Integer attemptId,
            Integer score,
            Integer totalMarks,
            Double percentage) {

        String sql = """
                UPDATE student_attempt
                SET
                    score = ?,
                    total_marks = ?,
                    percentage = ?,
                    attempt_status = 'SUBMITTED',
                    end_time = CURRENT_TIMESTAMP
                WHERE attempt_id = ?
                """;


        try (
                Connection con =
                        dataSource.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            ps.setInt(
                    1,
                    score
            );


            ps.setInt(
                    2,
                    totalMarks
            );


            ps.setDouble(
                    3,
                    percentage
            );


            ps.setInt(
                    4,
                    attemptId
            );


            int result =
                    ps.executeUpdate();


            return result > 0;

        }
        catch (Exception e) {

            e.printStackTrace();

        }


        return false;
    }


    // =========================================================
    // RESULT SET → ENTITY
    // =========================================================

    private StudentAttempt mapRow(
            ResultSet rs)
            throws Exception {

        StudentAttempt attempt =
                new StudentAttempt();


        attempt.setAttemptId(
                rs.getInt("attempt_id")
        );


        attempt.setStudentId(
                rs.getInt("student_id")
        );


        attempt.setAssessmentId(
                rs.getInt("assessment_id")
        );


        attempt.setAttemptNumber(
                rs.getInt("attempt_number")
        );


        attempt.setStartTime(
                rs.getTimestamp("start_time")
        );


        attempt.setEndTime(
                rs.getTimestamp("end_time")
        );


        attempt.setScore(
                rs.getInt("score")
        );


        attempt.setTotalMarks(
                rs.getInt("total_marks")
        );


        attempt.setPercentage(
                rs.getDouble("percentage")
        );


        attempt.setAttemptStatus(
                rs.getString("attempt_status")
        );


        attempt.setCreatedAt(
                rs.getTimestamp("created_at")
        );


        return attempt;
    }
}