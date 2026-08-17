package org.techhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.techhub.dto.request.StudentAttemptRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.StudentAttemptResponse;
import org.techhub.service.StudentAttemptService;

@RestController
@RequestMapping("/api/student-attempt")
public class StudentAttemptController {

    @Autowired
    private StudentAttemptService service;


    // ========================================================
    // START EXAM
    // ========================================================

    @PostMapping("/start")
    public ResponseEntity<ApiResponse<StudentAttemptResponse>> start(
            @RequestBody StudentAttemptRequest request) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Attempt Started",
                        service.startAttempt(request)
                )
        );
    }


    // ========================================================
    // GET ATTEMPT
    // ========================================================

    @GetMapping("/{attemptId}")
    public ResponseEntity<ApiResponse<StudentAttemptResponse>> get(
            @PathVariable Integer attemptId) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Attempt Found",
                        service.getAttempt(attemptId)
                )
        );
    }


    // ========================================================
    // SUBMIT EXAM
    // ========================================================

    @PutMapping("/submit/{attemptId}")
    public ResponseEntity<ApiResponse<StudentAttemptResponse>> submit(
            @PathVariable Integer attemptId) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Exam Submitted",
                        service.submitAttempt(attemptId)
                )
        );
    }
}