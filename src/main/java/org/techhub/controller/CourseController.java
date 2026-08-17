package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.CourseRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.CourseResponse;
import org.techhub.service.CourseService;

@RestController
@RequestMapping("/api/course")
public class CourseController {

	@Autowired
	private CourseService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<CourseResponse>> save(
			@Valid @RequestBody CourseRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.COURSE_ADDED,
						service.save(request)));
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<CourseResponse>> update(
			@Valid @RequestBody CourseRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.COURSE_UPDATED,
						service.update(request)));
	}

	@GetMapping("/{courseId}")
	public ResponseEntity<ApiResponse<CourseResponse>> getById(
			@PathVariable Integer courseId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.COURSE_FETCH_SUCCESS,
						service.getById(courseId)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<CourseResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.COURSE_LIST_SUCCESS,
						service.getAll()));
	}

	@GetMapping("/active")
	public ResponseEntity<ApiResponse<List<CourseResponse>>> getActive() {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.COURSE_LIST_SUCCESS,
						service.getActiveCourses()));
	}

	@GetMapping("/level/{level}")
	public ResponseEntity<ApiResponse<List<CourseResponse>>> getByLevel(
			@PathVariable String level) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.COURSE_LIST_SUCCESS,
						service.getByLevel(level)));
	}

	@DeleteMapping("/{courseId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer courseId) {

		service.delete(courseId);

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.COURSE_DELETED,
						null));
	}
}