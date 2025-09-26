package com.backend.repository;

import com.backend.domain.User;
import com.backend.dto.UserDTO;

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

    // More complex operation
}
