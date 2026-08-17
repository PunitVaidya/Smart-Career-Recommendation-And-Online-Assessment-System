package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.CareerRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.CareerResponse;
import org.techhub.service.CareerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/career")
@Validated
public class CareerController {

	@Autowired
	private CareerService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<CareerResponse>> save(
			@Valid @RequestBody CareerRequest request) {

		return new ResponseEntity<>(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_ADDED,
						service.save(request)),
				HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<CareerResponse>> update(
			@Valid @RequestBody CareerRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_UPDATED,
						service.update(request)));
	}

	@DeleteMapping("/{careerId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer careerId) {

		service.delete(careerId);

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_DELETED,
						null));
	}

	@GetMapping("/{careerId}")
	public ResponseEntity<ApiResponse<CareerResponse>> getById(
			@PathVariable Integer careerId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_FETCH_SUCCESS,
						service.getById(careerId)));
	}

	@GetMapping("/name/{careerName}")
	public ResponseEntity<ApiResponse<CareerResponse>> getByName(
			@PathVariable String careerName) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_FETCH_SUCCESS,
						service.getByName(careerName)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<CareerResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_LIST_SUCCESS,
						service.getAll()));
	}

	@GetMapping("/active")
	public ResponseEntity<ApiResponse<List<CareerResponse>>> getActive() {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_LIST_SUCCESS,
						service.getActiveCareers()));
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<ApiResponse<List<CareerResponse>>> getByCategory(
			@PathVariable String category) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_LIST_SUCCESS,
						service.getByCategory(category)));
	}

	@GetMapping("/skill/{requiredSkillLevel}")
	public ResponseEntity<ApiResponse<List<CareerResponse>>> getBySkillLevel(
			@PathVariable String requiredSkillLevel) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.CAREER_LIST_SUCCESS,
						service.getBySkillLevel(requiredSkillLevel)));
	}

}