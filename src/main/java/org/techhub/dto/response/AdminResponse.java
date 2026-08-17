package org.techhub.dto.response;

import java.sql.Timestamp;

public class AdminResponse {

    private Integer adminId;

    private String username;

    private Timestamp createdAt;

    public AdminResponse() {

    }

    public AdminResponse(Integer adminId, String username, Timestamp createdAt) {

        this.adminId = adminId;
        this.username = username;
        this.createdAt = createdAt;
    }

    public Integer getAdminId() {

        return adminId;
    }

    public void setAdminId(Integer adminId) {

        this.adminId = adminId;
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {

        this.username = username;
    }

    public Timestamp getCreatedAt() {

        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {

        this.createdAt = createdAt;
    }

}