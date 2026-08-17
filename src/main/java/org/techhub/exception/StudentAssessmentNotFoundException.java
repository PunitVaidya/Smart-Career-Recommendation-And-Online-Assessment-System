package org.techhub.exception;

public class StudentAssessmentNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public StudentAssessmentNotFoundException(String message) {
		super(message);
	}
}