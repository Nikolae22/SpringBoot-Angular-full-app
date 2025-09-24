package com.backend.service.impl;

import com.backend.domain.User;
import com.backend.dto.UserDTO;
import com.backend.dtoMapper.UserDTOMapper;
import com.backend.repository.UserRepository;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository<User> userRepository;

    @Override
    public UserDTO createUser(User user) {
        return UserDTOMapper.fromUser(userRepository.create(user));
    }
}
