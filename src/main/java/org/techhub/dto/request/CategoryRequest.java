package org.techhub.dto.request;

import jakarta.validation.constraints.NotBlank;

public class CategoryRequest {

    private Integer categoryId;

    @NotBlank(message = "Category name is required")
    private String categoryName;

    @NotBlank(message = "Category type is required")
    private String categoryType;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Status is required")
    private String status;

    public CategoryRequest() {

    }

    public CategoryRequest(Integer categoryId,
            String categoryName,
            String categoryType,
            String description,
            String status) {

        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.description = description;
        this.status = status;
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

}