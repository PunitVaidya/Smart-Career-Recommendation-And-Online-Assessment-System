package org.techhub.service;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.request.LoginRequest;
import org.techhub.dto.response.AdminResponse;
import org.techhub.entity.Admin;
import org.techhub.exception.AdminNotFoundException;
import org.techhub.exception.DuplicateRecordException;
import org.techhub.exception.InvalidCredentialsException;
import org.techhub.logger.ApplicationLogger;
import org.techhub.logger.LogConstants;
import org.techhub.mapper.AdminMapper;
import org.techhub.repository.AdminRepository;
import org.techhub.security.PasswordUtil;

@Service
public class AdminServiceImpl implements AdminService {

	private static final Logger LOGGER =
			ApplicationLogger.getLogger(AdminServiceImpl.class);

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private AdminMapper adminMapper;

	@Override
	public AdminResponse save(String username, String password) {

		if (adminRepository.existsByUsername(username)) {

			LOGGER.error(LogConstants.ADMIN_ALREADY_EXISTS);

			throw new DuplicateRecordException(
					"Username already exists.");

		}

		Admin admin = new Admin();

		admin.setUsername(username);

		admin.setPassword(
				PasswordUtil.encryptPassword(password));

		boolean status =
				adminRepository.save(admin);

		if (!status) {

			throw new RuntimeException(
					"Unable to save admin.");

		}

		LOGGER.info(LogConstants.ADMIN_CREATED);

		return adminMapper.toResponse(
				adminRepository.findByUsername(username));

	}

	@Override
	public AdminResponse login(LoginRequest request) {

		Admin admin =
				adminRepository.findByUsername(
						request.getEmail());

		if (admin == null) {

			LOGGER.error(LogConstants.ADMIN_NOT_FOUND);

			throw new AdminNotFoundException(
					"Admin not found.");

		}

		boolean matched =
				PasswordUtil.matchPassword(
						request.getPassword(),
						admin.getPassword());

		if (!matched) {

			LOGGER.error(LogConstants.INVALID_CREDENTIALS);

			throw new InvalidCredentialsException(
					"Invalid username or password.");

		}

		LOGGER.info(LogConstants.LOGIN_SUCCESS);

		return adminMapper.toResponse(admin);

	}

	@Override
	public AdminResponse getAdminById(Integer adminId) {

		Admin admin =
				adminRepository.findById(adminId);

		if (admin == null) {

			throw new AdminNotFoundException(
					"Admin not found.");

		}

		return adminMapper.toResponse(admin);

	}

	@Override
	public AdminResponse getAdminByUsername(String username) {

		Admin admin =
				adminRepository.findByUsername(username);

		if (admin == null) {

			throw new AdminNotFoundException(
					"Admin not found.");

		}

		return adminMapper.toResponse(admin);

	}

	@Override
	public List<AdminResponse> getAllAdmins() {

		return adminMapper.toResponse(
				adminRepository.findAll());

	}

	@Override
	public AdminResponse update(Integer adminId,
			String username,
			String password) {

		Admin admin =
				adminRepository.findById(adminId);

		if (admin == null) {

			throw new AdminNotFoundException(
					"Admin not found.");

		}

		admin.setUsername(username);

		admin.setPassword(
				PasswordUtil.encryptPassword(password));

		boolean status =
				adminRepository.update(admin);

		if (!status) {

			throw new RuntimeException(
					"Unable to update admin.");

		}

		LOGGER.info(LogConstants.ADMIN_UPDATED);

		return adminMapper.toResponse(
				adminRepository.findById(adminId));

	}

	@Override
	public boolean delete(Integer adminId) {

		Admin admin =
				adminRepository.findById(adminId);

		if (admin == null) {

			throw new AdminNotFoundException(
					"Admin not found.");

		}

		boolean status =
				adminRepository.delete(adminId);

		if (!status) {

			throw new RuntimeException(
					"Unable to delete admin.");

		}

		LOGGER.info(LogConstants.ADMIN_DELETED);

		return true;

	}

}