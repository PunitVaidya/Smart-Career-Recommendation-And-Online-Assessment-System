package org.techhub.entity;

import java.sql.Timestamp;

public class StudentAnswer {

    private Integer answerId;

    private Integer attemptId;

    private Integer questionId;

    private String selectedAnswer;

    private Boolean correct;

    private Integer marksObtained;

    private Timestamp answeredAt;

    public StudentAnswer() {

    }

    public StudentAnswer(Integer answerId,
                         Integer attemptId,
                         Integer questionId,
                         String selectedAnswer,
                         Boolean correct,
                         Integer marksObtained,
                         Timestamp answeredAt) {

        this.answerId = answerId;
        this.attemptId = attemptId;
        this.questionId = questionId;
        this.selectedAnswer = selectedAnswer;
        this.correct = correct;
        this.marksObtained = marksObtained;
        this.answeredAt = answeredAt;
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

    public Timestamp getAnsweredAt() {
        return answeredAt;
    }

    public void setAnsweredAt(Timestamp answeredAt) {
        this.answeredAt = answeredAt;
    }

    @Override
    public String toString() {
        return "StudentAnswer [answerId=" + answerId
                + ", attemptId=" + attemptId
                + ", questionId=" + questionId
                + ", selectedAnswer=" + selectedAnswer
                + ", correct=" + correct
                + ", marksObtained=" + marksObtained
                + ", answeredAt=" + answeredAt + "]";
    }

}