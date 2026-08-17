package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.StudentAssessmentRequest;
import org.techhub.dto.response.StudentAssessmentResponse;
import org.techhub.entity.StudentAssessment;
import org.techhub.exception.StudentAssessmentNotFoundException;
import org.techhub.mapper.StudentAssessmentMapper;
import org.techhub.repository.StudentAssessmentRepository;

@Service
public class StudentAssessmentServiceImpl implements StudentAssessmentService {

	@Autowired
	private StudentAssessmentRepository repository;

	@Autowired
	private StudentAssessmentMapper mapper;

	@Override
	public StudentAssessmentResponse save(StudentAssessmentRequest request) {

		StudentAssessment assessment = mapper.toEntity(request);

		boolean status = repository.save(assessment);

		if (!status) {
			throw new RuntimeException("Unable to save student assessment.");
		}

		return mapper.toResponse(assessment);
	}

	@Override
	public StudentAssessmentResponse update(StudentAssessmentRequest request) {

		StudentAssessment dbAssessment =
				repository.findById(request.getAttemptId());

		if (dbAssessment == null) {

			throw new StudentAssessmentNotFoundException(
					"Student Assessment not found.");
		}

		StudentAssessment assessment = mapper.toEntity(request);

		boolean status = repository.update(assessment);

		if (!status) {
			throw new RuntimeException("Unable to update student assessment.");
		}

		return mapper.toResponse(
				repository.findById(request.getAttemptId()));
	}

	@Override
	public boolean delete(Integer attemptId) {

		StudentAssessment assessment =
				repository.findById(attemptId);

		if (assessment == null) {

			throw new StudentAssessmentNotFoundException(
					"Student Assessment not found.");
		}

		return repository.delete(attemptId);
	}

	@Override
	public StudentAssessmentResponse getById(Integer attemptId) {

		StudentAssessment assessment =
				repository.findById(attemptId);

		if (assessment == null) {

			throw new StudentAssessmentNotFoundException(
					"Student Assessment not found.");
		}

		return mapper.toResponse(assessment);
	}

	@Override
	public List<StudentAssessmentResponse> getAll() {

		return mapper.toResponse(repository.findAll());
	}

	@Override
	public List<StudentAssessmentResponse> getByStudent(Integer studentId) {

		return mapper.toResponse(
				repository.findByStudent(studentId));
	}

	@Override
	public List<StudentAssessmentResponse> getByAssessment(Integer assessmentId) {

		return mapper.toResponse(
				repository.findByAssessment(assessmentId));
	}

	@Override
	public List<StudentAssessmentResponse> getByStudentAndAssessment(
			Integer studentId,
			Integer assessmentId) {

		return mapper.toResponse(
				repository.findByStudentAndAssessment(
						studentId,
						assessmentId));
	}
}