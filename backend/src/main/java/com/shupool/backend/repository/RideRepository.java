package com.shupool.backend.repository;

import com.shupool.backend.model.Ride;
import com.shupool.backend.model.RideStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RideRepository extends MongoRepository<Ride, String> {
    List<Ride> findByStatus(RideStatus status);
    
    // Simple search (can be enhanced with Geo functionality later)
    List<Ride> findByOriginContainingIgnoreCaseAndDestinationContainingIgnoreCaseAndStatus(
            String origin, String destination, RideStatus status);
            
    // Find rides by driver
    List<Ride> findByDriverId(String driverId);
}
