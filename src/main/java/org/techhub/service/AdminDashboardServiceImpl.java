package org.techhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.techhub.dto.response.AdminDashboardResponse;

@Service
public class AdminDashboardServiceImpl implements AdminDashboardService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public AdminDashboardResponse getDashboardData() {

		AdminDashboardResponse response = new AdminDashboardResponse();

		// Total Students

		response.setTotalStudents(

				jdbcTemplate.queryForObject("SELECT COUNT(*) FROM student", Integer.class)

		);

		// Total Admins <-- ADD THIS

		response.setTotalAdmins(

				jdbcTemplate.queryForObject("SELECT COUNT(*) FROM admin", Integer.class)

		);

		// Total Assessments

		response.setTotalAssessments(

				jdbcTemplate.queryForObject("SELECT COUNT(*) FROM assessment", Integer.class)

		);

		// Total Questions

		response.setTotalQuestions(

				jdbcTemplate.queryForObject("SELECT COUNT(*) FROM question", Integer.class)

		);

		// Total Courses

		response.setTotalCourses(

				jdbcTemplate.queryForObject("SELECT COUNT(*) FROM course", Integer.class)

		);

		// Total Careers

		response.setTotalCareers(

				jdbcTemplate.queryForObject("SELECT COUNT(*) FROM career", Integer.class)

		);

		// Total Attempts

		response.setTotalAttempts(

				jdbcTemplate.queryForObject("SELECT COUNT(*) FROM student_result", Integer.class)

		);

		// Total Recommendations

		response.setTotalRecommendations(

				jdbcTemplate.queryForObject("SELECT COUNT(*) FROM career_recommendation", Integer.class)

		);

		return response;

	}
}