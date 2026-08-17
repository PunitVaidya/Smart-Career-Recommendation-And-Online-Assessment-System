package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.CareerRecommendationRequest;
import org.techhub.dto.response.CareerRecommendationResponse;
import org.techhub.entity.CareerRecommendation;

@Component
public class CareerRecommendationMapper {

    // =========================================================
    // REQUEST -> ENTITY
    // =========================================================

    public CareerRecommendation toEntity(
            CareerRecommendationRequest request) {

        CareerRecommendation recommendation =
                new CareerRecommendation();

        recommendation.setRecommendationId(
                request.getRecommendationId());

        recommendation.setAttemptId(
                request.getAttemptId());

        recommendation.setCareerId(
                request.getCareerId());

        recommendation.setMatchPercentage(
                request.getMatchPercentage());

        recommendation.setRankNo(
                request.getRankNo());

        recommendation.setStrengths(
                request.getStrengths());

        recommendation.setWeaknesses(
                request.getWeaknesses());

        return recommendation;
    }


    // =========================================================
    // ENTITY -> RESPONSE
    // =========================================================

    public CareerRecommendationResponse toResponse(
            CareerRecommendation recommendation) {

        if (recommendation == null) {
            return null;
        }

        CareerRecommendationResponse response =
                new CareerRecommendationResponse();

        response.setRecommendationId(
                recommendation.getRecommendationId());

        response.setAttemptId(
                recommendation.getAttemptId());

        response.setCareerId(
                recommendation.getCareerId());

        // =====================================================
        // IMPORTANT: CAREER NAME
        // =====================================================

        response.setCareerName(
                recommendation.getCareerName());

        response.setMatchPercentage(
                recommendation.getMatchPercentage());

        response.setRankNo(
                recommendation.getRankNo());

        response.setStrengths(
                recommendation.getStrengths());

        response.setWeaknesses(
                recommendation.getWeaknesses());

        response.setCreatedAt(
                recommendation.getCreatedAt());

        return response;
    }


    // =========================================================
    // LIST ENTITY -> LIST RESPONSE
    // =========================================================

    public List<CareerRecommendationResponse> toResponse(
            List<CareerRecommendation> recommendations) {

        List<CareerRecommendationResponse> responses =
                new ArrayList<>();

        if (recommendations == null) {
            return responses;
        }

        for (CareerRecommendation recommendation
                : recommendations) {

            responses.add(
                    toResponse(recommendation));
        }

        return responses;
    }
}