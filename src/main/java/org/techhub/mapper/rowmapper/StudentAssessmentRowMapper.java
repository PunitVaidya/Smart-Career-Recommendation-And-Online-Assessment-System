package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.StudentAssessment;

public class StudentAssessmentRowMapper implements RowMapper<StudentAssessment> {

	@Override
	public StudentAssessment mapRow(ResultSet rs, int rowNum) throws SQLException {

		StudentAssessment assessment = new StudentAssessment();

		assessment.setAttemptId(rs.getInt("attempt_id"));
		assessment.setStudentId(rs.getInt("student_id"));
		assessment.setAssessmentId(rs.getInt("assessment_id"));
		assessment.setAttemptNumber(rs.getInt("attempt_number"));
		assessment.setStartTime(rs.getTimestamp("start_time"));
		assessment.setEndTime(rs.getTimestamp("end_time"));
		assessment.setScore(rs.getInt("score"));
		assessment.setTotalMarks(rs.getInt("total_marks"));
		assessment.setPercentage(rs.getDouble("percentage"));
		assessment.setStatus(rs.getString("status"));
		assessment.setCreatedAt(rs.getTimestamp("created_at"));

		return assessment;
	}
}