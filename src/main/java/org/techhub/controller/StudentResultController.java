package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.StudentResultRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.StudentResultResponse;
import org.techhub.service.StudentResultService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/student-result")
public class StudentResultController {

	@Autowired
	private StudentResultService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<StudentResultResponse>> save(
			@Valid @RequestBody StudentResultRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.RESULT_GENERATED,
						service.save(request)));
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<StudentResultResponse>> update(
			@Valid @RequestBody StudentResultRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.UPDATE_SUCCESS,
						service.update(request)));
	}

	@GetMapping("/{resultId}")
	public ResponseEntity<ApiResponse<StudentResultResponse>> getById(
			@PathVariable Integer resultId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.FETCH_SUCCESS,
						service.getById(resultId)));
	}

	@GetMapping("/attempt/{attemptId}")
	public ResponseEntity<ApiResponse<StudentResultResponse>> getByAttempt(
			@PathVariable Integer attemptId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.FETCH_SUCCESS,
						service.getByAttempt(attemptId)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<StudentResultResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.LIST_SUCCESS,
						service.getAll()));
	}

	@GetMapping("/student/{studentId}")
	public ResponseEntity<ApiResponse<List<StudentResultResponse>>> getByStudent(
			@PathVariable Integer studentId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.LIST_SUCCESS,
						service.getByStudent(studentId)));
	}

	@GetMapping("/assessment/{assessmentId}")
	public ResponseEntity<ApiResponse<List<StudentResultResponse>>> getByAssessment(
			@PathVariable Integer assessmentId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.LIST_SUCCESS,
						service.getByAssessment(assessmentId)));
	}

	@DeleteMapping("/{resultId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer resultId) {

		service.delete(resultId);

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.DELETE_SUCCESS,
						null));
	}
	
	@GetMapping("/student/{studentId}/latest")
	public ResponseEntity<ApiResponse<StudentResultResponse>> getLatestResult(
	        @PathVariable Integer studentId) {


	    return ResponseEntity.ok(
	            new ApiResponse<>(
	                    true,
	                    MessageConstants.FETCH_SUCCESS,
	                    service.getLatestResult(studentId)
	            )
	    );

	}
}