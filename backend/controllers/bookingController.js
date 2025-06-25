const Booking = require('../models/Booking');

// --- CREATE A NEW BOOKING ---
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;
    const userId = req.user.id; 

    // --- NEW: SERVER-SIDE DATE VALIDATION ---
    // This is the definitive check to ensure no past bookings are created.
    const bookingDate = new Date(date);
    const today = new Date();
    // Set hours to 0 to compare dates only, ignoring the time of day.
    today.setHours(0, 0, 0, 0); 

    if (bookingDate < today) {
      // If the selected date is before today, return a 400 Bad Request error.
      return res.status(400).json({
        message: 'You cannot book a table for a past date.',
      });
    }
    // --- END OF VALIDATION ---

    const newBooking = new Booking({
      user: userId,
      name,
      email,
      phone,
      date: bookingDate, // Save the validated date
      time,
      guests,
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    // This will catch other validation errors from your Mongoose schema (e.g., required fields).
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Booking validation failed. Please check your inputs.',
            error: error.message,
        });
    }
    // Generic server error for other unexpected issues.
    res.status(500).json({
      message: 'Server error during booking creation',
      error: error.message,
    });
  }
};

// --- GET ALL BOOKINGS FOR A USER ---
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ date: -1 });

    res.status(200).json({
      message: 'Bookings retrieved successfully',
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while retrieving bookings',
      error: error.message,
    });
  }
};

// --- GET A SINGLE BOOKING BY ID ---
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(200).json({
            message: 'Booking retrieved successfully',
            booking,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error while retrieving booking',
            error: error.message,
        });
    }
};


// --- CANCEL A BOOKING ---
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await booking.deleteOne();

        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Server error while canceling booking',
            error: error.message,
        });
    }
};