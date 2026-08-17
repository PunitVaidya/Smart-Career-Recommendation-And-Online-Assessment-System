package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.StudentAssessmentRequest;
import org.techhub.dto.response.StudentAssessmentResponse;

public interface StudentAssessmentService {

	StudentAssessmentResponse save(StudentAssessmentRequest request);

	StudentAssessmentResponse update(StudentAssessmentRequest request);

	boolean delete(Integer attemptId);

	StudentAssessmentResponse getById(Integer attemptId);

	List<StudentAssessmentResponse> getAll();

	List<StudentAssessmentResponse> getByStudent(Integer studentId);

	List<StudentAssessmentResponse> getByAssessment(Integer assessmentId);

	List<StudentAssessmentResponse> getByStudentAndAssessment(
			Integer studentId,
			Integer assessmentId);

}