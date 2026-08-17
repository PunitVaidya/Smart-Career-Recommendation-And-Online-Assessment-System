package org.techhub.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import org.techhub.entity.CareerSkill;
import org.techhub.mapper.rowmapper.CareerSkillRowMapper;

@Repository
public class CareerSkillRepositoryImpl
        implements CareerSkillRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final CareerSkillRowMapper rowMapper =
            new CareerSkillRowMapper();

    // =========================================================
    // SAVE
    // =========================================================

    @Override
    public boolean save(CareerSkill skill) {

        String sql = """
                INSERT INTO career_skill
                (
                    career_id,
                    category_id,
                    minimum_score,
                    weight
                )
                VALUES
                (
                    ?, ?, ?, ?
                )
                """;

        int count = jdbcTemplate.update(
                sql,
                skill.getCareerId(),
                skill.getCategoryId(),
                skill.getMinimumScore(),
                skill.getWeight()
        );

        return count > 0;
    }

    // =========================================================
    // UPDATE
    // =========================================================

    @Override
    public boolean update(CareerSkill skill) {

        String sql = """
                UPDATE career_skill
                SET
                    career_id = ?,
                    category_id = ?,
                    minimum_score = ?,
                    weight = ?
                WHERE career_skill_id = ?
                """;

        int count = jdbcTemplate.update(
                sql,
                skill.getCareerId(),
                skill.getCategoryId(),
                skill.getMinimumScore(),
                skill.getWeight(),
                skill.getCareerSkillId()
        );

        return count > 0;
    }

    // =========================================================
    // DELETE
    // =========================================================

    @Override
    public boolean delete(Integer careerSkillId) {

        int count = jdbcTemplate.update(
                """
                DELETE FROM career_skill
                WHERE career_skill_id = ?
                """,
                careerSkillId
        );

        return count > 0;
    }

    // =========================================================
    // FIND BY ID
    // =========================================================

    @Override
    public CareerSkill findById(Integer careerSkillId) {

        List<CareerSkill> list =
                jdbcTemplate.query(
                        """
                        SELECT
                            career_skill_id,
                            career_id,
                            category_id,
                            minimum_score,
                            weight,
                            created_at
                        FROM career_skill
                        WHERE career_skill_id = ?
                        """,
                        rowMapper,
                        careerSkillId
                );

        return list.isEmpty()
                ? null
                : list.get(0);
    }

    // =========================================================
    // FIND ALL
    // =========================================================

    @Override
    public List<CareerSkill> findAll() {

        return jdbcTemplate.query(
                """
                SELECT
                    career_skill_id,
                    career_id,
                    category_id,
                    minimum_score,
                    weight,
                    created_at
                FROM career_skill
                ORDER BY career_id, category_id
                """,
                rowMapper
        );
    }

    // =========================================================
    // FIND BY CAREER
    // =========================================================

    @Override
    public List<CareerSkill> findByCareer(
            Integer careerId) {

        return jdbcTemplate.query(
                """
                SELECT
                    career_skill_id,
                    career_id,
                    category_id,
                    minimum_score,
                    weight,
                    created_at
                FROM career_skill
                WHERE career_id = ?
                ORDER BY category_id
                """,
                rowMapper,
                careerId
        );
    }

    // =========================================================
    // FIND BY CATEGORY
    // =========================================================

    @Override
    public List<CareerSkill> findByCategory(
            Integer categoryId) {

        return jdbcTemplate.query(
                """
                SELECT
                    career_skill_id,
                    career_id,
                    category_id,
                    minimum_score,
                    weight,
                    created_at
                FROM career_skill
                WHERE category_id = ?
                ORDER BY career_id
                """,
                rowMapper,
                categoryId
        );
    }

    // =========================================================
    // FIND BY CAREER + CATEGORY
    // =========================================================

    @Override
    public CareerSkill findByCareerAndCategory(
            Integer careerId,
            Integer categoryId) {

        List<CareerSkill> list =
                jdbcTemplate.query(
                        """
                        SELECT
                            career_skill_id,
                            career_id,
                            category_id,
                            minimum_score,
                            weight,
                            created_at
                        FROM career_skill
                        WHERE career_id = ?
                        AND category_id = ?
                        """,
                        rowMapper,
                        careerId,
                        categoryId
                );

        return list.isEmpty()
                ? null
                : list.get(0);
    }

    // =========================================================
    // CHECK DUPLICATE
    // =========================================================

    @Override
    public boolean exists(
            Integer careerId,
            Integer categoryId) {

        Integer count =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM career_skill
                        WHERE career_id = ?
                        AND category_id = ?
                        """,
                        Integer.class,
                        careerId,
                        categoryId
                );

        return count != null && count > 0;
    }
}