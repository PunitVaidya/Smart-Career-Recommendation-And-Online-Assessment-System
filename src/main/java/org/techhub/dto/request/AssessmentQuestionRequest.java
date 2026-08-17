package org.techhub.dto.request;

import jakarta.validation.constraints.NotNull;

public class AssessmentQuestionRequest {

	private Integer id;

	@NotNull(message = "Assessment Id is required")
	private Integer assessmentId;

	@NotNull(message = "Question Id is required")
	private Integer questionId;

	public AssessmentQuestionRequest() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getAssessmentId() {
		return assessmentId;
	}

	public void setAssessmentId(Integer assessmentId) {
		this.assessmentId = assessmentId;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}
}