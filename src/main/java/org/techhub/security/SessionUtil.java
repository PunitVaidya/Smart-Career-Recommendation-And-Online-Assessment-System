package org.techhub.security;

import jakarta.servlet.http.HttpSession;

public final class SessionUtil {

	private SessionUtil() {

	}

	// Student

	public static void createStudentSession(HttpSession session, Object student) {

		session.setAttribute(SecurityConstants.STUDENT_SESSION, student);

	}

	public static Object getStudent(HttpSession session) {

		return session.getAttribute(SecurityConstants.STUDENT_SESSION);

	}

	// Admin

	public static void createAdminSession(HttpSession session, Object admin) {

		session.setAttribute(SecurityConstants.ADMIN_SESSION, admin);

	}

	public static Object getAdmin(HttpSession session) {

		return session.getAttribute(SecurityConstants.ADMIN_SESSION);

	}

	// Destroy Session

	public static void invalidate(HttpSession session) {

		if (session != null) {

			session.invalidate();

		}

	}

}