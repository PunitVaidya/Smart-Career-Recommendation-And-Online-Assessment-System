package org.techhub.repository;

import java.util.List;

import org.techhub.entity.CareerCourse;

public interface CareerCourseRepository {

	boolean save(CareerCourse careerCourse);

	boolean update(CareerCourse careerCourse);

	boolean delete(Integer careerCourseId);

	CareerCourse findById(Integer careerCourseId);

	List<CareerCourse> findAll();

	List<CareerCourse> findByCareer(Integer careerId);

	List<CareerCourse> findByCourse(Integer courseId);

	boolean exists(Integer careerId, Integer courseId);

}