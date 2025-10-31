const express = require('express');
const mongoose = require('mongoose');
const Account = require('./models/Account');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bankDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Transfer API
app.post('/transfer', async (req, res) => {
  const { sender, receiver, amount } = req.body;

  try {
    const senderAcc = await Account.findOne({ name: sender });
    const receiverAcc = await Account.findOne({ name: receiver });

    if (!senderAcc || !receiverAcc) return res.status(404).json({ error: 'Account not found' });
    if (senderAcc.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

    senderAcc.balance -= amount;
    receiverAcc.balance += amount;

    await senderAcc.save();
    await receiverAcc.save();

    res.json({ message: 'Transfer successful', senderBalance: senderAcc.balance });
  } catch (error) {
    res.status(500).json({ error: 'Transfer failed', details: error.message });
  }
});

app.listen(5000, () => console.log('Transfer API running on port 5000'));
