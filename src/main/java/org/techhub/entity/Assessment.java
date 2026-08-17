package org.techhub.entity;

import java.sql.Timestamp;

public class Assessment {

    private Integer assessmentId;

    private String assessmentName;

    private String description;

    private String assessmentType;

    private Integer duration;

    private Integer totalQuestions;

    private Integer totalMarks;

    private String status;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    public Assessment() {

    }

    public Assessment(Integer assessmentId,
                      String assessmentName,
                      String description,
                      String assessmentType,
                      Integer duration,
                      Integer totalQuestions,
                      Integer totalMarks,
                      String status,
                      Timestamp createdAt,
                      Timestamp updatedAt) {

        this.assessmentId = assessmentId;
        this.assessmentName = assessmentName;
        this.description = description;
        this.assessmentType = assessmentType;
        this.duration = duration;
        this.totalQuestions = totalQuestions;
        this.totalMarks = totalMarks;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Assessment [assessmentId=" + assessmentId
                + ", assessmentName=" + assessmentName
                + ", description=" + description
                + ", assessmentType=" + assessmentType
                + ", duration=" + duration
                + ", totalQuestions=" + totalQuestions
                + ", totalMarks=" + totalMarks
                + ", status=" + status
                + ", createdAt=" + createdAt
                + ", updatedAt=" + updatedAt + "]";
    }

}