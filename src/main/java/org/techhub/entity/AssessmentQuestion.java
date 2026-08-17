package org.techhub.entity;

public class AssessmentQuestion {

    private Integer id;

    private Integer assessmentId;

    private Integer questionId;

    public AssessmentQuestion() {

    }

    public AssessmentQuestion(Integer id,
                              Integer assessmentId,
                              Integer questionId) {

        this.id = id;
        this.assessmentId = assessmentId;
        this.questionId = questionId;
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

    @Override
    public String toString() {

        return "AssessmentQuestion [id=" + id
                + ", assessmentId=" + assessmentId
                + ", questionId=" + questionId + "]";
    }

}