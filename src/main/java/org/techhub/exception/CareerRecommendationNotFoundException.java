package org.techhub.exception;

public class CareerRecommendationNotFoundException
		extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CareerRecommendationNotFoundException(String message) {
		super(message);
	}
}