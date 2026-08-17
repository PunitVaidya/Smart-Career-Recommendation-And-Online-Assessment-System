package org.techhub.repository;

import java.util.List;

import org.techhub.entity.Question;

public interface QuestionRepository {

	boolean save(Question question);

	boolean update(Question question);

	boolean delete(Integer questionId);

	Question findById(Integer questionId);

	List<Question> findAll();

	List<Question> findByCategory(Integer categoryId);

	List<Question> findByDifficulty(String difficulty);

	List<Question> findActiveQuestions();

	boolean exists(Integer questionId);

	boolean existsByTitle(String questionTitle);
	List<Question> findByAssessment(
            Integer assessmentId
    );
}