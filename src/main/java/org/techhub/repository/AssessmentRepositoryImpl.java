package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.Assessment;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.AssessmentRowMapper;

@Repository
public class AssessmentRepositoryImpl implements AssessmentRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(AssessmentRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final AssessmentRowMapper rowMapper =
			new AssessmentRowMapper();

	@Override
	public boolean save(Assessment assessment) {

		try {

			String sql = """
					INSERT INTO assessment
					(
						assessment_name,
						description,
						assessment_type,
						duration,
						total_questions,
						total_marks,
						status
					)
					VALUES
					(
						?,?,?,?,?,?,?
					)
					""";

			int count = jdbcTemplate.update(

					sql,

					assessment.getAssessmentName(),
					assessment.getDescription(),
					assessment.getAssessmentType(),
					assessment.getDuration(),
					assessment.getTotalQuestions(),
					assessment.getTotalMarks(),
					assessment.getStatus());

			if (count > 0) {

				LOGGER.info(LogConstants.ASSESSMENT_CREATED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public boolean update(Assessment assessment) {

		try {

			String sql = """
					UPDATE assessment
					SET
						assessment_name=?,
						description=?,
						assessment_type=?,
						duration=?,
						total_questions=?,
						total_marks=?,
						status=?
					WHERE assessment_id=?
					""";

			int count = jdbcTemplate.update(

					sql,

					assessment.getAssessmentName(),
					assessment.getDescription(),
					assessment.getAssessmentType(),
					assessment.getDuration(),
					assessment.getTotalQuestions(),
					assessment.getTotalMarks(),
					assessment.getStatus(),
					assessment.getAssessmentId());

			if (count > 0) {

				LOGGER.info(LogConstants.ASSESSMENT_UPDATED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public boolean delete(Integer assessmentId) {

		try {

			int count = jdbcTemplate.update(
					"DELETE FROM assessment WHERE assessment_id=?",
					assessmentId);

			if (count > 0) {

				LOGGER.info(LogConstants.ASSESSMENT_DELETED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public Assessment findById(Integer assessmentId) {

		try {

			List<Assessment> list = jdbcTemplate.query(
					"SELECT * FROM assessment WHERE assessment_id=?",
					rowMapper,
					assessmentId);

			return list.isEmpty() ? null : list.get(0);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return null;
	}

	@Override
	public Assessment findByName(String assessmentName) {

		try {

			List<Assessment> list = jdbcTemplate.query(
					"SELECT * FROM assessment WHERE assessment_name=?",
					rowMapper,
					assessmentName);

			return list.isEmpty() ? null : list.get(0);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return null;
	}

	@Override
	public List<Assessment> findAll() {

		return jdbcTemplate.query(
				"SELECT * FROM assessment",
				rowMapper);
	}

	@Override
	public List<Assessment> findByType(String assessmentType) {

		return jdbcTemplate.query(
				"SELECT * FROM assessment WHERE assessment_type=?",
				rowMapper,
				assessmentType);
	}

	@Override
	public List<Assessment> findActiveAssessments() {

		return jdbcTemplate.query(
				"SELECT * FROM assessment WHERE status='ACTIVE'",
				rowMapper);
	}

	@Override
	public boolean existsByName(String assessmentName) {

		Integer count = jdbcTemplate.queryForObject(
				"SELECT COUNT(*) FROM assessment WHERE assessment_name=?",
				Integer.class,
				assessmentName);

		return count != null && count > 0;
	}
}