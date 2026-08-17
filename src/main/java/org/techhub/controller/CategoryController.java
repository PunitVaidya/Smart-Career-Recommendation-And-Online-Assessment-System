package org.techhub.controller;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.CategoryRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.CategoryResponse;
import org.techhub.logger.ApplicationLogger;
import org.techhub.service.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/category")
@Validated
public class CategoryController {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(CategoryController.class);

	@Autowired
	private CategoryService categoryService;

	// =====================================
	// SAVE CATEGORY
	// =====================================

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<CategoryResponse>> saveCategory(
			@Valid @RequestBody CategoryRequest request) {

		CategoryResponse category =
				categoryService.save(request);

		LOGGER.info(MessageConstants.CATEGORY_ADDED);

		ApiResponse<CategoryResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.CATEGORY_ADDED,
						category);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	// =====================================
	// UPDATE CATEGORY
	// =====================================

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
			@Valid @RequestBody CategoryRequest request) {

		CategoryResponse category =
				categoryService.update(request);

		LOGGER.info(MessageConstants.CATEGORY_UPDATED);

		ApiResponse<CategoryResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.CATEGORY_UPDATED,
						category);

		return ResponseEntity.ok(response);
	}

	// =====================================
	// DELETE CATEGORY
	// =====================================

	@DeleteMapping("/{categoryId}")
	public ResponseEntity<ApiResponse<String>> deleteCategory(
			@PathVariable Integer categoryId) {

		categoryService.delete(categoryId);

		LOGGER.info(MessageConstants.CATEGORY_DELETED);

		ApiResponse<String> response =
				new ApiResponse<>(
						true,
						MessageConstants.CATEGORY_DELETED,
						null);

		return ResponseEntity.ok(response);
	}

	// =====================================
	// GET CATEGORY BY ID
	// =====================================

	@GetMapping("/{categoryId}")
	public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(
			@PathVariable Integer categoryId) {

		CategoryResponse category =
				categoryService.getCategoryById(categoryId);

		ApiResponse<CategoryResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.CATEGORY_FETCH_SUCCESS,
						category);

		return ResponseEntity.ok(response);
	}

	// =====================================
	// GET CATEGORY BY NAME
	// =====================================

	@GetMapping("/name/{categoryName}")
	public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryByName(
			@PathVariable String categoryName) {

		CategoryResponse category =
				categoryService.getCategoryByName(categoryName);

		ApiResponse<CategoryResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.CATEGORY_FETCH_SUCCESS,
						category);

		return ResponseEntity.ok(response);
	}

	// =====================================
	// GET CATEGORY BY TYPE
	// =====================================

	@GetMapping("/type/{categoryType}")
	public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategoryByType(
			@PathVariable String categoryType) {

		List<CategoryResponse> categories =
				categoryService.getCategoriesByType(categoryType);

		ApiResponse<List<CategoryResponse>> response =
				new ApiResponse<>(
						true,
						MessageConstants.CATEGORY_LIST_SUCCESS,
						categories);

		return ResponseEntity.ok(response);
	}

	// =====================================
	// GET ALL CATEGORY
	// =====================================

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {

		List<CategoryResponse> categories =
				categoryService.getAllCategories();

		ApiResponse<List<CategoryResponse>> response =
				new ApiResponse<>(
						true,
						MessageConstants.CATEGORY_LIST_SUCCESS,
						categories);

		return ResponseEntity.ok(response);
	}

}