// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);

// a protected test endpoint (require JWT)
const { verifyToken } = require("./middleware/auth");
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You accessed a protected route", user: req.user });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
