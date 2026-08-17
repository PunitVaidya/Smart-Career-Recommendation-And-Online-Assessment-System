package org.techhub.exception;

public class StudentResultNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public StudentResultNotFoundException(String message) {
		super(message);
	}
}