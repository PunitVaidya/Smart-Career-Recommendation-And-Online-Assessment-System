package org.techhub.service;

import java.util.List;

import org.techhub.dto.request.LoginRequest;
import org.techhub.dto.response.AdminResponse;

public interface AdminService {

	AdminResponse save(String username, String password);

	AdminResponse login(LoginRequest request);

	AdminResponse getAdminById(Integer adminId);

	AdminResponse getAdminByUsername(String username);

	List<AdminResponse> getAllAdmins();

	AdminResponse update(Integer adminId,
			String username,
			String password);

	boolean delete(Integer adminId);

}