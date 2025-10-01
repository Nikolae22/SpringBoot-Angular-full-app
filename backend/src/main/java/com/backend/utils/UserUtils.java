package com.backend.utils;

import org.springframework.security.core.Authentication;

import com.backend.domain.UserPrincipal;
import com.backend.dto.UserDTO;

public class UserUtils {

    public static UserDTO getAuthenticatedUser(Authentication authentication){
        return((UserDTO) authentication.getPrincipal());
    }

     public static UserDTO getLoggedInUser(Authentication authentication) {
        return ((UserPrincipal) authentication.getPrincipal()).getUser();
    }

}
