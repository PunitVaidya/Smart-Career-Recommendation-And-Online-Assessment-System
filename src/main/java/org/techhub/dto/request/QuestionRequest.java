package org.techhub.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class QuestionRequest {

	private Integer questionId;
	private Integer assessmentId;

	@NotBlank(message = "Question title is required")
	private String questionTitle;

	@NotBlank(message = "Option A is required")
	private String optionA;

	@NotBlank(message = "Option B is required")
	private String optionB;

	@NotBlank(message = "Option C is required")
	private String optionC;

	@NotBlank(message = "Option D is required")
	private String optionD;

	@NotBlank(message = "Correct answer is required")
	private String correctAnswer;

	@NotNull(message = "Category Id is required")
	private Integer categoryId;

	@NotBlank(message = "Difficulty is required")
	private String difficulty;

	@NotNull(message = "Marks are required")
	@Min(value = 1, message = "Marks should be at least 1")
	private Integer marks;

	@NotBlank(message = "Question status is required")
	private String questionStatus;

	public QuestionRequest() {

	}

	public QuestionRequest(Integer questionId,
			String questionTitle,
			String optionA,
			String optionB,
			String optionC,
			String optionD,
			String correctAnswer,
			Integer categoryId,
			String difficulty,
			Integer marks,
			String questionStatus,
			Integer assessmentId) {

		this.questionId = questionId;
		this.questionTitle = questionTitle;
		this.optionA = optionA;
		this.optionB = optionB;
		this.optionC = optionC;
		this.optionD = optionD;
		this.correctAnswer = correctAnswer;
		this.categoryId = categoryId;
		this.difficulty = difficulty;
		this.marks = marks;
		this.questionStatus = questionStatus;
		this.assessmentId = assessmentId;
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

	public String getQuestionTitle() {
		return questionTitle;
	}

	public void setQuestionTitle(String questionTitle) {
		this.questionTitle = questionTitle;
	}

	public String getOptionA() {
		return optionA;
	}

	public void setOptionA(String optionA) {
		this.optionA = optionA;
	}

	public String getOptionB() {
		return optionB;
	}

	public void setOptionB(String optionB) {
		this.optionB = optionB;
	}

	public String getOptionC() {
		return optionC;
	}

	public void setOptionC(String optionC) {
		this.optionC = optionC;
	}

	public String getOptionD() {
		return optionD;
	}

	public void setOptionD(String optionD) {
		this.optionD = optionD;
	}

	public String getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public Integer getMarks() {
		return marks;
	}

	public void setMarks(Integer marks) {
		this.marks = marks;
	}

	public String getQuestionStatus() {
		return questionStatus;
	}

	public void setQuestionStatus(String questionStatus) {
		this.questionStatus = questionStatus;
	}

}