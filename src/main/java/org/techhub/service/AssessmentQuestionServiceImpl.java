package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.AssessmentQuestionRequest;
import org.techhub.dto.response.AssessmentQuestionResponse;
import org.techhub.entity.AssessmentQuestion;
import org.techhub.exception.AssessmentQuestionNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.mapper.AssessmentQuestionMapper;
import org.techhub.repository.AssessmentQuestionRepository;

@Service
public class AssessmentQuestionServiceImpl implements AssessmentQuestionService {

	@Autowired
	private AssessmentQuestionRepository repository;

	@Autowired
	private AssessmentQuestionMapper mapper;

	@Override
	public AssessmentQuestionResponse save(AssessmentQuestionRequest request) {

		if (repository.exists(request.getAssessmentId(), request.getQuestionId())) {

			throw new DuplicateRecordException(
					"Question already assigned to assessment.");
		}

		AssessmentQuestion aq = mapper.toEntity(request);

		repository.save(aq);

		return mapper.toResponse(aq);
	}

	@Override
	public boolean delete(Integer id) {

		AssessmentQuestion aq = repository.findById(id);

		if (aq == null) {

			throw new AssessmentQuestionNotFoundException(
					"Assessment Question not found.");
		}

		return repository.delete(id);
	}

	@Override
	public AssessmentQuestionResponse getById(Integer id) {

		AssessmentQuestion aq = repository.findById(id);

		if (aq == null) {

			throw new AssessmentQuestionNotFoundException(
					"Assessment Question not found.");
		}

		return mapper.toResponse(aq);
	}

	@Override
	public List<AssessmentQuestionResponse> getAll() {

		return mapper.toResponse(repository.findAll());
	}

	@Override
	public List<AssessmentQuestionResponse> getByAssessment(Integer assessmentId) {

		return mapper.toResponse(
				repository.findByAssessment(assessmentId));
	}

	@Override
	public List<AssessmentQuestionResponse> getByQuestion(Integer questionId) {

		return mapper.toResponse(
				repository.findByQuestion(questionId));
	}

	@Override
	public List<Integer> getQuestionIds(Integer assessmentId) {


	    List<AssessmentQuestionResponse> list =
	            getByAssessment(assessmentId);



	    return list.stream()

	            .map(
	                AssessmentQuestionResponse::getQuestionId
	            )

	            .toList();

	}
}