package org.techhub.repository;

import java.util.List;

import org.techhub.entity.CareerRecommendation;

public interface CareerRecommendationRepository {

	boolean save(CareerRecommendation recommendation);

	boolean update(CareerRecommendation recommendation);

	boolean delete(Integer recommendationId);

	CareerRecommendation findById(Integer recommendationId);

	List<CareerRecommendation> findAll();

	List<CareerRecommendation> findByAttempt(Integer attemptId);

	List<CareerRecommendation> findByCareer(Integer careerId);

	boolean exists(Integer attemptId, Integer careerId);

}