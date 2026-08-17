package org.techhub.dto.request;

import jakarta.validation.constraints.NotNull;

public class StudentResultRequest {

	private Integer resultId;

	@NotNull(message = "Attempt Id is required")
	private Integer attemptId;

	@NotNull(message = "Student Id is required")
	private Integer studentId;

	@NotNull(message = "Assessment Id is required")
	private Integer assessmentId;

	@NotNull(message = "Score is required")
	private Integer score;

	@NotNull(message = "Total Marks is required")
	private Integer totalMarks;

	@NotNull(message = "Percentage is required")
	private Double percentage;

	private String resultStatus;

	private Double careerReadiness;

	public StudentResultRequest() {
	}

	public Integer getResultId() {
		return resultId;
	}

	public void setResultId(Integer resultId) {
		this.resultId = resultId;
	}

	public Integer getAttemptId() {
		return attemptId;
	}

	public void setAttemptId(Integer attemptId) {
		this.attemptId = attemptId;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public Integer getAssessmentId() {
		return assessmentId;
	}

	public void setAssessmentId(Integer assessmentId) {
		this.assessmentId = assessmentId;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public Integer getTotalMarks() {
		return totalMarks;
	}

	public void setTotalMarks(Integer totalMarks) {
		this.totalMarks = totalMarks;
	}

	public Double getPercentage() {
		return percentage;
	}

	public void setPercentage(Double percentage) {
		this.percentage = percentage;
	}

	public String getResultStatus() {
		return resultStatus;
	}

	public void setResultStatus(String resultStatus) {
		this.resultStatus = resultStatus;
	}

	public Double getCareerReadiness() {
		return careerReadiness;
	}

	public void setCareerReadiness(Double careerReadiness) {
		this.careerReadiness = careerReadiness;
	}
}