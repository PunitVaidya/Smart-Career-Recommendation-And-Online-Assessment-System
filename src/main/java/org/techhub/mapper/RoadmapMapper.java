package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.RoadmapRequest;
import org.techhub.dto.response.RoadmapResponse;
import org.techhub.entity.Roadmap;

@Component
public class RoadmapMapper {

	public Roadmap toEntity(RoadmapRequest request) {

		Roadmap roadmap = new Roadmap();

		roadmap.setRoadmapId(request.getRoadmapId());
		roadmap.setCareerId(request.getCareerId());
		roadmap.setStepNo(request.getStepNo());
		roadmap.setTitle(request.getTitle());
		roadmap.setDescription(request.getDescription());
		roadmap.setEstimatedDuration(request.getEstimatedDuration());
		roadmap.setStatus(request.getStatus());

		return roadmap;
	}

	public RoadmapResponse toResponse(Roadmap roadmap) {

		if (roadmap == null)
			return null;

		RoadmapResponse response = new RoadmapResponse();

		response.setRoadmapId(roadmap.getRoadmapId());
		response.setCareerId(roadmap.getCareerId());
		response.setStepNo(roadmap.getStepNo());
		response.setTitle(roadmap.getTitle());
		response.setDescription(roadmap.getDescription());
		response.setEstimatedDuration(roadmap.getEstimatedDuration());
		response.setStatus(roadmap.getStatus());
		response.setCreatedAt(roadmap.getCreatedAt());

		return response;
	}

	public List<RoadmapResponse> toResponse(List<Roadmap> roadmaps) {

		List<RoadmapResponse> responses = new ArrayList<>();

		for (Roadmap roadmap : roadmaps) {
			responses.add(toResponse(roadmap));
		}

		return responses;
	}
}