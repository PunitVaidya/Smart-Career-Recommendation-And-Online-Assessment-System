package org.techhub.service;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.QuestionRequest;
import org.techhub.dto.response.QuestionResponse;
import org.techhub.entity.Question;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.exception.QuestionNotFoundException;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.QuestionMapper;
import org.techhub.repository.QuestionRepository;

@Service
public class QuestionServiceImpl implements QuestionService {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(QuestionServiceImpl.class);

	@Autowired
	private QuestionRepository questionRepository;

	@Autowired
	private QuestionMapper questionMapper;

	
	@Override
	public List<QuestionResponse> getQuestionsByAssessment(
	        Integer assessmentId) {


	    List<Question> questions =
	    		questionRepository.findByAssessment(
	                    assessmentId
	            );


	    return questionMapper.toResponse(
	            questions
	    );

	}
	@Override
	public QuestionResponse save(QuestionRequest request) {

		if (questionRepository.existsByTitle(request.getQuestionTitle())) {
			throw new DuplicateRecordException("Question already exists.");
		}

		Question question = questionMapper.toEntity(request);

		boolean status = questionRepository.save(question);

		if (!status) {
			throw new RuntimeException("Unable to save question.");
		}

		LOGGER.info(LogConstants.QUESTION_ADDED);

		return questionMapper.toResponse(
				questionRepository.findById(question.getQuestionId()));
	}

	@Override
	public QuestionResponse update(QuestionRequest request) {

		Question dbQuestion =
				questionRepository.findById(request.getQuestionId());

		if (dbQuestion == null) {
			throw new QuestionNotFoundException("Question not found.");
		}

		Question question = questionMapper.toEntity(request);

		boolean status = questionRepository.update(question);

		if (!status) {
			throw new RuntimeException("Unable to update question.");
		}

		LOGGER.info(LogConstants.QUESTION_UPDATED);

		return questionMapper.toResponse(
				questionRepository.findById(request.getQuestionId()));
	}

	@Override
	public boolean delete(Integer questionId) {

		Question question =
				questionRepository.findById(questionId);

		if (question == null) {
			throw new QuestionNotFoundException("Question not found.");
		}

		boolean status =
				questionRepository.delete(questionId);

		if (!status) {
			throw new RuntimeException("Unable to delete question.");
		}

		LOGGER.info(LogConstants.QUESTION_DELETED);

		return true;
	}

	@Override
	public QuestionResponse getQuestionById(Integer questionId) {

		Question question =
				questionRepository.findById(questionId);

		if (question == null) {
			throw new QuestionNotFoundException("Question not found.");
		}

		return questionMapper.toResponse(question);
	}

	@Override
	public List<QuestionResponse> getAllQuestions() {

		return questionMapper.toResponse(
				questionRepository.findAll());
	}

	@Override
	public List<QuestionResponse> getQuestionsByCategory(Integer categoryId) {

		return questionMapper.toResponse(
				questionRepository.findByCategory(categoryId));
	}

	@Override
	public List<QuestionResponse> getQuestionsByDifficulty(String difficulty) {

		return questionMapper.toResponse(
				questionRepository.findByDifficulty(difficulty));
	}

	@Override
	public List<QuestionResponse> getActiveQuestions() {

		return questionMapper.toResponse(
				questionRepository.findActiveQuestions());
	}
}