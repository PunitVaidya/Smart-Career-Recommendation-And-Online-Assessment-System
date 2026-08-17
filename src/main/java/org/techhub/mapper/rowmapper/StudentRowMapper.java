package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.Student;

public class StudentRowMapper implements RowMapper<Student> {

    @Override
    public Student mapRow(ResultSet rs, int rowNum) throws SQLException {

        Student student = new Student();

        student.setStudentId(rs.getInt("student_id"));
        student.setName(rs.getString("name"));
        student.setEmail(rs.getString("email"));
        student.setPassword(rs.getString("password"));
        student.setMobile(rs.getString("mobile"));
        student.setCollege(rs.getString("college"));
        student.setBranch(rs.getString("branch"));
        student.setSemester(rs.getInt("semester"));
        student.setCurrentStatus(rs.getString("current_status"));
        student.setGraduationYear(rs.getInt("graduation_year"));
        student.setGoal(rs.getString("goal"));
        student.setFirstLogin(rs.getBoolean("first_login"));
        student.setProfileCompleted(rs.getBoolean("profile_completed"));
        student.setCreatedAt(rs.getTimestamp("created_at"));
        student.setUpdatedAt(rs.getTimestamp("updated_at"));

        return student;
    }
}