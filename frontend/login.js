// Prefill email/phone on page load if available
window.onload = () => {
  const prefill = localStorage.getItem("loginPrefill");
  if (prefill) {
    document.getElementById("loginId").value = prefill;
  }
};

async function login() {
  const loginId = document.getElementById("loginId").value.trim();
  const loginPass = document.getElementById("loginPass").value;
  const error = document.getElementById("error");

  // Clear previous error
  error.innerText = "";

  // ================= VALIDATION =================
  if (!loginId || !loginPass) {
    error.innerText = "Please enter Email/Phone and Password";
    return;
  }

  const loginData = {
    loginId: loginId,
    password: loginPass
  };

  try {
    // ================= CALL LOGIN API =================
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (!response.ok) {
      error.innerText = data.message || "Invalid credentials";
      return;
    }

    // ================= SAVE LOGGED-IN USER =================
    localStorage.setItem("loggedInUser", JSON.stringify(data));

    // Redirect to user page
    window.location.href = "user.html";

  } catch (err) {
    console.error(err);
    error.innerText = "Server error! Please try again later.";
  }
}
