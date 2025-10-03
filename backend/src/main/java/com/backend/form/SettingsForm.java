package com.backend.form;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SettingsForm {

    @NotNull(message = "Id cannot be null")
    private Boolean enabled;
    @NotNull(message = "Id cannot be null")
    private Boolean notLocked;
}
