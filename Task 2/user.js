// ROUTE PROTECTION
let user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
  window.location.href = "login.html";
}

// SHOW USER DATA
vName.innerText = user.name;
vAge.innerText = user.age;
vPhone.innerText = user.phone;
vEmail.innerText = user.email;
vAddress.innerText = user.address;
vPincode.innerText = user.pincode;

// EDIT MODE
function enableEdit() {
  viewMode.style.display = "none";
  editMode.style.display = "block";

  eName.value = user.name;
  eAge.value = user.age;
  ePhone.value = user.phone;
  eEmail.value = user.email;
  eAddress.value = user.address;
  ePincode.value = user.pincode;
}

function cancelEdit() {
  editMode.style.display = "none";
  viewMode.style.display = "block";
}

// UPDATE PROFILE
function updateProfile() {
  user.name = eName.value;
  user.age = eAge.value;
  user.phone = ePhone.value;
  user.address = eAddress.value;
  user.pincode = ePincode.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.map(u => (u.email === user.email ? user : u));

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Profile updated successfully");
  location.reload();
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// PASSWORD MODAL
function openPasswordModal() {
  document.getElementById("passwordModal").style.display = "flex";
}

function closePasswordModal() {
  document.getElementById("passwordModal").style.display = "none";
  newPassword.value = "";
  confirmPassword.value = "";
  passError.innerText = "";
}

// CHANGE PASSWORD
function changePassword() {
  if (newPassword.value !== confirmPassword.value) {
    passError.innerText = "Passwords do not match";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach(u => {
    if (u.email === user.email) {
      u.password = newPassword.value;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedInUser");

  alert("Password changed. Please login again.");
  window.location.href = "login.html";
}
