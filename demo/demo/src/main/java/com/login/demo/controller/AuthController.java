package com.login.demo.controller;

import com.login.demo.model.User;
import com.login.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ---------- SIGNUP ----------
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User newUser) {
        System.out.println("=== SIGNUP ENDPOINT HIT ===");
        System.out.println("Received user: " + newUser.getEmail());

        String result = userService.signup(newUser);

        if (!result.equals("Signup successful!")) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", "error", "message", result)
            );
        }

        return ResponseEntity.ok(
                Map.of("status", "success", "message", result)
        );
    }

    // ---------- LOGIN ----------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        System.out.println("=== LOGIN ENDPOINT HIT ===");
        System.out.println("Login attempt from: " + loginUser.getEmail());

        User logged = userService.login(loginUser);

        if (logged == null) {
            return ResponseEntity.status(401).body(
                    Map.of("status", "error", "message", "Invalid email or password")
            );
        }

        // SUCCESS response with full user details
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("email", logged.getEmail());
        response.put("fullName", logged.getFullName());
        response.put("studentId", logged.getStudentId());
        response.put("role", logged.getRole()); // 🔥 important

        return ResponseEntity.ok(response);
    }

    // ---------- UPDATE ROLE ----------
    @PostMapping("/updateRole")
    public ResponseEntity<?> updateRole(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String role = body.get("role");

        System.out.println("=== ROLE UPDATE REQUEST ===");
        System.out.println("Email: " + email + ", New Role: " + role);

        String result = userService.updateRole(email, role);

        if (!result.contains("successfully")) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", "error", "message", result)
            );
        }

        return ResponseEntity.ok(
                Map.of("status", "success", "message", result)
        );
    }
}
