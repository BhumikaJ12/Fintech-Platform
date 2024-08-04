
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db'); // Assuming you have a file 'db.js' for PostgreSQL connection

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  }));
app.use(express.json()); // Parse JSON bodies

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    // Get user ID from username
    const userId = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userId.rows.length === 0) {
        return res.status(400).json({ error: 'User not found' });
    }
    await pool.query('INSERT INTO accounts (user_id, balance) VALUES ($1, $2) RETURNING *', [userId.rows[0].id, 0]);
    res.status(200).json(userResult.rows[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
      if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
});

// Deposit endpoint
app.post('/deposit', async (req, res) => {
  const { username, amount } = req.body;
  try {
    // Get user ID from username
    const userResult = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }
    const userId = userResult.rows[0].id;
    const result = await pool.query('UPDATE accounts SET balance = balance + $1 WHERE user_id = $2 RETURNING *', [amount, userId]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: err.message });
  }
});

// Withdraw endpoint
app.post('/withdraw', async (req, res) => {
  const { username, amount } = req.body;
  try {
    // Get user ID from username
    const userResult = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }
    const userId = userResult.rows[0].id;

    // Get current balance
    const balanceResult = await pool.query('SELECT balance FROM accounts WHERE user_id = $1', [userId]);
    if (balanceResult.rows.length === 0) {
      return res.status(400).json({ error: 'Account not found' });
    }
    const currentBalance = balanceResult.rows[0].balance;

    // Check if the withdrawal amount exceeds the current balance
    if (amount > currentBalance) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Perform the withdrawal
    const result = await pool.query('UPDATE accounts SET balance = balance - $1 WHERE user_id = $2 RETURNING *', [amount,  userResult.rows[0].id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
