package com.backend.service;

import com.backend.domain.User;
import com.backend.dto.UserDTO;
import com.backend.form.UpdateForm;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public interface UserService {

    UserDTO createUser(User user);

    UserDTO getUserByEmail(@NotEmpty String email);

    void sendVerificationCode(UserDTO userDTO);

    UserDTO verifyCode(String email, String code);

    void resetPassword(String email);

    UserDTO verifyPasswordKey(String key);

    void renewPassword(String key, String password, String confirmPassword);

    UserDTO verifyAccount(String key);

    UserDTO updateUserDetails(@Valid UpdateForm user);

    UserDTO getUserById(Long userId);

    void updatePassword(Long id, @NotNull(message = "Current password cannot be empty") String currentPassword, @NotEmpty(message = "New password cannot be empty") String newPassword, @NotEmpty(message = "Cannot be empty") String confirmNewPassword);

    void updateUserRole(Long userId, String roleName);

    void updateAccountSettings(Long userId, @NotNull(message = "Id cannot be null") Boolean enabled, @NotNull(message = "Id cannot be null") Boolean notLocked);

    UserDTO toggleMfa(String email);
}
