const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactController');

// Route to handle sending the contact form message
router.post('/send', sendContactMessage);

module.exports = router;