package org.techhub.repository;

import java.util.List;

import org.techhub.entity.Student;

public interface StudentRepository {

	boolean save(Student student);

	boolean update(Student student);

	boolean delete(Integer studentId);

	Student findById(Integer studentId);

	Student findByEmail(String email);

	List<Student> findAll();

	boolean existsByEmail(String email);

}