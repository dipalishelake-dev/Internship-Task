function register() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let pincode = document.getElementById("pincode").value;
    let password = document.getElementById("password").value;

    // Basic validation
    if (name === "" || email === "" || password === "") {
        document.getElementById("error").innerText =
            "Name, Email and Password are required";
        return;
    }

    // Get users array OR empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email or phone
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email || users[i].phone === phone) {
            document.getElementById("error").innerText =
                "User already exists!";
            return;
        }
    }

    // Create new user object
    let newUser = {
        name,
        age,
        phone,
        email,
        address,
        pincode,
        password
    };

    // Add user to array
    users.push(newUser);

    // Save updated array
    localStorage.setItem("users", JSON.stringify(users));

    // Prefill login
    localStorage.setItem("loginPrefill", email);

    alert("Registration successful!");
    window.location.href = "login.html";
}
