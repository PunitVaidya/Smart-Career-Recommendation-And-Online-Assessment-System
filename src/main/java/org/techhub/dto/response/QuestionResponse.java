package org.techhub.dto.response;

import java.sql.Timestamp;

public class QuestionResponse {


    private Integer questionId;

    private String questionTitle;


    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;


    /*
     * Correct answer is required for admin management.
     * Student assessment will use separate DTO without this field.
     */
    private String correctAnswer;


    private Integer categoryId;


    // Added for displaying subject name in admin question table
    private String categoryName;


    private String difficulty;


    private Integer marks;


    private String questionStatus;


    private Timestamp createdAt;

    private Integer assessmentId;

    // =====================================
    // DEFAULT CONSTRUCTOR
    // =====================================

    public QuestionResponse() {

    }



    // =====================================
    // PARAMETERIZED CONSTRUCTOR
    // =====================================

    public QuestionResponse(
            Integer questionId,
            String questionTitle,
            String optionA,
            String optionB,
            String optionC,
            String optionD,
            String correctAnswer,
            Integer categoryId,
            String categoryName,
            String difficulty,
            Integer marks,
            String questionStatus,
            Timestamp createdAt,
            Integer assessmentId) {


        this.questionId = questionId;

        this.questionTitle = questionTitle;

        this.optionA = optionA;

        this.optionB = optionB;

        this.optionC = optionC;

        this.optionD = optionD;

        this.correctAnswer = correctAnswer;

        this.categoryId = categoryId;

        this.categoryName = categoryName;

        this.difficulty = difficulty;

        this.marks = marks;

        this.questionStatus = questionStatus;

        this.createdAt = createdAt;
        this.assessmentId = assessmentId;

    }



    // =====================================
    // GETTERS AND SETTERS
    // =====================================


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

    public Integer getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(Integer assessmentId) {
        this.assessmentId = assessmentId;
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



    public String getCategoryName() {
        return categoryName;
    }


    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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



    public Timestamp getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }


}