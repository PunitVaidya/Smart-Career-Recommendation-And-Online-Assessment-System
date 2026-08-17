package org.techhub.exception;

public class CategoryNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CategoryNotFoundException() {
		super();
	}

	public CategoryNotFoundException(String message) {
		super(message);
	}

	public CategoryNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public CategoryNotFoundException(Throwable cause) {
		super(cause);
	}
}