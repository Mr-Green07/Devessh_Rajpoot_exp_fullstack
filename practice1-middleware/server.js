const express = require('express');
const app = express();
const PORT = 3000;

// Middleware 1: Logging
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// Middleware 2: Bearer Token Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  const token = authHeader.split(' ')[1];
  if (token !== 'mysecrettoken') {
    return res.status(403).json({ error: 'Invalid or missing Bearer token' });
  }

  next();
};

// Public Route
app.get('/public', (req, res) => {
  res.json({ message: 'Welcome to the public route!' });
});

// Protected Route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted to protected route.' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
