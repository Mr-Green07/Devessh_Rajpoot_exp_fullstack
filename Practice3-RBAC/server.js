// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const { verifyToken } = require("./middleware/auth");
const authorize = require("./middleware/authorize");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);

// Protected routes with role-based access
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "User profile", user: req.user });
});

app.get("/admin", verifyToken, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

app.get("/moderator", verifyToken, authorize("moderator", "admin"), (req, res) => {
  res.json({ message: "Welcome Moderator or Admin", user: req.user });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`RBAC server running on port ${PORT}`));
