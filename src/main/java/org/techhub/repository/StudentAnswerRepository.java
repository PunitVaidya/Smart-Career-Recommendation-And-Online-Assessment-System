package org.techhub.repository;

import java.util.List;

import org.techhub.entity.StudentAnswer;

public interface StudentAnswerRepository {

	boolean save(StudentAnswer answer);

	boolean update(StudentAnswer answer);

	boolean delete(Integer answerId);

	StudentAnswer findById(Integer answerId);

	List<StudentAnswer> findAll();

	List<StudentAnswer> findByAttempt(Integer attemptId);

	List<StudentAnswer> findByQuestion(Integer questionId);

	List<StudentAnswer> findByAttemptAndQuestion(Integer attemptId,
			Integer questionId);

}