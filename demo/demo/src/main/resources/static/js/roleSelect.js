// Retrieve logged-in user email from localStorage
const userEmail = localStorage.getItem("userEmail");

if (!userEmail) {
    alert("Please log in first!");
    window.location.href = "login.html";
}

document.getElementById("driverBtn").addEventListener("click", () => updateRole("driver"));
document.getElementById("passengerBtn").addEventListener("click", () => updateRole("passenger"));

async function updateRole(role) {
    try {
        const response = await fetch("/api/auth/updateRole", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, role })
        });

        const result = await response.text();
        alert(result);

        if (result.includes("updated")) {
            localStorage.setItem("userRole", role);

            if (role === "driver") {
                window.location.href = "driverForm.html";
            } else {
                window.location.href = "passengerForm.html";
            }
        }
    } catch (error) {
        console.error("Error updating role:", error);
        alert("Could not update role. Please try again.");
    }
}
