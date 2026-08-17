package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.Question;

public class QuestionRowMapper
        implements RowMapper<Question> {


    @Override
    public Question mapRow(
            ResultSet rs,
            int rowNum)
            throws SQLException {


        Question question =
                new Question();


        question.setQuestionId(
                rs.getInt("question_id")
        );


        question.setQuestionTitle(
                rs.getString("question_title")
        );


        question.setOptionA(
                rs.getString("option_a")
        );


        question.setOptionB(
                rs.getString("option_b")
        );


        question.setOptionC(
                rs.getString("option_c")
        );


        question.setOptionD(
                rs.getString("option_d")
        );


        question.setCorrectAnswer(
                rs.getString("correct_answer")
        );


        question.setCategoryId(
                rs.getInt("category_id")
        );


        question.setDifficulty(
                rs.getString("difficulty")
        );


        question.setMarks(
                rs.getInt("marks")
        );


        question.setQuestionStatus(
                rs.getString("question_status")
        );


        question.setCreatedAt(
                rs.getTimestamp("created_at")
        );


        /*
         * IMPORTANT
         *
         * Read assessment_id from database.
         */
        question.setAssessmentId(
                rs.getObject("assessment_id") != null
                        ? rs.getInt("assessment_id")
                        : null
        );


        return question;
    }

}