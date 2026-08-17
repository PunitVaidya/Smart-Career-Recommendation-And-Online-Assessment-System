package org.techhub.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.techhub.dto.response.DashboardResponse;
import org.techhub.dto.response.RecentStudentResponse;

@Repository
public class DashboardRepositoryImpl implements DashboardRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /*======================
            SQL
    =======================*/

    private static final String TOTAL_STUDENTS =
            "SELECT COUNT(*) FROM student";

    private static final String TOTAL_ADMINS =
            "SELECT COUNT(*) FROM admin";

    private static final String TOTAL_ASSESSMENTS =
            "SELECT COUNT(*) FROM assessment";

    private static final String TOTAL_QUESTIONS =
            "SELECT COUNT(*) FROM question";

    private static final String TOTAL_CAREERS =
            "SELECT COUNT(*) FROM career";

    private static final String TOTAL_COURSES =
            "SELECT COUNT(*) FROM course";

    private static final String TOTAL_ATTEMPTS =
            "SELECT COUNT(*) FROM student_assessment";

    private static final String TOTAL_RECOMMENDATIONS =
            "SELECT COUNT(*) FROM career_recommendation";

    private static final String RECENT_STUDENTS =

            "SELECT student_id,name,email,current_status,created_at " +
            "FROM student " +
            "ORDER BY student_id DESC " +
            "LIMIT 5";



    @Override
    public DashboardResponse getDashboardStatistics() {

        DashboardResponse dashboard = new DashboardResponse();

        dashboard.setTotalStudents(
                jdbcTemplate.queryForObject(TOTAL_STUDENTS, Integer.class));

        dashboard.setTotalAdmins(
                jdbcTemplate.queryForObject(TOTAL_ADMINS, Integer.class));

        dashboard.setTotalAssessments(
                jdbcTemplate.queryForObject(TOTAL_ASSESSMENTS, Integer.class));

        dashboard.setTotalQuestions(
                jdbcTemplate.queryForObject(TOTAL_QUESTIONS, Integer.class));

        dashboard.setTotalCareers(
                jdbcTemplate.queryForObject(TOTAL_CAREERS, Integer.class));

        dashboard.setTotalCourses(
                jdbcTemplate.queryForObject(TOTAL_COURSES, Integer.class));

        dashboard.setTotalAttempts(
                jdbcTemplate.queryForObject(TOTAL_ATTEMPTS, Integer.class));

        dashboard.setTotalRecommendations(
                jdbcTemplate.queryForObject(TOTAL_RECOMMENDATIONS, Integer.class));

        return dashboard;

    }



    @Override
    public List<RecentStudentResponse> getRecentStudents() {

        return jdbcTemplate.query(

                RECENT_STUDENTS,

                new RowMapper<RecentStudentResponse>() {

                    @Override
                    public RecentStudentResponse mapRow(ResultSet rs, int rowNum)
                            throws SQLException {

                        RecentStudentResponse student =
                                new RecentStudentResponse();

                        student.setStudentId(
                                rs.getInt("student_id"));

                        student.setName(
                                rs.getString("name"));

                        student.setEmail(
                                rs.getString("email"));

                        student.setCurrentStatus(
                                rs.getString("current_status"));

                        student.setRegisteredOn(

                                rs.getTimestamp("created_at")
                                  .toLocalDateTime()
                                  .format(DateTimeFormatter.ofPattern("dd MMM yyyy"))

                        );

                        return student;

                    }

                }

        );

    }

}