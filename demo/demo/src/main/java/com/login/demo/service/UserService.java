package com.login.demo.service;

import com.login.demo.model.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final File file;
    private final ObjectMapper mapper = new ObjectMapper();

    public UserService() {
        String userHome = System.getProperty("user.home");
        File dataDir = new File(userHome, "login-app-data");
        if (!dataDir.exists()) {
            boolean created = dataDir.mkdirs();
            System.out.println("Data directory created: " + created);
        }
        this.file = new File(dataDir, "users.json");
        System.out.println("========================================");
        System.out.println("User data file location: " + file.getAbsolutePath());
        System.out.println("File exists: " + file.exists());
        System.out.println("========================================");
    }

    private List<User> readUsers() {
        try {
            if (!file.exists()) {
                System.out.println("File doesn't exist, creating new one...");
                file.getParentFile().mkdirs();
                mapper.writeValue(file, new ArrayList<User>());
                System.out.println("Empty users file created");
            }
            List<User> users = mapper.readValue(file, new TypeReference<List<User>>() {});
            System.out.println("Read " + users.size() + " users from file");
            return users;
        } catch (IOException e) {
            System.err.println("ERROR reading users: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveUsers(List<User> users) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, users);
            System.out.println("✓ Successfully saved " + users.size() + " users to file");
            System.out.println("File path: " + file.getAbsolutePath());
            System.out.println("File size: " + file.length() + " bytes");
        } catch (IOException e) {
            System.err.println("✗ ERROR saving users: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public String signup(User newUser) {
        System.out.println("\n=== SIGNUP REQUEST ===");
        System.out.println("Username: " + newUser.getUsername());
        System.out.println("Password: " + (newUser.getPassword() != null ? "***" : "NULL"));

        if (newUser.getUsername() == null || newUser.getUsername().trim().isEmpty()) {
            return "Username cannot be empty!";
        }
        if (newUser.getPassword() == null || newUser.getPassword().trim().isEmpty()) {
            return "Password cannot be empty!";
        }

        List<User> users = readUsers();
        for (User u : users) {
            if (u.getUsername().equalsIgnoreCase(newUser.getUsername())) {
                System.out.println("✗ Username already exists");
                return "Username already exists!";
            }
        }
        users.add(newUser);
        saveUsers(users);
        System.out.println("✓ Signup successful!");
        return "Signup successful!";
    }

    public String login(User loginUser) {
        System.out.println("\n=== LOGIN REQUEST ===");
        System.out.println("Username: " + loginUser.getUsername());
        System.out.println("Password: " + (loginUser.getPassword() != null ? "***" : "NULL"));

        List<User> users = readUsers();
        System.out.println("Checking against " + users.size() + " registered users");

        for (User u : users) {
            if (u.getUsername().equalsIgnoreCase(loginUser.getUsername()) &&
                    u.getPassword().equals(loginUser.getPassword())) {
                System.out.println("✓ Login successful!");
                return "Login successful!";
            }
        }
        System.out.println("✗ Invalid credentials");
        return "Invalid username or password!";
    }
}