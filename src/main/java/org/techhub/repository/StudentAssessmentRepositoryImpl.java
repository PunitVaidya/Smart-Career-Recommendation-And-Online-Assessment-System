package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.StudentAssessment;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.StudentAssessmentRowMapper;

@Repository
public class StudentAssessmentRepositoryImpl
		implements StudentAssessmentRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(StudentAssessmentRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final StudentAssessmentRowMapper rowMapper =
			new StudentAssessmentRowMapper();

	@Override
	public boolean save(StudentAssessment assessment) {

		String sql = """
			INSERT INTO student_assessment
			(
				student_id,
				assessment_id,
				attempt_number,
				start_time,
				end_time,
				score,
				total_marks,
				percentage,
				status
			)
			VALUES
			(
				?,?,?,?,?,?,?,?,?
			)
			""";

		int count = jdbcTemplate.update(sql,

				assessment.getStudentId(),
				assessment.getAssessmentId(),
				assessment.getAttemptNumber(),
				assessment.getStartTime(),
				assessment.getEndTime(),
				assessment.getScore(),
				assessment.getTotalMarks(),
				assessment.getPercentage(),
				assessment.getStatus());

		LOGGER.info(LogConstants.ASSESSMENT_STARTED);

		return count > 0;
	}

	@Override
	public boolean update(StudentAssessment assessment) {

		String sql = """
			UPDATE student_assessment
			SET
				end_time=?,
				score=?,
				total_marks=?,
				percentage=?,
				status=?
			WHERE attempt_id=?
			""";

		int count = jdbcTemplate.update(sql,

				assessment.getEndTime(),
				assessment.getScore(),
				assessment.getTotalMarks(),
				assessment.getPercentage(),
				assessment.getStatus(),
				assessment.getAttemptId());

		return count > 0;
	}

	@Override
	public StudentAssessment findById(Integer attemptId) {

		List<StudentAssessment> list =
				jdbcTemplate.query(
						"SELECT * FROM student_assessment WHERE attempt_id=?",
						rowMapper,
						attemptId);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public List<StudentAssessment> findAll() {

		return jdbcTemplate.query(
				"SELECT * FROM student_assessment",
				rowMapper);
	}

	@Override
	public List<StudentAssessment> findByStudent(Integer studentId) {

		return jdbcTemplate.query(
				"SELECT * FROM student_assessment WHERE student_id=?",
				rowMapper,
				studentId);
	}

	@Override
	public List<StudentAssessment> findByAssessment(Integer assessmentId) {

		return jdbcTemplate.query(
				"SELECT * FROM student_assessment WHERE assessment_id=?",
				rowMapper,
				assessmentId);
	}

	@Override
	public List<StudentAssessment> findByStudentAndAssessment(
			Integer studentId,
			Integer assessmentId) {

		return jdbcTemplate.query(
				"""
				SELECT *
				FROM student_assessment
				WHERE student_id=?
				AND assessment_id=?
				""",
				rowMapper,
				studentId,
				assessmentId);
	}

	@Override
	public boolean delete(Integer attemptId) {

		int count =
				jdbcTemplate.update(
						"DELETE FROM student_assessment WHERE attempt_id=?",
						attemptId);

		return count > 0;
	}
}