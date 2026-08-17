package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.Course;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.CourseRowMapper;

@Repository
public class CourseRepositoryImpl implements CourseRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(CourseRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final CourseRowMapper rowMapper = new CourseRowMapper();

	@Override
	public boolean save(Course course) {

		String sql = """
				INSERT INTO course
				(
					course_name,
					description,
					duration,
					level,
					status
				)
				VALUES
				(
					?,?,?,?,?
				)
				""";

		int count = jdbcTemplate.update(sql,

				course.getCourseName(),
				course.getDescription(),
				course.getDuration(),
				course.getLevel(),
				course.getStatus());

		if (count > 0) {

			LOGGER.info(LogConstants.COURSE_ADDED);

			return true;
		}

		return false;
	}

	@Override
	public boolean update(Course course) {

		String sql = """
				UPDATE course
				SET
					course_name=?,
					description=?,
					duration=?,
					level=?,
					status=?
				WHERE course_id=?
				""";

		return jdbcTemplate.update(sql,

				course.getCourseName(),
				course.getDescription(),
				course.getDuration(),
				course.getLevel(),
				course.getStatus(),
				course.getCourseId()) > 0;
	}

	@Override
	public boolean delete(Integer courseId) {

		return jdbcTemplate.update(
				"DELETE FROM course WHERE course_id=?",
				courseId) > 0;
	}

	@Override
	public Course findById(Integer courseId) {

		List<Course> list = jdbcTemplate.query(
				"SELECT * FROM course WHERE course_id=?",
				rowMapper,
				courseId);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public Course findByName(String courseName) {

		List<Course> list = jdbcTemplate.query(
				"SELECT * FROM course WHERE course_name=?",
				rowMapper,
				courseName);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public List<Course> findAll() {

		return jdbcTemplate.query(
				"SELECT * FROM course ORDER BY course_name",
				rowMapper);
	}

	@Override
	public List<Course> findActiveCourses() {

		return jdbcTemplate.query(
				"SELECT * FROM course WHERE status='ACTIVE'",
				rowMapper);
	}

	@Override
	public List<Course> findByLevel(String level) {

		return jdbcTemplate.query(
				"SELECT * FROM course WHERE level=?",
				rowMapper,
				level);
	}

	@Override
	public boolean existsByName(String courseName) {

		Integer count = jdbcTemplate.queryForObject(
				"SELECT COUNT(*) FROM course WHERE course_name=?",
				Integer.class,
				courseName);

		return count != null && count > 0;
	}
}