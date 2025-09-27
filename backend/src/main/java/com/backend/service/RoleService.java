package com.backend.service;

import com.backend.domain.Role;

public interface RoleService {

    Role getRoleByUserId(Long id);
}
