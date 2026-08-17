package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.CourseRequest;
import org.techhub.dto.response.CourseResponse;
import org.techhub.entity.Course;
import org.techhub.exception.CourseNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.mapper.CourseMapper;
import org.techhub.repository.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
	private CourseRepository repository;

	@Autowired
	private CourseMapper mapper;

	@Override
	public CourseResponse save(CourseRequest request) {

		if (repository.existsByName(request.getCourseName())) {
			throw new DuplicateRecordException("Course already exists.");
		}

		Course course = mapper.toEntity(request);

		repository.save(course);

		return mapper.toResponse(
				repository.findByName(request.getCourseName()));
	}

	@Override
	public CourseResponse update(CourseRequest request) {

		if (repository.findById(request.getCourseId()) == null) {
			throw new CourseNotFoundException("Course not found.");
		}

		Course course = mapper.toEntity(request);

		repository.update(course);

		return mapper.toResponse(
				repository.findById(request.getCourseId()));
	}

	@Override
	public boolean delete(Integer courseId) {

		if (repository.findById(courseId) == null) {
			throw new CourseNotFoundException("Course not found.");
		}

		return repository.delete(courseId);
	}

	@Override
	public CourseResponse getById(Integer courseId) {

		Course course = repository.findById(courseId);

		if (course == null) {
			throw new CourseNotFoundException("Course not found.");
		}

		return mapper.toResponse(course);
	}

	@Override
	public CourseResponse getByName(String courseName) {

		Course course = repository.findByName(courseName);

		if (course == null) {
			throw new CourseNotFoundException("Course not found.");
		}

		return mapper.toResponse(course);
	}

	@Override
	public List<CourseResponse> getAll() {
		return mapper.toResponse(repository.findAll());
	}

	@Override
	public List<CourseResponse> getActiveCourses() {
		return mapper.toResponse(repository.findActiveCourses());
	}

	@Override
	public List<CourseResponse> getByLevel(String level) {
		return mapper.toResponse(repository.findByLevel(level));
	}
}