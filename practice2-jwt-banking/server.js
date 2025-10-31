const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET_KEY = 'banking_secret';
let balance = 1000;

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'pass123') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Protected Routes
app.get('/balance', verifyToken, (req, res) => res.json({ balance }));

app.post('/deposit', verifyToken, (req, res) => {
  const { amount } = req.body;
  balance += amount;
  res.json({ message: 'Deposit successful', balance });
});

app.post('/withdraw', verifyToken, (req, res) => {
  const { amount } = req.body;
  if (amount > balance) return res.status(400).json({ error: 'Insufficient balance' });
  balance -= amount;
  res.json({ message: 'Withdrawal successful', balance });
});

app.listen(4000, () => console.log('Banking API running on port 4000'));
