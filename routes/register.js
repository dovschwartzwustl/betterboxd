const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  console.log("username: "+ username);
  console.log("password: "+ password);
  console.log("confirmPassword: "+ confirmPassword);
  if (password != confirmPassword) {
    return res.status(408).json({message: "Passwords don't match"});
  }

  // Check if the username already exists
  const userExists = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  console.log(userExists);
  if (userExists[0].length > 0) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user in the database
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
