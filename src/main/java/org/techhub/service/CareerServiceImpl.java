package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.CareerRequest;
import org.techhub.dto.response.CareerResponse;
import org.techhub.entity.Career;
import org.techhub.exception.CareerNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.CareerMapper;
import org.techhub.repository.CareerRepository;
import org.slf4j.Logger;

@Service
public class CareerServiceImpl implements CareerService {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(CareerServiceImpl.class);

	@Autowired
	private CareerRepository repository;

	@Autowired
	private CareerMapper mapper;

	@Override
	public CareerResponse save(CareerRequest request) {

		if (repository.existsByName(request.getCareerName())) {
			throw new DuplicateRecordException("Career already exists.");
		}

		Career career = mapper.toEntity(request);

		boolean status = repository.save(career);

		if (!status) {
			throw new RuntimeException("Unable to save career.");
		}

		LOGGER.info(LogConstants.CAREER_ADDED);

		return mapper.toResponse(
				repository.findByName(request.getCareerName()));
	}

	@Override
	public CareerResponse update(CareerRequest request) {

		Career dbCareer =
				repository.findById(request.getCareerId());

		if (dbCareer == null) {
			throw new CareerNotFoundException("Career not found.");
		}

		Career career = mapper.toEntity(request);

		repository.update(career);

		LOGGER.info(LogConstants.CAREER_UPDATED);

		return mapper.toResponse(
				repository.findById(request.getCareerId()));
	}

	@Override
	public boolean delete(Integer careerId) {

		Career career = repository.findById(careerId);

		if (career == null) {
			throw new CareerNotFoundException("Career not found.");
		}

		repository.delete(careerId);

		LOGGER.info(LogConstants.CAREER_DELETED);

		return true;
	}

	@Override
	public CareerResponse getById(Integer careerId) {

		Career career = repository.findById(careerId);

		if (career == null) {
			throw new CareerNotFoundException("Career not found.");
		}

		return mapper.toResponse(career);
	}

	@Override
	public CareerResponse getByName(String careerName) {

		Career career = repository.findByName(careerName);

		if (career == null) {
			throw new CareerNotFoundException("Career not found.");
		}

		return mapper.toResponse(career);
	}

	@Override
	public List<CareerResponse> getAll() {

		return mapper.toResponse(repository.findAll());
	}

	@Override
	public List<CareerResponse> getActiveCareers() {

		return mapper.toResponse(repository.findActiveCareers());
	}

	@Override
	public List<CareerResponse> getByCategory(String category) {

		return mapper.toResponse(repository.findByCategory(category));
	}

	@Override
	public List<CareerResponse> getBySkillLevel(String requiredSkillLevel) {

		return mapper.toResponse(
				repository.findBySkillLevel(requiredSkillLevel));
	}

}