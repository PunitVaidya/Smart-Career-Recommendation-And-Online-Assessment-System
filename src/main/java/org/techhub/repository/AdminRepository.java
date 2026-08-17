package org.techhub.repository;

import java.util.List;

import org.techhub.entity.Admin;

public interface AdminRepository {

	boolean save(Admin admin);

	boolean update(Admin admin);

	boolean delete(Integer adminId);

	Admin findById(Integer adminId);

	Admin findByUsername(String username);

	List<Admin> findAll();

	boolean existsByUsername(String username);

}