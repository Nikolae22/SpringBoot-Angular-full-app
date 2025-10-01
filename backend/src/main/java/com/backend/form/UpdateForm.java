package com.backend.form;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateForm {

    @NotNull(message = "Id cannot be null of Empty")
    private Long id;
    @NotEmpty(message = "First Name needed")
    private String firstName;
    @NotEmpty(message = "Last Name needed")
    private String lastName;
    @NotEmpty(message = "Email needed")
    @Email(message = "Please enter a valid email")
    private String email;
    private String address;
    private String phone;
    private String title;
    private String bio;

}
