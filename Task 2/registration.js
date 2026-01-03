function register() {

  // Get values properly
  let nameValue = document.getElementById("name").value.trim();
  let ageValue = document.getElementById("age").value;
  let phoneValue = document.getElementById("phone").value.trim();
  let emailValue = document.getElementById("email").value.trim();
  let addressValue = document.getElementById("address").value.trim();
  let pincodeValue = document.getElementById("pincode").value;
  let passwordValue = document.getElementById("password").value;

  let error = document.getElementById("error");

  // Validation
  if (nameValue === "" || emailValue === "" || passwordValue === "") {
    error.innerText = "Name, Email and Password are required";
    return;
  }

  // Get users array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Duplicate check
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === emailValue || users[i].phone === phoneValue) {
      error.innerText = "User already exists with this Email or Phone";
      return;
    }
  }

  // Create new user object
  let newUser = {
    name: nameValue,
    age: ageValue,
    phone: phoneValue,
    email: emailValue,
    address: addressValue,
    pincode: pincodeValue,
    password: passwordValue
  };

  // Save user
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Prefill login email
  localStorage.setItem("loginPrefill", emailValue);

  alert("Registration successful!");
  window.location.href = "login.html";
}
