package com.login.demo.model;

public class Driver {
    private String cnic;
    private String drivingLicense;
    private int seatsAvailable;
    private String carPlateNumber;
    private String location;
    private String genderPreference;
    private String studentOrStaff;
    private String contactNumber;
    private String email;

    // Default constructor (needed for JSON mapping)
    public Driver() {}

    // Parameterized constructor
    public Driver(String cnic, String drivingLicense, int seatsAvailable, String carPlateNumber,
                  String location, String genderPreference, String studentOrStaff,
                  String contactNumber, String email) {
        this.cnic = cnic;
        this.drivingLicense = drivingLicense;
        this.seatsAvailable = seatsAvailable;
        this.carPlateNumber = carPlateNumber;
        this.location = location;
        this.genderPreference = genderPreference;
        this.studentOrStaff = studentOrStaff;
        this.contactNumber = contactNumber;
        this.email = email;
    }

    // Getters & Setters
    public String getCnic() { return cnic; }
    public void setCnic(String cnic) { this.cnic = cnic; }

    public String getDrivingLicense() { return drivingLicense; }
    public void setDrivingLicense(String drivingLicense) { this.drivingLicense = drivingLicense; }

    public int getSeatsAvailable() { return seatsAvailable; }
    public void setSeatsAvailable(int seatsAvailable) { this.seatsAvailable = seatsAvailable; }

    public String getCarPlateNumber() { return carPlateNumber; }
    public void setCarPlateNumber(String carPlateNumber) { this.carPlateNumber = carPlateNumber; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getGenderPreference() { return genderPreference; }
    public void setGenderPreference(String genderPreference) { this.genderPreference = genderPreference; }

    public String getStudentOrStaff() { return studentOrStaff; }
    public void setStudentOrStaff(String studentOrStaff) { this.studentOrStaff = studentOrStaff; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
