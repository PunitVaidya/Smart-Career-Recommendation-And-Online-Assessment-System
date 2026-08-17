package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.StudentResultRequest;
import org.techhub.dto.response.StudentResultResponse;

public interface StudentResultService {

	StudentResultResponse save(StudentResultRequest request);

	StudentResultResponse update(StudentResultRequest request);

	boolean delete(Integer resultId);

	StudentResultResponse getById(Integer resultId);

	StudentResultResponse getByAttempt(Integer attemptId);

	List<StudentResultResponse> getAll();

	List<StudentResultResponse> getByStudent(Integer studentId);

	List<StudentResultResponse> getByAssessment(Integer assessmentId);

	public StudentResultResponse getLatestResult(Integer studentId);
}