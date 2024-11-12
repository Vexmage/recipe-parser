// routes/auth.js

const express = require('express');
const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const db = require('../models');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await db.User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await db.User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login route
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  (req, res) => {
    res.json({ message: 'Logged in successfully' });
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
