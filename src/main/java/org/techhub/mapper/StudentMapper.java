package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.StudentRegisterRequest;
import org.techhub.dto.request.StudentUpdateRequest;
import org.techhub.dto.response.StudentResponse;
import org.techhub.entity.Student;

@Component
public class StudentMapper {

	public Student toEntity(StudentRegisterRequest request) {

		Student student = new Student();

		student.setName(request.getName());
		student.setEmail(request.getEmail());
		student.setPassword(request.getPassword());
		student.setMobile(request.getMobile());
		student.setCollege(request.getCollege());
		student.setBranch(request.getBranch());
		student.setSemester(request.getSemester());
		student.setCurrentStatus(request.getCurrentStatus());
		student.setGraduationYear(request.getGraduationYear());
		student.setGoal(request.getGoal());

		return student;
	}

	public Student toEntity(StudentUpdateRequest request) {

		Student student = new Student();

		student.setStudentId(request.getStudentId());
		student.setName(request.getName());
		student.setMobile(request.getMobile());
		student.setCollege(request.getCollege());
		student.setBranch(request.getBranch());
		student.setSemester(request.getSemester());
		student.setCurrentStatus(request.getCurrentStatus());
		student.setGraduationYear(request.getGraduationYear());
		student.setGoal(request.getGoal());

		return student;
	}

	public StudentResponse toResponse(Student student) {

		if (student == null) {
			return null;
		}

		StudentResponse response = new StudentResponse();

		response.setStudentId(student.getStudentId());
		response.setName(student.getName());
		response.setEmail(student.getEmail());
		response.setMobile(student.getMobile());
		response.setCollege(student.getCollege());
		response.setBranch(student.getBranch());
		response.setSemester(student.getSemester());
		response.setCurrentStatus(student.getCurrentStatus());
		response.setGraduationYear(student.getGraduationYear());
		response.setGoal(student.getGoal());
		response.setFirstLogin(student.getFirstLogin());
		response.setProfileCompleted(student.getProfileCompleted());
		response.setCreatedAt(student.getCreatedAt());

		return response;
	}

	public List<StudentResponse> toResponse(List<Student> students) {

		List<StudentResponse> responses = new ArrayList<>();

		if (students == null || students.isEmpty()) {
			return responses;
		}

		for (Student student : students) {
			responses.add(toResponse(student));
		}

		return responses;
	}

}