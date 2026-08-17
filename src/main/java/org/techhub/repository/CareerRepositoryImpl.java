package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.Career;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.CareerRowMapper;

@Repository
public class CareerRepositoryImpl implements CareerRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(CareerRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final CareerRowMapper rowMapper = new CareerRowMapper();

	@Override
	public boolean save(Career career) {

		String sql = """
				INSERT INTO career
				(
					career_name,
					description,
					category,
					required_skill_level,
					average_salary,
					demand_level,
					status
				)
				VALUES
				(
					?,?,?,?,?,?,?
				)
				""";

		int count = jdbcTemplate.update(sql,

				career.getCareerName(),
				career.getDescription(),
				career.getCategory(),
				career.getRequiredSkillLevel(),
				career.getAverageSalary(),
				career.getDemandLevel(),
				career.getStatus());

		if (count > 0) {

			LOGGER.info(LogConstants.CAREER_ADDED);

			return true;
		}

		return false;
	}

	@Override
	public boolean update(Career career) {

		String sql = """
				UPDATE career
				SET
					career_name=?,
					description=?,
					category=?,
					required_skill_level=?,
					average_salary=?,
					demand_level=?,
					status=?
				WHERE career_id=?
				""";

		return jdbcTemplate.update(sql,

				career.getCareerName(),
				career.getDescription(),
				career.getCategory(),
				career.getRequiredSkillLevel(),
				career.getAverageSalary(),
				career.getDemandLevel(),
				career.getStatus(),
				career.getCareerId()) > 0;
	}

	@Override
	public boolean delete(Integer careerId) {

		return jdbcTemplate.update(
				"DELETE FROM career WHERE career_id=?",
				careerId) > 0;
	}

	@Override
	public Career findById(Integer careerId) {

		List<Career> list = jdbcTemplate.query(
				"SELECT * FROM career WHERE career_id=?",
				rowMapper,
				careerId);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public Career findByName(String careerName) {

		List<Career> list = jdbcTemplate.query(
				"SELECT * FROM career WHERE career_name=?",
				rowMapper,
				careerName);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public List<Career> findAll() {

		return jdbcTemplate.query(
				"SELECT * FROM career ORDER BY career_name",
				rowMapper);
	}

	@Override
	public List<Career> findActiveCareers() {

		return jdbcTemplate.query(
				"SELECT * FROM career WHERE status='ACTIVE'",
				rowMapper);
	}

	@Override
	public List<Career> findByCategory(String category) {

		return jdbcTemplate.query(
				"SELECT * FROM career WHERE category=?",
				rowMapper,
				category);
	}

	@Override
	public List<Career> findBySkillLevel(String requiredSkillLevel) {

		return jdbcTemplate.query(
				"SELECT * FROM career WHERE required_skill_level=?",
				rowMapper,
				requiredSkillLevel);
	}

	@Override
	public boolean existsByName(String careerName) {

		Integer count = jdbcTemplate.queryForObject(
				"SELECT COUNT(*) FROM career WHERE career_name=?",
				Integer.class,
				careerName);

		return count != null && count > 0;
	}
}