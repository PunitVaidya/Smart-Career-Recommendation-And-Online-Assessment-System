package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.AssessmentRequest;
import org.techhub.dto.response.AssessmentResponse;
import org.techhub.entity.Assessment;

@Component
public class AssessmentMapper {

	/**
	 * Request -> Entity
	 */
	public Assessment toEntity(AssessmentRequest request) {

		Assessment assessment = new Assessment();

		assessment.setAssessmentName(request.getAssessmentName());
		assessment.setDescription(request.getDescription());
		assessment.setAssessmentType(request.getAssessmentType());
		assessment.setDuration(request.getDuration());
		assessment.setTotalQuestions(request.getTotalQuestions());
		assessment.setTotalMarks(request.getTotalMarks());
		assessment.setStatus(request.getStatus());

		return assessment;
	}

	/**
	 * Entity -> Response
	 */
	public AssessmentResponse toResponse(Assessment assessment) {

		if (assessment == null) {
			return null;
		}

		AssessmentResponse response = new AssessmentResponse();

		response.setAssessmentId(assessment.getAssessmentId());
		response.setAssessmentName(assessment.getAssessmentName());
		response.setDescription(assessment.getDescription());
		response.setAssessmentType(assessment.getAssessmentType());
		response.setDuration(assessment.getDuration());
		response.setTotalQuestions(assessment.getTotalQuestions());
		response.setTotalMarks(assessment.getTotalMarks());
		response.setStatus(assessment.getStatus());
		response.setCreatedAt(assessment.getCreatedAt());
		response.setUpdatedAt(assessment.getUpdatedAt());

		return response;
	}

	/**
	 * List<Entity> -> List<Response>
	 */
	public List<AssessmentResponse> toResponse(List<Assessment> assessments) {

		List<AssessmentResponse> responses = new ArrayList<>();

		if (assessments == null || assessments.isEmpty()) {
			return responses;
		}

		for (Assessment assessment : assessments) {
			responses.add(toResponse(assessment));
		}

		return responses;
	}

}