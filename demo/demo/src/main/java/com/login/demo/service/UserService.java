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
    private final Map<String, User> userMap = new HashMap<>();

    public UserService() {
        String userHome = System.getProperty("user.home");
        File dataDir = new File(userHome, "shu-pool-data");
        if (!dataDir.exists()) dataDir.mkdirs();

        this.file = new File(dataDir, "users.json");
        loadToMemory();
    }

    private List<User> readUsers() {
        try {
            if (!file.exists()) mapper.writeValue(file, new ArrayList<User>());
            return mapper.readValue(file, new TypeReference<List<User>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveUsers(List<User> users) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, users);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void loadToMemory() {
        for (User u : readUsers()) {
            userMap.put(u.getEmail().toLowerCase(), u);
        }
    }

    // ---------------- SIGNUP ----------------
    public String signup(User newUser) {
        if (newUser.getFullName() == null || newUser.getFullName().isEmpty())
            return "Full name required";
        if (newUser.getStudentId() == null || newUser.getStudentId().isEmpty())
            return "Student/Staff ID required";
        if (newUser.getEmail() == null || !newUser.getEmail().endsWith("@shu.edu.pk"))
            return "Please use official SHU email";
        if (newUser.getPassword() == null || newUser.getPassword().length() < 5)
            return "Password must be at least 5 characters";
        if (userMap.containsKey(newUser.getEmail().toLowerCase()))
            return "Email already registered";

        if (newUser.getRole() == null) newUser.setRole("none");

        userMap.put(newUser.getEmail().toLowerCase(), newUser);
        saveUsers(new ArrayList<>(userMap.values()));
        return "Signup successful!";
    }

    // ---------------- LOGIN ----------------
    public User login(User loginUser) {
        if (loginUser.getEmail() == null || loginUser.getPassword() == null)
            return null;
        User existing = userMap.get(loginUser.getEmail().toLowerCase());
        if (existing == null) return null;
        if (!existing.getPassword().equals(loginUser.getPassword())) return null;
        return existing;
    }

    // ---------------- ROLE UPDATE ----------------
    public String updateRoleWithPassword(String email, String password, String newRole) {
        User user = userMap.get(email.toLowerCase());
        if (user == null) return "User not found";
        if (!user.getPassword().equals(password)) return "Incorrect password";
        user.setRole(newRole);
        saveUsers(new ArrayList<>(userMap.values()));
        return "success";
    }

    // ---------------- INITIAL ROLE SELECTION (no password) ----------------
    public String updateRole(String email, String role) {
        User user = userMap.get(email.toLowerCase());
        if (user == null) return "User not found";

        user.setRole(role);
        saveUsers(new ArrayList<>(userMap.values()));
        return "Role updated successfully to " + role + "!";
    }


    // ---------------- PROFILE UPDATE ----------------
    public String updateProfile(User updated) {
        User user = userMap.get(updated.getEmail().toLowerCase());
        if (user == null) return "User not found";

        // Update ONLY editable fields if provided
        if (updated.getFullName() != null)
            user.setFullName(updated.getFullName());

        if (updated.getPhone() != null)
            user.setPhone(updated.getPhone());

        if (updated.getDepartment() != null)
            user.setDepartment(updated.getDepartment());

        if (updated.getProgram() != null)
            user.setProgram(updated.getProgram());

        if (updated.getSemester() != null)
            user.setSemester(updated.getSemester());

        // 🚫 DO NOT TOUCH PASSWORD / ROLE / EMAIL

        saveUsers(new ArrayList<>(userMap.values()));
        return "Profile updated";
    }

    // ---------------- GET ----------------
    public User getByEmail(String email) {
        if (email == null) return null;
        return userMap.get(email.toLowerCase());
    }

    public List<User> getAllUsersSorted() {
        TreeSet<User> sorted = new TreeSet<>(Comparator.comparing(User::getFullName));
        sorted.addAll(userMap.values());
        return new ArrayList<>(sorted);
    }
}
