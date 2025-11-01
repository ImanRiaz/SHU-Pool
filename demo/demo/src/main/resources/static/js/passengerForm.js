document.getElementById("passengerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const passengerData = {
    location: document.getElementById("location").value,
    genderPreference: document.getElementById("genderPreference").value,
    emergencyContact: document.getElementById("emergencyContact").value,
    studentOrStaff: document.getElementById("studentOrStaff").value,
    email: localStorage.getItem("userEmail") // stored after login
  };

  const resDiv = document.getElementById("responseMsg");
  resDiv.textContent = "Submitting...";
  resDiv.style.color = "orange";

  try {
    const response = await fetch("/api/passenger/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passengerData)
    });

    const result = await response.text();

    if (result.includes("successful")) {
      resDiv.textContent = result;
      resDiv.style.color = "green";
      alert("Passenger profile created successfully!");
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
