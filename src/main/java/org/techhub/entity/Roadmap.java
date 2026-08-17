package org.techhub.entity;

import java.sql.Timestamp;

public class Roadmap {

	private Integer roadmapId;

	private Integer careerId;

	private Integer stepNo;

	private String title;

	private String description;

	private String estimatedDuration;

	private String status;

	private Timestamp createdAt;

	public Roadmap() {

	}

	public Roadmap(Integer roadmapId, Integer careerId, Integer stepNo,
			String title, String description,
			String estimatedDuration, String status,
			Timestamp createdAt) {

		this.roadmapId = roadmapId;
		this.careerId = careerId;
		this.stepNo = stepNo;
		this.title = title;
		this.description = description;
		this.estimatedDuration = estimatedDuration;
		this.status = status;
		this.createdAt = createdAt;
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

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "Roadmap [roadmapId=" + roadmapId
				+ ", careerId=" + careerId
				+ ", stepNo=" + stepNo
				+ ", title=" + title
				+ ", description=" + description
				+ ", estimatedDuration=" + estimatedDuration
				+ ", status=" + status
				+ ", createdAt=" + createdAt + "]";
	}
}