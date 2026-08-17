package org.techhub.dto.response;

import java.sql.Timestamp;

public class CareerResponse {

	private Integer careerId;

	private String careerName;

	private String description;

	private String category;

	private String requiredSkillLevel;

	private String averageSalary;

	private String demandLevel;

	private String status;

	private Timestamp createdAt;

	public CareerResponse() {

	}

	public Integer getCareerId() {
		return careerId;
	}

	public void setCareerId(Integer careerId) {
		this.careerId = careerId;
	}

	public String getCareerName() {
		return careerName;
	}

	public void setCareerName(String careerName) {
		this.careerName = careerName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getRequiredSkillLevel() {
		return requiredSkillLevel;
	}

	public void setRequiredSkillLevel(String requiredSkillLevel) {
		this.requiredSkillLevel = requiredSkillLevel;
	}

	public String getAverageSalary() {
		return averageSalary;
	}

	public void setAverageSalary(String averageSalary) {
		this.averageSalary = averageSalary;
	}

	public String getDemandLevel() {
		return demandLevel;
	}

	public void setDemandLevel(String demandLevel) {
		this.demandLevel = demandLevel;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
}