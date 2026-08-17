package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.QuestionRequest;
import org.techhub.dto.response.QuestionResponse;

public interface QuestionService {

	QuestionResponse save(QuestionRequest request);

	QuestionResponse update(QuestionRequest request);

	boolean delete(Integer questionId);

	QuestionResponse getQuestionById(Integer questionId);

	List<QuestionResponse> getAllQuestions();

	List<QuestionResponse> getQuestionsByCategory(Integer categoryId);

	List<QuestionResponse> getQuestionsByDifficulty(String difficulty);

	List<QuestionResponse> getActiveQuestions();

	List<QuestionResponse> getQuestionsByAssessment(
            Integer assessmentId
    );

}