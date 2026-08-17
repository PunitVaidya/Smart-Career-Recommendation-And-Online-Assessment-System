package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.CareerSkillRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.CareerSkillResponse;
import org.techhub.service.CareerSkillService;

@RestController
@RequestMapping("/api/career-skill")
public class CareerSkillController {

	@Autowired
	private CareerSkillService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<CareerSkillResponse>> save(
			@RequestBody CareerSkillRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.CAREER_SKILL_ADDED,
						service.save(request)));
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<CareerSkillResponse>> update(
			@RequestBody CareerSkillRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.CAREER_SKILL_UPDATED,
						service.update(request)));
	}

	@GetMapping("/{careerSkillId}")
	public ResponseEntity<ApiResponse<CareerSkillResponse>> getById(
			@PathVariable Integer careerSkillId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.FETCH_SUCCESS,
						service.getById(careerSkillId)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<CareerSkillResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.LIST_SUCCESS,
						service.getAll()));
	}

	@GetMapping("/career/{careerId}")
	public ResponseEntity<ApiResponse<List<CareerSkillResponse>>> getByCareer(
			@PathVariable Integer careerId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.LIST_SUCCESS,
						service.getByCareer(careerId)));
	}

	@GetMapping("/category/{categoryId}")
	public ResponseEntity<ApiResponse<List<CareerSkillResponse>>> getByCategory(
			@PathVariable Integer categoryId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.LIST_SUCCESS,
						service.getByCategory(categoryId)));
	}

	@DeleteMapping("/{careerSkillId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer careerSkillId) {

		service.delete(careerSkillId);

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.DELETE_SUCCESS,
						null));
	}
}