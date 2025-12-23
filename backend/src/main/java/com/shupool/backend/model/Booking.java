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
@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;

    @DBRef
    private User passenger;
    
    @DBRef
    private Ride ride;
    
    private int seatsBooked;
    private LocalDateTime bookingTime;
    
    private String status; // PENDING, CONFIRMED, CANCELLED
}
