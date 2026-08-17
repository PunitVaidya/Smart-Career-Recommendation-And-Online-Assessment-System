package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.Admin;

public class AdminRowMapper implements RowMapper<Admin> {

	@Override
	public Admin mapRow(ResultSet rs, int rowNum) throws SQLException {

		Admin admin = new Admin();

		admin.setAdminId(rs.getInt("admin_id"));
		admin.setUsername(rs.getString("username"));
		admin.setPassword(rs.getString("password"));
		admin.setCreatedAt(rs.getTimestamp("created_at"));

		return admin;
	}

}