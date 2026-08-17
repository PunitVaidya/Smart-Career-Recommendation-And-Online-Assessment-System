package org.techhub.service;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.LoginRequest;
import org.techhub.dto.request.StudentRegisterRequest;
import org.techhub.dto.request.StudentUpdateRequest;
import org.techhub.dto.response.StudentResponse;
import org.techhub.entity.Student;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.exception.InvalidCredentialsException;
import org.techhub.exception.StudentNotFoundException;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.StudentMapper;
import org.techhub.repository.StudentRepository;
import org.techhub.security.PasswordUtil;

@Service
public class StudentServiceImpl implements StudentService {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(StudentServiceImpl.class);

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private StudentMapper studentMapper;

	@Override
	public StudentResponse register(StudentRegisterRequest request) {

		if (studentRepository.existsByEmail(request.getEmail())) {

			LOGGER.error(LogConstants.STUDENT_REGISTER_FAILED);

			throw new DuplicateRecordException("Email already registered.");

		}

		Student student = studentMapper.toEntity(request);

		student.setPassword(
				PasswordUtil.encryptPassword(request.getPassword()));

		student.setFirstLogin(true);
		student.setProfileCompleted(false);

		boolean status = studentRepository.save(student);

		if (!status) {

			LOGGER.error(LogConstants.STUDENT_REGISTER_FAILED);

			throw new RuntimeException("Unable to register student.");

		}

		LOGGER.info(LogConstants.STUDENT_REGISTER_SUCCESS);

		return studentMapper.toResponse(
				studentRepository.findByEmail(request.getEmail()));

	}

	@Override
	public StudentResponse login(LoginRequest request) {

		Student student =
				studentRepository.findByEmail(request.getEmail());

		if (student == null) {

			LOGGER.error(LogConstants.STUDENT_NOT_FOUND);

			throw new StudentNotFoundException("Student not found.");

		}

		boolean matched =
				PasswordUtil.matchPassword(
						request.getPassword(),
						student.getPassword());

		if (!matched) {

			LOGGER.error(LogConstants.INVALID_CREDENTIALS);

			throw new InvalidCredentialsException(
					"Invalid email or password.");

		}

		LOGGER.info(LogConstants.LOGIN_SUCCESS);

		return studentMapper.toResponse(student);

	}

	@Override
	public StudentResponse getStudentById(Integer studentId) {

		Student student =
				studentRepository.findById(studentId);

		if (student == null) {

			LOGGER.error(LogConstants.STUDENT_NOT_FOUND);

			throw new StudentNotFoundException("Student not found.");

		}

		return studentMapper.toResponse(student);

	}

	@Override
	public StudentResponse getStudentByEmail(String email) {

		Student student =
				studentRepository.findByEmail(email);

		if (student == null) {

			LOGGER.error(LogConstants.STUDENT_NOT_FOUND);

			throw new StudentNotFoundException("Student not found.");

		}

		return studentMapper.toResponse(student);

	}

	@Override
	public List<StudentResponse> getAllStudents() {

		List<Student> students =
				studentRepository.findAll();

		return studentMapper.toResponse(students);

	}

	@Override
	public StudentResponse update(StudentUpdateRequest request) {

	    /*
	     * =====================================================
	     * FIND EXISTING STUDENT
	     * =====================================================
	     */

	    Student dbStudent =
	            studentRepository.findById(
	                    request.getStudentId()
	            );


	    if (dbStudent == null) {

	        LOGGER.error(
	                LogConstants.STUDENT_NOT_FOUND
	        );

	        throw new StudentNotFoundException(
	                "Student not found."
	        );
	    }


	    /*
	     * =====================================================
	     * CREATE UPDATED STUDENT
	     * =====================================================
	     */

	    Student student =
	            studentMapper.toEntity(request);


	    /*
	     * =====================================================
	     * PROTECTED DATABASE VALUES
	     * =====================================================
	     *
	     * Email and password must not be changed
	     * through this update operation.
	     */

	    student.setEmail(
	            dbStudent.getEmail()
	    );


	    student.setPassword(
	            dbStudent.getPassword()
	    );


	    /*
	     * =====================================================
	     * FIRST LOGIN / PROFILE COMPLETION
	     * =====================================================
	     *
	     * FIRST LOGIN:
	     *
	     * firstLogin       = true
	     * profileCompleted = false
	     *
	     * When the student selects the career goal for
	     * the first time, the profile becomes completed.
	     *
	     * Therefore:
	     *
	     * firstLogin       = false
	     * profileCompleted = true
	     */

	    if (Boolean.TRUE.equals(
	            dbStudent.getFirstLogin())) {

	        /*
	         * First-time student is completing
	         * the onboarding process.
	         */

	        student.setFirstLogin(false);

	        student.setProfileCompleted(true);

	    }
	    else {

	        /*
	         * Existing student is updating normal
	         * profile information.
	         *
	         * Do NOT change onboarding status.
	         */

	        student.setFirstLogin(
	                dbStudent.getFirstLogin()
	        );

	        student.setProfileCompleted(
	                dbStudent.getProfileCompleted()
	        );


	        /*
	         * =================================================
	         * CAREER GOAL PROTECTION
	         * =================================================
	         *
	         * Once onboarding is completed, the student's
	         * career goal cannot be changed using this
	         * student update operation.
	         *
	         * Admin can change it through admin functionality.
	         */

	        student.setGoal(
	                dbStudent.getGoal()
	        );
	    }


	    /*
	     * =====================================================
	     * UPDATE DATABASE
	     * =====================================================
	     */

	    boolean status =
	            studentRepository.update(
	                    student
	            );


	    if (!status) {

	        throw new RuntimeException(
	                "Unable to update student."
	        );
	    }


	    LOGGER.info(
	            LogConstants.STUDENT_UPDATED
	    );


	    /*
	     * =====================================================
	     * RETURN UPDATED STUDENT
	     * =====================================================
	     */

	    return studentMapper.toResponse(
	            studentRepository.findById(
	                    student.getStudentId()
	            )
	    );
	}
	@Override
	public boolean delete(Integer studentId) {

		Student student =
				studentRepository.findById(studentId);

		if (student == null) {

			LOGGER.error(LogConstants.STUDENT_NOT_FOUND);

			throw new StudentNotFoundException("Student not found.");

		}

		boolean status =
				studentRepository.delete(studentId);

		if (!status) {

			throw new RuntimeException("Unable to delete student.");

		}

		LOGGER.info(LogConstants.STUDENT_DELETED);

		return true;

	}

}