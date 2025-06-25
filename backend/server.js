// server.js (or app.js) - Final Version

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// No longer need 'fs' here if its only use was mkdirSync
// const fs = require('fs'); 

const chefRoutes = require('./routes/chefRoutes');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menuRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Import booking routes
const contactRoutes = require('./routes/contactRoutes');
const { protect } = require('./middleware/authMiddleware'); 

const app = express();

// This line is no longer necessary, as the upload middleware handles it.
// const chefUploadDir = path.join(__dirname, 'uploads', 'chefs');
// fs.mkdirSync(chefUploadDir, { recursive: true });

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/bookings', protect, bookingRoutes); // Use booking routes with protection
app.use('/api/contact', contactRoutes); // Add this line


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;