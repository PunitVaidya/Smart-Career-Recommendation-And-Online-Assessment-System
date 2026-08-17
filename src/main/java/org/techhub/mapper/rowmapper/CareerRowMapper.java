package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.Career;

public class CareerRowMapper implements RowMapper<Career> {

	@Override
	public Career mapRow(ResultSet rs, int rowNum) throws SQLException {

		Career career = new Career();

		career.setCareerId(rs.getInt("career_id"));
		career.setCareerName(rs.getString("career_name"));
		career.setDescription(rs.getString("description"));
		career.setCategory(rs.getString("category"));
		career.setRequiredSkillLevel(rs.getString("required_skill_level"));
		career.setAverageSalary(rs.getString("average_salary"));
		career.setDemandLevel(rs.getString("demand_level"));
		career.setStatus(rs.getString("status"));
		career.setCreatedAt(rs.getTimestamp("created_at"));

		return career;
	}
}