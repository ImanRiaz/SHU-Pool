package com.login.demo.model;

public class Passenger {
    private String location;
    private String genderPreference;
    private String emergencyContact;
    private String studentOrStaff;
    private String email;

    // Default constructor (required for JSON mapping)
    public Passenger() {}

    // Parameterized constructor
    public Passenger(String location, String genderPreference, String emergencyContact, String studentOrStaff, String email) {
        this.location = location;
        this.genderPreference = genderPreference;
        this.emergencyContact = emergencyContact;
        this.studentOrStaff = studentOrStaff;
        this.email = email;
    }

    // Getters and Setters
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getGenderPreference() { return genderPreference; }
    public void setGenderPreference(String genderPreference) { this.genderPreference = genderPreference; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public String getStudentOrStaff() { return studentOrStaff; }
    public void setStudentOrStaff(String studentOrStaff) { this.studentOrStaff = studentOrStaff; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
