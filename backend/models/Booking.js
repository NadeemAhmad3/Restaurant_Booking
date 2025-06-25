const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  date: {
    type: Date,
    required: [true, 'Please select a date for your booking'],
  },
  time: {
    type: String,
    required: [true, 'Please select a time for your booking'],
  },
  guests: {
    type: Number,
    required: [true, 'Please specify the number of guests'],
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);