async function register() {
  // Get input values
  const nameValue = document.getElementById("name").value.trim();
  const ageValue = Number(document.getElementById("age").value) || 0;
  const phoneValue = document.getElementById("phone").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const addressValue = document.getElementById("address").value.trim();
  const pincodeValue = Number(document.getElementById("pincode").value) || 0;
  const passwordValue = document.getElementById("password").value;

  const error = document.getElementById("error");
  error.innerText = ""; // clear previous error

  // ================= VALIDATION =================
  if (!nameValue || !emailValue || !passwordValue) {
    error.innerText = "Name, Email and Password are required";
    return;
  }

  // ================= CREATE USER OBJECT =================
  const newUser = {
    name: nameValue,
    age: ageValue,
    phone: phoneValue,
    email: emailValue,
    address: addressValue,
    pincode: pincodeValue,
    password: passwordValue
  };

  try {
    // ================= CALL SIGNUP API =================
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    const data = await response.json();

    if (!response.ok) {
      error.innerText = data.message || "Registration failed!";
      return;
    }

    // ================= SUCCESS MESSAGE =================
    alert("Registration successful!");

    // Save email to prefill login page
    localStorage.setItem("loginPrefill", emailValue);

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    error.innerText = "Server error! Please try again later.";
  }
}
