package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.CareerRequest;
import org.techhub.dto.response.CareerResponse;
import org.techhub.entity.Career;

@Component
public class CareerMapper {

	public Career toEntity(CareerRequest request) {

		Career career = new Career();

		career.setCareerId(request.getCareerId());
		career.setCareerName(request.getCareerName());
		career.setDescription(request.getDescription());
		career.setCategory(request.getCategory());
		career.setRequiredSkillLevel(request.getRequiredSkillLevel());
		career.setAverageSalary(request.getAverageSalary());
		career.setDemandLevel(request.getDemandLevel());
		career.setStatus(request.getStatus());

		return career;
	}

	public CareerResponse toResponse(Career career) {

		if (career == null) {
			return null;
		}

		CareerResponse response = new CareerResponse();

		response.setCareerId(career.getCareerId());
		response.setCareerName(career.getCareerName());
		response.setDescription(career.getDescription());
		response.setCategory(career.getCategory());
		response.setRequiredSkillLevel(career.getRequiredSkillLevel());
		response.setAverageSalary(career.getAverageSalary());
		response.setDemandLevel(career.getDemandLevel());
		response.setStatus(career.getStatus());
		response.setCreatedAt(career.getCreatedAt());

		return response;
	}

	public List<CareerResponse> toResponse(List<Career> careers) {

		List<CareerResponse> responses = new ArrayList<>();

		if (careers == null || careers.isEmpty()) {
			return responses;
		}

		for (Career career : careers) {
			responses.add(toResponse(career));
		}

		return responses;
	}
}