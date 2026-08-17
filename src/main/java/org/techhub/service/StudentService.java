package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.LoginRequest;
import org.techhub.dto.request.StudentRegisterRequest;
import org.techhub.dto.request.StudentUpdateRequest;
import org.techhub.dto.response.StudentResponse;

public interface StudentService {

	StudentResponse register(StudentRegisterRequest request);

	StudentResponse login(LoginRequest request);

	StudentResponse getStudentById(Integer studentId);

	StudentResponse getStudentByEmail(String email);

	List<StudentResponse> getAllStudents();

	StudentResponse update(StudentUpdateRequest request);

	boolean delete(Integer studentId);

}