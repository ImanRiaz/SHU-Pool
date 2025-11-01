package com.login.demo.model;

public class User {
    private String studentId;   // Student or staff ID
    private String fullName;    // User's full name
    private String email;       // Must be official SHU email
    private String password;    // User password
    private String role;        // "driver" or "passenger" (can be empty for now)

    // Default constructor (required by Jackson)
    public User() {}

    // Parameterized constructor
    public User(String studentId, String fullName, String email, String password, String role) {
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
