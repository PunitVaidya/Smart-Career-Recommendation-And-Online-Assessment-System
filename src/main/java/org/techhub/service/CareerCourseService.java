package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.CareerCourseRequest;
import org.techhub.dto.response.CareerCourseResponse;

public interface CareerCourseService {

	CareerCourseResponse save(CareerCourseRequest request);

	CareerCourseResponse update(CareerCourseRequest request);

	boolean delete(Integer careerCourseId);

	CareerCourseResponse getById(Integer careerCourseId);

	List<CareerCourseResponse> getAll();

	List<CareerCourseResponse> getByCareer(Integer careerId);

	List<CareerCourseResponse> getByCourse(Integer courseId);

}