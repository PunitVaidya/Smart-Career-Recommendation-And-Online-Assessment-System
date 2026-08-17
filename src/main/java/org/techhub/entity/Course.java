package org.techhub.entity;

import java.sql.Timestamp;

public class Course {

	private Integer courseId;

	private String courseName;

	private String description;

	private String duration;

	private String level;

	private String status;

	private Timestamp createdAt;

	public Course() {

	}

	public Course(Integer courseId, String courseName, String description,
			String duration, String level, String status,
			Timestamp createdAt) {

		this.courseId = courseId;
		this.courseName = courseName;
		this.description = description;
		this.duration = duration;
		this.level = level;
		this.status = status;
		this.createdAt = createdAt;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
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

	@Override
	public String toString() {
		return "Course [courseId=" + courseId + ", courseName="
				+ courseName + ", description=" + description
				+ ", duration=" + duration + ", level=" + level
				+ ", status=" + status + ", createdAt=" + createdAt + "]";
	}
}