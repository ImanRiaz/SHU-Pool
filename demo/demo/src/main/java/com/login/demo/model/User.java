package com.login.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    private String studentId;
    private String fullName;
    private String email;
    private String password;
    private String role;
    private String department;
    private String program;
    private String semester;
    private String phone;

    // Driver fields
    private String vehicleNumber;
    private String vehicleName;
    private String seatsAvailable;

    // Passenger fields
    private String pickupLocation;
    private String destination;

    public User() {}

    public User(String studentId, String fullName, String email, String password, String role,
                String department, String program, String semester, String phone,
                String vehicleNumber, String vehicleName, String seatsAvailable,
                String pickupLocation, String destination) {
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.department = department;
        this.program = program;
        this.semester = semester;
        this.phone = phone;
        this.vehicleNumber = vehicleNumber;
        this.vehicleName = vehicleName;
        this.seatsAvailable = seatsAvailable;
        this.pickupLocation = pickupLocation;
        this.destination = destination;
    }

    // ---------------- GETTERS & SETTERS ----------------

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public String getVehicleName() { return vehicleName; }
    public void setVehicleName(String vehicleName) { this.vehicleName = vehicleName; }

    public String getSeatsAvailable() { return seatsAvailable; }
    public void setSeatsAvailable(String seatsAvailable) { this.seatsAvailable = seatsAvailable; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
}
