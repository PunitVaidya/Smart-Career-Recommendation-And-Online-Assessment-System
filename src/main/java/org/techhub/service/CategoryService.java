package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.CategoryRequest;
import org.techhub.dto.response.CategoryResponse;

public interface CategoryService {

	CategoryResponse save(CategoryRequest request);

	CategoryResponse update(CategoryRequest request);

	boolean delete(Integer categoryId);

	CategoryResponse getCategoryById(Integer categoryId);

	CategoryResponse getCategoryByName(String categoryName);

	List<CategoryResponse> getCategoriesByType(String categoryType);

	List<CategoryResponse> getAllCategories();

}