package com.backend.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NotNull
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@SuperBuilder
public class UserEvent {

    private Long id;
    private String type;
    private String description;
    private String device;
    private String ipAddress;
    private LocalDateTime createdAt;
}
