package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.Category;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.CategoryRowMapper;

@Repository
public class CategoryRepositoryImpl implements CategoryRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(CategoryRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final CategoryRowMapper rowMapper = new CategoryRowMapper();

	@Override
	public boolean save(Category category) {

		String sql = """
				INSERT INTO category
				(
					category_name,
					category_type,
					description,
					status
				)
				VALUES
				(
					?,?,?,?
				)
				""";

		int count = jdbcTemplate.update(sql,

				category.getCategoryName(),
				category.getCategoryType(),
				category.getDescription(),
				category.getStatus());

		if (count > 0) {

			LOGGER.info(LogConstants.CATEGORY_ADDED);

			return true;
		}

		return false;
	}

	@Override
	public boolean update(Category category) {

		String sql = """
				UPDATE category
				SET
					category_name=?,
					category_type=?,
					description=?,
					status=?
				WHERE category_id=?
				""";

		return jdbcTemplate.update(sql,

				category.getCategoryName(),
				category.getCategoryType(),
				category.getDescription(),
				category.getStatus(),
				category.getCategoryId()) > 0;
	}

	@Override
	public boolean delete(Integer categoryId) {

		return jdbcTemplate.update(
				"DELETE FROM category WHERE category_id=?",
				categoryId) > 0;
	}

	@Override
	public Category findById(Integer categoryId) {

		List<Category> list = jdbcTemplate.query(
				"SELECT * FROM category WHERE category_id=?",
				rowMapper,
				categoryId);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public Category findByName(String categoryName) {

		List<Category> list = jdbcTemplate.query(
				"SELECT * FROM category WHERE category_name=?",
				rowMapper,
				categoryName);

		return list.isEmpty() ? null : list.get(0);
	}

	@Override
	public List<Category> findAll() {

		return jdbcTemplate.query(
				"SELECT * FROM category ORDER BY category_name",
				rowMapper);
	}

	@Override
	public List<Category> findByType(String categoryType) {

		return jdbcTemplate.query(
				"SELECT * FROM category WHERE category_type=? ORDER BY category_name",
				rowMapper,
				categoryType);
	}

	

	@Override
	public boolean existsByName(String categoryName) {

		Integer count = jdbcTemplate.queryForObject(
				"SELECT COUNT(*) FROM category WHERE category_name=?",
				Integer.class,
				categoryName);

		return count != null && count > 0;
	}
}