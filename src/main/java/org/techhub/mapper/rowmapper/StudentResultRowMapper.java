package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.StudentResult;


public class StudentResultRowMapper implements RowMapper<StudentResult> {


	@Override
	public StudentResult mapRow(ResultSet rs, int rowNum)
			throws SQLException {


		StudentResult result = new StudentResult();



		/*
		==========================================================
		STUDENT RESULT TABLE DATA
		==========================================================
		*/


		result.setResultId(
				rs.getInt("result_id")
		);



		result.setAttemptId(
				rs.getInt("attempt_id")
		);



		result.setStudentId(
				rs.getInt("student_id")
		);



		result.setAssessmentId(
				rs.getInt("assessment_id")
		);



		result.setScore(
				rs.getInt("score")
		);



		result.setTotalMarks(
				rs.getInt("total_marks")
		);



		result.setPercentage(
				rs.getDouble("percentage")
		);



		result.setResultStatus(
				rs.getString("result_status")
		);



		result.setCareerReadiness(
				rs.getDouble("career_readiness")
		);



		result.setSubmittedAt(
				rs.getTimestamp("submitted_at")
		);





		/*
		==========================================================
		STUDENT DETAILS JOIN DATA
		==========================================================
		*/


		result.setStudentName(
				rs.getString("student_name")
		);



		result.setStudentEmail(
				rs.getString("student_email")
		);





		/*
		==========================================================
		ASSESSMENT DETAILS JOIN DATA
		==========================================================
		*/


		result.setAssessmentName(
				rs.getString("assessment_name")
		);





		/*
		==========================================================
		CAREER RECOMMENDATION JOIN DATA
		==========================================================
		*/


		result.setRecommendedCareer(
				rs.getString("recommended_career")
		);



		java.math.BigDecimal matchPercentage =
		        rs.getBigDecimal("career_match_percentage");

		result.setMatchPercentage(
		        matchPercentage != null
		                ? matchPercentage.doubleValue()
		                : 0.0
		);
		
		return result;

	}

}