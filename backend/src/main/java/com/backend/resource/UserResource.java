package com.backend.resource;

import com.backend.domain.HttpResponse;
import com.backend.domain.User;
import com.backend.dto.UserDTO;
import com.backend.form.LoginForm;
import com.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserResource {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<HttpResponse> login(LoginForm loginFrom){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginFrom.getEmail(),loginFrom.getPassword())
        );
        UserDTO userDTO=userService.getUserByEmail(loginFrom.getEmail());
        return ResponseEntity.ok()
                .body(HttpResponse.builder()
                        .timeStamp(LocalDateTime.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("Login Success")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    @PostMapping("/register")
    public ResponseEntity<HttpResponse> createUser(
            @RequestBody @Valid User user) {
        UserDTO userDTO = userService.createUser(user);
        return ResponseEntity.created(getUri())
                .body(HttpResponse.builder()
                        .timeStamp(LocalDateTime.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("User created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build());
    }

    private URI getUri() {
        return URI.create(ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/user/get/<userId>").toUriString());
    }

}
