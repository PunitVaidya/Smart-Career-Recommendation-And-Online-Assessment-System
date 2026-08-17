package org.techhub.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.techhub.dto.request.StudentResultRequest;
import org.techhub.dto.response.StudentResultResponse;
import org.techhub.entity.StudentResult;
import org.techhub.exception.StudentResultNotFoundException;
import org.techhub.mapper.StudentResultMapper;
import org.techhub.repository.StudentResultRepository;



@Service
public class StudentResultServiceImpl 
		implements StudentResultService {



	@Autowired
	private StudentResultRepository repository;



	@Autowired
	private StudentResultMapper mapper;


	@Override
	public StudentResultResponse save(
			StudentResultRequest request) {



		StudentResult result =
				mapper.toEntity(request);



		boolean status =
				repository.save(result);



		if(!status) {

			throw new RuntimeException(
					"Unable to save student result."
			);

		}



		return mapper.toResponse(
				repository.findByAttemptId(
						result.getAttemptId()
				)
		);


	}









	@Override
	public StudentResultResponse update(
			StudentResultRequest request) {



		StudentResult existing =
				repository.findById(
						request.getResultId()
				);



		if(existing == null) {


			throw new StudentResultNotFoundException(
					"Student Result not found."
			);


		}



		StudentResult result =
				mapper.toEntity(request);



		repository.update(result);




		return mapper.toResponse(
				repository.findById(
						request.getResultId()
				)
		);



	}









	@Override
	public boolean delete(Integer resultId) {



		StudentResult result =
				repository.findById(resultId);



		if(result == null) {


			throw new StudentResultNotFoundException(
					"Student Result not found."
			);


		}



		return repository.delete(resultId);



	}









	@Override
	public StudentResultResponse getById(
			Integer resultId) {



		StudentResult result =
				repository.findById(resultId);



		if(result == null) {


			throw new StudentResultNotFoundException(
					"Student Result not found."
			);


		}



		return mapper.toResponse(result);



	}









	@Override
	public StudentResultResponse getByAttempt(
			Integer attemptId) {



		StudentResult result =
				repository.findByAttemptId(
						attemptId
				);



		if(result == null) {


			throw new StudentResultNotFoundException(
					"Student Result not found."
			);


		}



		return mapper.toResponse(result);



	}









	@Override
	public List<StudentResultResponse> getAll(){



		return mapper.toResponse(
				repository.findAll()
		);



	}









	@Override
	public List<StudentResultResponse> getByStudent(
			Integer studentId){



		return mapper.toResponse(
				repository.findByStudent(studentId)
		);



	}









	@Override
	public List<StudentResultResponse> getByAssessment(
			Integer assessmentId){



		return mapper.toResponse(
				repository.findByAssessment(
						assessmentId
				)
		);



	}
	
	public StudentResultResponse getLatestResult(Integer studentId){

	    StudentResult result =
	            repository.findLatestByStudent(studentId);


	    return mapper.toResponse(result);

	}

}