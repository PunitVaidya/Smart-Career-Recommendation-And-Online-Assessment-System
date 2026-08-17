package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.CareerSkillRequest;
import org.techhub.dto.response.CareerSkillResponse;
import org.techhub.entity.CareerSkill;
import org.techhub.exception.CareerSkillNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.mapper.CareerSkillMapper;
import org.techhub.repository.CareerSkillRepository;

@Service
public class CareerSkillServiceImpl implements CareerSkillService {

	@Autowired
	private CareerSkillRepository repository;

	@Autowired
	private CareerSkillMapper mapper;

	@Override
	public CareerSkillResponse save(CareerSkillRequest request) {

		if (repository.exists(request.getCareerId(), request.getCategoryId())) {
			throw new DuplicateRecordException(
					"Career Skill already exists.");
		}

		CareerSkill skill = mapper.toEntity(request);

		repository.save(skill);

		return mapper.toResponse(skill);
	}

	@Override
	public CareerSkillResponse update(CareerSkillRequest request) {

		CareerSkill db = repository.findById(request.getCareerSkillId());

		if (db == null) {
			throw new CareerSkillNotFoundException(
					"Career Skill not found.");
		}

		CareerSkill skill = mapper.toEntity(request);

		repository.update(skill);

		return mapper.toResponse(
				repository.findById(request.getCareerSkillId()));
	}

	@Override
	public boolean delete(Integer careerSkillId) {

		if (repository.findById(careerSkillId) == null) {
			throw new CareerSkillNotFoundException(
					"Career Skill not found.");
		}

		return repository.delete(careerSkillId);
	}

	@Override
	public CareerSkillResponse getById(Integer careerSkillId) {

		CareerSkill skill = repository.findById(careerSkillId);

		if (skill == null) {
			throw new CareerSkillNotFoundException(
					"Career Skill not found.");
		}

		return mapper.toResponse(skill);
	}

	@Override
	public List<CareerSkillResponse> getAll() {

		return mapper.toResponse(repository.findAll());
	}

	@Override
	public List<CareerSkillResponse> getByCareer(Integer careerId) {

		return mapper.toResponse(repository.findByCareer(careerId));
	}

	@Override
	public List<CareerSkillResponse> getByCategory(Integer categoryId) {

		return mapper.toResponse(repository.findByCategory(categoryId));
	}
}