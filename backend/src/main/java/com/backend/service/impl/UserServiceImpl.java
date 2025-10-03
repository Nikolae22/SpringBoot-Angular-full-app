package com.backend.service.impl;

import com.backend.domain.Role;
import com.backend.domain.User;
import com.backend.dto.UserDTO;
import com.backend.dtoMapper.UserDTOMapper;
import com.backend.form.UpdateForm;
import com.backend.repository.RoleRepository;
import com.backend.repository.UserRepository;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository<User> userRepository;
    private final RoleRepository<Role> roleRoleRepository;

    @Override
    public UserDTO createUser(User user) {
        return mapToUserDTO(userRepository.create(user));
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        return mapToUserDTO(userRepository.getUserByEmail(email));
    }

    @Override
    public void sendVerificationCode(UserDTO userDTO) {
        userRepository.sendVerificationCode(userDTO);
    }

    @Override
    public UserDTO verifyCode(String email, String code) {
        return mapToUserDTO(userRepository.verifyCode(email, code));
    }

    @Override
    public void resetPassword(String email) {
        userRepository.resetPassword(email);
    }

    @Override
    public UserDTO verifyPasswordKey(String key) {
        return mapToUserDTO(userRepository.verifyPasswordKey(key));
    }

    @Override
    public void renewPassword(String key, String password, String confirmPassword) {
        userRepository.renewPassword(key,password,confirmPassword);
    }

    @Override
    public UserDTO verifyAccount(String key) {
        return UserDTOMapper.fromUser(userRepository.verifyAccountKey(key));
    }

    @Override
    public UserDTO updateUserDetails(UpdateForm user) {
        return mapToUserDTO(userRepository.updateUserDetails(user));
    }

    @Override
    public UserDTO getUserById(Long userId) {
        return mapToUserDTO(userRepository.get(userId));
    }

    @Override
    public void updatePassword(Long id, String currentPassword, String newPassword, String confirmNewPassword) {
        userRepository.updatePassword(id,currentPassword,newPassword,confirmNewPassword);
    }

    @Override
    public void updateUserRole(Long userId, String roleName) {
        roleRoleRepository.updateUserRole(userId,roleName);
    }

    @Override
    public void updateAccountSettings(Long userId, Boolean enabled, Boolean notLocked) {
        userRepository.updateAccountSettings(userId,enabled,notLocked);
    }

    @Override
    public UserDTO toggleMfa(String email) {
        return mapToUserDTO(userRepository.toggleMfa(email));
    }

    private UserDTO mapToUserDTO(User user) {
        return UserDTOMapper.fromUser(user, roleRoleRepository.getRoleByUserId(user.getId()));
    }


}
