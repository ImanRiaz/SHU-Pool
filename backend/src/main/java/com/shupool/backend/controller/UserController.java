package com.shupool.backend.controller;

import com.shupool.backend.model.User;
import com.shupool.backend.payload.response.MessageResponse;
import com.shupool.backend.repository.UserRepository;
import com.shupool.backend.security.jwt.JwtUtils;
import com.shupool.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updateRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        if (updateRequest.getBio() != null) user.setBio(updateRequest.getBio());
        if (updateRequest.getProfilePicUrl() != null) user.setProfilePicUrl(updateRequest.getProfilePicUrl());
        if (updateRequest.getFullName() != null) user.setFullName(updateRequest.getFullName());
        if (updateRequest.getPhone() != null) user.setPhone(updateRequest.getPhone());
        
        // Driver specific updates
        if (updateRequest.getVehicleModel() != null) user.setVehicleModel(updateRequest.getVehicleModel());
        if (updateRequest.getVehicleNumber() != null) user.setVehicleNumber(updateRequest.getVehicleNumber());

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Profile updated successfully"));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserPublicProfile(@PathVariable String id) {
         User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
         // In production, use a DTO to hide sensitive info like phone/email if needed
         return ResponseEntity.ok(user);
    }
}
