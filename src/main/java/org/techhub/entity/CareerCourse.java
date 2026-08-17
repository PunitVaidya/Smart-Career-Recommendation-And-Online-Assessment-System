package org.techhub.entity;

import java.sql.Timestamp;

public class CareerCourse {

	private Integer careerCourseId;

	private Integer careerId;

	private Integer courseId;

	private Boolean mandatory;

	private Integer sequenceNo;

	private Timestamp createdAt;

	public CareerCourse() {

	}

	public CareerCourse(Integer careerCourseId, Integer careerId, Integer courseId,
			Boolean mandatory, Integer sequenceNo, Timestamp createdAt) {

		this.careerCourseId = careerCourseId;
		this.careerId = careerId;
		this.courseId = courseId;
		this.mandatory = mandatory;
		this.sequenceNo = sequenceNo;
		this.createdAt = createdAt;
	}

	public Integer getCareerCourseId() {
		return careerCourseId;
	}

	public void setCareerCourseId(Integer careerCourseId) {
		this.careerCourseId = careerCourseId;
	}

	public Integer getCareerId() {
		return careerId;
	}

	public void setCareerId(Integer careerId) {
		this.careerId = careerId;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public Boolean getMandatory() {
		return mandatory;
	}

	public void setMandatory(Boolean mandatory) {
		this.mandatory = mandatory;
	}

	public Integer getSequenceNo() {
		return sequenceNo;
	}

	public void setSequenceNo(Integer sequenceNo) {
		this.sequenceNo = sequenceNo;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "CareerCourse [careerCourseId=" + careerCourseId + ", careerId=" + careerId
				+ ", courseId=" + courseId + ", mandatory=" + mandatory
				+ ", sequenceNo=" + sequenceNo + ", createdAt=" + createdAt + "]";
	}
}