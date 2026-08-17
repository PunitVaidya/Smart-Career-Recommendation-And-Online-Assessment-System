package org.techhub.dto.response;

public class RecentStudentResponse {

    private int studentId;

    private String name;

    private String email;

    private String currentStatus;

    private String registeredOn;

    public RecentStudentResponse() {

    }

    public RecentStudentResponse(int studentId, String name, String email,
                                 String currentStatus, String registeredOn) {

        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.currentStatus = currentStatus;
        this.registeredOn = registeredOn;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(String currentStatus) {
        this.currentStatus = currentStatus;
    }

    public String getRegisteredOn() {
        return registeredOn;
    }

    public void setRegisteredOn(String registeredOn) {
        this.registeredOn = registeredOn;
    }

}