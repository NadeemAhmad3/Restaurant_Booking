// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path is correct

// Middleware to protect routes and verify authentication
const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, no token provided',
      });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    // The decoded payload now only contains 'id'
    const currentUser = await User.findById(decoded.id).select('-password');

    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // 4. Grant access and attach user to the request
    req.user = currentUser;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    // Generic error
    res.status(401).json({
      message: 'Not authorized to access this route',
      error: error.message,
    });
  }
};

// Middleware to restrict access based on roles (for future use)
// NOTE: This will not work until you add a 'role' field to your User model.
// Example roles could be 'user' and 'admin'.
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user.role is set from the 'protect' middleware
    if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
};