package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.CareerCourse;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.CareerCourseRowMapper;

@Repository
public class CareerCourseRepositoryImpl implements CareerCourseRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(CareerCourseRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final CareerCourseRowMapper rowMapper =
			new CareerCourseRowMapper();

	@Override
	public boolean save(CareerCourse careerCourse) {

		String sql = """
				INSERT INTO career_course
				(
					career_id,
					course_id,
					is_mandatory,
					sequence_no
				)
				VALUES
				(
					?,?,?,?
				)
				""";

		int count = jdbcTemplate.update(sql,
				careerCourse.getCareerId(),
				careerCourse.getCourseId(),
				careerCourse.getMandatory(),
				careerCourse.getSequenceNo());

		if (count > 0) {

			LOGGER.info(LogConstants.CAREER_COURSE_ADDED);

			return true;
		}

		return false;
	}

	@Override
	public boolean update(CareerCourse careerCourse) {

		String sql = """
				UPDATE career_course
				SET
					career_id=?,
					course_id=?,
					is_mandatory=?,
					sequence_no=?
				WHERE career_course_id=?
				""";

		return jdbcTemplate.update(sql,
				careerCourse.getCareerId(),
				careerCourse.getCourseId(),
				careerCourse.getMandatory(),
				careerCourse.getSequenceNo(),
				careerCourse.getCareerCourseId()) > 0;
	}

	@Override
	public boolean delete(Integer careerCourseId) {

		return jdbcTemplate.update(
				"DELETE FROM career_course WHERE career_course_id=?",
				careerCourseId) > 0;
	}

	@Override
	public CareerCourse findById(Integer careerCourseId) {

		List<CareerCourse> list = jdbcTemplate.query(
				"SELECT * FROM career_course WHERE career_course_id=?",
				rowMapper,
				careerCourseId);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public List<CareerCourse> findAll() {

		return jdbcTemplate.query(
				"SELECT * FROM career_course ORDER BY sequence_no",
				rowMapper);
	}

	@Override
	public List<CareerCourse> findByCareer(Integer careerId) {

		return jdbcTemplate.query(
				"SELECT * FROM career_course WHERE career_id=? ORDER BY sequence_no",
				rowMapper,
				careerId);
	}

	@Override
	public List<CareerCourse> findByCourse(Integer courseId) {

		return jdbcTemplate.query(
				"SELECT * FROM career_course WHERE course_id=?",
				rowMapper,
				courseId);
	}

	@Override
	public boolean exists(Integer careerId, Integer courseId) {

		Integer count = jdbcTemplate.queryForObject(
				"""
				SELECT COUNT(*)
				FROM career_course
				WHERE career_id=?
				AND course_id=?
				""",
				Integer.class,
				careerId,
				courseId);

		return count != null && count > 0;
	}
}