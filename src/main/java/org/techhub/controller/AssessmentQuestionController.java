package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.AssessmentQuestionRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.AssessmentQuestionResponse;
import org.techhub.service.AssessmentQuestionService;

@RestController
@RequestMapping("/api/assessment-question")
public class AssessmentQuestionController {

	@Autowired
	private AssessmentQuestionService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<AssessmentQuestionResponse>> save(
			@RequestBody AssessmentQuestionRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.DATA_SAVED,
						service.save(request)));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<AssessmentQuestionResponse>> getById(
			@PathVariable Integer id) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.FETCH_SUCCESS,
						service.getById(id)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<AssessmentQuestionResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getAll()));
	}

	@GetMapping("/assessment/{assessmentId}")
	public ResponseEntity<ApiResponse<List<AssessmentQuestionResponse>>> getByAssessment(
	        @PathVariable Integer assessmentId)
	{


	    List<AssessmentQuestionResponse> list =
	            service
	            .getByAssessment(assessmentId);



	    return ResponseEntity.ok(

	        new ApiResponse<>(

	            true,

	            "Assessment questions fetched successfully",

	            list

	        )

	    );


	}

	@GetMapping("/question/{questionId}")
	public ResponseEntity<ApiResponse<List<AssessmentQuestionResponse>>> getByQuestion(
			@PathVariable Integer questionId) {

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.LIST_SUCCESS,
						service.getByQuestion(questionId)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer id) {

		service.delete(id);

		return ResponseEntity.ok(
				new ApiResponse<>(
						true,
						MessageConstants.DELETE_SUCCESS,
						null));
	}
}