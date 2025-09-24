package com.backend.repository.impl;

import com.backend.domain.Role;
import com.backend.exception.ApiException;
import com.backend.repository.RoleRepository;
import com.backend.rolemapper.RoleRowMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import static com.backend.enumeration.RoleType.ROLE_USER;
import static com.backend.query.RoleQuery.INSERT_ROLE_TO_USER_QUERY;
import static com.backend.query.RoleQuery.SELECT_ROLE_BY_NAME_QUERY;
import static java.util.Objects.requireNonNull;

@RequiredArgsConstructor
@Repository
@Slf4j
public class RoleRepositoryImpl implements RoleRepository<Role> {

    private final NamedParameterJdbcTemplate jdbc;

    @Override
    public Role create(Role data) {
        return null;
    }

    @Override
    public Collection<Role> list(int page, int pageSize) {
        return List.of();
    }

    @Override
    public Role get(Long id) {
        return null;
    }

    @Override
    public Role update(Role data) {
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        return null;
    }

    @Override
    public void addRoleToUser(Long userId, String roleName) {
        log.info("Adding role {} to user id {}", roleName, userId);
        try {
            Role role = jdbc.queryForObject(SELECT_ROLE_BY_NAME_QUERY, Map.of(
                    "name", roleName), new RoleRowMapper());
            jdbc.update(INSERT_ROLE_TO_USER_QUERY,Map.of("userId",userId, "roleId",requireNonNull(role).getId()));
            log.info("Role added");
        } catch (EmptyResultDataAccessException exception) {
            throw new ApiException("No role found by name " + ROLE_USER.name());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ApiException("An error occurred. Pls try again");
        }
    }


    @Override
    public Role getRoleByUserId(Long userId) {
        return null;
    }

    @Override
    public Role getToleByUserEmail(String email) {
        return null;
    }

    @Override
    public void updateUserRole(Long userId, String roleName) {

    }
}
