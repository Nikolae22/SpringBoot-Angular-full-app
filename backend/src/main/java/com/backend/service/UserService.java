package com.backend.service;

import com.backend.domain.User;
import com.backend.dto.UserDTO;
import jakarta.validation.constraints.NotEmpty;

public interface UserService {

    UserDTO createUser(User user);

    UserDTO getUserByEmail(@NotEmpty String email);

    void sendVerificationCode(UserDTO userDTO);

    UserDTO verifyCode(String email, String code);

    void resetPassword(String email);

    UserDTO verifyPasswordKey(String key);

    void renewPassword(String key, String password, String confirmPassword);

    UserDTO verifyAccount(String key);
}
