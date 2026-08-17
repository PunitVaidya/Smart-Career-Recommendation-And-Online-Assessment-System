package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.CareerRecommendationRequest;
import org.techhub.dto.response.CareerRecommendationResponse;

public interface CareerRecommendationService {

	// =========================================================
	// SAVE
	// =========================================================

	CareerRecommendationResponse save(
			CareerRecommendationRequest request);

	// =========================================================
	// UPDATE
	// =========================================================

	CareerRecommendationResponse update(
			CareerRecommendationRequest request);

	// =========================================================
	// DELETE
	// =========================================================

	boolean delete(
			Integer recommendationId);

	// =========================================================
	// FIND BY ID
	// =========================================================

	CareerRecommendationResponse getById(
			Integer recommendationId);

	// =========================================================
	// FIND ALL
	// =========================================================

	List<CareerRecommendationResponse> getAll();

	// =========================================================
	// FIND BY ATTEMPT
	// =========================================================

	List<CareerRecommendationResponse> getByAttempt(
			Integer attemptId);

	// =========================================================
	// FIND BY CAREER
	// =========================================================

	List<CareerRecommendationResponse> getByCareer(
			Integer careerId);

	// =========================================================
	// GENERATE RECOMMENDATIONS FOR SUBMITTED ATTEMPT
	// =========================================================

	List<CareerRecommendationResponse> generateForAttempt(
			Integer attemptId);
}