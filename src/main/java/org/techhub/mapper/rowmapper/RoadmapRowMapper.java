package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.Roadmap;

public class RoadmapRowMapper implements RowMapper<Roadmap> {

	@Override
	public Roadmap mapRow(ResultSet rs, int rowNum) throws SQLException {

		Roadmap roadmap = new Roadmap();

		roadmap.setRoadmapId(rs.getInt("roadmap_id"));
		roadmap.setCareerId(rs.getInt("career_id"));
		roadmap.setStepNo(rs.getInt("step_no"));
		roadmap.setTitle(rs.getString("title"));
		roadmap.setDescription(rs.getString("description"));
		roadmap.setEstimatedDuration(rs.getString("estimated_duration"));
		roadmap.setStatus(rs.getString("status"));
		roadmap.setCreatedAt(rs.getTimestamp("created_at"));

		return roadmap;
	}
}