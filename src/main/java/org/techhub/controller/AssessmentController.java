package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.AssessmentRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.AssessmentResponse;
import org.techhub.service.AssessmentQuestionService;
import org.techhub.service.AssessmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/assessment")
@Validated
public class AssessmentController {

	@Autowired
	private AssessmentService assessmentService;
	
	@Autowired
	private AssessmentQuestionService assessmentQuestionService;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<AssessmentResponse>> save(
			@Valid @RequestBody AssessmentRequest request) {

		return new ResponseEntity<>(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_CREATED,
						assessmentService.save(request)),
				HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<AssessmentResponse>> update(
			@Valid @RequestBody AssessmentRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_UPDATED,
						assessmentService.update(request)));
	}

	@DeleteMapping("/{assessmentId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer assessmentId) {

		assessmentService.delete(assessmentId);

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_DELETED,
						null));
	}

	@GetMapping("/{assessmentId}")
	public ResponseEntity<ApiResponse<AssessmentResponse>> getById(
			@PathVariable Integer assessmentId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_FETCH_SUCCESS,
						assessmentService.getAssessmentById(assessmentId)));
	}

	@GetMapping("/name/{assessmentName}")
	public ResponseEntity<ApiResponse<AssessmentResponse>> getByName(
			@PathVariable String assessmentName) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_FETCH_SUCCESS,
						assessmentService.getAssessmentByName(assessmentName)));
	}

	@GetMapping("/type/{assessmentType}")
	public ResponseEntity<ApiResponse<List<AssessmentResponse>>> getByType(
			@PathVariable String assessmentType) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_LIST_SUCCESS,
						assessmentService.getAssessmentsByType(assessmentType)));
	}

	@GetMapping("/active")
	public ResponseEntity<ApiResponse<List<AssessmentResponse>>> getActive() {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_LIST_SUCCESS,
						assessmentService.getActiveAssessments()));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<AssessmentResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.ASSESSMENT_LIST_SUCCESS,
						assessmentService.getAllAssessments()));
	}
	
	@GetMapping("/question/{assessmentId}")
	public ResponseEntity<ApiResponse<List<Integer>>> 
	getAssessmentQuestions(
	@PathVariable Integer assessmentId){


	List<Integer> questions =
	assessmentQuestionService.getQuestionIds(assessmentId);



	ApiResponse<List<Integer>> response =
	new ApiResponse<>(
	true,
	"Questions fetched",
	questions
	);



	return ResponseEntity.ok(response);

	}
}