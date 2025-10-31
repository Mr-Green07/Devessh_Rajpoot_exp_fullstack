// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// Hardcoded demo user
const demoUser = { id: 1, username: "demo", password: "password123" };

// Login route: expects { username, password }
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === demoUser.username && password === demoUser.password) {
    const payload = { id: demoUser.id, username: demoUser.username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
