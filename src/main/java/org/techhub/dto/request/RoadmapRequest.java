package org.techhub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RoadmapRequest {

	private Integer roadmapId;

	@NotNull(message = "Career Id is required")
	private Integer careerId;

	@NotNull(message = "Step Number is required")
	private Integer stepNo;

	@NotBlank(message = "Title is required")
	private String title;

	private String description;

	private String estimatedDuration;

	private String status;

	public RoadmapRequest() {

	}

	public Integer getRoadmapId() {
		return roadmapId;
	}

	public void setRoadmapId(Integer roadmapId) {
		this.roadmapId = roadmapId;
	}

	public Integer getCareerId() {
		return careerId;
	}

	public void setCareerId(Integer careerId) {
		this.careerId = careerId;
	}

	public Integer getStepNo() {
		return stepNo;
	}

	public void setStepNo(Integer stepNo) {
		this.stepNo = stepNo;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEstimatedDuration() {
		return estimatedDuration;
	}

	public void setEstimatedDuration(String estimatedDuration) {
		this.estimatedDuration = estimatedDuration;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}