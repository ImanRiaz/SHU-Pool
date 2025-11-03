document.getElementById("passengerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("userEmail");
  if (!email) {
    alert(" No user email found. Please log in again.");
    return;
  }

  const passengerData = {
    location: document.getElementById("location").value.trim(),
    genderPreference: document.getElementById("genderPreference").value,
    emergencyContact: document.getElementById("emergencyContact").value.trim(),
    studentOrStaff: document.getElementById("studentOrStaff").value,
    contactNumber: document.getElementById("contactNumber").value.trim(),
    email: email
  };

  const resDiv = document.getElementById("responseMsg");
  resDiv.textContent = "Submitting...";
  resDiv.style.color = "orange";

  console.log("🧳 Submitting passenger data:", passengerData);

  try {
    const response = await fetch("/api/passenger/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passengerData)
    });

    const result = await response.text();
    console.log("Server response:", result);

    if (result.toLowerCase().includes("successful") || result.toLowerCase().includes("exists")) {
      resDiv.textContent = result;
      resDiv.style.color = "green";
      alert(result);
      window.location.href = "/home.html"; // Redirect to home
    } else {
      resDiv.textContent = result;
      resDiv.style.color = "red";
    }
  } catch (error) {
    console.error(" Error submitting passenger data:", error);
    resDiv.textContent = "Error: " + error.message;
    resDiv.style.color = "red";
  }
});
