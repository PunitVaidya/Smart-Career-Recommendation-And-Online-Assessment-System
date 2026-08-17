package org.techhub.dto.response;

import java.sql.Timestamp;

public class CareerSkillResponse {

	private Integer careerSkillId;

	private Integer careerId;

	private Integer categoryId;

	private Integer minimumScore;

	private Integer weight;

	private Timestamp createdAt;

	public CareerSkillResponse() {

	}

	public Integer getCareerSkillId() {
		return careerSkillId;
	}

	public void setCareerSkillId(Integer careerSkillId) {
		this.careerSkillId = careerSkillId;
	}

	public Integer getCareerId() {
		return careerId;
	}

	public void setCareerId(Integer careerId) {
		this.careerId = careerId;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getMinimumScore() {
		return minimumScore;
	}

	public void setMinimumScore(Integer minimumScore) {
		this.minimumScore = minimumScore;
	}

	public Integer getWeight() {
		return weight;
	}

	public void setWeight(Integer weight) {
		this.weight = weight;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
}