package org.techhub.entity;

import java.sql.Timestamp;

public class CareerRecommendation {

	private Integer recommendationId;

	private Integer attemptId;

	private Integer careerId;

	private Double matchPercentage;

	private Integer rankNo;

	private String strengths;

	private String weaknesses;

	private Timestamp createdAt;
	
	private String careerName;

	public CareerRecommendation() {

	}

	public CareerRecommendation(Integer recommendationId, Integer attemptId,
			Integer careerId, Double matchPercentage, Integer rankNo,
			String strengths, String weaknesses, Timestamp createdAt,String careerName) {

		this.recommendationId = recommendationId;
		this.attemptId = attemptId;
		this.careerId = careerId;
		this.matchPercentage = matchPercentage;
		this.rankNo = rankNo;
		this.strengths = strengths;
		this.weaknesses = weaknesses;
		this.createdAt = createdAt;
		this.careerName = careerName;
	}
	
	public String getCareerName() {
	    return careerName;
	}

	public void setCareerName(String careerName) {
	    this.careerName = careerName;
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

	@Override
	public String toString() {
	    return "CareerRecommendation [recommendationId=" + recommendationId
	            + ", attemptId=" + attemptId
	            + ", careerId=" + careerId
	            + ", matchPercentage=" + matchPercentage
	            + ", rankNo=" + rankNo
	            + ", strengths=" + strengths
	            + ", weaknesses=" + weaknesses
	            + ", createdAt=" + createdAt
	            + ", careerName=" + careerName
	            + "]";
	}
}