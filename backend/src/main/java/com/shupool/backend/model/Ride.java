package com.shupool.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "rides")
public class Ride {
    @Id
    private String id;
    
    @DBRef
    private User driver;

    private String origin;
    private String destination;
    
    // Geo-coordinates (optional but good for future)
    private double startLat;
    private double startLng;
    private double endLat;
    private double endLng;

    private LocalDateTime departureTime;
    
    private int seatsOffered;
    private int seatsAvailable;
    private double pricePerSeat;
    
    private RideStatus status; // OPEN, FULL, COMPLETED, CANCELLED
}
