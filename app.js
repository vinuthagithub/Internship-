const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let walletBalance = 0;

app.use(bodyParser.json());

// Serve static files (like HTML, CSS, and JS)
app.use(express.static('public'));

// Get wallet balance
app.get('/balance', (req, res) => {
  res.json({ balance: walletBalance });
});

// Add money to the wallet
app.post('/add-money', (req, res) => {
  const amount = req.body.amount;
  walletBalance += amount;
  res.json({ message: 'Money added successfully', balance: walletBalance });
});

// Make a purchase
app.post('/make-purchase', (req, res) => {
  const amount = req.body.amount;
  if (walletBalance >= amount) {
    walletBalance -= amount;
    res.json({ message: 'Purchase successful', balance: walletBalance });
  } else {
    res.status(400).json({ error: 'Insufficient funds' });
  }
});

// Handle other routes
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
