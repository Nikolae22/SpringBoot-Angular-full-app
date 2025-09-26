package com.backend.query;

public class UserQuery {

    public static final String COUNT_USER_EMAIL_QUERY = "select count(*) from Users where email = :email";
    public static final String INSERT_USER_QUERY = "insert into Users (first_name, last_name, email, password) values (:firstName, :lastName, :email, :password)";
    public static final String INSERT_ACCOUNT_VERIFICATION_URL_QUERY = "INSERT into AccountVerifications (user_id, url) values (:userId, :url)";
    public static final String SELECT_USER_BY_EMAIL_QUERY = "select * from Users where email = :email";
    public static final String DELETE_VERIFICATION_CODE_BY_USER_ID = "DELETE from TwoFactorVerifications where user_id = :id";
    public static final String INSERT_VERIFICATION_CODE_QUERY="insert into TwoFactorVerifications (user_id, code, expiration_date) values (:userId, :code, :expirationDate)";
}
