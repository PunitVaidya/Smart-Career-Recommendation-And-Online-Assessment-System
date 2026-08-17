package org.techhub.repository;

import java.util.List;

import org.techhub.entity.Career;

public interface CareerRepository {

	boolean save(Career career);

	boolean update(Career career);

	boolean delete(Integer careerId);

	Career findById(Integer careerId);

	Career findByName(String careerName);

	List<Career> findAll();

	List<Career> findActiveCareers();

	List<Career> findByCategory(String category);

	List<Career> findBySkillLevel(String requiredSkillLevel);

	boolean existsByName(String careerName);

}