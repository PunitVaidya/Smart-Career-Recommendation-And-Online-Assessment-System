package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.CourseRequest;
import org.techhub.dto.response.CourseResponse;

public interface CourseService {

	CourseResponse save(CourseRequest request);

	CourseResponse update(CourseRequest request);

	boolean delete(Integer courseId);

	CourseResponse getById(Integer courseId);

	CourseResponse getByName(String courseName);

	List<CourseResponse> getAll();

	List<CourseResponse> getActiveCourses();

	List<CourseResponse> getByLevel(String level);

}