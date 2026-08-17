package org.techhub.dto.response;

public class DashboardResponse {

    private int totalStudents;

    private int totalAdmins;

    private int totalAssessments;

    private int totalQuestions;

    private int totalCareers;

    private int totalCourses;

    private int totalAttempts;

    private int totalRecommendations;

    public DashboardResponse() {

    }

    public DashboardResponse(int totalStudents,
                             int totalAdmins,
                             int totalAssessments,
                             int totalQuestions,
                             int totalCareers,
                             int totalCourses,
                             int totalAttempts,
                             int totalRecommendations) {

        this.totalStudents = totalStudents;
        this.totalAdmins = totalAdmins;
        this.totalAssessments = totalAssessments;
        this.totalQuestions = totalQuestions;
        this.totalCareers = totalCareers;
        this.totalCourses = totalCourses;
        this.totalAttempts = totalAttempts;
        this.totalRecommendations = totalRecommendations;
    }

    public int getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(int totalStudents) {
        this.totalStudents = totalStudents;
    }

    public int getTotalAdmins() {
        return totalAdmins;
    }

    public void setTotalAdmins(int totalAdmins) {
        this.totalAdmins = totalAdmins;
    }

    public int getTotalAssessments() {
        return totalAssessments;
    }

    public void setTotalAssessments(int totalAssessments) {
        this.totalAssessments = totalAssessments;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getTotalCareers() {
        return totalCareers;
    }

    public void setTotalCareers(int totalCareers) {
        this.totalCareers = totalCareers;
    }

    public int getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(int totalCourses) {
        this.totalCourses = totalCourses;
    }

    public int getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(int totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public int getTotalRecommendations() {
        return totalRecommendations;
    }

    public void setTotalRecommendations(int totalRecommendations) {
        this.totalRecommendations = totalRecommendations;
    }

}