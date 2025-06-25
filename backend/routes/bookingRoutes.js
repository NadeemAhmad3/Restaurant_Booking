const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Input validation for creating a booking
const validateBooking = (req, res, next) => {
  const { name, email, phone, date, time, guests } = req.body;

  if (!name || !email || !phone || !date || !time || !guests) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  next();
};

// --- Protected Booking Routes ---
router.post('/', protect, validateBooking, createBooking);
router.get('/', protect, getAllBookings);
router.get('/:id', protect, getBookingById);
router.delete('/:id', protect, cancelBooking);


module.exports = router;