package org.techhub.repository;

import java.util.List;

import org.techhub.entity.Course;

public interface CourseRepository {

	boolean save(Course course);

	boolean update(Course course);

	boolean delete(Integer courseId);

	Course findById(Integer courseId);

	Course findByName(String courseName);

	List<Course> findAll();

	List<Course> findActiveCourses();

	List<Course> findByLevel(String level);

	boolean existsByName(String courseName);

}