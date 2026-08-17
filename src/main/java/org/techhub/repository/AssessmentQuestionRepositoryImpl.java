package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.AssessmentQuestion;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.AssessmentQuestionRowMapper;

@Repository
public class AssessmentQuestionRepositoryImpl implements AssessmentQuestionRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(AssessmentQuestionRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final AssessmentQuestionRowMapper rowMapper =
			new AssessmentQuestionRowMapper();

	@Override
	public boolean save(AssessmentQuestion assessmentQuestion) {

	    try {

	        String sql = """
	                INSERT INTO assessment_question
	                (
	                    assessment_id,
	                    question_id
	                )
	                VALUES
	                (
	                    ?,?
	                )
	                """;

	        int count = jdbcTemplate.update(
	                sql,
	                assessmentQuestion.getAssessmentId(),
	                assessmentQuestion.getQuestionId());

	        if (count > 0) {

	            LOGGER.info(
	                    LogConstants.ASSESSMENT_QUESTION_CREATED);

	            return true;
	        }

	    } catch (Exception e) {

	        LOGGER.error(
	                "Error saving assessment question: {}",
	                e.getMessage());
	    }

	    return false;
	}

	@Override
	public boolean delete(Integer id) {

		try {

			int count = jdbcTemplate.update(
					"DELETE FROM assessment_question WHERE id=?",
					id);

			if (count > 0) {

				LOGGER.info(LogConstants.ASSESSMENT_QUESTION_DELETED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return false;
	}

	@Override
	public AssessmentQuestion findById(Integer id) {

		List<AssessmentQuestion> list = jdbcTemplate.query(
				"SELECT * FROM assessment_question WHERE id=?",
				rowMapper,
				id);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public List<AssessmentQuestion> findAll() {

		return jdbcTemplate.query(
				"SELECT * FROM assessment_question",
				rowMapper);
	}

	@Override
	public List<AssessmentQuestion> findByAssessment(Integer assessmentId) {

		return jdbcTemplate.query(
				"SELECT * FROM assessment_question WHERE assessment_id=?",
				rowMapper,
				assessmentId);
	}

	@Override
	public List<AssessmentQuestion> findByQuestion(Integer questionId) {

		return jdbcTemplate.query(
				"SELECT * FROM assessment_question WHERE question_id=?",
				rowMapper,
				questionId);
	}

	@Override
	public boolean exists(Integer assessmentId, Integer questionId) {

		Integer count = jdbcTemplate.queryForObject(
				"""
				SELECT COUNT(*)
				FROM assessment_question
				WHERE assessment_id=?
				AND question_id=?
				""",
				Integer.class,
				assessmentId,
				questionId);

		return count != null && count > 0;
	}
}