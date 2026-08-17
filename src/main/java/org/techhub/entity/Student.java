package org.techhub.entity;

import java.sql.Timestamp;

public class Student {

	private Integer studentId;

	private String name;

	private String email;

	private String password;

	private String mobile;

	private String college;

	private String branch;

	private Integer semester;

	private String currentStatus;

	private Integer graduationYear;

	private String goal;

	private Boolean firstLogin;

	private Boolean profileCompleted;

	private Timestamp createdAt;

	private Timestamp updatedAt;

	public Student() {

	}

	public Student(Integer studentId, String name, String email, String password, String mobile, String college,
			String branch, Integer semester, String currentStatus, Integer graduationYear, String goal,
			Boolean firstLogin, Boolean profileCompleted, Timestamp createdAt, Timestamp updatedAt) {

		this.studentId = studentId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.mobile = mobile;
		this.college = college;
		this.branch = branch;
		this.semester = semester;
		this.currentStatus = currentStatus;
		this.graduationYear = graduationYear;
		this.goal = goal;
		this.firstLogin = firstLogin;
		this.profileCompleted = profileCompleted;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Integer getStudentId() {

		return studentId;
	}

	public void setStudentId(Integer studentId) {

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

	public String getPassword() {

		return password;
	}

	public void setPassword(String password) {

		this.password = password;
	}

	public String getMobile() {

		return mobile;
	}

	public void setMobile(String mobile) {

		this.mobile = mobile;
	}

	public String getCollege() {

		return college;
	}

	public void setCollege(String college) {

		this.college = college;
	}

	public String getBranch() {

		return branch;
	}

	public void setBranch(String branch) {

		this.branch = branch;
	}

	public Integer getSemester() {

		return semester;
	}

	public void setSemester(Integer semester) {

		this.semester = semester;
	}

	public String getCurrentStatus() {

		return currentStatus;
	}

	public void setCurrentStatus(String currentStatus) {

		this.currentStatus = currentStatus;
	}

	public Integer getGraduationYear() {

		return graduationYear;
	}

	public void setGraduationYear(Integer graduationYear) {

		this.graduationYear = graduationYear;
	}

	public String getGoal() {

		return goal;
	}

	public void setGoal(String goal) {

		this.goal = goal;
	}

	public Boolean getFirstLogin() {

		return firstLogin;
	}

	public void setFirstLogin(Boolean firstLogin) {

		this.firstLogin = firstLogin;
	}

	public Boolean getProfileCompleted() {

		return profileCompleted;
	}

	public void setProfileCompleted(Boolean profileCompleted) {

		this.profileCompleted = profileCompleted;
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

		return "Student [studentId=" + studentId + ", name=" + name + ", email=" + email + ", password=" + password
				+ ", mobile=" + mobile + ", college=" + college + ", branch=" + branch + ", semester=" + semester
				+ ", currentStatus=" + currentStatus + ", graduationYear=" + graduationYear + ", goal=" + goal
				+ ", firstLogin=" + firstLogin + ", profileCompleted=" + profileCompleted + ", createdAt=" + createdAt
				+ ", updatedAt=" + updatedAt + "]";
	}

}