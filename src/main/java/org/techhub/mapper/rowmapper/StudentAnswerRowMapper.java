package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.StudentAnswer;

public class StudentAnswerRowMapper implements RowMapper<StudentAnswer> {

	@Override
	public StudentAnswer mapRow(ResultSet rs, int rowNum) throws SQLException {

		StudentAnswer answer = new StudentAnswer();

		answer.setAnswerId(rs.getInt("answer_id"));
		answer.setAttemptId(rs.getInt("attempt_id"));
		answer.setQuestionId(rs.getInt("question_id"));
		answer.setSelectedAnswer(rs.getString("selected_answer"));
		answer.setCorrect(rs.getBoolean("is_correct"));
		answer.setMarksObtained(rs.getInt("marks_obtained"));
		answer.setAnsweredAt(rs.getTimestamp("answered_at"));

		return answer;
	}
}