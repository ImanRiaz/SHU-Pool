package com.login.demo.controller;

import com.login.demo.model.Passenger;
import com.login.demo.service.PassengerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/passenger")
@CrossOrigin(origins = "*")
public class PassengerController {

    private final PassengerService passengerService;

    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    @PostMapping("/register")
    public String registerPassenger(@RequestBody Passenger newPassenger) {
        System.out.println("=== PASSENGER REGISTER REQUEST ===");
        System.out.println("Email: " + newPassenger.getEmail());
        return passengerService.registerPassenger(newPassenger);
    }
}
