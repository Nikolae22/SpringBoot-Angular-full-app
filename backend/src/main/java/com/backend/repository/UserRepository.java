package com.backend.repository;

import com.backend.domain.User;
import com.backend.dto.UserDTO;
import com.backend.form.UpdateForm;

import java.util.Collection;

public interface UserRepository<T extends User> {
    //Basic CRUD operation

    T create(T data);

    Collection<T> list(int page, int pageSize);

    T get(Long id);

    T update(T data);

    Boolean delete(Long id);

    User getUserByEmail(String email);

    void sendVerificationCode(UserDTO userDTO);

    User verifyCode(String email, String code);

    void resetPassword(String email);

    User verifyPasswordKey(String key);

    void renewPassword(String key, String password, String confirmPassword);

    User verifyAccountKey(String key);

    T updateUserDetails(UpdateForm user);

    void updatePassword(Long id, String currentPassword, String newPassword, String confirmNewPassword);


    // More complex operation
}
