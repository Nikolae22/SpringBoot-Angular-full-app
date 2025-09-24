package com.backend.service;

import com.backend.domain.User;
import com.backend.dto.UserDTO;

public interface UserService {

    UserDTO createUser(User user);
}
