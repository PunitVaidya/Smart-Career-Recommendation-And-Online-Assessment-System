package org.techhub.exception;

public class AssessmentQuestionNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public AssessmentQuestionNotFoundException(String message) {
		super(message);
	}
}