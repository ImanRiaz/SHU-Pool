document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailOrId = document.getElementById("emailOrId").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrId, studentId: emailOrId, password })
    });

    const result = await response.text();
    alert(result);

    if (result.includes("successful")) {
        localStorage.setItem("userEmail", emailOrId);
        window.location.href = "roleSelect.html";
    }
});