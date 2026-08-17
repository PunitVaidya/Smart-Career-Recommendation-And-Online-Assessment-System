package org.techhub.dto.request;

import jakarta.validation.constraints.NotNull;

public class CareerCourseRequest {

	private Integer careerCourseId;

	@NotNull(message = "Career Id is required")
	private Integer careerId;

	@NotNull(message = "Course Id is required")
	private Integer courseId;

	private Boolean mandatory;

	@NotNull(message = "Sequence Number is required")
	private Integer sequenceNo;

	public CareerCourseRequest() {
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
}