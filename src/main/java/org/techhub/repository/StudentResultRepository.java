package org.techhub.repository;

import java.util.List;

import org.techhub.entity.StudentResult;

public interface StudentResultRepository {

	boolean save(StudentResult result);

	boolean update(StudentResult result);

	boolean delete(Integer resultId);

	StudentResult findById(Integer resultId);

	StudentResult findByAttemptId(Integer attemptId);

	List<StudentResult> findAll();

	List<StudentResult> findByStudent(Integer studentId);

	List<StudentResult> findByAssessment(Integer assessmentId);

	StudentResult findLatestByStudent(Integer studentId);
}