package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.RoadmapRequest;
import org.techhub.dto.response.RoadmapResponse;
import org.techhub.entity.Roadmap;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.exception.RoadmapNotFoundException;
import org.techhub.mapper.RoadmapMapper;
import org.techhub.repository.RoadmapRepository;

@Service
public class RoadmapServiceImpl implements RoadmapService {

	@Autowired
	private RoadmapRepository repository;

	@Autowired
	private RoadmapMapper mapper;

	@Override
	public RoadmapResponse save(RoadmapRequest request) {

		if (repository.exists(request.getCareerId(), request.getStepNo())) {
			throw new DuplicateRecordException("Roadmap step already exists.");
		}

		Roadmap roadmap = mapper.toEntity(request);

		repository.save(roadmap);

		return mapper.toResponse(roadmap);
	}

	@Override
	public RoadmapResponse update(RoadmapRequest request) {

		Roadmap db = repository.findById(request.getRoadmapId());

		if (db == null) {
			throw new RoadmapNotFoundException("Roadmap not found.");
		}

		Roadmap roadmap = mapper.toEntity(request);

		repository.update(roadmap);

		return mapper.toResponse(
				repository.findById(request.getRoadmapId()));
	}

	@Override
	public boolean delete(Integer roadmapId) {

		if (repository.findById(roadmapId) == null) {
			throw new RoadmapNotFoundException("Roadmap not found.");
		}

		return repository.delete(roadmapId);
	}

	@Override
	public RoadmapResponse getById(Integer roadmapId) {

		Roadmap roadmap = repository.findById(roadmapId);

		if (roadmap == null) {
			throw new RoadmapNotFoundException("Roadmap not found.");
		}

		return mapper.toResponse(roadmap);
	}

	@Override
	public List<RoadmapResponse> getAll() {

		return mapper.toResponse(repository.findAll());
	}

	@Override
	public List<RoadmapResponse> getByCareer(Integer careerId) {

		return mapper.toResponse(repository.findByCareer(careerId));
	}

	@Override
	public List<RoadmapResponse> getActiveRoadmaps() {

		return mapper.toResponse(repository.findActiveRoadmaps());
	}
}