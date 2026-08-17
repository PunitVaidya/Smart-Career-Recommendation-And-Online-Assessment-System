package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.StudentAssessmentRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.StudentAssessmentResponse;
import org.techhub.service.StudentAssessmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/student-assessment")
@Validated
public class StudentAssessmentController {

	@Autowired
	private StudentAssessmentService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<StudentAssessmentResponse>> save(
			@Valid @RequestBody StudentAssessmentRequest request) {

		return new ResponseEntity<>(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_STARTED,
						service.save(request)),
				HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<StudentAssessmentResponse>> update(
			@Valid @RequestBody StudentAssessmentRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_SUBMITTED,
						service.update(request)));
	}

	@GetMapping("/{attemptId}")
	public ResponseEntity<ApiResponse<StudentAssessmentResponse>> getById(
			@PathVariable Integer attemptId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.FETCH_SUCCESS,
						service.getById(attemptId)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<StudentAssessmentResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getAll()));
	}

	@GetMapping("/student/{studentId}")
	public ResponseEntity<ApiResponse<List<StudentAssessmentResponse>>> getByStudent(
			@PathVariable Integer studentId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getByStudent(studentId)));
	}

	@GetMapping("/assessment/{assessmentId}")
	public ResponseEntity<ApiResponse<List<StudentAssessmentResponse>>> getByAssessment(
			@PathVariable Integer assessmentId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getByAssessment(assessmentId)));
	}

	@GetMapping("/student/{studentId}/assessment/{assessmentId}")
	public ResponseEntity<ApiResponse<List<StudentAssessmentResponse>>> getByStudentAndAssessment(
			@PathVariable Integer studentId,
			@PathVariable Integer assessmentId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getByStudentAndAssessment(
								studentId,
								assessmentId)));
	}

	@DeleteMapping("/{attemptId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer attemptId) {

		service.delete(attemptId);

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.DELETE_SUCCESS,
						null));
	}
}