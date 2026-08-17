package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.request.CategoryRequest;
import org.techhub.dto.response.CategoryResponse;
import org.techhub.entity.Category;

@Component
public class CategoryMapper {

    /**
     * Request -> Entity
     */
    public Category toEntity(CategoryRequest request) {

        Category category = new Category();

        category.setCategoryName(request.getCategoryName());
        category.setCategoryType(request.getCategoryType());
        category.setDescription(request.getDescription());
        category.setStatus(request.getStatus());

        return category;
    }

    /**
     * Entity -> Response
     */
    public CategoryResponse toResponse(Category category) {

        if (category == null) {
            return null;
        }

        CategoryResponse response = new CategoryResponse();

        response.setCategoryId(category.getCategoryId());
        response.setCategoryName(category.getCategoryName());
        response.setCategoryType(category.getCategoryType());
        response.setDescription(category.getDescription());
        response.setStatus(category.getStatus());

        // Uncomment after updating entity
        // response.setCreatedAt(category.getCreatedAt());

        return response;
    }

    /**
     * List<Entity> -> List<Response>
     */
    public List<CategoryResponse> toResponse(List<Category> categories) {

        List<CategoryResponse> responses = new ArrayList<>();

        if (categories == null || categories.isEmpty()) {
            return responses;
        }

        for (Category category : categories) {
            responses.add(toResponse(category));
        }

        return responses;
    }

}