package com.backend.repository.impl;

import com.backend.domain.Role;
import com.backend.domain.User;
import com.backend.domain.UserPrincipal;
import com.backend.dto.UserDTO;
import com.backend.exception.ApiException;
import com.backend.repository.RoleRepository;
import com.backend.repository.UserRepository;
import com.backend.rolemapper.UserRowMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.*;

import static com.backend.enumeration.RoleType.ROLE_USER;
import static com.backend.enumeration.VerificationType.ACCOUNT;
import static com.backend.query.UserQuery.*;
import static java.util.Objects.requireNonNull;
import static org.apache.commons.lang3.RandomStringUtils.randomAlphabetic;
import static org.apache.commons.lang3.time.DateUtils.addDays;

@RequiredArgsConstructor
@Repository
@Slf4j
public class UserRepositoryImpl implements UserRepository<User>, UserDetailsService {

    private static final String DATE_FORMAT = "yyyy-MM-dd hh:mm:ss";

    private final NamedParameterJdbcTemplate jdbc;
    private final RoleRepository<Role> roleRepository;
    private final BCryptPasswordEncoder encoder;

    @Override
    public User create(User user) {
        // check email is unique
        if (getEmailCount(user.getEmail().trim().toLowerCase()) > 0)
            throw new ApiException("Email already in use.Try again with another email");
        //save new user
        try {
            KeyHolder holder = new GeneratedKeyHolder();
            SqlParameterSource parameters = getSqlParameterSource(user);
            jdbc.update(INSERT_USER_QUERY, parameters, holder);
            user.setId(requireNonNull(holder.getKey()).longValue());
            //add role to the user
            roleRepository.addRoleToUser(user.getId(), ROLE_USER.name());
            // send verification url
            String verificationUrl = getVerificationUrl(UUID.randomUUID().toString(), ACCOUNT.getType());
            // save url in verification table
            jdbc.update(INSERT_ACCOUNT_VERIFICATION_URL_QUERY, Map.of("userId", user.getId(), "url", verificationUrl));
            //send email to user with verification url
            //emailService.sendVerificationUrl(user.getFirstName(), user.getEmail(),verificationUrl, ACCOUNT);
            user.setEnabled(false);
            user.setNotLocked(true);
            // return the new user
            return user;
            //if any errors, throw ex with proper message
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ApiException("An error occurred. Pls try again");
        }
    }

    @Override
    public Collection<User> list(int page, int pageSize) {
        return List.of();
    }

    @Override
    public User get(Long id) {
        return null;
    }

    @Override
    public User update(User data) {
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        return null;
    }

    private Integer getEmailCount(String email) {
        return jdbc.queryForObject(COUNT_USER_EMAIL_QUERY, Map.of("email", email), Integer.class);
    }

    private SqlParameterSource getSqlParameterSource(User user) {
        return new MapSqlParameterSource()
                .addValue("firstName", user.getFirstName())
                .addValue("lastName", user.getLastName())
                .addValue("email", user.getEmail())
                .addValue("password", encoder.encode(user.getPassword()));
    }

    private String getVerificationUrl(String key, String type) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/user/verify/" + type + "/" + key).toUriString();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = getUserByEmail(email);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User not found in the database {}", email);
            return new UserPrincipal(user, roleRepository.getRoleByUserId(user.getId()).getPermission());
        }
    }

    @Override
    public User getUserByEmail(String email) {
        try {
            User user = jdbc.queryForObject(SELECT_USER_BY_EMAIL_QUERY, Map.of("email", email), new UserRowMapper());
            return user;
            //if any errors, throw ex with proper message
        } catch (EmptyResultDataAccessException exception) {
            throw new ApiException("No user found by email " + email);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ApiException("An error occurred. Pls try again");
        }
    }

    @Override
    public void sendVerificationCode(UserDTO user) {
        String expirationDate = DateFormatUtils.format(addDays(new Date(), 1), DATE_FORMAT);
        String verificationCode = randomAlphabetic(8).toUpperCase();
        try {
            jdbc.update(DELETE_VERIFICATION_CODE_BY_USER_ID, Map.of("id", user.getId()));
            jdbc.update(INSERT_VERIFICATION_CODE_QUERY, Map.of("userId", user.getId(),
                    "code", verificationCode, "expirationDate", expirationDate));
            // todo if u need
            // e disativato perche e a paggamento e paghi per ogni messaggio
            //sendSMS(user.getPhone(), "From SecureCapita \nVerification code \n" + verificationCode);
            //if any errors, throw ex with proper message
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ApiException("An error occurred. Pls try again");
        }
    }
}


