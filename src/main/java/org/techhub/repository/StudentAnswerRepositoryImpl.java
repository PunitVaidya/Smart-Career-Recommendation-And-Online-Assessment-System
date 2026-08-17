package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.StudentAnswer;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.StudentAnswerRowMapper;

@Repository
public class StudentAnswerRepositoryImpl implements StudentAnswerRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(StudentAnswerRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final StudentAnswerRowMapper rowMapper =
			new StudentAnswerRowMapper();

	@Override
	public boolean save(StudentAnswer answer) {

	    try {

	        String sql = """
	                INSERT INTO student_answer
	                (
	                    attempt_id,
	                    question_id,
	                    selected_answer,
	                    is_correct,
	                    marks_obtained
	                )
	                VALUES
	                (
	                    ?, ?, ?, ?, ?
	                )
	                """;

	        int count = jdbcTemplate.update(
	                sql,
	                answer.getAttemptId(),
	                answer.getQuestionId(),
	                answer.getSelectedAnswer(),
	                answer.getCorrect(),
	                answer.getMarksObtained()
	        );

	        if (count > 0) {

	            /*
	             * Get generated answer_id and answered_at
	             */
	            StudentAnswer savedAnswer =
	                    jdbcTemplate.queryForObject(
	                            """
	                            SELECT
	                                answer_id,
	                                answered_at
	                            FROM student_answer
	                            WHERE attempt_id = ?
	                            AND question_id = ?
	                            ORDER BY answer_id DESC
	                            LIMIT 1
	                            """,
	                            (rs, rowNum) -> {

	                                answer.setAnswerId(
	                                        rs.getInt("answer_id")
	                                );

	                                answer.setAnsweredAt(
	                                        rs.getTimestamp("answered_at")
	                                );

	                                return answer;
	                            },
	                            answer.getAttemptId(),
	                            answer.getQuestionId()
	                    );

	            LOGGER.info(LogConstants.ANSWER_SAVED);

	            return savedAnswer != null;
	        }

	    } catch (Exception e) {

	        LOGGER.error(e.getMessage());
	    }

	    return false;
	}
	@Override
	public boolean update(StudentAnswer answer) {

		try {

			String sql = """
					UPDATE student_answer
					SET
						selected_answer=?,
						is_correct=?,
						marks_obtained=?
					WHERE answer_id=?
					""";

			int count = jdbcTemplate.update(
					sql,
					answer.getSelectedAnswer(),
					answer.getCorrect(),
					answer.getMarksObtained(),
					answer.getAnswerId());

			if (count > 0) {

				LOGGER.info(LogConstants.ANSWER_UPDATED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public boolean delete(Integer answerId) {

		try {

			int count = jdbcTemplate.update(
					"DELETE FROM student_answer WHERE answer_id=?",
					answerId);

			return count > 0;

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public StudentAnswer findById(Integer answerId) {

		try {

			List<StudentAnswer> list = jdbcTemplate.query(
					"SELECT * FROM student_answer WHERE answer_id=?",
					rowMapper,
					answerId);

			return list.isEmpty() ? null : list.get(0);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return null;
	}

	@Override
	public List<StudentAnswer> findAll() {

		try {

			return jdbcTemplate.query(
					"SELECT * FROM student_answer",
					rowMapper);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return List.of();
	}

	@Override
	public List<StudentAnswer> findByAttempt(Integer attemptId) {

		try {

			return jdbcTemplate.query(
					"SELECT * FROM student_answer WHERE attempt_id=?",
					rowMapper,
					attemptId);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return List.of();
	}

	@Override
	public List<StudentAnswer> findByQuestion(Integer questionId) {

		try {

			return jdbcTemplate.query(
					"SELECT * FROM student_answer WHERE question_id=?",
					rowMapper,
					questionId);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return List.of();
	}

	@Override
	public List<StudentAnswer> findByAttemptAndQuestion(Integer attemptId,
			Integer questionId) {

		try {

			return jdbcTemplate.query(
					"""
					SELECT *
					FROM student_answer
					WHERE attempt_id=?
					AND question_id=?
					""",
					rowMapper,
					attemptId,
					questionId);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return List.of();
	}

}