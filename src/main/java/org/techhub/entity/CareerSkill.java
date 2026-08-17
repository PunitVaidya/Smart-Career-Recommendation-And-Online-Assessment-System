package org.techhub.entity;

import java.sql.Timestamp;

public class CareerSkill {

	private Integer careerSkillId;

	private Integer careerId;

	private Integer categoryId;

	private Integer minimumScore;

	private Integer weight;

	private Timestamp createdAt;

	// =========================================================
	// CONSTRUCTOR
	// =========================================================

	public CareerSkill() {
	}

	public CareerSkill(
			Integer careerSkillId,
			Integer careerId,
			Integer categoryId,
			Integer minimumScore,
			Integer weight,
			Timestamp createdAt) {

		this.careerSkillId = careerSkillId;
		this.careerId = careerId;
		this.categoryId = categoryId;
		this.minimumScore = minimumScore;
		this.weight = weight;
		this.createdAt = createdAt;
	}

	// =========================================================
	// GETTERS AND SETTERS
	// =========================================================

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

	// =========================================================
	// TO STRING
	// =========================================================

	@Override
	public String toString() {

		return "CareerSkill ["
				+ "careerSkillId=" + careerSkillId
				+ ", careerId=" + careerId
				+ ", categoryId=" + categoryId
				+ ", minimumScore=" + minimumScore
				+ ", weight=" + weight
				+ ", createdAt=" + createdAt
				+ "]";
	}
}