import React from 'react';
import './Footer.css';

// Import the hook, just like in your BookingForm
import { useInView } from 'react-intersection-observer';

// Icons from react-icons
import { FiFacebook, FiTwitter, FiInstagram, FiSend, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  // Initialize the hook to get the ref and inView status
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation will only play once
    threshold: 0.1,    // Trigger when 10% of the footer is visible
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    // Attach the ref here and use `inView` to add the 'is-visible' class
    <footer className={`footer-section ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="footer-container">
        <div className="footer-grid">

          {/* Column 1: Brand and Socials */}
          <div className="footer-column">
            <h3 className="footer-heading">RapidBites</h3>
            <p>
              Experience the finest culinary creations, where every dish is a masterpiece crafted with passion and the freshest ingredients.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Menu</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Reservations</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-column">
            <h3 className="footer-heading">Contact Info</h3>
            <ul>
              <li>
                <FiMapPin className="contact-icon" />
                <span>FAST NUCES, Shah Latif Town, Karachi</span>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <span>+92 300 1234567</span>
              </li>
              <li>
                <FiMail className="contact-icon" />
                <span>contact@rapidbites.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-column">
            <h3 className="footer-heading">Our Newsletter</h3>
            <p>Subscribe to our newsletter to get the latest updates and special offers.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input type="email" placeholder="Your Email Address" required />
              <button type="submit" aria-label="Subscribe">
                <FiSend />
              </button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RapidBites. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;