package org.techhub.exception;

public class RoadmapNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public RoadmapNotFoundException(String message) {
		super(message);
	}
}