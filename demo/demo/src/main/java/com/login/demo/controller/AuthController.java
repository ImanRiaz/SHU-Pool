package com.login.demo.controller;

import com.login.demo.model.User;
import com.login.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User newUser) {
        System.out.println("=== SIGNUP ENDPOINT HIT ===");
        System.out.println("Received user: " + newUser.getEmail());
        return userService.signup(newUser);
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {
        System.out.println("=== LOGIN ENDPOINT HIT ===");
        System.out.println("Login attempt from: " + loginUser.getEmail());
        return userService.login(loginUser);
    }
}
