package org.techhub.entity;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class Admin {

    private Integer adminId;

    private String username;

    private String password;

    private Timestamp createdAt;

    public Admin() {

    }

    public Admin(Integer adminId, String username, String password, Timestamp createdAt) {

        this.adminId = adminId;
        this.username = username;
        this.password = password;
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

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public Timestamp getCreatedAt() {

        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {

        this.createdAt = createdAt;
    }

    @Override
    public String toString() {

        return "Admin [adminId=" + adminId
                + ", username=" + username
                + ", password=" + password
                + ", createdAt=" + createdAt + "]";
    }

}