package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.AssessmentQuestionRequest;
import org.techhub.dto.response.AssessmentQuestionResponse;

public interface AssessmentQuestionService {

	AssessmentQuestionResponse save(AssessmentQuestionRequest request);

	boolean delete(Integer id);

	AssessmentQuestionResponse getById(Integer id);

	List<AssessmentQuestionResponse> getAll();

	List<AssessmentQuestionResponse> getByAssessment(Integer assessmentId);

	List<AssessmentQuestionResponse> getByQuestion(Integer questionId);

	// ADD THIS FOR EDIT ASSESSMENT
	List<Integer> getQuestionIds(Integer assessmentId);

}