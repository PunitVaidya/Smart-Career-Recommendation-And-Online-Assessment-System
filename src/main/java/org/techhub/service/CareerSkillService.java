package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.CareerSkillRequest;
import org.techhub.dto.response.CareerSkillResponse;

public interface CareerSkillService {

	CareerSkillResponse save(CareerSkillRequest request);

	CareerSkillResponse update(CareerSkillRequest request);

	boolean delete(Integer careerSkillId);

	CareerSkillResponse getById(Integer careerSkillId);

	List<CareerSkillResponse> getAll();

	List<CareerSkillResponse> getByCareer(Integer careerId);

	List<CareerSkillResponse> getByCategory(Integer categoryId);

}