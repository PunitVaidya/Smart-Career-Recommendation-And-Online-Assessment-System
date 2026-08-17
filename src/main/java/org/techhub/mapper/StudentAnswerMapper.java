package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.StudentAnswerRequest;
import org.techhub.dto.response.StudentAnswerResponse;
import org.techhub.entity.StudentAnswer;

@Component
public class StudentAnswerMapper {

	public StudentAnswer toEntity(StudentAnswerRequest request) {

		StudentAnswer answer = new StudentAnswer();

		answer.setAnswerId(request.getAnswerId());
		answer.setAttemptId(request.getAttemptId());
		answer.setQuestionId(request.getQuestionId());
		answer.setSelectedAnswer(request.getSelectedAnswer());
		answer.setCorrect(request.getCorrect());
		answer.setMarksObtained(request.getMarksObtained());

		return answer;
	}

	public StudentAnswerResponse toResponse(StudentAnswer answer) {

		if (answer == null) {
			return null;
		}

		StudentAnswerResponse response = new StudentAnswerResponse();

		response.setAnswerId(answer.getAnswerId());
		response.setAttemptId(answer.getAttemptId());
		response.setQuestionId(answer.getQuestionId());
		response.setSelectedAnswer(answer.getSelectedAnswer());
		response.setCorrect(answer.getCorrect());
		response.setMarksObtained(answer.getMarksObtained());
		response.setAnsweredAt(answer.getAnsweredAt());

		return response;
	}

	public List<StudentAnswerResponse> toResponse(List<StudentAnswer> answers) {

		List<StudentAnswerResponse> responses = new ArrayList<>();

		if (answers == null || answers.isEmpty()) {
			return responses;
		}

		for (StudentAnswer answer : answers) {
			responses.add(toResponse(answer));
		}

		return responses;
	}
}