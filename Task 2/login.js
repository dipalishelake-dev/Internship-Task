window.onload = () => {
  loginId.value = localStorage.getItem("loginPrefill") || "";
};

function login() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u =>
    (u.email === loginId.value || u.phone === loginId.value) &&
    u.password === loginPass.value
  );

  if (!user) {
    error.innerText = "Invalid credentials";
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  location.href = "user.html";
}
