document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const messageDiv = document.getElementById("signupMessage");
    messageDiv.style.display = "block";
    messageDiv.textContent = "Processing...";
    messageDiv.style.backgroundColor = "#fff3cd";
    messageDiv.style.color = "#856404";

    try {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentId, fullName, email, password, role: "" })
        });

        const result = await response.text();
        messageDiv.textContent = result;

        if (result.includes("successful")) {
            messageDiv.style.backgroundColor = "#d4edda";
            messageDiv.style.color = "#155724";
            alert(result);
            setTimeout(() => window.location.href = "login.html", 1000);
        } else {
            messageDiv.style.backgroundColor = "#f8d7da";
            messageDiv.style.color = "#721c24";
        }
    } catch (error) {
        messageDiv.textContent = "Error: " + error.message;
        messageDiv.style.backgroundColor = "#f8d7da";
        messageDiv.style.color = "#721c24";
    }
});
