package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.StudentAssessmentRequest;
import org.techhub.dto.response.StudentAssessmentResponse;
import org.techhub.entity.StudentAssessment;

@Component
public class StudentAssessmentMapper {

	public StudentAssessment toEntity(StudentAssessmentRequest request) {

		StudentAssessment assessment = new StudentAssessment();

		assessment.setAttemptId(request.getAttemptId());
		assessment.setStudentId(request.getStudentId());
		assessment.setAssessmentId(request.getAssessmentId());
		assessment.setAttemptNumber(request.getAttemptNumber());
		assessment.setStartTime(request.getStartTime());
		assessment.setEndTime(request.getEndTime());
		assessment.setScore(request.getScore());
		assessment.setTotalMarks(request.getTotalMarks());
		assessment.setPercentage(request.getPercentage());
		assessment.setStatus(request.getStatus());

		return assessment;
	}

	public StudentAssessmentResponse toResponse(StudentAssessment assessment) {

		if (assessment == null)
			return null;

		StudentAssessmentResponse response = new StudentAssessmentResponse();

		response.setAttemptId(assessment.getAttemptId());
		response.setStudentId(assessment.getStudentId());
		response.setAssessmentId(assessment.getAssessmentId());
		response.setAttemptNumber(assessment.getAttemptNumber());
		response.setStartTime(assessment.getStartTime());
		response.setEndTime(assessment.getEndTime());
		response.setScore(assessment.getScore());
		response.setTotalMarks(assessment.getTotalMarks());
		response.setPercentage(assessment.getPercentage());
		response.setStatus(assessment.getStatus());
		response.setCreatedAt(assessment.getCreatedAt());

		return response;
	}

	public List<StudentAssessmentResponse> toResponse(List<StudentAssessment> list) {

		List<StudentAssessmentResponse> responses = new ArrayList<>();

		for (StudentAssessment assessment : list) {
			responses.add(toResponse(assessment));
		}

		return responses;
	}
}