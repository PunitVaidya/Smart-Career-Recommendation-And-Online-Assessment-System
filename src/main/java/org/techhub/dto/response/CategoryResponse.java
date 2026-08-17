package org.techhub.dto.response;

import java.sql.Timestamp;

public class CategoryResponse {

    private Integer categoryId;

    private String categoryName;

    private String categoryType;

    private String description;

    private String status;

    private Timestamp createdAt;

    public CategoryResponse() {

    }

    public CategoryResponse(Integer categoryId, String categoryName,
            String categoryType, String description,
            String status, Timestamp createdAt) {

        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Integer getCategoryId() {

        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {

        this.categoryId = categoryId;
    }

    public String getCategoryName() {

        return categoryName;
    }

    public void setCategoryName(String categoryName) {

        this.categoryName = categoryName;
    }

    public String getCategoryType() {

        return categoryType;
    }

    public void setCategoryType(String categoryType) {

        this.categoryType = categoryType;
    }

    public String getDescription() {

        return description;
    }

    public void setDescription(String description) {

        this.description = description;
    }

    public String getStatus() {

        return status;
    }

    public void setStatus(String status) {

        this.status = status;
    }

    public Timestamp getCreatedAt() {

        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {

        this.createdAt = createdAt;
    }

}