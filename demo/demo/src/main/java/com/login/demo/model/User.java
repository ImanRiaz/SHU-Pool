package com.login.demo.model;

public class User {
    private String studentId;       // Student or staff ID
    private String fullName;        // User's full name
    private String email;           // Official SHU email
    private String password;        // Password
    private String role;            // "driver", "passenger", or "" if not chosen yet

    // Driver fields
    private String vehicleNumber;   // Car/Bike registration number
    private String vehicleName;     // Car/Bike name/model
    private String seatsAvailable;  // Total seats available

    // Passenger fields
    private String pickupLocation;  // Passenger's pickup address
    private String destination;     // Destination (usually SHU)

    public User() {
    }

    // Full constructor including ALL fields
    public User(String studentId, String fullName, String email, String password, String role,
                String vehicleNumber, String vehicleName, String seatsAvailable,
                String pickupLocation, String destination) {

        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;

        this.vehicleNumber = vehicleNumber;
        this.vehicleName = vehicleName;
        this.seatsAvailable = seatsAvailable;

        this.pickupLocation = pickupLocation;
        this.destination = destination;
    }

    // ---------------- GETTERS & SETTERS ----------------

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

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getSeatsAvailable() {
        return seatsAvailable;
    }

    public void setSeatsAvailable(String seatsAvailable) {
        this.seatsAvailable = seatsAvailable;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
