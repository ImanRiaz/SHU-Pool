package com.shupool.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullName;
    private String email;
    private String password; // Hashed

    private Set<Role> roles;

    // Profile Details
    private String phone;
    private String studentId; // If student
    private String department;

    // Driver Specific
    private String vehicleNumber;
    private String vehicleModel;
    private int seatsAvailable;
    
    // Status
    private boolean verified;

    // Profile Fields
    private String bio;
    private String profilePicUrl;
    
    // Rating Fields
    private Double averageRating = 0.0;
    private Integer ratingCount = 0;
}
