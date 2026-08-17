package org.techhub.repository;

import java.util.List;

import org.techhub.entity.Category;

public interface CategoryRepository {

	boolean save(Category category);

	boolean update(Category category);

	boolean delete(Integer categoryId);

	Category findById(Integer categoryId);

	Category findByName(String categoryName);

	List<Category> findAll();

	List<Category> findByType(String categoryType);

	boolean existsByName(String categoryName);

}