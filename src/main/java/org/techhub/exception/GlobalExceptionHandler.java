package org.techhub.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.techhub.dto.response.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleStudentNotFound(StudentNotFoundException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AssessmentNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleAssessmentNotFound(AssessmentNotFoundException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CareerNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleCareerNotFound(CareerNotFoundException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateRecordException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicateRecord(DuplicateRecordException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidCredentials(InvalidCredentialsException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFound(ResourceNotFoundException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationException(MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                           .getFieldError()
                           .getDefaultMessage();

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                message,
                null);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleCategoryNotFound(CategoryNotFoundException ex) {

    	ApiResponse<Object> response = new ApiResponse<>(
    			false,
    			ex.getMessage(),
    			null);

    	return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(QuestionNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleQuestionNotFound(
            QuestionNotFoundException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(AssessmentQuestionNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleAssessmentQuestionNotFound(
            AssessmentQuestionNotFoundException ex) {

        ApiResponse<Object> response =
                new ApiResponse<>(false, ex.getMessage(), null);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(StudentAssessmentNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleStudentAssessmentNotFound(
    		StudentAssessmentNotFoundException ex) {

    	ApiResponse<Object> response =
    			new ApiResponse<>(false, ex.getMessage(), null);

    	return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(StudentAnswerNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleStudentAnswerNotFound(
    		StudentAnswerNotFoundException ex) {

    	ApiResponse<Object> response =
    			new ApiResponse<>(false, ex.getMessage(), null);

    	return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(StudentResultNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleStudentResultNotFound(
            StudentResultNotFoundException ex) {

        ApiResponse<Object> response =
                new ApiResponse<>(false, ex.getMessage(), null);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(CareerSkillNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleCareerSkillNotFound(
    		CareerSkillNotFoundException ex) {

    	ApiResponse<Object> response =
    			new ApiResponse<>(false, ex.getMessage(), null);

    	return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(CareerCourseNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleCareerCourseNotFound(
    		CareerCourseNotFoundException ex) {

    	ApiResponse<Object> response =
    			new ApiResponse<>(false, ex.getMessage(), null);

    	return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(CareerRecommendationNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleCareerRecommendationNotFound(
    		CareerRecommendationNotFoundException ex) {

    	ApiResponse<Object> response =
    			new ApiResponse<>(false, ex.getMessage(), null);

    	return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(RoadmapNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleRoadmapNotFound(
    		RoadmapNotFoundException ex) {

    	ApiResponse<Object> response =
    			new ApiResponse<>(false, ex.getMessage(), null);

    	return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(CourseNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleCourseNotFound(
    		CourseNotFoundException ex) {

    	ApiResponse<Object> response =
    			new ApiResponse<>(false, ex.getMessage(), null);

    	return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}