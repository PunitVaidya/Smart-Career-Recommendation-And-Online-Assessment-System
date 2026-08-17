package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.Roadmap;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.RoadmapRowMapper;

@Repository
public class RoadmapRepositoryImpl implements RoadmapRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(RoadmapRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final RoadmapRowMapper rowMapper = new RoadmapRowMapper();

	@Override
	public boolean save(Roadmap roadmap) {

		String sql = """
				INSERT INTO roadmap
				(
					career_id,
					step_no,
					title,
					description,
					estimated_duration,
					status
				)
				VALUES
				(
					?,?,?,?,?,?
				)
				""";

		int count = jdbcTemplate.update(sql,

				roadmap.getCareerId(),
				roadmap.getStepNo(),
				roadmap.getTitle(),
				roadmap.getDescription(),
				roadmap.getEstimatedDuration(),
				roadmap.getStatus());

		if (count > 0) {

			LOGGER.info(LogConstants.ROADMAP_ADDED);

			return true;
		}

		return false;
	}

	@Override
	public boolean update(Roadmap roadmap) {

		String sql = """
				UPDATE roadmap
				SET
					career_id=?,
					step_no=?,
					title=?,
					description=?,
					estimated_duration=?,
					status=?
				WHERE roadmap_id=?
				""";

		return jdbcTemplate.update(sql,

				roadmap.getCareerId(),
				roadmap.getStepNo(),
				roadmap.getTitle(),
				roadmap.getDescription(),
				roadmap.getEstimatedDuration(),
				roadmap.getStatus(),
				roadmap.getRoadmapId()) > 0;
	}

	@Override
	public boolean delete(Integer roadmapId) {

		return jdbcTemplate.update(
				"DELETE FROM roadmap WHERE roadmap_id=?",
				roadmapId) > 0;
	}

	@Override
	public Roadmap findById(Integer roadmapId) {

		List<Roadmap> list = jdbcTemplate.query(
				"SELECT * FROM roadmap WHERE roadmap_id=?",
				rowMapper,
				roadmapId);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public List<Roadmap> findAll() {

		return jdbcTemplate.query(
				"SELECT * FROM roadmap ORDER BY career_id, step_no",
				rowMapper);
	}

	@Override
	public List<Roadmap> findByCareer(Integer careerId) {

		return jdbcTemplate.query(
				"SELECT * FROM roadmap WHERE career_id=? ORDER BY step_no",
				rowMapper,
				careerId);
	}

	@Override
	public List<Roadmap> findActiveRoadmaps() {

		return jdbcTemplate.query(
				"SELECT * FROM roadmap WHERE status='ACTIVE' ORDER BY career_id, step_no",
				rowMapper);
	}

	@Override
	public boolean exists(Integer careerId, Integer stepNo) {

		Integer count = jdbcTemplate.queryForObject(
				"""
				SELECT COUNT(*)
				FROM roadmap
				WHERE career_id=?
				AND step_no=?
				""",
				Integer.class,
				careerId,
				stepNo);

		return count != null && count > 0;
	}
}