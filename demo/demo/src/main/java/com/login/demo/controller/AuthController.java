package com.login.demo.controller;

import com.login.demo.model.User;
import com.login.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")  // Allow all origins for testing
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
        System.out.println("AuthController initialized");
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User newUser) {
        System.out.println("=== SIGNUP ENDPOINT HIT ===");
        System.out.println("Received user: " + newUser.getUsername());
        String result = userService.signup(newUser);
        System.out.println("Returning: " + result);
        return result;
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {
        System.out.println("=== LOGIN ENDPOINT HIT ===");
        System.out.println("Received user: " + loginUser.getUsername());
        String result = userService.login(loginUser);
        System.out.println("Returning: " + result);
        return result;
    }
}