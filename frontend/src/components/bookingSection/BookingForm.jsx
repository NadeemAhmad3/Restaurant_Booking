import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

import { useInView } from 'react-intersection-observer';
import { useAuthContext } from '../../context/AuthContext';
import { bookingService } from '../../service/bookingService';

import { FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiUsers, FiSend, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const BookingForm = () => {
  const { isAuthenticated, user } = useAuthContext();
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [wasValidated, setWasValidated] = useState(false);

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    date: getTodayString(), time: '', guests: 1,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  // --- THIS LINE WAS MISSING AND CAUSED THE ERROR ---
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({ ...prev, name: user.name || '', email: user.email || '' }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleGuestChange = (amount) => {
      setFormData(prevData => ({
          ...prevData,
          guests: Math.max(1, prevData.guests + amount)
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWasValidated(true);

    if (!e.currentTarget.checkValidity()) {
        setError("Please fill out all required fields correctly.");
        return;
    }
    
    if (!isAuthenticated) { navigate('/login'); return; }

    const selectedDate = new Date(formData.date);
    const today = new Date(getTodayString());
    if (selectedDate < today) {
      setError('You cannot book a table for a past date. Please select a valid date.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess('');

    try {
      await bookingService.createBooking(formData);
      setSuccess('Your table has been successfully booked!');
      setWasValidated(false);
      setTimeout(() => {
        setSuccess('');
        setFormData({ ...formData, phone: '', date: getTodayString(), time: '', guests: 1 });
      }, 5000);
    } catch (err) {
      setError(err.message || 'Failed to book a table. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="booking-section" id="book-a-table">
      <div className={`booking-container ${inView ? 'is-visible' : ''}`} ref={ref}>
        <div className="booking-header">
          <h2>Book Your Table</h2>
          <p>Reserve your spot for an unforgettable dining experience.</p>
        </div>
        <form className={`booking-form ${wasValidated ? 'was-validated' : ''}`} onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="input-group"><FiUser className="input-icon" /><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required /></div>
            <div className="input-group"><FiMail className="input-icon" /><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required /></div>
            <div className="input-group"><FiPhone className="input-icon" /><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required pattern="[0-9\s\-\+]{10,}" title="Please enter a valid phone number." /></div>
            <div className="input-group"><FiCalendar className="input-icon" /><input type="date" name="date" value={formData.date} onChange={handleChange} required min={getTodayString()} /></div>
            <div className="input-group"><FiClock className="input-icon" /><input type="time" name="time" value={formData.time} onChange={handleChange} required /></div>
            <div className="input-group">
                <FiUsers className="input-icon" />
                <div className="guest-input-wrapper">
                    <input type="text" name="guests" value={`${formData.guests} Guest(s)`} readOnly />
                    <div className="guest-controls">
                        <button type="button" onClick={() => handleGuestChange(1)} aria-label="Increase guests"><FiChevronUp /></button>
                        <button type="button" onClick={() => handleGuestChange(-1)} aria-label="Decrease guests"><FiChevronDown /></button>
                    </div>
                </div>
            </div>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (<AiOutlineLoading3Quarters className="loading-icon" />) : (<>Book a Table <FiSend className="submit-icon" /></>)}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;