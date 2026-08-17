package org.techhub.repository;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.techhub.entity.Student;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.rowmapper.StudentRowMapper;

@Repository
public class StudentRepositoryImpl implements StudentRepository {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(StudentRepositoryImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final StudentRowMapper rowMapper =
			new StudentRowMapper();

	@Override
	public boolean save(Student student) {

		try {

			String sql = """
					INSERT INTO student
					(
						name,
						email,
						password,
						mobile,
						college,
						branch,
						semester,
						current_status,
						graduation_year,
						goal,
						first_login,
						profile_completed
					)
					VALUES
					(
						?,?,?,?,?,?,?,?,?,?,?,?
					)
					""";

			int count = jdbcTemplate.update(sql,

					student.getName(),
					student.getEmail(),
					student.getPassword(),
					student.getMobile(),
					student.getCollege(),
					student.getBranch(),
					student.getSemester(),
					student.getCurrentStatus(),
					student.getGraduationYear(),
					student.getGoal(),
					student.getFirstLogin(),
					student.getProfileCompleted());

			if (count > 0) {

				LOGGER.info(LogConstants.STUDENT_REGISTER_SUCCESS);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public boolean update(Student student) {

	    try {

	        String sql = """
	                UPDATE student
	                SET
	                    name=?,
	                    mobile=?,
	                    college=?,
	                    branch=?,
	                    semester=?,
	                    current_status=?,
	                    graduation_year=?,
	                    goal=?,
	                    first_login=?,
	                    profile_completed=?
	                WHERE student_id=?
	                """;

	        int count = jdbcTemplate.update(
	                sql,

	                student.getName(),

	                student.getMobile(),

	                student.getCollege(),

	                student.getBranch(),

	                student.getSemester(),

	                student.getCurrentStatus(),

	                student.getGraduationYear(),

	                student.getGoal(),

	                student.getFirstLogin(),

	                student.getProfileCompleted(),

	                student.getStudentId()
	        );


	        if (count > 0) {

	            LOGGER.info(
	                    LogConstants.STUDENT_UPDATED
	            );

	            return true;
	        }

	    }
	    catch (Exception e) {

	        LOGGER.error(
	                "Error updating student: {}",
	                e.getMessage(),
	                e
	        );

	    }

	    return false;
	}

	@Override
	public boolean delete(Integer studentId) {

		try {

			String sql = "DELETE FROM student WHERE student_id=?";

			int count = jdbcTemplate.update(sql, studentId);

			if (count > 0) {

				LOGGER.info(LogConstants.STUDENT_DELETED);

				return true;
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}

	@Override
	public Student findById(Integer studentId) {

		try {

			String sql = "SELECT * FROM student WHERE student_id=?";

			List<Student> students =
					jdbcTemplate.query(sql, rowMapper, studentId);

			return students.isEmpty() ? null : students.get(0);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return null;
	}

	@Override
	public Student findByEmail(String email) {

		try {

			String sql = "SELECT * FROM student WHERE email=?";

			List<Student> students =
					jdbcTemplate.query(sql, rowMapper, email);

			return students.isEmpty() ? null : students.get(0);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return null;
	}

	@Override
	public List<Student> findAll() {

		try {

			String sql = "SELECT * FROM student";

			return jdbcTemplate.query(sql, rowMapper);

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return List.of();
	}

	@Override
	public boolean existsByEmail(String email) {

		try {

			String sql =
					"SELECT COUNT(*) FROM student WHERE email=?";

			Integer count =
					jdbcTemplate.queryForObject(sql,
							Integer.class,
							email);

			return count != null && count > 0;

		} catch (Exception e) {

			LOGGER.error(e.getMessage());

		}

		return false;
	}
}