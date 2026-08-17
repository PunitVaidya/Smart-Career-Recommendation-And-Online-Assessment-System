package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.CareerCourse;

public class CareerCourseRowMapper implements RowMapper<CareerCourse> {

	@Override
	public CareerCourse mapRow(ResultSet rs, int rowNum) throws SQLException {

		CareerCourse course = new CareerCourse();

		course.setCareerCourseId(rs.getInt("career_course_id"));
		course.setCareerId(rs.getInt("career_id"));
		course.setCourseId(rs.getInt("course_id"));
		course.setMandatory(rs.getBoolean("is_mandatory"));
		course.setSequenceNo(rs.getInt("sequence_no"));
		course.setCreatedAt(rs.getTimestamp("created_at"));

		return course;
	}
}