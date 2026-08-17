package org.techhub.repository;

import java.util.List;

import org.techhub.entity.Roadmap;

public interface RoadmapRepository {

	boolean save(Roadmap roadmap);

	boolean update(Roadmap roadmap);

	boolean delete(Integer roadmapId);

	Roadmap findById(Integer roadmapId);

	List<Roadmap> findAll();

	List<Roadmap> findByCareer(Integer careerId);

	List<Roadmap> findActiveRoadmaps();

	boolean exists(Integer careerId, Integer stepNo);

}