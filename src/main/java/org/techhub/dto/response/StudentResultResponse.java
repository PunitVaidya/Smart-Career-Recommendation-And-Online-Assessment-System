package org.techhub.dto.response;

import java.sql.Timestamp;

public class StudentResultResponse {


	private Integer resultId;

	private Integer attemptId;

	private Integer studentId;

	private Integer assessmentId;

	private Integer score;

	private Integer totalMarks;

	private Double percentage;

	private String resultStatus;

	private Double careerReadiness;

	private Timestamp submittedAt;

	private Double matchPercentage;


	// NEW FIELDS FOR RESULT DISPLAY

	private String studentName;

	private String studentEmail;

	private String assessmentName;

	private String recommendedCareer;



	public Double getMatchPercentage() {
	    return matchPercentage;
	}
	
	public void setMatchPercentage(Double matchPercentage) {
	    this.matchPercentage = matchPercentage;
	}
	
	public StudentResultResponse() {

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



	public Timestamp getSubmittedAt() {
		return submittedAt;
	}



	public void setSubmittedAt(Timestamp submittedAt) {
		this.submittedAt = submittedAt;
	}






	// =========================
	// NEW GETTERS AND SETTERS
	// =========================



	public String getStudentName() {
		return studentName;
	}



	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}



	public String getStudentEmail() {
		return studentEmail;
	}



	public void setStudentEmail(String studentEmail) {
		this.studentEmail = studentEmail;
	}



	public String getAssessmentName() {
		return assessmentName;
	}



	public void setAssessmentName(String assessmentName) {
		this.assessmentName = assessmentName;
	}



	public String getRecommendedCareer() {
		return recommendedCareer;
	}



	public void setRecommendedCareer(String recommendedCareer) {
		this.recommendedCareer = recommendedCareer;
	}



}