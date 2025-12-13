package com.login.demo.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.login.demo.model.Driver;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class DriverService {

    private final File file;
    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<String, Driver> driverMap = new HashMap<>();

    public DriverService() {
        String userHome = System.getProperty("user.home");
        File dataDir = new File(userHome, "shu-pool-data");
        if (!dataDir.exists()) dataDir.mkdirs();

        this.file = new File(dataDir, "drivers.json");
        System.out.println(" DRIVERS.JSON PATH → " + file.getAbsolutePath());
        loadToMemory();
    }

    // inside DriverService
    public Driver getByEmail(String email) {
        if (email == null) return null;
        return driverMap.get(email.toLowerCase());
    }


    // Load existing drivers into memory
    private void loadToMemory() {
        for (Driver d : readDrivers()) {
            driverMap.put(d.getEmail().toLowerCase(), d);
        }
        System.out.println(" Loaded " + driverMap.size() + " drivers into memory");
    }

    // Read from file
    private List<Driver> readDrivers() {
        try {
            if (!file.exists()) {
                mapper.writeValue(file, new ArrayList<Driver>());
            }
            return mapper.readValue(file, new TypeReference<List<Driver>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    // Save to file
    private void saveDrivers(List<Driver> drivers) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, drivers);
            System.out.println(" Saved " + drivers.size() + " drivers to JSON");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Register driver
    public String registerDriver(Driver newDriver) {
        if (newDriver.getEmail() == null || newDriver.getEmail().isEmpty())
            return "Email is required.";

        if (driverMap.containsKey(newDriver.getEmail().toLowerCase()))
            return "Driver with this email already exists.";

        driverMap.put(newDriver.getEmail().toLowerCase(), newDriver);
        saveDrivers(new ArrayList<>(driverMap.values()));

        return "Driver registration successful!";
    }
}
