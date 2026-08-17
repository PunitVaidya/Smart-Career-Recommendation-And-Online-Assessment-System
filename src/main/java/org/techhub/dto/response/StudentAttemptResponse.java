package org.techhub.dto.response;

import java.sql.Timestamp;

public class StudentAttemptResponse {

    private Integer attemptId;
    private Integer studentId;
    private Integer assessmentId;
    private Integer attemptNumber;

    private Timestamp startTime;
    private Timestamp endTime;

    private Integer score;
    private Integer totalMarks;
    private Double percentage;

    private String attemptStatus;

    private Integer correctCount;
    private Integer incorrectCount;
    private Integer skippedCount;

    private Timestamp createdAt;


    // =========================================================
    // DEFAULT CONSTRUCTOR
    // =========================================================

    public StudentAttemptResponse() {
    }


    // =========================================================
    // GETTERS AND SETTERS
    // =========================================================

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


    public Integer getAttemptNumber() {
        return attemptNumber;
    }

    public void setAttemptNumber(Integer attemptNumber) {
        this.attemptNumber = attemptNumber;
    }


    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }


    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
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


    public String getAttemptStatus() {
        return attemptStatus;
    }

    public void setAttemptStatus(String attemptStatus) {
        this.attemptStatus = attemptStatus;
    }


    public Integer getCorrectCount() {
        return correctCount;
    }

    public void setCorrectCount(Integer correctCount) {
        this.correctCount = correctCount;
    }


    public Integer getIncorrectCount() {
        return incorrectCount;
    }

    public void setIncorrectCount(Integer incorrectCount) {
        this.incorrectCount = incorrectCount;
    }


    public Integer getSkippedCount() {
        return skippedCount;
    }

    public void setSkippedCount(Integer skippedCount) {
        this.skippedCount = skippedCount;
    }


    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }


    // =========================================================
    // TO STRING
    // =========================================================

    @Override
    public String toString() {

        return "StudentAttemptResponse ["
                + "attemptId=" + attemptId
                + ", studentId=" + studentId
                + ", assessmentId=" + assessmentId
                + ", attemptNumber=" + attemptNumber
                + ", startTime=" + startTime
                + ", endTime=" + endTime
                + ", score=" + score
                + ", totalMarks=" + totalMarks
                + ", percentage=" + percentage
                + ", attemptStatus=" + attemptStatus
                + ", correctCount=" + correctCount
                + ", incorrectCount=" + incorrectCount
                + ", skippedCount=" + skippedCount
                + ", createdAt=" + createdAt
                + "]";
    }
}