package com.backend.query;

public class UserQuery {

    public static final String COUNT_USER_EMAIL_QUERY = "select count(*) from Users where email = :email";
    public static final String INSERT_USER_QUERY = "insert into Users (first_name, last_name, email, password) values (:firstName, :lastName, :email, :password)";
    public static final String INSERT_ACCOUNT_VERIFICATION_URL_QUERY = "INSERT into AccountVerifications (user_id, url) values (:userId, :url)";
    public static final String SELECT_USER_BY_EMAIL_QUERY = "SELECT * FROM Users WHERE email = :email";
    public static final String DELETE_VERIFICATION_CODE_BY_USER_ID = "DELETE from TwoFactorVerifications where user_id = :id";
    public static final String INSERT_VERIFICATION_CODE_QUERY = "insert into TwoFactorVerifications (user_id, code, expiration_date) values (:userId, :code, :expirationDate)";
    public static final String SELECT_USER_BY_USER_CODE_QUERY = "select * from Users where id = (select user_id from TwoFactorVerifications where code = :code)";
    public static final String DELETE_CODE = "delete from TwoFactorAuthentications where code = :code";
    public static final String SELECT_CODE_EXPIRATION_QUERY = "select expiration_date < now() as is_expired from TwoFactorVerifications where code = :code";
    public static final String DELETE_PASSWORD_VERIFICATION_BY_USER_ID_QUERY = "delete from ResetPasswordVerifications where user_id = :userId";
    public static final String INSERT_PASSWORD_VERIFICATION_QUERY = "insert into ResetPasswordVerifications (user_id, url, expiration_date) values (:userId, :url, :expirationDate)";
    public static final String SELECT_EXPIRATION_BY_URL = "select expiration_dae < now() as is_expired from ResetPasswordVerifications where url = :url";
    public static final String SELECT_USER_BY_PASSWORD_URL_QUERY = "select * from Users where id = (select user_id from ResetPasswordVerifications where url = :url)";
    public static final String UPDATE_USER_PASSWORD_BY_URL_QUERY = "update Users set password = :password where id = (select user_id from ResetPasswordVerifications where url = :url)";
    public static final String DELETE_VERIFICATION_BY_URL_QUERY="delete from ResetPasswordVerifications where url = :url";
    public static final String SELECT_USER_BY_ACCOUNT_URL_QUERY="select * from Users where id = (select user_id from AccountVerifications where url = :url)";
    public static final String UPDATE_USER_ENABLED_QUERY="update users set enabled = :enabled where id = :id";
}
