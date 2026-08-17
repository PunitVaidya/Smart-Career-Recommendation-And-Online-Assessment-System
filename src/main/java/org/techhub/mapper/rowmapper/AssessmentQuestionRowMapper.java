package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.AssessmentQuestion;

public class AssessmentQuestionRowMapper implements RowMapper<AssessmentQuestion> {

	@Override
	public AssessmentQuestion mapRow(ResultSet rs, int rowNum) throws SQLException {

		AssessmentQuestion aq = new AssessmentQuestion();

		aq.setId(rs.getInt("id"));
		aq.setAssessmentId(rs.getInt("assessment_id"));
		aq.setQuestionId(rs.getInt("question_id"));

		return aq;
	}
}