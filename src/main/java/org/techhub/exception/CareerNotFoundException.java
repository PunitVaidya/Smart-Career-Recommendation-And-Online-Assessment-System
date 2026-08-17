package org.techhub.exception;

public class CareerNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CareerNotFoundException(String message) {
		super(message);
	}
}