let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("uName").innerText = user.name;
document.getElementById("uAge").innerText = user.age;
document.getElementById("uPhone").innerText = user.phone;
document.getElementById("uEmail").innerText = user.email;
document.getElementById("uAddress").innerText = user.address;
document.getElementById("uPincode").innerText = user.pincode;

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
