package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.Course;

public class CourseRowMapper implements RowMapper<Course> {

	@Override
	public Course mapRow(ResultSet rs, int rowNum) throws SQLException {

		Course course = new Course();

		course.setCourseId(rs.getInt("course_id"));
		course.setCourseName(rs.getString("course_name"));
		course.setDescription(rs.getString("description"));
		course.setDuration(rs.getString("duration"));
		course.setLevel(rs.getString("level"));
		course.setStatus(rs.getString("status"));
		course.setCreatedAt(rs.getTimestamp("created_at"));

		return course;
	}
}