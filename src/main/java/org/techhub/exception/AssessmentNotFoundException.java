package org.techhub.exception;

public class AssessmentNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public AssessmentNotFoundException(String message) {
		super(message);
	}

}