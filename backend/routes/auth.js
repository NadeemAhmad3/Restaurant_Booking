// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController'); // Corrected controller name

// Input validation middleware for signup
const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  // Basic validation for restaurant signup
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Password strength validation
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  next();
};

// Validation middleware for login
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  next();
};

// --- Public Authentication Routes ---
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;