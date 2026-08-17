package org.techhub.exception;

public class QuestionNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public QuestionNotFoundException() {
		super();
	}

	public QuestionNotFoundException(String message) {
		super(message);
	}

	public QuestionNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public QuestionNotFoundException(Throwable cause) {
		super(cause);
	}
}