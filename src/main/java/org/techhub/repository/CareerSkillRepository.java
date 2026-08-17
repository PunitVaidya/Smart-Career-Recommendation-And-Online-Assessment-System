package org.techhub.repository;

import java.util.List;

import org.techhub.entity.CareerSkill;

public interface CareerSkillRepository {

    // =========================================================
    // SAVE
    // =========================================================

    boolean save(CareerSkill skill);


    // =========================================================
    // UPDATE
    // =========================================================

    boolean update(CareerSkill skill);


    // =========================================================
    // DELETE
    // =========================================================

    boolean delete(Integer careerSkillId);


    // =========================================================
    // FIND BY ID
    // =========================================================

    CareerSkill findById(Integer careerSkillId);


    // =========================================================
    // FIND ALL
    // =========================================================

    List<CareerSkill> findAll();


    // =========================================================
    // FIND BY CAREER
    // =========================================================

    List<CareerSkill> findByCareer(
            Integer careerId);


    // =========================================================
    // FIND BY CATEGORY
    // =========================================================

    List<CareerSkill> findByCategory(
            Integer categoryId);


    // =========================================================
    // FIND BY CAREER + CATEGORY
    // =========================================================

    CareerSkill findByCareerAndCategory(
            Integer careerId,
            Integer categoryId);


    // =========================================================
    // CHECK DUPLICATE
    // =========================================================

    boolean exists(
            Integer careerId,
            Integer categoryId);
}