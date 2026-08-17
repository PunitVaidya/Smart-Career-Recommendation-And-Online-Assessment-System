package org.techhub.repository;

import java.util.List;

import org.techhub.entity.Assessment;

public interface AssessmentRepository {

	boolean save(Assessment assessment);

	boolean update(Assessment assessment);

	boolean delete(Integer assessmentId);

	Assessment findById(Integer assessmentId);

	Assessment findByName(String assessmentName);

	List<Assessment> findAll();

	List<Assessment> findByType(String assessmentType);

	List<Assessment> findActiveAssessments();

	boolean existsByName(String assessmentName);

}