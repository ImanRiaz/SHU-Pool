package com.shupool.backend.controller;

import com.shupool.backend.model.Role;
import com.shupool.backend.model.User;
import com.shupool.backend.payload.request.LoginRequest;
import com.shupool.backend.payload.request.SignupRequest;
import com.shupool.backend.payload.response.JwtResponse;
import com.shupool.backend.payload.response.MessageResponse;
import com.shupool.backend.repository.UserRepository;
import com.shupool.backend.security.jwt.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        org.springframework.security.core.userdetails.UserDetails userDetails = 
                (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();
        
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        
        // Fetch full name from DB ideally, but for now we might need to cast or fetch again if needed
        // Assuming we want to return just what we have. 
        // Note: UserDetailsImpl (which we used inline basically) doesn't have fullName.
        // Let's just return email as name or fetch user.
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

        return ResponseEntity.ok(new JwtResponse(jwt,
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = User.builder()
                .fullName(signUpRequest.getFullName())
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .build();

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            roles.add(Role.PASSENGER);
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin":
                        roles.add(Role.ADMIN);
                        break;
                    case "driver":
                        roles.add(Role.DRIVER);
                        break;
                    default:
                        roles.add(Role.PASSENGER);
                }
            });
        }

        user.setRoles(roles);
        
        // Handle Driver specific fields
        if (roles.contains(Role.DRIVER)) {
            user.setVehicleNumber(signUpRequest.getVehicleNumber());
            user.setVehicleModel(signUpRequest.getVehicleModel());
            user.setSeatsAvailable(signUpRequest.getSeatsAvailable());
        }

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody LoginRequest request) {
        // In a real app, this would generate a token and email it.
        // For now, we stub it to simulate success.
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.ok(new MessageResponse("Reset link sent."));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Email not found."));
    }
}
