package com.login.demo.controller;

import com.login.demo.model.User;
import com.login.demo.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow all origins for testing
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ---------- SIGNUP ----------
    @PostMapping("/signup")
    public String signup(@RequestBody User newUser) {
        System.out.println("=== SIGNUP ENDPOINT HIT ===");
        System.out.println("Received user: " + newUser.getEmail());
        return userService.signup(newUser);
    }

    // ---------- LOGIN ----------
    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {
        System.out.println("=== LOGIN ENDPOINT HIT ===");
        System.out.println("Login attempt from: " + loginUser.getEmail());
        return userService.login(loginUser);
    }

    // ---------- UPDATE ROLE ----------
    @PostMapping("/updateRole")
    public String updateRole(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String role = body.get("role");

        System.out.println("=== ROLE UPDATE REQUEST ===");
        System.out.println("Email: " + email + ", New Role: " + role);

        // Call UserService to update the user's role
        return userService.updateRole(email, role);
    }
}
