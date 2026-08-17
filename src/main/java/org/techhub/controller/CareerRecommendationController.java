package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.CareerRecommendationRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.CareerRecommendationResponse;
import org.techhub.service.CareerRecommendationService;

@RestController
@RequestMapping("/api/career-recommendation")
public class CareerRecommendationController {

	@Autowired
	private CareerRecommendationService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<CareerRecommendationResponse>> save(
			@Valid @RequestBody CareerRecommendationRequest request) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.RECOMMENDATION_GENERATED,
				service.save(request)));
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<CareerRecommendationResponse>> update(
			@Valid @RequestBody CareerRecommendationRequest request) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.UPDATE_SUCCESS,
				service.update(request)));
	}

	@GetMapping("/{recommendationId}")
	public ResponseEntity<ApiResponse<CareerRecommendationResponse>> getById(
			@PathVariable Integer recommendationId) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.FETCH_SUCCESS,
				service.getById(recommendationId)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<CareerRecommendationResponse>>> getAll() {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.LIST_SUCCESS,
				service.getAll()));
	}

	@GetMapping("/attempt/{attemptId}")
	public ResponseEntity<ApiResponse<List<CareerRecommendationResponse>>> getByAttempt(
			@PathVariable Integer attemptId) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.LIST_SUCCESS,
				service.getByAttempt(attemptId)));
	}
	
	// =========================================================
	// GENERATE CAREER RECOMMENDATIONS
	// =========================================================

	@PostMapping("/generate/{attemptId}")
	public ResponseEntity<ApiResponse<List<CareerRecommendationResponse>>> generate(
	        @PathVariable Integer attemptId) {

	    return ResponseEntity.ok(
	            new ApiResponse<>(
	                    true,
	                    "Career recommendations generated successfully.",
	                    service.generateForAttempt(attemptId)
	            )
	    );
	}
	

	@GetMapping("/career/{careerId}")
	public ResponseEntity<ApiResponse<List<CareerRecommendationResponse>>> getByCareer(
			@PathVariable Integer careerId) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.LIST_SUCCESS,
				service.getByCareer(careerId)));
	}

	@DeleteMapping("/{recommendationId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer recommendationId) {

		service.delete(recommendationId);

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.DELETE_SUCCESS,
				null));
	}
}