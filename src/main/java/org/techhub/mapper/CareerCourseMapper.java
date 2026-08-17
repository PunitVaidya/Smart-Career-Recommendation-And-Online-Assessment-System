package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.CareerCourseRequest;
import org.techhub.dto.response.CareerCourseResponse;
import org.techhub.entity.CareerCourse;

@Component
public class CareerCourseMapper {

	public CareerCourse toEntity(CareerCourseRequest request) {

		CareerCourse course = new CareerCourse();

		course.setCareerCourseId(request.getCareerCourseId());
		course.setCareerId(request.getCareerId());
		course.setCourseId(request.getCourseId());
		course.setMandatory(request.getMandatory());
		course.setSequenceNo(request.getSequenceNo());

		return course;
	}

	public CareerCourseResponse toResponse(CareerCourse course) {

		if (course == null)
			return null;

		CareerCourseResponse response = new CareerCourseResponse();

		response.setCareerCourseId(course.getCareerCourseId());
		response.setCareerId(course.getCareerId());
		response.setCourseId(course.getCourseId());
		response.setMandatory(course.getMandatory());
		response.setSequenceNo(course.getSequenceNo());
		response.setCreatedAt(course.getCreatedAt());

		return response;
	}

	public List<CareerCourseResponse> toResponse(List<CareerCourse> list) {

		List<CareerCourseResponse> responses = new ArrayList<>();

		for (CareerCourse course : list) {
			responses.add(toResponse(course));
		}

		return responses;
	}
}