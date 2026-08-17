package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.CareerSkillRequest;
import org.techhub.dto.response.CareerSkillResponse;
import org.techhub.entity.CareerSkill;

@Component
public class CareerSkillMapper {

	public CareerSkill toEntity(CareerSkillRequest request) {

		CareerSkill skill = new CareerSkill();

		skill.setCareerSkillId(request.getCareerSkillId());
		skill.setCareerId(request.getCareerId());
		skill.setCategoryId(request.getCategoryId());
		skill.setMinimumScore(request.getMinimumScore());
		skill.setWeight(request.getWeight());

		return skill;
	}

	public CareerSkillResponse toResponse(CareerSkill skill) {

		if (skill == null)
			return null;

		CareerSkillResponse response = new CareerSkillResponse();

		response.setCareerSkillId(skill.getCareerSkillId());
		response.setCareerId(skill.getCareerId());
		response.setCategoryId(skill.getCategoryId());
		response.setMinimumScore(skill.getMinimumScore());
		response.setWeight(skill.getWeight());
		response.setCreatedAt(skill.getCreatedAt());

		return response;
	}

	public List<CareerSkillResponse> toResponse(List<CareerSkill> list) {

		List<CareerSkillResponse> responses = new ArrayList<>();

		for (CareerSkill skill : list) {
			responses.add(toResponse(skill));
		}

		return responses;
	}
}