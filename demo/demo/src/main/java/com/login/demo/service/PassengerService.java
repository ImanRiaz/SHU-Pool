package com.login.demo.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.login.demo.model.Passenger;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class PassengerService {

    private final File file;
    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<String, Passenger> passengerMap = new HashMap<>();

    public PassengerService() {
        String userHome = System.getProperty("user.home");
        File dataDir = new File(userHome, "shu-pool-data");
        if (!dataDir.exists()) dataDir.mkdirs();

        this.file = new File(dataDir, "passengers.json");
        System.out.println(" PASSENGERS.JSON PATH → " + file.getAbsolutePath());
        loadToMemory();
    }

    // Load data to memory for O(1) lookups
    private void loadToMemory() {
        for (Passenger p : readPassengers()) {
            passengerMap.put(p.getEmail().toLowerCase(), p);
        }
        System.out.println(" Loaded " + passengerMap.size() + " passengers into memory");
    }

    // Read from JSON
    private List<Passenger> readPassengers() {
        try {
            if (!file.exists()) {
                mapper.writeValue(file, new ArrayList<Passenger>());
            }
            return mapper.readValue(file, new TypeReference<List<Passenger>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    // Save to JSON
    private void savePassengers(List<Passenger> passengers) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, passengers);
            System.out.println(" Saved " + passengers.size() + " passengers to JSON");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Register new passenger
    public String registerPassenger(Passenger newPassenger) {
        if (newPassenger.getEmail() == null || newPassenger.getEmail().isEmpty())
            return "Email is required.";

        if (passengerMap.containsKey(newPassenger.getEmail().toLowerCase()))
            return "Passenger already exists.";

        passengerMap.put(newPassenger.getEmail().toLowerCase(), newPassenger);
        savePassengers(new ArrayList<>(passengerMap.values()));

        return "Passenger registration successful!";
    }
}
