document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const result = await response.text();
    alert(result);

    if (result.includes("successful")) {
        document.body.innerHTML = `<h2 style="text-align:center;">Welcome, ${username}!</h2>`;
    }
});
