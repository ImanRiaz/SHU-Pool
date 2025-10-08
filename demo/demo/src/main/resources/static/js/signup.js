document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("=== SIGNUP FORM SUBMITTED ===");

    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    console.log("Username:", username);
    console.log("Password length:", password.length);

    const messageDiv = document.getElementById("signupMessage");
    messageDiv.style.display = "block";
    messageDiv.textContent = "Processing...";
    messageDiv.style.backgroundColor = "#fff3cd";
    messageDiv.style.color = "#856404";

    try {
        console.log("Sending request to /api/auth/signup");

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        console.log("Server response:", result);

        // Display message
        messageDiv.textContent = result;

        if (result.includes("successful")) {
            messageDiv.style.backgroundColor = "#d4edda";
            messageDiv.style.color = "#155724";
            messageDiv.style.border = "1px solid #c3e6cb";

            alert(result);

            // Redirect after 1 second
            setTimeout(() => {
                console.log("Redirecting to login page...");
                window.location.href = "/login.html";
            }, 1000);
        } else {
            messageDiv.style.backgroundColor = "#f8d7da";
            messageDiv.style.color = "#721c24";
            messageDiv.style.border = "1px solid #f5c6cb";
            alert(result);
        }
    } catch (error) {
        console.error("ERROR during signup:", error);
        messageDiv.textContent = "Error: " + error.message;
        messageDiv.style.backgroundColor = "#f8d7da";
        messageDiv.style.color = "#721c24";
        alert("Error connecting to server: " + error.message);
    }
});

console.log("signup.js loaded successfully");