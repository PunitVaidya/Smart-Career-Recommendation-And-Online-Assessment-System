package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.techhub.dto.request.QuestionRequest;
import org.techhub.dto.response.QuestionResponse;
import org.techhub.entity.Category;
import org.techhub.entity.Question;
import org.techhub.repository.CategoryRepository;

@Component
public class QuestionMapper {

    @Autowired
    private CategoryRepository categoryRepository;


    // =========================================================
    // REQUEST -> ENTITY
    // =========================================================

    public Question toEntity(QuestionRequest request) {

        Question question = new Question();


        question.setQuestionId(
                request.getQuestionId()
        );


        /*
         * IMPORTANT
         *
         * This was missing.
         *
         * It connects the question with
         * the selected assessment.
         */
        question.setAssessmentId(
                request.getAssessmentId()
        );


        question.setQuestionTitle(
                request.getQuestionTitle()
        );


        question.setOptionA(
                request.getOptionA()
        );


        question.setOptionB(
                request.getOptionB()
        );


        question.setOptionC(
                request.getOptionC()
        );


        question.setOptionD(
                request.getOptionD()
        );


        question.setCorrectAnswer(
                request.getCorrectAnswer()
        );


        question.setCategoryId(
                request.getCategoryId()
        );


        question.setDifficulty(
                request.getDifficulty()
        );


        question.setMarks(
                request.getMarks()
        );


        question.setQuestionStatus(
                request.getQuestionStatus()
        );


        return question;
    }


    // =========================================================
    // ENTITY -> RESPONSE
    // =========================================================

    public QuestionResponse toResponse(
            Question question) {

        if (question == null) {
            return null;
        }


        QuestionResponse response =
                new QuestionResponse();


        response.setQuestionId(
                question.getQuestionId()
        );


        /*
         * IMPORTANT
         *
         * Return assessment ID also.
         */
        response.setAssessmentId(
                question.getAssessmentId()
        );


        response.setQuestionTitle(
                question.getQuestionTitle()
        );


        response.setOptionA(
                question.getOptionA()
        );


        response.setOptionB(
                question.getOptionB()
        );


        response.setOptionC(
                question.getOptionC()
        );


        response.setOptionD(
                question.getOptionD()
        );


        response.setCorrectAnswer(
                question.getCorrectAnswer()
        );


        response.setCategoryId(
                question.getCategoryId()
        );


        // =====================================================
        // FETCH CATEGORY NAME
        // =====================================================

        if (question.getCategoryId() != null) {

            Category category =
                    categoryRepository.findById(
                            question.getCategoryId()
                    );


            if (category != null) {

                response.setCategoryName(
                        category.getCategoryName()
                );

            }
        }


        response.setDifficulty(
                question.getDifficulty()
        );


        response.setMarks(
                question.getMarks()
        );


        response.setQuestionStatus(
                question.getQuestionStatus()
        );


        response.setCreatedAt(
                question.getCreatedAt()
        );


        return response;
    }


    // =========================================================
    // LIST<ENTITY> -> LIST<RESPONSE>
    // =========================================================

    public List<QuestionResponse> toResponse(
            List<Question> questions) {

        List<QuestionResponse> responses =
                new ArrayList<>();


        if (
                questions == null ||
                questions.isEmpty()
        ) {

            return responses;
        }


        for (Question question : questions) {

            responses.add(
                    toResponse(question)
            );

        }


        return responses;
    }

}