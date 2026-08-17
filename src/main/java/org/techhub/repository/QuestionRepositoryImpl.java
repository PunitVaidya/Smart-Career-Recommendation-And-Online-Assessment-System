package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.Question;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.QuestionRowMapper;

@Repository
public class QuestionRepositoryImpl implements QuestionRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(QuestionRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final QuestionRowMapper rowMapper =
			new QuestionRowMapper();

	@Override
	public List<Question> findByAssessment(
	        Integer assessmentId) {


	    String sql =
	        """
	        SELECT *
	        FROM question
	        WHERE assessment_id = ?
	        AND question_status = 'ACTIVE'
	        """;


	    return jdbcTemplate.query(
	            sql,
	            new Object[]{
	                assessmentId
	            },
	            new QuestionRowMapper()
	    );

	}
	
	@Override
	public boolean save(Question question) {

		try {

			String sql =
					"""
					INSERT INTO question
					(
					assessment_id,
					question_title,
					option_a,
					option_b,
					option_c,
					option_d,
					correct_answer,
					category_id,
					difficulty,
					marks,
					question_status
					)
					VALUES
					(?,?,?,?,?,?,?,?,?,?,?)
					""";
			int count = jdbcTemplate.update(
					sql,

					question.getAssessmentId(),

					question.getQuestionTitle(),

					question.getOptionA(),

					question.getOptionB(),

					question.getOptionC(),

					question.getOptionD(),

					question.getCorrectAnswer(),

					question.getCategoryId(),

					question.getDifficulty(),

					question.getMarks(),

					question.getQuestionStatus()

					);

			if (count > 0) {

				LOGGER.info(LogConstants.QUESTION_ADDED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return false;
	}

	@Override
	public boolean update(Question question) {

		try {

			String sql = """
					UPDATE question
					SET
						question_title=?,
						option_a=?,
						option_b=?,
						option_c=?,
						option_d=?,
						correct_answer=?,
						category_id=?,
						difficulty=?,
						marks=?,
						question_status=?
					WHERE question_id=?
					""";

			int count = jdbcTemplate.update(
					sql,
					question.getQuestionTitle(),
					question.getOptionA(),
					question.getOptionB(),
					question.getOptionC(),
					question.getOptionD(),
					question.getCorrectAnswer(),
					question.getCategoryId(),
					question.getDifficulty(),
					question.getMarks(),
					question.getQuestionStatus(),
					question.getQuestionId());

			if (count > 0) {

				LOGGER.info(LogConstants.QUESTION_UPDATED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return false;
	}

	@Override
	public boolean delete(Integer questionId) {

		try {

			int count = jdbcTemplate.update(
					"DELETE FROM question WHERE question_id=?",
					questionId);

			if (count > 0) {

				LOGGER.info(LogConstants.QUESTION_DELETED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return false;
	}

	@Override
	public Question findById(Integer questionId) {

		try {

			List<Question> questions = jdbcTemplate.query(
					"SELECT * FROM question WHERE question_id=?",
					rowMapper,
					questionId);

			return questions.isEmpty() ? null : questions.get(0);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return null;
	}

	@Override
	public List<Question> findAll() {

	    String sql = """
	        SELECT
	            q.question_id,
	            q.question_title,
	            q.option_a,
	            q.option_b,
	            q.option_c,
	            q.option_d,
	            q.correct_answer,
	            q.category_id,
	            q.difficulty,
	            q.marks,
	            q.question_status,
	            q.created_at,
	            q.assessment_id
	        FROM question q
	        ORDER BY q.created_at DESC
	        """;

	    return jdbcTemplate.query(
	            sql,
	            rowMapper
	    );
	}	
	@Override
	public List<Question> findByCategory(Integer categoryId) {

		try {

			return jdbcTemplate.query(
					"SELECT * FROM question WHERE category_id=?",
					rowMapper,
					categoryId);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return List.of();
	}

	@Override
	public List<Question> findByDifficulty(String difficulty) {

		try {

			return jdbcTemplate.query(
					"SELECT * FROM question WHERE difficulty=?",
					rowMapper,
					difficulty);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return List.of();
	}

	@Override
	public List<Question> findActiveQuestions() {

		try {

			return jdbcTemplate.query(
					"SELECT * FROM question WHERE question_status='ACTIVE'",
					rowMapper);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return List.of();
	}

	@Override
	public boolean exists(Integer questionId) {

		try {

			Integer count = jdbcTemplate.queryForObject(
					"SELECT COUNT(*) FROM question WHERE question_id=?",
					Integer.class,
					questionId);

			return count != null && count > 0;

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
		}

		return false;
	}
	
	@Override
	public boolean existsByTitle(String questionTitle) {

		Integer count = jdbcTemplate.queryForObject(
				"SELECT COUNT(*) FROM question WHERE question_title=?",
				Integer.class,
				questionTitle);

		return count != null && count > 0;
	}
}