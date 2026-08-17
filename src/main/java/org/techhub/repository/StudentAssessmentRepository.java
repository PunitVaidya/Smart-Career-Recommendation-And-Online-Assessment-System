package org.techhub.repository;

import java.util.List;

import org.techhub.entity.StudentAssessment;

public interface StudentAssessmentRepository {

	boolean save(StudentAssessment assessment);

	boolean update(StudentAssessment assessment);

	StudentAssessment findById(Integer attemptId);

	List<StudentAssessment> findAll();

	List<StudentAssessment> findByStudent(Integer studentId);

	List<StudentAssessment> findByAssessment(Integer assessmentId);

	List<StudentAssessment> findByStudentAndAssessment(
			Integer studentId,
			Integer assessmentId);

	boolean delete(Integer attemptId);

}