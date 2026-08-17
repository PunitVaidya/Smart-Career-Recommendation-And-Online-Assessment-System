package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.CareerCourseRequest;
import org.techhub.dto.response.CareerCourseResponse;
import org.techhub.entity.CareerCourse;
import org.techhub.exception.CareerCourseNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.mapper.CareerCourseMapper;
import org.techhub.repository.CareerCourseRepository;

@Service
public class CareerCourseServiceImpl implements CareerCourseService {

	@Autowired
	private CareerCourseRepository repository;

	@Autowired
	private CareerCourseMapper mapper;

	@Override
	public CareerCourseResponse save(CareerCourseRequest request) {

		if (repository.exists(request.getCareerId(), request.getCourseId())) {
			throw new DuplicateRecordException("Career Course already exists.");
		}

		CareerCourse careerCourse = mapper.toEntity(request);

		repository.save(careerCourse);

		return mapper.toResponse(careerCourse);
	}

	@Override
	public CareerCourseResponse update(CareerCourseRequest request) {

		CareerCourse db = repository.findById(request.getCareerCourseId());

		if (db == null) {
			throw new CareerCourseNotFoundException("Career Course not found.");
		}

		CareerCourse careerCourse = mapper.toEntity(request);

		repository.update(careerCourse);

		return mapper.toResponse(
				repository.findById(request.getCareerCourseId()));
	}

	@Override
	public boolean delete(Integer careerCourseId) {

		if (repository.findById(careerCourseId) == null) {
			throw new CareerCourseNotFoundException("Career Course not found.");
		}

		return repository.delete(careerCourseId);
	}

	@Override
	public CareerCourseResponse getById(Integer careerCourseId) {

		CareerCourse careerCourse = repository.findById(careerCourseId);

		if (careerCourse == null) {
			throw new CareerCourseNotFoundException("Career Course not found.");
		}

		return mapper.toResponse(careerCourse);
	}

	@Override
	public List<CareerCourseResponse> getAll() {

		return mapper.toResponse(repository.findAll());
	}

	@Override
	public List<CareerCourseResponse> getByCareer(Integer careerId) {

		return mapper.toResponse(repository.findByCareer(careerId));
	}

	@Override
	public List<CareerCourseResponse> getByCourse(Integer courseId) {

		return mapper.toResponse(repository.findByCourse(courseId));
	}
}