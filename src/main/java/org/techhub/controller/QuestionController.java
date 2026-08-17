package org.techhub.controller;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.QuestionRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.QuestionResponse;
import org.techhub.logger.ApplicationLogger;
import org.techhub.service.QuestionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/question")
@Validated
public class QuestionController {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(QuestionController.class);

	@Autowired
	private QuestionService questionService;

	
	// ==========================================
	// GET QUESTIONS BY ASSESSMENT
	// ==========================================

	@GetMapping("/assessment/{assessmentId}")
	public ResponseEntity<ApiResponse<List<QuestionResponse>>> 
	getQuestionsByAssessment(
	        @PathVariable Integer assessmentId) {


	    List<QuestionResponse> questions =
	            questionService.getQuestionsByAssessment(
	                    assessmentId
	            );


	    ApiResponse<List<QuestionResponse>> response =
	            new ApiResponse<>(
	                    true,
	                    MessageConstants.QUESTION_LIST_SUCCESS,
	                    questions
	            );


	    return ResponseEntity.ok(response);

	}
	// ==========================================
	// SAVE QUESTION
	// ==========================================

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<QuestionResponse>> saveQuestion(
			@Valid @RequestBody QuestionRequest request) {

		QuestionResponse question = questionService.save(request);

		LOGGER.info(MessageConstants.QUESTION_ADDED);

		ApiResponse<QuestionResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.QUESTION_ADDED,
						question);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	// ==========================================
	// UPDATE QUESTION
	// ==========================================

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<QuestionResponse>> updateQuestion(
			@Valid @RequestBody QuestionRequest request) {

		QuestionResponse question =
				questionService.update(request);

		LOGGER.info(MessageConstants.QUESTION_UPDATED);

		ApiResponse<QuestionResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.QUESTION_UPDATED,
						question);

		return ResponseEntity.ok(response);
	}

	// ==========================================
	// DELETE QUESTION
	// ==========================================

	@DeleteMapping("/{questionId}")
	public ResponseEntity<ApiResponse<String>> deleteQuestion(
			@PathVariable Integer questionId) {

		questionService.delete(questionId);

		LOGGER.info(MessageConstants.QUESTION_DELETED);

		ApiResponse<String> response =
				new ApiResponse<>(
						true,
						MessageConstants.QUESTION_DELETED,
						null);

		return ResponseEntity.ok(response);
	}

	// ==========================================
	// GET QUESTION BY ID
	// ==========================================

	@GetMapping("/{questionId}")
	public ResponseEntity<ApiResponse<QuestionResponse>> getQuestionById(
			@PathVariable Integer questionId) {

		QuestionResponse question =
				questionService.getQuestionById(questionId);

		ApiResponse<QuestionResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.QUESTION_FETCH_SUCCESS,
						question);

		return ResponseEntity.ok(response);
	}

	// ==========================================
	// GET ALL QUESTIONS
	// ==========================================

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<QuestionResponse>>> getAllQuestions() {

		List<QuestionResponse> questions =
				questionService.getAllQuestions();

		ApiResponse<List<QuestionResponse>> response =
				new ApiResponse<>(
						true,
						MessageConstants.QUESTION_LIST_SUCCESS,
						questions);

		return ResponseEntity.ok(response);
	}

	// ==========================================
	// GET QUESTIONS BY CATEGORY
	// ==========================================

	@GetMapping("/category/{categoryId}")
	public ResponseEntity<ApiResponse<List<QuestionResponse>>> getQuestionsByCategory(
			@PathVariable Integer categoryId) {

		List<QuestionResponse> questions =
				questionService.getQuestionsByCategory(categoryId);

		ApiResponse<List<QuestionResponse>> response =
				new ApiResponse<>(
						true,
						MessageConstants.QUESTION_LIST_SUCCESS,
						questions);

		return ResponseEntity.ok(response);
	}

	// ==========================================
	// GET QUESTIONS BY DIFFICULTY
	// ==========================================

	@GetMapping("/difficulty/{difficulty}")
	public ResponseEntity<ApiResponse<List<QuestionResponse>>> getQuestionsByDifficulty(
			@PathVariable String difficulty) {

		List<QuestionResponse> questions =
				questionService.getQuestionsByDifficulty(difficulty);

		ApiResponse<List<QuestionResponse>> response =
				new ApiResponse<>(
						true,
						MessageConstants.QUESTION_LIST_SUCCESS,
						questions);

		return ResponseEntity.ok(response);
	}

	// ==========================================
	// GET ACTIVE QUESTIONS
	// ==========================================

	@GetMapping("/active")
	public ResponseEntity<ApiResponse<List<QuestionResponse>>> getActiveQuestions() {

		List<QuestionResponse> questions =
				questionService.getActiveQuestions();

		ApiResponse<List<QuestionResponse>> response =
				new ApiResponse<>(
						true,
						MessageConstants.QUESTION_LIST_SUCCESS,
						questions);

		return ResponseEntity.ok(response);
	}

}