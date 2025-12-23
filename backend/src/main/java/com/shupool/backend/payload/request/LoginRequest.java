package com.shupool.backend.payload.request;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;

@Data
public class LoginRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
