package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.StudentAnswerRequest;
import org.techhub.dto.response.StudentAnswerResponse;
import org.techhub.entity.StudentAnswer;
import org.techhub.exception.StudentAnswerNotFoundException;
import org.techhub.mapper.StudentAnswerMapper;
import org.techhub.repository.StudentAnswerRepository;

@Service
public class StudentAnswerServiceImpl implements StudentAnswerService {

	@Autowired
	private StudentAnswerRepository repository;

	@Autowired
	private StudentAnswerMapper mapper;

	@Override
	public StudentAnswerResponse save(
	        StudentAnswerRequest request) {


	    // =====================================================
	    // CHECK WHETHER THIS QUESTION IS ALREADY ANSWERED
	    // =====================================================

	    List<StudentAnswer> existingAnswers =
	            repository.findByAttemptAndQuestion(
	                    request.getAttemptId(),
	                    request.getQuestionId()
	            );


	    // =====================================================
	    // IF ALREADY EXISTS
	    // UPDATE EXISTING ANSWER
	    // =====================================================

	    if (!existingAnswers.isEmpty()) {


	        StudentAnswer existing =
	                existingAnswers.get(0);


	        existing.setSelectedAnswer(
	                request.getSelectedAnswer()
	        );


	        /*
	         * Correct answer and marks will be
	         * calculated during assessment submission.
	         *
	         * For now we only save the selected answer.
	         */

	        existing.setCorrect(false);

	        existing.setMarksObtained(0);


	        boolean status =
	                repository.update(existing);


	        if (!status) {

	            throw new RuntimeException(
	                    "Unable to update student answer."
	            );

	        }


	        return mapper.toResponse(
	                repository.findById(
	                        existing.getAnswerId()
	                )
	        );

	    }


	    // =====================================================
	    // NEW ANSWER
	    // =====================================================

	    StudentAnswer answer =
	            mapper.toEntity(request);


	    /*
	     * Do NOT trust correct/marks from frontend.
	     *
	     * These values will be calculated by backend
	     * during final submission.
	     */

	    answer.setCorrect(false);

	    answer.setMarksObtained(0);


	    boolean status =
	            repository.save(answer);


	    if (!status) {

	        throw new RuntimeException(
	                "Unable to save student answer."
	        );

	    }


	    return mapper.toResponse(answer);

	}

	@Override
	public StudentAnswerResponse update(StudentAnswerRequest request) {

		StudentAnswer dbAnswer =
				repository.findById(request.getAnswerId());

		if (dbAnswer == null) {

			throw new StudentAnswerNotFoundException(
					"Student Answer not found.");
		}

		StudentAnswer answer = mapper.toEntity(request);

		boolean status = repository.update(answer);

		if (!status) {

			throw new RuntimeException(
					"Unable to update student answer.");
		}

		return mapper.toResponse(
				repository.findById(request.getAnswerId()));
	}

	@Override
	public boolean delete(Integer answerId) {

		StudentAnswer answer =
				repository.findById(answerId);

		if (answer == null) {

			throw new StudentAnswerNotFoundException(
					"Student Answer not found.");
		}

		return repository.delete(answerId);
	}

	@Override
	public StudentAnswerResponse getById(Integer answerId) {

		StudentAnswer answer =
				repository.findById(answerId);

		if (answer == null) {

			throw new StudentAnswerNotFoundException(
					"Student Answer not found.");
		}

		return mapper.toResponse(answer);
	}

	@Override
	public List<StudentAnswerResponse> getAll() {

		return mapper.toResponse(repository.findAll());
	}

	@Override
	public List<StudentAnswerResponse> getByAttempt(Integer attemptId) {

		return mapper.toResponse(
				repository.findByAttempt(attemptId));
	}

	@Override
	public List<StudentAnswerResponse> getByQuestion(Integer questionId) {

		return mapper.toResponse(
				repository.findByQuestion(questionId));
	}

	@Override
	public List<StudentAnswerResponse> getByAttemptAndQuestion(
			Integer attemptId,
			Integer questionId) {

		return mapper.toResponse(
				repository.findByAttemptAndQuestion(
						attemptId,
						questionId));
	}

}