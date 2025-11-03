document.getElementById("driverForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const driverData = {
    cnic: document.getElementById("cnic").value.trim(),
    drivingLicense: document.getElementById("drivingLicense").value.trim(),
    seatsAvailable: document.getElementById("seatsAvailable").value,
    carPlateNumber: document.getElementById("carPlateNumber").value.trim(),
    location: document.getElementById("location").value.trim(),
    genderPreference: document.getElementById("genderPreference").value,
    studentOrStaff: document.getElementById("studentOrStaff").value,
    contactNumber: document.getElementById("contactNumber").value.trim(),
    email: localStorage.getItem("userEmail") // saved after login
  };

  const resDiv = document.getElementById("responseMsg");
  resDiv.textContent = "Submitting...";
  resDiv.style.color = "orange";

  console.log("🚗 Submitting driver data:", driverData);

  try {
    const response = await fetch("/api/driver/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driverData)
    });

    const result = await response.text();
    console.log("✅ Server response:", result);

    // Check for success or already exists
    if (result.toLowerCase().includes("successful") || result.toLowerCase().includes("exists")) {
      resDiv.textContent = result;
      resDiv.style.color = "green";
      alert(result);

      // Redirect to home page after success
      window.location.href = "/home.html";
    } else {
      resDiv.textContent = result;
      resDiv.style.color = "red";
    }

  } catch (error) {
    console.error("❌ Error submitting driver data:", error);
    resDiv.textContent = "Error: " + error.message;
    resDiv.style.color = "red";
  }
});
