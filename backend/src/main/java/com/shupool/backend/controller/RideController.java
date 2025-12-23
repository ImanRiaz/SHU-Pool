package com.shupool.backend.controller;

import com.shupool.backend.model.Ride;
import com.shupool.backend.model.RideStatus;
import com.shupool.backend.model.User;
import com.shupool.backend.repository.RideRepository;
import com.shupool.backend.repository.UserRepository;
import com.shupool.backend.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rides")
public class RideController {

    @Autowired
    RideRepository rideRepository;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    JwtUtils jwtUtils;

    @GetMapping
    public List<Ride> getAllOpenRides() {
        return rideRepository.findByStatus(RideStatus.OPEN);
    }

    @GetMapping("/search")
    public List<Ride> searchRides(@RequestParam String origin, @RequestParam String destination) {
        return rideRepository.findByOriginContainingIgnoreCaseAndDestinationContainingIgnoreCaseAndStatus(
                origin, destination, RideStatus.OPEN);
    }

    @PostMapping("/offer")
    @PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
    public ResponseEntity<?> offerRide(@RequestHeader("Authorization") String token, @RequestBody Ride rideRequest) {
        // Extract user from token
        String jwt = token.substring(7);
        String email = jwtUtils.getUserNameFromJwtToken(jwt);
        User driver = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Driver not found"));

        if (!driver.getRoles().stream().anyMatch(role -> role.name().equals("DRIVER"))) {
             return ResponseEntity.badRequest().body("Only Drivers can offer rides");
        }

        Ride ride = Ride.builder()
                .driver(driver)
                .origin(rideRequest.getOrigin())
                .destination(rideRequest.getDestination())
                .departureTime(rideRequest.getDepartureTime())
                .seatsOffered(rideRequest.getSeatsOffered())
                .seatsAvailable(rideRequest.getSeatsOffered())
                .pricePerSeat(rideRequest.getPricePerSeat())
                .status(RideStatus.OPEN)
                .build();

        rideRepository.save(ride);
        return ResponseEntity.ok("Ride offered successfully!");
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateRideStatus(@PathVariable String id, @RequestParam RideStatus status, @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        String email = jwtUtils.getUserNameFromJwtToken(jwt);
        User driver = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        
        Ride ride = rideRepository.findById(id).orElseThrow(() -> new RuntimeException("Ride not found"));
        
        if (!ride.getDriver().getId().equals(driver.getId())) {
             return ResponseEntity.badRequest().body("Not authorized to update this ride");
        }
        
        ride.setStatus(status);
        rideRepository.save(ride);
        
        return ResponseEntity.ok("Ride status updated to " + status);
    }
}
