package org.techhub.controller;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.LoginRequest;
import org.techhub.dto.response.AdminDashboardResponse;
import org.techhub.dto.response.AdminResponse;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.StudentResponse;
import org.techhub.logger.ApplicationLogger;
import org.techhub.service.AdminDashboardService;
import org.techhub.service.AdminService;
import org.techhub.service.StudentService;
import org.techhub.security.SessionUtil;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@Validated
public class AdminController {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(AdminController.class);

	@Autowired
	private AdminService adminService;


	@Autowired
	private AdminDashboardService dashboardService;


	@Autowired
	private StudentService studentService;

	// =====================================
	// CREATE ADMIN
	// =====================================

	@PostMapping("/create")
	public ResponseEntity<ApiResponse<AdminResponse>> createAdmin(
			@RequestBody AdminRequest request) {

		AdminResponse admin =
				adminService.save(
						request.getUsername(),
						request.getPassword());

		LOGGER.info(MessageConstants.ADMIN_CREATED);

		ApiResponse<AdminResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.ADMIN_CREATED,
						admin);

		return new ResponseEntity<>(
				response,
				HttpStatus.CREATED);
	}


	// =====================================
	// ADMIN LOGIN
	// =====================================

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AdminResponse>> login(
			@Valid @RequestBody LoginRequest request,
			HttpSession session) {

		AdminResponse admin =
				adminService.login(request);

		SessionUtil.createAdminSession(
				session,
				admin);

		LOGGER.info(MessageConstants.LOGIN_SUCCESS);

		ApiResponse<AdminResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.LOGIN_SUCCESS,
						admin);

		return ResponseEntity.ok(response);
	}


	// =====================================
	// ADMIN LOGOUT
	// =====================================

	@GetMapping("/logout")
	public ResponseEntity<ApiResponse<String>> logout(
			HttpSession session) {

		SessionUtil.invalidate(session);

		LOGGER.info(MessageConstants.LOGOUT_SUCCESS);

		ApiResponse<String> response =
				new ApiResponse<>(
						true,
						MessageConstants.LOGOUT_SUCCESS,
						null);

		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/recentStudents")
	public ResponseEntity<ApiResponse<List<StudentResponse>>> recentStudents(){


	    List<StudentResponse> students =
	            studentService.getAllStudents();


	    ApiResponse<List<StudentResponse>> response =
	            new ApiResponse<>(
	                    true,
	                    "Recent students fetched successfully",
	                    students
	            );


	    return ResponseEntity.ok(response);

	}


	// =====================================
	// GET ADMIN BY ID
	// =====================================

	@GetMapping("/{adminId}")
	public ResponseEntity<ApiResponse<AdminResponse>> getAdminById(
			@PathVariable Integer adminId) {

		AdminResponse admin =
				adminService.getAdminById(adminId);

		ApiResponse<AdminResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.ADMIN_FETCH_SUCCESS,
						admin);

		return ResponseEntity.ok(response);
	}


	// =====================================
	// GET ADMIN BY USERNAME
	// =====================================

	@GetMapping("/username/{username}")
	public ResponseEntity<ApiResponse<AdminResponse>> getAdminByUsername(
			@PathVariable String username) {

		AdminResponse admin =
				adminService.getAdminByUsername(username);

		ApiResponse<AdminResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.ADMIN_FETCH_SUCCESS,
						admin);

		return ResponseEntity.ok(response);
	}


	// =====================================
	// GET ALL ADMINS
	// =====================================

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<AdminResponse>>> getAllAdmins() {

		List<AdminResponse> admins =
				adminService.getAllAdmins();

		ApiResponse<List<AdminResponse>> response =
				new ApiResponse<>(
						true,
						MessageConstants.ADMIN_LIST_SUCCESS,
						admins);

		return ResponseEntity.ok(response);
	}


	// =====================================
	// UPDATE ADMIN
	// =====================================

	@PutMapping("/update/{adminId}")
	public ResponseEntity<ApiResponse<AdminResponse>> updateAdmin(
			@PathVariable Integer adminId,
			@RequestBody AdminRequest request) {

		AdminResponse admin =
				adminService.update(
						adminId,
						request.getUsername(),
						request.getPassword());

		LOGGER.info(MessageConstants.ADMIN_UPDATED);

		ApiResponse<AdminResponse> response =
				new ApiResponse<>(
						true,
						MessageConstants.ADMIN_UPDATED,
						admin);

		return ResponseEntity.ok(response);
	}


	// =====================================
	// DELETE ADMIN
	// =====================================

	@DeleteMapping("/{adminId}")
	public ResponseEntity<ApiResponse<String>> deleteAdmin(
			@PathVariable Integer adminId) {

		adminService.delete(adminId);

		LOGGER.info(MessageConstants.ADMIN_DELETED);

		ApiResponse<String> response =
				new ApiResponse<>(
						true,
						MessageConstants.ADMIN_DELETED,
						null);

		return ResponseEntity.ok(response);
	}


	// =====================================
	// ADMIN REQUEST
	// =====================================

	public static class AdminRequest {

		private String username;

		private String password;


		public AdminRequest() {

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
	}
}