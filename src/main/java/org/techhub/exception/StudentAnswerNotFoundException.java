package org.techhub.exception;

public class StudentAnswerNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public StudentAnswerNotFoundException(String message) {
		super(message);
	}
}