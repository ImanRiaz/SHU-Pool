package com.shupool.backend.payload.response;

import lombok.Data;
import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String email;
    private String fullName;
    private List<String> roles;

    public JwtResponse(String accessToken, String id, String email, String fullName, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }
}
