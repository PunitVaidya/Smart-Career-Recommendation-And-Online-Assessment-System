package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.RoadmapRequest;
import org.techhub.dto.response.RoadmapResponse;

public interface RoadmapService {

	RoadmapResponse save(RoadmapRequest request);

	RoadmapResponse update(RoadmapRequest request);

	boolean delete(Integer roadmapId);

	RoadmapResponse getById(Integer roadmapId);

	List<RoadmapResponse> getAll();

	List<RoadmapResponse> getByCareer(Integer careerId);

	List<RoadmapResponse> getActiveRoadmaps();

}