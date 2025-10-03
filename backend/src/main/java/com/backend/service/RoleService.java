package com.backend.service;

import com.backend.domain.Role;

import java.util.Collection;


public interface RoleService {

    Role getRoleByUserId(Long id);

    Collection<Role> getRoles();
}
