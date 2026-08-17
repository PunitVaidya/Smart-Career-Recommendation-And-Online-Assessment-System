package org.techhub.mapper.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.techhub.entity.CareerRecommendation;

public class CareerRecommendationRowMapper
        implements RowMapper<CareerRecommendation> {

    @Override
    public CareerRecommendation mapRow(
            ResultSet rs,
            int rowNum)
            throws SQLException {

        CareerRecommendation recommendation =
                new CareerRecommendation();

        recommendation.setRecommendationId(
                rs.getInt("recommendation_id"));

        recommendation.setAttemptId(
                rs.getInt("attempt_id"));

        recommendation.setCareerId(
                rs.getInt("career_id"));

        // =====================================================
        // CAREER NAME
        // =====================================================

        recommendation.setCareerName(
                rs.getString("career_name"));

        recommendation.setMatchPercentage(
                rs.getDouble("match_percentage"));

        recommendation.setRankNo(
                rs.getInt("rank_no"));

        recommendation.setStrengths(
                rs.getString("strengths"));

        recommendation.setWeaknesses(
                rs.getString("weaknesses"));

        recommendation.setCreatedAt(
                rs.getTimestamp("created_at"));

        return recommendation;
    }
}