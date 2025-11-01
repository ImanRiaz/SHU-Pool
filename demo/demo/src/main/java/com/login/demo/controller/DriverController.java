package com.login.demo.controller;

import com.login.demo.model.Driver;
import com.login.demo.service.DriverService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/driver")
@CrossOrigin(origins = "*") // allow all origins for frontend testing
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping("/register")
    public String registerDriver(@RequestBody Driver newDriver) {
        System.out.println("=== DRIVER REGISTER REQUEST ===");
        System.out.println("Email: " + newDriver.getEmail());
        return driverService.registerDriver(newDriver);
    }
}
