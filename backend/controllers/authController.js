// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// A helper function to sign the token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '5h', // Token expires in 5 hours
  });
};

// --- SIGNUP CONTROLLER ---
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists (validation is also done in routes, but good to have here)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new user for the restaurant system
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Create JWT token
    const token = signToken(newUser._id);

    // 5. Send success response
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({
      message: 'Server error during signup',
      error: error.message,
    });
  }
};

// --- LOGIN CONTROLLER ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Create JWT token
    const token = signToken(user._id);

    // 4. Send success response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error during login',
      error: error.message,
    });
  }
};