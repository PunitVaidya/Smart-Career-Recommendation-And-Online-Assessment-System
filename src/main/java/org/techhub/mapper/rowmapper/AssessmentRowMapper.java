package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.Assessment;

public class AssessmentRowMapper implements RowMapper<Assessment> {

	@Override
	public Assessment mapRow(ResultSet rs, int rowNum) throws SQLException {

		Assessment assessment = new Assessment();

		assessment.setAssessmentId(rs.getInt("assessment_id"));
		assessment.setAssessmentName(rs.getString("assessment_name"));
		assessment.setDescription(rs.getString("description"));
		assessment.setAssessmentType(rs.getString("assessment_type"));
		assessment.setDuration(rs.getInt("duration"));
		assessment.setTotalQuestions(rs.getInt("total_questions"));
		assessment.setTotalMarks(rs.getInt("total_marks"));
		assessment.setStatus(rs.getString("status"));
		assessment.setCreatedAt(rs.getTimestamp("created_at"));
		assessment.setUpdatedAt(rs.getTimestamp("updated_at"));

		return assessment;
	}
}