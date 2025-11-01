document.getElementById("driverForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const driverData = {
    cnic: document.getElementById("cnic").value,
    drivingLicense: document.getElementById("drivingLicense").value,
    seatsAvailable: document.getElementById("seatsAvailable").value,
    carPlateNumber: document.getElementById("carPlateNumber").value,
    location: document.getElementById("location").value,
    genderPreference: document.getElementById("genderPreference").value,
    studentOrStaff: document.getElementById("studentOrStaff").value,
    contactNumber: document.getElementById("contactNumber").value,
    email: localStorage.getItem("userEmail") // from logged-in user
  };

  const resDiv = document.getElementById("responseMsg");
  resDiv.textContent = "Submitting...";
  resDiv.style.color = "orange";

  try {
    const response = await fetch("/api/driver/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driverData)
    });

    const result = await response.text();

    if (result.includes("success")) {
      resDiv.textContent = result;
      resDiv.style.color = "green";
      alert("Driver profile created successfully!");
      window.location.href = "/dashboard.html"; // redirect later
    } else {
      resDiv.textContent = result;
      resDiv.style.color = "red";
    }
  } catch (error) {
    resDiv.textContent = "Error: " + error.message;
    resDiv.style.color = "red";
  }
});
