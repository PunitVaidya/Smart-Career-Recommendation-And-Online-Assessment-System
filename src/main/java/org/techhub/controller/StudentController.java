package org.techhub.controller;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.LoginRequest;
import org.techhub.dto.request.StudentRegisterRequest;
import org.techhub.dto.request.StudentUpdateRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.StudentResponse;
import org.techhub.logger.ApplicationLogger;
import org.techhub.service.StudentService;
import org.techhub.security.SessionUtil;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/student")
@Validated
public class StudentController {

    private static final Logger LOGGER =
            ApplicationLogger.getLogger(StudentController.class);

    @Autowired
    private StudentService studentService;

    // ===========================
    // Register Student
    // ===========================

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<StudentResponse>> registerStudent(
            @Valid @RequestBody StudentRegisterRequest request) {

        StudentResponse student =
                studentService.register(request);

        LOGGER.info(MessageConstants.STUDENT_REGISTER_SUCCESS);

        ApiResponse<StudentResponse> response =
                new ApiResponse<>(
                        true,
                        MessageConstants.STUDENT_REGISTER_SUCCESS,
                        student);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // ===========================
    // Student Login
    // ===========================

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<StudentResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpSession session) {

        StudentResponse student =
                studentService.login(request);

        SessionUtil.createStudentSession(session, student);

        LOGGER.info(MessageConstants.LOGIN_SUCCESS);

        ApiResponse<StudentResponse> response =
                new ApiResponse<>(
                        true,
                        MessageConstants.LOGIN_SUCCESS,
                        student);

        return ResponseEntity.ok(response);
    }

    // ===========================
    // Logout
    // ===========================

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(
            HttpSession session) {

        SessionUtil.invalidate(session);

        ApiResponse<String> response =
                new ApiResponse<>(
                        true,
                        MessageConstants.LOGOUT_SUCCESS,
                        null);

        return ResponseEntity.ok(response);
    }

    // ===========================
    // Get Student By Id
    // ===========================

    @GetMapping("/{studentId}")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentById(
            @PathVariable Integer studentId) {

        StudentResponse student =
                studentService.getStudentById(studentId);

        ApiResponse<StudentResponse> response =
                new ApiResponse<>(
                        true,
                        MessageConstants.STUDENT_FETCH_SUCCESS,
                        student);

        return ResponseEntity.ok(response);
    }

    // ===========================
    // Get Student By Email
    // ===========================

    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentByEmail(
            @PathVariable String email) {

        StudentResponse student =
                studentService.getStudentByEmail(email);

        ApiResponse<StudentResponse> response =
                new ApiResponse<>(
                        true,
                        MessageConstants.STUDENT_FETCH_SUCCESS,
                        student);

        return ResponseEntity.ok(response);
    }

    // ===========================
    // Get All Students
    // ===========================

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getAllStudents() {

        List<StudentResponse> students =
                studentService.getAllStudents();

        ApiResponse<List<StudentResponse>> response =
                new ApiResponse<>(
                        true,
                        MessageConstants.STUDENT_LIST_SUCCESS,
                        students);

        return ResponseEntity.ok(response);
    }

    // ===========================
    // Update Student
    // ===========================

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudent(
            @Valid @RequestBody StudentUpdateRequest request) {

        StudentResponse student =
                studentService.update(request);

        ApiResponse<StudentResponse> response =
                new ApiResponse<>(
                        true,
                        MessageConstants.STUDENT_UPDATED,
                        student);

        return ResponseEntity.ok(response);
    }

    // ===========================
    // Delete Student
    // ===========================

    @DeleteMapping("/{studentId}")
    public ResponseEntity<ApiResponse<String>> deleteStudent(
            @PathVariable Integer studentId) {

        studentService.delete(studentId);

        ApiResponse<String> response =
                new ApiResponse<>(
                        true,
                        MessageConstants.STUDENT_DELETED,
                        null);

        return ResponseEntity.ok(response);
    }

}