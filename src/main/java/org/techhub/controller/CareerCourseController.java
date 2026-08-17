package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.CareerCourseRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.CareerCourseResponse;
import org.techhub.service.CareerCourseService;

@RestController
@RequestMapping("/api/career-course")
public class CareerCourseController {

	@Autowired
	private CareerCourseService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<CareerCourseResponse>> save(
			@Valid @RequestBody CareerCourseRequest request) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.CAREER_COURSE_ADDED,
				service.save(request)));
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<CareerCourseResponse>> update(
			@Valid @RequestBody CareerCourseRequest request) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.CAREER_COURSE_UPDATED,
				service.update(request)));
	}

	@GetMapping("/{careerCourseId}")
	public ResponseEntity<ApiResponse<CareerCourseResponse>> getById(
			@PathVariable Integer careerCourseId) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.FETCH_SUCCESS,
				service.getById(careerCourseId)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<CareerCourseResponse>>> getAll() {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.LIST_SUCCESS,
				service.getAll()));
	}

	@GetMapping("/career/{careerId}")
	public ResponseEntity<ApiResponse<List<CareerCourseResponse>>> getByCareer(
			@PathVariable Integer careerId) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.LIST_SUCCESS,
				service.getByCareer(careerId)));
	}

	@GetMapping("/course/{courseId}")
	public ResponseEntity<ApiResponse<List<CareerCourseResponse>>> getByCourse(
			@PathVariable Integer courseId) {

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.LIST_SUCCESS,
				service.getByCourse(courseId)));
	}

	@DeleteMapping("/{careerCourseId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer careerCourseId) {

		service.delete(careerCourseId);

		return ResponseEntity.ok(new ApiResponse<>(true,
				MessageConstants.CAREER_COURSE_DELETED,
				null));
	}
}