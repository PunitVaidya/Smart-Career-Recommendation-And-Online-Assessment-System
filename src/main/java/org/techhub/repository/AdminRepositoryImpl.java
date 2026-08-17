package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.Admin;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.AdminRowMapper;

@Repository
public class AdminRepositoryImpl implements AdminRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(AdminRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final AdminRowMapper rowMapper =
			new AdminRowMapper();

	@Override
	public boolean save(Admin admin) {

		try {

			String sql = """
					INSERT INTO admin
					(
						username,
						password
					)
					VALUES
					(
						?,?
					)
					""";

			int count = jdbcTemplate.update(sql,

					admin.getUsername(),
					admin.getPassword());

			if (count > 0) {

				LOGGER.info(LogConstants.ADMIN_CREATED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public boolean update(Admin admin) {

		try {

			String sql = """
					UPDATE admin
					SET
						username=?,
						password=?
					WHERE admin_id=?
					""";

			int count = jdbcTemplate.update(sql,

					admin.getUsername(),
					admin.getPassword(),
					admin.getAdminId());

			if (count > 0) {

				LOGGER.info(LogConstants.ADMIN_UPDATED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public boolean delete(Integer adminId) {

		try {

			String sql =
					"DELETE FROM admin WHERE admin_id=?";

			int count =
					jdbcTemplate.update(sql, adminId);

			if (count > 0) {

				LOGGER.info(LogConstants.ADMIN_DELETED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public Admin findById(Integer adminId) {

		try {

			String sql =
					"SELECT * FROM admin WHERE admin_id=?";

			List<Admin> admins =
					jdbcTemplate.query(sql,
							rowMapper,
							adminId);

			return admins.isEmpty() ? null : admins.get(0);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return null;
	}

	@Override
	public Admin findByUsername(String username) {

		try {

			String sql =
					"SELECT * FROM admin WHERE username=?";

			List<Admin> admins =
					jdbcTemplate.query(sql,
							rowMapper,
							username);

			return admins.isEmpty() ? null : admins.get(0);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return null;
	}

	@Override
	public List<Admin> findAll() {

		try {

			String sql =
					"SELECT * FROM admin";

			return jdbcTemplate.query(sql, rowMapper);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return List.of();
	}

	@Override
	public boolean existsByUsername(String username) {

		try {

			String sql =
					"SELECT COUNT(*) FROM admin WHERE username=?";

			Integer count =
					jdbcTemplate.queryForObject(sql,
							Integer.class,
							username);

			return count != null && count > 0;

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}
}