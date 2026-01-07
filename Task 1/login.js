window.onload = function () {
    let prefill = localStorage.getItem("loginPrefill");
    if (prefill) {
        document.getElementById("loginId").value = prefill;
    }
};

function login() {
    let loginId = document.getElementById("loginId").value;
    let loginPassword = document.getElementById("loginPassword").value;

    if (loginId === "" || loginPassword === "") {
        document.getElementById("error").innerText =
            "All fields are required";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (
            (users[i].email === loginId || users[i].phone === loginId) &&
            users[i].password === loginPassword
        ) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        window.location.href = "user.html";
    } else {
        document.getElementById("error").innerText =
            "Invalid Email/Phone or Password";
    }
}
