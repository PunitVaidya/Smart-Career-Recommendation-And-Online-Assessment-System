package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.CourseRequest;
import org.techhub.dto.response.CourseResponse;
import org.techhub.entity.Course;

@Component
public class CourseMapper {

	public Course toEntity(CourseRequest request) {

		Course course = new Course();

		course.setCourseId(request.getCourseId());
		course.setCourseName(request.getCourseName());
		course.setDescription(request.getDescription());
		course.setDuration(request.getDuration());
		course.setLevel(request.getLevel());
		course.setStatus(request.getStatus());

		return course;
	}

	public CourseResponse toResponse(Course course) {

		if (course == null)
			return null;

		CourseResponse response = new CourseResponse();

		response.setCourseId(course.getCourseId());
		response.setCourseName(course.getCourseName());
		response.setDescription(course.getDescription());
		response.setDuration(course.getDuration());
		response.setLevel(course.getLevel());
		response.setStatus(course.getStatus());
		response.setCreatedAt(course.getCreatedAt());

		return response;
	}

	public List<CourseResponse> toResponse(List<Course> list) {

		List<CourseResponse> responses = new ArrayList<>();

		for (Course course : list) {
			responses.add(toResponse(course));
		}

		return responses;
	}
}