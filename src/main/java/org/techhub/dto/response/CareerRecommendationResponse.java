package org.techhub.dto.response;

import java.sql.Timestamp;

public class CareerRecommendationResponse {

    private Integer recommendationId;

    private Integer attemptId;

    private Integer careerId;

    private Double matchPercentage;

    private Integer rankNo;

    private String strengths;

    private String weaknesses;

    private Timestamp createdAt;

    // Career information
    private String careerName;

    public CareerRecommendationResponse() {
    }

    public Integer getRecommendationId() {
        return recommendationId;
    }

    public void setRecommendationId(Integer recommendationId) {
        this.recommendationId = recommendationId;
    }

    public Integer getAttemptId() {
        return attemptId;
    }

    public void setAttemptId(Integer attemptId) {
        this.attemptId = attemptId;
    }

    public Integer getCareerId() {
        return careerId;
    }

    public void setCareerId(Integer careerId) {
        this.careerId = careerId;
    }

    public Double getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(Double matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public Integer getRankNo() {
        return rankNo;
    }

    public void setRankNo(Integer rankNo) {
        this.rankNo = rankNo;
    }

    public String getStrengths() {
        return strengths;
    }

    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }

    public String getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(String weaknesses) {
        this.weaknesses = weaknesses;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getCareerName() {
        return careerName;
    }

    public void setCareerName(String careerName) {
        this.careerName = careerName;
    }
}