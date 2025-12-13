package com.login.demo.controller;

import com.login.demo.model.Driver;
import com.login.demo.service.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/driver")
@CrossOrigin(origins = "*") // allow all origins for frontend testing
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }
    @GetMapping("/info")
    public ResponseEntity<?> getDriverInfo(@RequestParam("email") String email) {
        if (email == null || email.trim().isEmpty()) return ResponseEntity.badRequest().body("Email required");
        var d = driverService.getByEmail(email);
        if (d == null) return ResponseEntity.status(404).body("Driver not found");
        return ResponseEntity.ok(d);
    }

    @PostMapping("/register")
    public String registerDriver(@RequestBody Driver newDriver) {
        System.out.println("=== DRIVER REGISTER REQUEST ===");
        System.out.println("Email: " + newDriver.getEmail());
        return driverService.registerDriver(newDriver);
    }
}
