package com.backend.query;

public class RoleQuery {
    public static final String SELECT_ROLE_BY_NAME_QUERY = "select * from Roles where name = :name";
    public static final String INSERT_ROLE_TO_USER_QUERY = "insert into UserRoles (user_id, role_id) values (:userId, :roleId)";
    public static final String SELECT_ROLE_BY_ID_QUERY="select r.id, r.name, r.permission from Roles r join UserRoles ur on ur.role_id = r.id join Users u on u.id = ur.user_id where u.id = :id";
    public static final String SELECT_ROLE_QUERY="select * from Roles order by id";
    public static final String UPDATE_USER_ROLE_QUERY="update userRoles set role_id = :roleId where user_id = :userId";
}
