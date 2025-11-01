package com.login.demo.service;

import com.login.demo.model.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class UserService {

    private final File file;
    private final ObjectMapper mapper = new ObjectMapper();

    // DSA: use HashMap for O(1) lookups
    private final Map<String, User> userMap = new HashMap<>();

    public UserService() {
        String userHome = System.getProperty("user.home");
        File dataDir = new File(userHome, "shu-pool-data");
        if (!dataDir.exists()) dataDir.mkdirs();

        this.file = new File(dataDir, "users.json");
        System.out.println(" USERS.JSON PATH → " + file.getAbsolutePath());
        loadToMemory(); // populate map on startup
    }

    // ---------- UTILITIES ----------

    private List<User> readUsers() {
        try {
            if (!file.exists()) {
                mapper.writeValue(file, new ArrayList<User>());
            }
            return mapper.readValue(file, new TypeReference<List<User>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveUsers(List<User> users) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, users);
            System.out.println("Saved " + users.size() + " users to JSON");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // load list → HashMap for O(1) search
    private void loadToMemory() {
        for (User u : readUsers()) {
            userMap.put(u.getEmail().toLowerCase(), u);
        }
        System.out.println("📦 Loaded " + userMap.size() + " users into memory");
    }

    // ---------- SIGN UP ----------

    public String signup(User newUser) {
        if (newUser.getFullName() == null || newUser.getFullName().trim().isEmpty())
            return "Full name required.";

        if (newUser.getStudentId() == null || newUser.getStudentId().trim().isEmpty())
            return "Student/Staff ID required.";

        if (newUser.getEmail() == null || !newUser.getEmail().endsWith("@shu.edu.pk"))
            return "Please use official SHU email.";

        if (newUser.getPassword() == null || newUser.getPassword().length() < 5)
            return "Password must be at least 5 characters.";

        // check existing using HashMap
        if (userMap.containsKey(newUser.getEmail().toLowerCase()))
            return "Email already registered.";

        // add to map + file
        userMap.put(newUser.getEmail().toLowerCase(), newUser);

        List<User> users = new ArrayList<>(userMap.values());
        saveUsers(users);
        return "Signup successful!";
    }

    // ---------- LOGIN ----------

    public String login(User loginUser) {
        if (loginUser.getEmail() == null || loginUser.getPassword() == null)
            return "Missing email or password.";

        User existing = userMap.get(loginUser.getEmail().toLowerCase());
        if (existing == null)
            return "User not found.";

        if (!existing.getPassword().equals(loginUser.getPassword()))
            return "Invalid password.";

        return "Login successful!";
    }

    // ---------- UPDATE ROLE ----------

    public String updateRole(String email, String role) {
        if (email == null || role == null)
            return "Missing email or role.";

        User user = userMap.get(email.toLowerCase());
        if (user == null)
            return "User not found.";

        user.setRole(role);
        userMap.put(email.toLowerCase(), user);

        // Save to file
        saveUsers(new ArrayList<>(userMap.values()));
        System.out.println("Role updated: " + email + " → " + role);

        return "Role updated successfully to " + role + "!";
    }

    // ---------- EXTRA UTILITIES ----------

    public List<User> getAllUsersSorted() {
        // Demonstrate DSA: sort by name using TreeSet
        TreeSet<User> sorted = new TreeSet<>(Comparator.comparing(User::getFullName));
        sorted.addAll(userMap.values());
        return new ArrayList<>(sorted);
    }
}
