import React, { useState } from 'react';
import './ContactUs.css'; 
import { useInView } from 'react-intersection-observer';
// import { contactService } from '../../service/contactService'; // Make sure this path is correct

// Icons
import { FiMapPin, FiMail, FiPhone, FiClock, FiSend, FiUser, FiEdit2, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


// --- Mock service for testing without a real backend ---
const contactService = {
  sendMessage: (formData) => {
    console.log("Sending message with data:", formData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: "Message Sent Successfully!" });
      }, 1500);
    });
  }
};
// ---------------------------------------------------------


const contactDetails = [
  { icon: <FiMapPin />, title: "Our Address", content: "FAST NUCES, Shah Latif Town, Karachi" },
  { icon: <FiMail />, title: "Email Us", content: "contact@rapidbites.com" },
  { icon: <FiPhone />, title: "Call Us", content: "+92 300 1234567" },
  { icon: <FiClock />, title: "Opening Hours", content: "Mon-Sun: 11AM - 1AM" },
];

const ContactUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess('');
    try {
      const data = await contactService.sendMessage(formData);
      setSuccess(data.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div className={`contact-container ${inView ? 'is-visible' : ''}`}>
        <div className="contact-header">
          <h2>Need Help? <span>Contact Us</span></h2>
        </div>
        
        <div className="contact-grid">
          <div className="map-column">
            <iframe
              className="map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.237841334969!2d67.0123933150034!3d24.89000198404018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f9015704241%3A0x92f6987a19c2a23c!2sFAST%20National%20University%20of%20Computer%20and%20Emerging%20Sciences%2C%20Karachi!5e0!3m2!1sen!2s!4v1677651234567!5m2!1sen!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            ></iframe>
          </div>
          <div className="form-column">
            <form onSubmit={handleSubmit} className="contact-form">
              {/* --- NEW Form Groups --- */}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-field-wrapper">
                  <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                  <FiUser className="input-suffix-icon" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-field-wrapper">
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                  <FiMail className="input-suffix-icon" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <div className="input-field-wrapper">
                  <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="e.g., Booking Inquiry" />
                  <FiEdit2 className="input-suffix-icon" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <div className="input-field-wrapper">
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Write your message here..." rows="5"></textarea>
                </div>
              </div>
              
              {error && <p className="form-error-message">{error}</p>}
              {success && <p className="form-success-message">{success}</p>}

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? <AiOutlineLoading3Quarters className="loading-icon" /> : <>Send Message <FiSend /></>}
              </button>
            </form>
          </div>
        </div>
        
        <div className="info-cards-grid">
            {contactDetails.map((item, index) => (
                <div key={index} className="info-card">
                    <div className="info-card-icon">{item.icon}</div>
                    <div className="info-card-content"><h3>{item.title}</h3><p>{item.content}</p></div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default ContactUs;