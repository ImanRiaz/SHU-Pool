package com.login.demo.controller;

import com.login.demo.model.Passenger;
import com.login.demo.service.PassengerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/passenger")
@CrossOrigin(origins = "*")
public class PassengerController {

    private final PassengerService passengerService;

    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    @GetMapping("/info")
    public ResponseEntity<?> getPassengerInfo(@RequestParam("email") String email) {
        if (email == null || email.trim().isEmpty())
            return ResponseEntity.badRequest().body("Email required");

        Passenger p = passengerService.getByEmail(email); // avoid 'var' for compatibility
        if (p == null) return ResponseEntity.status(404).body("Passenger not found");
        return ResponseEntity.ok(p);
    }

    @PostMapping("/register")
    public String registerPassenger(@RequestBody Passenger newPassenger) {
        System.out.println("=== PASSENGER REGISTER REQUEST ===");
        System.out.println("Email: " + newPassenger.getEmail());
        return passengerService.registerPassenger(newPassenger);
    }
}
