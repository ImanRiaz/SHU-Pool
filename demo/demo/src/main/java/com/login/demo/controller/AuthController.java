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
        User logged = userService.login(loginUser);

        if (logged == null) {
            return ResponseEntity.status(401).body(
                    Map.of("status", "error", "message", "Invalid email or password")
            );
        }

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("email", logged.getEmail());
        response.put("fullName", logged.getFullName());
        response.put("studentId", logged.getStudentId());
        response.put("role", logged.getRole());

        return ResponseEntity.ok(response);
    }

    // ---------- PROFILE ROLE UPDATE (password required) ----------
    @PostMapping("/updateRole")
    public ResponseEntity<?> updateRole(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String role = body.get("role");
        String password = body.get("password");

        String result = userService.updateRoleWithPassword(email, password, role);

        if (!result.equals("success")) {
            return ResponseEntity.status(401).body(
                    Map.of("status", "error", "message", result)
            );
        }

        return ResponseEntity.ok(Map.of("status", "success"));
    }

    // ---------- INITIAL ROLE SELECTION (after signup/login, no password) ----------
    @PostMapping("/selectInitialRole")
    public ResponseEntity<?> selectInitialRole(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String role = body.get("role");

        String result = userService.updateRole(email, role);

        if (!result.contains("successfully")) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", "error", "message", result)
            );
        }

        return ResponseEntity.ok(Map.of("status", "success", "message", result));
    }

    // ---------- UPDATE PROFILE ----------
    @PostMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        String result = userService.updateProfile(updatedUser);

        if (!result.equals("Profile updated")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }
}
