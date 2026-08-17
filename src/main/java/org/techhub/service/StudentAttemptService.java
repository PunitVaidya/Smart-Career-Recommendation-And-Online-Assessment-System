package org.techhub.service;

import org.techhub.dto.request.StudentAttemptRequest;
import org.techhub.dto.response.StudentAttemptResponse;

public interface StudentAttemptService {

	StudentAttemptResponse startAttempt(StudentAttemptRequest request);

	StudentAttemptResponse getAttempt(Integer attemptId);

	StudentAttemptResponse submitAttempt(Integer attemptId);

}