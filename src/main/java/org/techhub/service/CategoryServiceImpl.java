package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.CategoryRequest;
import org.techhub.dto.response.CategoryResponse;
import org.techhub.entity.Category;
import org.techhub.exception.CategoryNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.mapper.CategoryMapper;
import org.techhub.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository repository;

	@Autowired
	private CategoryMapper mapper;

	@Override
	public CategoryResponse save(CategoryRequest request) {

		if (repository.existsByName(request.getCategoryName())) {
			throw new DuplicateRecordException("Category already exists.");
		}

		Category category = mapper.toEntity(request);

		repository.save(category);

		return mapper.toResponse(
				repository.findByName(request.getCategoryName()));
	}

	@Override
	public CategoryResponse update(CategoryRequest request) {

		Category dbCategory = repository.findById(request.getCategoryId());

		if (dbCategory == null) {
			throw new CategoryNotFoundException("Category not found.");
		}

		Category category = mapper.toEntity(request);

		repository.update(category);

		return mapper.toResponse(
				repository.findById(request.getCategoryId()));
	}

	@Override
	public boolean delete(Integer categoryId) {

		Category category = repository.findById(categoryId);

		if (category == null) {
			throw new CategoryNotFoundException("Category not found.");
		}

		return repository.delete(categoryId);
	}

	@Override
	public CategoryResponse getCategoryById(Integer categoryId) {

		Category category = repository.findById(categoryId);

		if (category == null) {
			throw new CategoryNotFoundException("Category not found.");
		}

		return mapper.toResponse(category);
	}

	@Override
	public CategoryResponse getCategoryByName(String categoryName) {

		Category category = repository.findByName(categoryName);

		if (category == null) {
			throw new CategoryNotFoundException("Category not found.");
		}

		return mapper.toResponse(category);
	}

	@Override
	public List<CategoryResponse> getCategoriesByType(String categoryType) {

		return mapper.toResponse(
				repository.findByType(categoryType));
	}

	@Override
	public List<CategoryResponse> getAllCategories() {

		return mapper.toResponse(
				repository.findAll());
	}

}