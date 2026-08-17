package org.techhub.service;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.AssessmentRequest;
import org.techhub.dto.response.AssessmentResponse;
import org.techhub.entity.Assessment;
import org.techhub.exception.AssessmentNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.AssessmentMapper;
import org.techhub.repository.AssessmentRepository;

@Service
public class AssessmentServiceImpl implements AssessmentService {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(AssessmentServiceImpl.class);

	@Autowired
	private AssessmentRepository assessmentRepository;

	@Autowired
	private AssessmentMapper assessmentMapper;

	@Override
	public AssessmentResponse save(AssessmentRequest request) {

		if (assessmentRepository.existsByName(request.getAssessmentName())) {

			throw new DuplicateRecordException("Assessment already exists.");

		}

		Assessment assessment =
				assessmentMapper.toEntity(request);

		boolean status =
				assessmentRepository.save(assessment);

		if (!status) {

			throw new RuntimeException("Unable to save assessment.");

		}

		LOGGER.info(LogConstants.ASSESSMENT_CREATED);

		return assessmentMapper.toResponse(
				assessmentRepository.findByName(request.getAssessmentName()));
	}

	@Override
	public AssessmentResponse update(AssessmentRequest request) {


	    Assessment dbAssessment =
	            assessmentRepository.findById(
	                    request.getAssessmentId()
	            );


	    if(dbAssessment == null) {

	        throw new AssessmentNotFoundException(
	                "Assessment not found."
	        );

	    }



	    Assessment assessment =
	            assessmentMapper.toEntity(request);



	    /*
	     * IMPORTANT:
	     * keep ID while updating
	     */
	    assessment.setAssessmentId(
	            request.getAssessmentId()
	    );



	    boolean status =
	            assessmentRepository.update(
	                    assessment
	            );



	    if(!status) {

	        throw new RuntimeException(
	                "Unable to update assessment."
	        );

	    }



	    LOGGER.info(
	            LogConstants.ASSESSMENT_UPDATED
	    );



	    return assessmentMapper.toResponse(
	            assessmentRepository.findById(
	                    request.getAssessmentId()
	            )
	    );

	}
	@Override
	public boolean delete(Integer assessmentId) {

		Assessment assessment =
				assessmentRepository.findById(assessmentId);

		if (assessment == null) {

			throw new AssessmentNotFoundException("Assessment not found.");

		}

		boolean status =
				assessmentRepository.delete(assessmentId);

		if (!status) {

			throw new RuntimeException("Unable to delete assessment.");

		}

		LOGGER.info(LogConstants.ASSESSMENT_DELETED);

		return true;
	}

	@Override
	public AssessmentResponse getAssessmentById(Integer assessmentId) {

		Assessment assessment =
				assessmentRepository.findById(assessmentId);

		if (assessment == null) {

			throw new AssessmentNotFoundException("Assessment not found.");

		}

		return assessmentMapper.toResponse(assessment);
	}

	@Override
	public AssessmentResponse getAssessmentByName(String assessmentName) {

		Assessment assessment =
				assessmentRepository.findByName(assessmentName);

		if (assessment == null) {

			throw new AssessmentNotFoundException("Assessment not found.");

		}

		return assessmentMapper.toResponse(assessment);
	}

	@Override
	public List<AssessmentResponse> getAssessmentsByType(String assessmentType) {

		return assessmentMapper.toResponse(
				assessmentRepository.findByType(assessmentType));
	}

	@Override
	public List<AssessmentResponse> getActiveAssessments() {

		return assessmentMapper.toResponse(
				assessmentRepository.findActiveAssessments());
	}

	@Override
	public List<AssessmentResponse> getAllAssessments() {

		return assessmentMapper.toResponse(
				assessmentRepository.findAll());
	}

}