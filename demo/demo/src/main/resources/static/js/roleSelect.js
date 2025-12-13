// roleselect.js
// --------------------
// Retrieve logged-in user email from localStorage
const userEmail = localStorage.getItem("userEmail");

if (!userEmail) {
    alert("Please log in first!");
    window.location.href = "login.html";
}

// DOM buttons
const driverBtn = document.getElementById("driverBtn");
const passengerBtn = document.getElementById("passengerBtn");

driverBtn && driverBtn.addEventListener("click", () => selectInitialRole("driver"));
passengerBtn && passengerBtn.addEventListener("click", () => selectInitialRole("passenger"));

// First-time role selection (no password)
async function selectInitialRole(role) {
    try {
        const response = await fetch("/api/auth/selectInitialRole", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, role })
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            // Save role locally
            localStorage.setItem("userRole", role);

            // Redirect to respective form
            if (role === "driver") {
                window.location.href = "driverForm.html";
            } else {
                window.location.href = "passengerForm.html";
            }
        } else {
            alert(data.message || "Failed to select role. Try again.");
        }
    } catch (err) {
        console.error("Error selecting role:", err);
        alert("Something went wrong. Try again.");
    }
}
