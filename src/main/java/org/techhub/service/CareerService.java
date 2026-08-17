package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.CareerRequest;
import org.techhub.dto.response.CareerResponse;

public interface CareerService {

	CareerResponse save(CareerRequest request);

	CareerResponse update(CareerRequest request);

	boolean delete(Integer careerId);

	CareerResponse getById(Integer careerId);

	CareerResponse getByName(String careerName);

	List<CareerResponse> getAll();

	List<CareerResponse> getActiveCareers();

	List<CareerResponse> getByCategory(String category);

	List<CareerResponse> getBySkillLevel(String requiredSkillLevel);

}