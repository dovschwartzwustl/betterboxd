const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('../config');

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  console.log(user);
  if (user[0].length === 0) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user[0][0].password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  try {
    const user = { userId: user[0].id, username: user[0].username };
    const token = jwt.sign(user, config.secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
