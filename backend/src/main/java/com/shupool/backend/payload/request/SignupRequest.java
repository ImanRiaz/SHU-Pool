package com.shupool.backend.payload.request;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.util.Set;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 50)
    private String fullName;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    private Set<String> roles;
    
    // Optional Driver Fields
    private String vehicleNumber;
    private String vehicleModel;
    private int seatsAvailable;
}
