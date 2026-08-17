package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.AssessmentRequest;
import org.techhub.dto.response.AssessmentResponse;

public interface AssessmentService {

	AssessmentResponse save(AssessmentRequest request);

	AssessmentResponse update(AssessmentRequest request);

	boolean delete(Integer assessmentId);

	AssessmentResponse getAssessmentById(Integer assessmentId);

	AssessmentResponse getAssessmentByName(String assessmentName);

	List<AssessmentResponse> getAssessmentsByType(String assessmentType);

	List<AssessmentResponse> getActiveAssessments();

	List<AssessmentResponse> getAllAssessments();

}