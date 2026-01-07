const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path for users data
const dataFile = path.join(__dirname, "users.json");

// Create users.json if not exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

/* ========================
   GET ALL USERS
   ======================== */
app.get("/api/users", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(dataFile));
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to read users" });
  }
});

/* ========================
   SIGNUP (POST)
   ======================== */
app.post("/api/signup", (req, res) => {
  const { name, age, phone, email, address, pincode, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, Email and Password are required"
    });
  }

  let users = JSON.parse(fs.readFileSync(dataFile));

  // Check duplicate email
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({
      message: "Email already registered"
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    age,
    phone,
    email,
    address,
    pincode,
    password
  };

  users.push(newUser);
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));

  res.status(201).json({
    message: "User registered successfully",
    user: newUser
  });
});

/* ========================
   LOGIN (POST)
   ======================== */
app.post("/api/login", (req, res) => {
  const { loginId, password } = req.body;

  if (!loginId || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const users = JSON.parse(fs.readFileSync(dataFile));

  const user = users.find(
    u =>
      (u.email === loginId || u.phone === loginId) &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  res.json(user);
});

/* ========================
   START SERVER
   ======================== */
app.listen(5000, () => {
  console.log(`✅ Server running at http://localhost:5000`);

});
