package org.techhub.entity;

import java.sql.Timestamp;

public class StudentResult {


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

	// NEW FIELDS FOR JOIN RESULT DISPLAY

	private String studentName;

	private String studentEmail;

	private String assessmentName;

	private String recommendedCareer;



	public StudentResult(Integer resultId, Integer attemptId, Integer studentId, Integer assessmentId, Integer score,
			Integer totalMarks, Double percentage, String resultStatus, Double careerReadiness, Timestamp submittedAt,
			String studentName, String studentEmail, String assessmentName, String recommendedCareer,
			Double matchPercentage) {
		super();
		this.resultId = resultId;
		this.attemptId = attemptId;
		this.studentId = studentId;
		this.assessmentId = assessmentId;
		this.score = score;
		this.totalMarks = totalMarks;
		this.percentage = percentage;
		this.resultStatus = resultStatus;
		this.careerReadiness = careerReadiness;
		this.submittedAt = submittedAt;
		this.studentName = studentName;
		this.studentEmail = studentEmail;
		this.assessmentName = assessmentName;
		this.recommendedCareer = recommendedCareer;
		this.matchPercentage = matchPercentage;
	}






	public Double getMatchPercentage() {
		return matchPercentage;
	}






	public void setMatchPercentage(Double matchPercentage) {
		this.matchPercentage = matchPercentage;
	}






	private Double matchPercentage;





	public StudentResult() {

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
	// NEW GETTERS SETTERS
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






	@Override
	public String toString() {


		return "StudentResult [resultId=" + resultId
				+ ", attemptId=" + attemptId
				+ ", studentId=" + studentId
				+ ", assessmentId=" + assessmentId
				+ ", score=" + score
				+ ", totalMarks=" + totalMarks
				+ ", percentage=" + percentage
				+ ", resultStatus=" + resultStatus
				+ ", careerReadiness=" + careerReadiness
				+ ", submittedAt=" + submittedAt
				+ ", studentName=" + studentName
				+ ", assessmentName=" + assessmentName
				+ ", recommendedCareer=" + recommendedCareer
				+ "]";

	}

}