package com.login.demo.controller;

import com.login.demo.model.User;
import com.login.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/user/info?email=foo@shu.edu.pk
    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@RequestParam("email") String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        User user = userService.getByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // ✅ CREATE SAFE COPY (DO NOT MUTATE ORIGINAL)
        User safeUser = new User();
        safeUser.setEmail(user.getEmail());
        safeUser.setFullName(user.getFullName());
        safeUser.setStudentId(user.getStudentId());
        safeUser.setRole(user.getRole());
        safeUser.setDepartment(user.getDepartment());
        safeUser.setProgram(user.getProgram());
        safeUser.setSemester(user.getSemester());
        safeUser.setPhone(user.getPhone());
        safeUser.setVehicleName(user.getVehicleName());
        safeUser.setVehicleNumber(user.getVehicleNumber());
        safeUser.setSeatsAvailable(user.getSeatsAvailable());
        safeUser.setPickupLocation(user.getPickupLocation());
        safeUser.setDestination(user.getDestination());

        // ❌ password NEVER exposed
        return ResponseEntity.ok(safeUser);
    }
}
