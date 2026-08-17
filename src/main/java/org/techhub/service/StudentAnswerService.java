package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.StudentAnswerRequest;
import org.techhub.dto.response.StudentAnswerResponse;

public interface StudentAnswerService {

	StudentAnswerResponse save(StudentAnswerRequest request);

	StudentAnswerResponse update(StudentAnswerRequest request);

	boolean delete(Integer answerId);

	StudentAnswerResponse getById(Integer answerId);

	List<StudentAnswerResponse> getAll();

	List<StudentAnswerResponse> getByAttempt(Integer attemptId);

	List<StudentAnswerResponse> getByQuestion(Integer questionId);

	List<StudentAnswerResponse> getByAttemptAndQuestion(
			Integer attemptId,
			Integer questionId);

}