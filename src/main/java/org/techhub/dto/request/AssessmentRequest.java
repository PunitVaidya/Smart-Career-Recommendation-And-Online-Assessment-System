package org.techhub.dto.request;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public class AssessmentRequest {


	private Integer assessmentId;


	@NotBlank(message = "Assessment name is required")
	private String assessmentName;


	private String description;


	@NotBlank(message = "Assessment type is required")
	private String assessmentType;


	@NotNull(message = "Duration is required")
	@Min(value = 1, message = "Duration must be greater than 0")
	private Integer duration;


	private Integer totalQuestions;


	private Integer totalMarks;


	@NotBlank(message = "Status is required")
	private String status;


	/*
	 * Selected questions for assessment
	 */
	private List<Integer> questionIds;



	public AssessmentRequest() {

	}



	public Integer getAssessmentId() {

		return assessmentId;

	}



	public void setAssessmentId(Integer assessmentId) {

		this.assessmentId = assessmentId;

	}



	public String getAssessmentName() {

		return assessmentName;

	}



	public void setAssessmentName(String assessmentName) {

		this.assessmentName = assessmentName;

	}



	public String getDescription() {

		return description;

	}



	public void setDescription(String description) {

		this.description = description;

	}



	public String getAssessmentType() {

		return assessmentType;

	}



	public void setAssessmentType(String assessmentType) {

		this.assessmentType = assessmentType;

	}



	public Integer getDuration() {

		return duration;

	}



	public void setDuration(Integer duration) {

		this.duration = duration;

	}



	public Integer getTotalQuestions() {

		return totalQuestions;

	}



	public void setTotalQuestions(Integer totalQuestions) {

		this.totalQuestions = totalQuestions;

	}



	public Integer getTotalMarks() {

		return totalMarks;

	}



	public void setTotalMarks(Integer totalMarks) {

		this.totalMarks = totalMarks;

	}



	public String getStatus() {

		return status;

	}



	public void setStatus(String status) {

		this.status = status;

	}



	public List<Integer> getQuestionIds() {

		return questionIds;

	}



	public void setQuestionIds(List<Integer> questionIds) {

		this.questionIds = questionIds;

	}


}