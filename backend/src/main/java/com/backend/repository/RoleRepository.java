package com.backend.repository;

import com.backend.domain.Role;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface RoleRepository<T extends Role> {

    T create(T data);

    Collection<T> list();

    T get(Long id);

    T update(T data);

    Boolean delete(Long id);

    //more colplex crud

    void addRoleToUser(Long userId, String roleName);

    Role getRoleByUserId(Long userId);
    Role getToleByUserEmail(String email);
    void updateUserRole(Long userId,String roleName);
}
