const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Chef name is required']
  },
  designation: {
    type: String,
    required: [true, 'Designation is required']
  },
  description: { // <-- ADDED
    type: String,
    default: '' // Optional field, defaults to an empty string
  },
  image: {
    type: String, // We will store just the filename
    required: [true, 'Chef image is required']
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  }
}, { timestamps: true }); // Good practice to keep timestamps

module.exports = mongoose.model('Chef', chefSchema);