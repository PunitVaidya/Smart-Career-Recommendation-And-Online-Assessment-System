package org.techhub.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class StudentAnswerRequest {

	private Integer answerId;

	@NotNull(message = "Attempt Id is required")
	private Integer attemptId;

	@NotNull(message = "Question Id is required")
	private Integer questionId;

	@Pattern(regexp = "^[ABCD]$", message = "Selected answer must be A, B, C or D")
	private String selectedAnswer;

	private Boolean correct;

	private Integer marksObtained;

	public StudentAnswerRequest() {

	}

	public Integer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}

	public Integer getAttemptId() {
		return attemptId;
	}

	public void setAttemptId(Integer attemptId) {
		this.attemptId = attemptId;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public String getSelectedAnswer() {
		return selectedAnswer;
	}

	public void setSelectedAnswer(String selectedAnswer) {
		this.selectedAnswer = selectedAnswer;
	}

	public Boolean getCorrect() {
		return correct;
	}

	public void setCorrect(Boolean correct) {
		this.correct = correct;
	}

	public Integer getMarksObtained() {
		return marksObtained;
	}

	public void setMarksObtained(Integer marksObtained) {
		this.marksObtained = marksObtained;
	}

}