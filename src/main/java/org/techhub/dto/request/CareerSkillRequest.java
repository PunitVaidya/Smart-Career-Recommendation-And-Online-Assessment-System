package org.techhub.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CareerSkillRequest {

	private Integer careerSkillId;

	@NotNull(message = "Career Id is required")
	private Integer careerId;

	@NotNull(message = "Category Id is required")
	private Integer categoryId;

	@NotNull(message = "Minimum score is required")
	@Min(value = 0)
	private Integer minimumScore;

	@NotNull(message = "Weight is required")
	@Min(value = 1)
	private Integer weight;

	public CareerSkillRequest() {

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
}