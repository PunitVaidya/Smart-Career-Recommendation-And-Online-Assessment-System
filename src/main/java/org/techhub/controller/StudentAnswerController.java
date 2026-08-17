package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.StudentAnswerRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.StudentAnswerResponse;
import org.techhub.service.StudentAnswerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/student-answer")
@Validated
public class StudentAnswerController {

	@Autowired
	private StudentAnswerService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<StudentAnswerResponse>> save(
			@Valid @RequestBody StudentAnswerRequest request) {

		return new ResponseEntity<>(
				new ApiResponse<>(
						true,
						MessageConstants.ANSWER_SAVED,
						service.save(request)),
				HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<StudentAnswerResponse>> update(
			@Valid @RequestBody StudentAnswerRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ANSWER_UPDATED,
						service.update(request)));
	}

	@GetMapping("/{answerId}")
	public ResponseEntity<ApiResponse<StudentAnswerResponse>> getById(
			@PathVariable Integer answerId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.FETCH_SUCCESS,
						service.getById(answerId)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<StudentAnswerResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getAll()));
	}

	@GetMapping("/attempt/{attemptId}")
	public ResponseEntity<ApiResponse<List<StudentAnswerResponse>>> getByAttempt(
			@PathVariable Integer attemptId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getByAttempt(attemptId)));
	}

	@GetMapping("/question/{questionId}")
	public ResponseEntity<ApiResponse<List<StudentAnswerResponse>>> getByQuestion(
			@PathVariable Integer questionId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getByQuestion(questionId)));
	}

	@GetMapping("/attempt/{attemptId}/question/{questionId}")
	public ResponseEntity<ApiResponse<List<StudentAnswerResponse>>> getByAttemptAndQuestion(
			@PathVariable Integer attemptId,
			@PathVariable Integer questionId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getByAttemptAndQuestion(
								attemptId,
								questionId)));
	}

	@DeleteMapping("/{answerId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer answerId) {

		service.delete(answerId);

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.DELETE_SUCCESS,
						null));
	}

}