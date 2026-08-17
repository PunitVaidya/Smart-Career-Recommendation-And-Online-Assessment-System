package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.AssessmentQuestionRequest;
import org.techhub.dto.response.AssessmentQuestionResponse;
import org.techhub.entity.AssessmentQuestion;

@Component
public class AssessmentQuestionMapper {

	public AssessmentQuestion toEntity(AssessmentQuestionRequest request) {

		AssessmentQuestion assessmentQuestion = new AssessmentQuestion();

		assessmentQuestion.setId(request.getId());
		assessmentQuestion.setAssessmentId(request.getAssessmentId());
		assessmentQuestion.setQuestionId(request.getQuestionId());

		return assessmentQuestion;
	}

	public AssessmentQuestionResponse toResponse(AssessmentQuestion assessmentQuestion) {

		if (assessmentQuestion == null) {
			return null;
		}

		AssessmentQuestionResponse response = new AssessmentQuestionResponse();

		response.setId(assessmentQuestion.getId());
		response.setAssessmentId(assessmentQuestion.getAssessmentId());
		response.setQuestionId(assessmentQuestion.getQuestionId());

		return response;
	}

	public List<AssessmentQuestionResponse> toResponse(List<AssessmentQuestion> list) {

		List<AssessmentQuestionResponse> responses = new ArrayList<>();

		for (AssessmentQuestion aq : list) {
			responses.add(toResponse(aq));
		}

		return responses;
	}
}