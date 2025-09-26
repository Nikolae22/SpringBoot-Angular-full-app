package com.backend.service;

import com.backend.domain.User;
import com.backend.dto.UserDTO;
import jakarta.validation.constraints.NotEmpty;

public interface UserService {

    UserDTO createUser(User user);

    UserDTO getUserByEmail(@NotEmpty String email);

    void sendVerificationCode(UserDTO userDTO);
}
