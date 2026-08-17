package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.CareerSkill;

public class CareerSkillRowMapper
		implements RowMapper<CareerSkill> {

	@Override
	public CareerSkill mapRow(
			ResultSet rs,
			int rowNum) throws SQLException {

		CareerSkill careerSkill =
				new CareerSkill();

		careerSkill.setCareerSkillId(
				rs.getInt("career_skill_id"));

		careerSkill.setCareerId(
				rs.getInt("career_id"));

		careerSkill.setCategoryId(
				rs.getInt("category_id"));

		careerSkill.setMinimumScore(
				rs.getInt("minimum_score"));

		careerSkill.setWeight(
				rs.getInt("weight"));

		careerSkill.setCreatedAt(
				rs.getTimestamp("created_at"));

		return careerSkill;
	}
}