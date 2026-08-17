package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.StudentResultRequest;
import org.techhub.dto.response.StudentResultResponse;
import org.techhub.entity.StudentResult;


@Component
public class StudentResultMapper {



	// =====================================================
	// REQUEST TO ENTITY
	// =====================================================

	public StudentResult toEntity(StudentResultRequest request) {


		StudentResult result = new StudentResult();


		result.setResultId(
				request.getResultId()
		);


		result.setAttemptId(
				request.getAttemptId()
		);


		result.setStudentId(
				request.getStudentId()
		);


		result.setAssessmentId(
				request.getAssessmentId()
		);


		result.setScore(
				request.getScore()
		);


		result.setTotalMarks(
				request.getTotalMarks()
		);


		result.setPercentage(
				request.getPercentage()
		);


		result.setResultStatus(
				request.getResultStatus()
		);


		result.setCareerReadiness(
				request.getCareerReadiness()
		);



		return result;

	}






	// =====================================================
	// ENTITY TO RESPONSE
	// =====================================================

	public StudentResultResponse toResponse(StudentResult result) {


		if(result == null)
			return null;



		StudentResultResponse response =
				new StudentResultResponse();




		response.setResultId(
				result.getResultId()
		);



		response.setAttemptId(
				result.getAttemptId()
		);



		response.setStudentId(
				result.getStudentId()
		);



		response.setAssessmentId(
				result.getAssessmentId()
		);



		response.setScore(
				result.getScore()
		);



		response.setTotalMarks(
				result.getTotalMarks()
		);



		response.setPercentage(
				result.getPercentage()
		);



		response.setResultStatus(
				result.getResultStatus()
		);



		response.setCareerReadiness(
				result.getCareerReadiness()
		);



		response.setSubmittedAt(
				result.getSubmittedAt()
		);




		// ==========================
		// NEW JOIN DATA MAPPING
		// ==========================


		response.setStudentName(
				result.getStudentName()
		);



		response.setStudentEmail(
				result.getStudentEmail()
		);



		response.setAssessmentName(
				result.getAssessmentName()
		);



		response.setRecommendedCareer(
				result.getRecommendedCareer()
		);



		response.setMatchPercentage(
		        result.getMatchPercentage()
		);

		return response;

	}







	// =====================================================
	// LIST ENTITY TO RESPONSE
	// =====================================================


	public List<StudentResultResponse> toResponse(
			List<StudentResult> results) {


		List<StudentResultResponse> responses =
				new ArrayList<>();



		for(StudentResult result : results) {


			responses.add(
					toResponse(result)
			);

		}



		return responses;

	}


}