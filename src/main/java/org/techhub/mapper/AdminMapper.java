package org.techhub.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.techhub.dto.response.AdminResponse;
import org.techhub.entity.Admin;

@Component
public class AdminMapper {

    /**
     * Entity -> Response
     */
    public AdminResponse toResponse(Admin admin) {

        if (admin == null) {
            return null;
        }

        AdminResponse response = new AdminResponse();

        response.setAdminId(admin.getAdminId());
        response.setUsername(admin.getUsername());

        // Uncomment after updating entity
        // response.setCreatedAt(admin.getCreatedAt());

        return response;
    }

    /**
     * List<Entity> -> List<Response>
     */
    public List<AdminResponse> toResponse(List<Admin> admins) {

        List<AdminResponse> responses = new ArrayList<>();

        if (admins == null || admins.isEmpty()) {
            return responses;
        }

        for (Admin admin : admins) {
            responses.add(toResponse(admin));
        }

        return responses;
    }

}