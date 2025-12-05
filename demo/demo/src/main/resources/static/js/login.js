document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
    });

    const data = await response.json();

    if (data.status !== "success") {
        alert(data.message || "Login failed");
        return;
    }

    // Save user info to localStorage
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userName", data.fullName);
    localStorage.setItem("userRole", data.role);
    localStorage.setItem("studentId", data.studentId);

    // AUTO REDIRECT BASED ON ROLE
    if (data.role === "driver") {
        window.location.href = "home.html";
    }
    else if (data.role === "passenger") {
        window.location.href = "home.html";
    }
    else {
        // User has no role → send to role selection page
        window.location.href = "roleSelect.html";
    }
});
