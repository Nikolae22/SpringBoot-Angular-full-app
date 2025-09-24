package com.backend.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.USE_DEFAULTS)
public class User {

    private Long id;
    @NotEmpty(message = "First Name needed")
    private String firstName;
    @NotEmpty(message = "Last Name needed")
    private String lastName;
    @NotEmpty(message = "Email needed")
    @Email(message = "Please enter a valid email")
    private String email;
    @NotEmpty(message = "Password needed")
    private String password;
    private String address;
    private String phone;
    private String title;
    private String bio;
    private String imageUrl;
    private boolean enabled;
    private boolean isNotLocked;
    private boolean isUsingMfa;
    private LocalDateTime createdAt;
}
