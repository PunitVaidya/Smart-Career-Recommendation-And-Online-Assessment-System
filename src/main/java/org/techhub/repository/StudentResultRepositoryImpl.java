package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import org.techhub.entity.StudentResult;
import org.techhub.logger.ApplicationLogger;
import org.techhub.mapper.rowmapper.StudentResultRowMapper;


@Repository
public class StudentResultRepositoryImpl implements StudentResultRepository {


    private static final Logger LOGGER =
            ApplicationLogger.getLogger(StudentResultRepositoryImpl.class);


    @Autowired
    private JdbcTemplate jdbcTemplate;


    private final StudentResultRowMapper rowMapper =
            new StudentResultRowMapper();



    // =====================================================
    // SAVE RESULT
    // =====================================================

    @Override
    public boolean save(StudentResult result) {


        String sql = """

        INSERT INTO student_result
        (
            attempt_id,
            student_id,
            assessment_id,
            score,
            total_marks,
            percentage,
            result_status,
            career_readiness
        )
        VALUES
        (?,?,?,?,?,?,?,?)

        """;


        return jdbcTemplate.update(
                sql,

                result.getAttemptId(),
                result.getStudentId(),
                result.getAssessmentId(),
                result.getScore(),
                result.getTotalMarks(),
                result.getPercentage(),
                result.getResultStatus(),
                result.getCareerReadiness()

        ) > 0;

    }



    // =====================================================
    // UPDATE RESULT
    // =====================================================

    @Override
    public boolean update(StudentResult result) {


        String sql = """

        UPDATE student_result

        SET

        score=?,

        total_marks=?,

        percentage=?,

        result_status=?,

        career_readiness=?

        WHERE result_id=?

        """;


        return jdbcTemplate.update(

                sql,

                result.getScore(),
                result.getTotalMarks(),
                result.getPercentage(),
                result.getResultStatus(),
                result.getCareerReadiness(),
                result.getResultId()

        ) > 0;

    }



    // =====================================================
    // DELETE RESULT
    // =====================================================

    @Override
    public boolean delete(Integer resultId) {


        return jdbcTemplate.update(

                "DELETE FROM student_result WHERE result_id=?",

                resultId

        ) > 0;

    }



    // =====================================================
    // BASE QUERY
    // =====================================================

    private String baseQuery() {

    	 return """

    			    SELECT

    			    sr.*,

    			    s.name AS student_name,

    			    s.email AS student_email,

    			    a.assessment_name AS assessment_name,

    			    c.career_name AS recommended_career,

    			    COALESCE(cr.match_percentage, 0) AS career_match_percentage

    			    FROM student_result sr

    			    JOIN student s
    			    ON sr.student_id = s.student_id

    			    JOIN assessment a
    			    ON sr.assessment_id = a.assessment_id

    			    LEFT JOIN career_recommendation cr
    			    ON sr.attempt_id = cr.attempt_id
    			    AND cr.rank_no = 1

    			    LEFT JOIN career c
    			    ON cr.career_id = c.career_id

    			    """;


    }
 


    // =====================================================
    // FIND BY RESULT ID
    // =====================================================

    @Override
    public StudentResult findById(Integer resultId) {


        String sql =
                baseQuery()
                +
                " WHERE sr.result_id=?";


        List<StudentResult> list =
                jdbcTemplate.query(

                        sql,

                        rowMapper,

                        resultId

                );


        return list.isEmpty()
                ? null
                : list.get(0);

    }



    // =====================================================
    // FIND BY ATTEMPT ID
    // =====================================================

    @Override
    public StudentResult findByAttemptId(Integer attemptId) {


        String sql =
                baseQuery()
                +
                " WHERE sr.attempt_id=?";


        List<StudentResult> list =
                jdbcTemplate.query(

                        sql,

                        rowMapper,

                        attemptId

                );


        return list.isEmpty()
                ? null
                : list.get(0);

    }



    // =====================================================
    // FIND ALL
    // =====================================================

    @Override
    public List<StudentResult> findAll() {


        String sql =
                baseQuery()
                +
                " ORDER BY sr.submitted_at DESC";


        return jdbcTemplate.query(

                sql,

                rowMapper

        );

    }



    // =====================================================
    // FIND BY STUDENT
    // =====================================================

    @Override
    public List<StudentResult> findByStudent(Integer studentId) {


        String sql =
                baseQuery()
                +
                " WHERE sr.student_id=? "
                +
                "ORDER BY sr.submitted_at DESC";


        return jdbcTemplate.query(

                sql,

                rowMapper,

                studentId

        );

    }



    // =====================================================
    // FIND BY ASSESSMENT
    // =====================================================

    @Override
    public List<StudentResult> findByAssessment(
            Integer assessmentId) {


        String sql =
                baseQuery()
                +
                " WHERE sr.assessment_id=? "
                +
                "ORDER BY sr.submitted_at DESC";


        return jdbcTemplate.query(

                sql,

                rowMapper,

                assessmentId

        );

    }



    // =====================================================
    // LATEST RESULT BY STUDENT
    // =====================================================

    @Override
    public StudentResult findLatestByStudent(
            Integer studentId) {


        String sql =
                baseQuery()
                +
                """

                WHERE sr.student_id=?

                ORDER BY sr.submitted_at DESC

                LIMIT 1

                """;


        List<StudentResult> list =
                jdbcTemplate.query(

                        sql,

                        rowMapper,

                        studentId

                );


        return list.isEmpty()
                ? null
                : list.get(0);

    }

}