import api from './api';

const createBooking = async (bookingData) => {
  // bookingData: { name, email, phone, date, time, guests }
  const response = await api.post('/bookings', bookingData);
  return response.data; // Contains { message, booking }
};

export const bookingService = {
  createBooking,
  // You can add getMyBookings, cancelBooking, etc. here later
};