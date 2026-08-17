package org.techhub.exception;

public class CareerCourseNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CareerCourseNotFoundException(String message) {
		super(message);
	}
}