// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// Hardcoded users with roles (demo)
const users = [
  { id: 1, username: "alice", password: "pass1", role: "admin" },
  { id: 2, username: "bob", password: "pass2", role: "moderator" },
  { id: 3, username: "charlie", password: "pass3", role: "user" }
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3h" });
  res.json({ token });
});

module.exports = router;
