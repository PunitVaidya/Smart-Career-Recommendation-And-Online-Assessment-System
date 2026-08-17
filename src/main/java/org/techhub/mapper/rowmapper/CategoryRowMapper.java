package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.Category;

public class CategoryRowMapper implements RowMapper<Category> {

	@Override
	public Category mapRow(ResultSet rs, int rowNum) throws SQLException {

		Category category = new Category();

		category.setCategoryId(rs.getInt("category_id"));
		category.setCategoryName(rs.getString("category_name"));
		category.setCategoryType(rs.getString("category_type"));
		category.setDescription(rs.getString("description"));
		category.setStatus(rs.getString("status"));
		category.setCreatedAt(rs.getTimestamp("created_at"));

		return category;
	}

}