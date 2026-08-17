package org.techhub.repository;

import java.util.List;

import org.techhub.entity.AssessmentQuestion;

public interface AssessmentQuestionRepository {

	boolean save(AssessmentQuestion assessmentQuestion);

	boolean delete(Integer id);

	AssessmentQuestion findById(Integer id);

	List<AssessmentQuestion> findAll();

	List<AssessmentQuestion> findByAssessment(Integer assessmentId);

	List<AssessmentQuestion> findByQuestion(Integer questionId);

	boolean exists(Integer assessmentId, Integer questionId);

}