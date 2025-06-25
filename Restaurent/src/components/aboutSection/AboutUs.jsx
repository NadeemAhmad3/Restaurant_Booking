import React, { useEffect, useRef, useState } from 'react';
import './AboutUs.css';
import '../../index.css';
import chefImg from "../../assets/chef.png";
import restaurantVideo from "../../assets/restaurant-video.mp4";

const AboutUs = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const playButtonRef = useRef(null);
  const whyChooseRef = useRef(null); // NEW
  const [isVisible, setIsVisible] = useState(false);
  const [whyChooseVisible, setWhyChooseVisible] = useState(false); // NEW

  // About Us section observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play().catch(error => {
              if (playButtonRef.current) {
                playButtonRef.current.style.display = 'flex';
              }
            });
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    }, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Why Choose Us section observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setWhyChooseVisible(true);
        }
      });
    }, options);

    if (whyChooseRef.current) {
      observer.observe(whyChooseRef.current);
    }

    return () => {
      if (whyChooseRef.current) {
        observer.unobserve(whyChooseRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const playButton = playButtonRef.current;

    if (!video || !playButton) return;

    const handlePlay = () => {
      playButton.style.display = 'none';
    };

    const handlePause = () => {
      playButton.style.display = 'flex';
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    if (!video.paused) {
      playButton.style.display = 'none';
    } else {
      playButton.style.display = 'flex';
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section 
      id="about" 
      className={`about-container ${isVisible ? 'animate' : ''}`} 
      ref={sectionRef}
    >
      <div className="about-header">
        <span className="about-subtitle">ABOUT US</span>
        <h2 className="about-main-title">Learn More <span className="highlight">About Us</span></h2>
      </div>
      
      <div className="about-content">
        {/* Left column: Chef Image and Booking Card */}
        <div className="about-left">
          <div className="about-chef-card">
            <img 
              src={chefImg} 
              alt="Our chef" 
              className="chef-image"
            />
            <div className="booking-info">
              <span className="booking-title">Book a Table</span>
              <a href="tel:+15589554855" className="booking-phone">+92 326-4226414</a>
            </div>
          </div>
        </div>

        {/* Right column: Text content */}
        <div className="about-text">
          <p className="about-description">
            RapidBites began as a dream shared by two friends, Ahmad and Nadeem, 
            in 2008. What started as a small food cart has blossomed into one of 
            the region's most beloved dining establishments.
          </p>
          
          <ul className="feature-list">
            <li>
              <span className="feature-icon">✓</span>
              <span>Our chefs use only the freshest ingredients sourced locally.</span>
            </li>
            <li>
              <span className="feature-icon">✓</span>
              <span>We pride ourselves on quick service without compromising quality.</span>
            </li>
            <li>
              <span className="feature-icon">✓</span>
              <span>Ahmad and Nadeem's passion for combining traditional recipes with modern techniques creates our unique flavor profile.</span>
            </li>
          </ul>
          
          <p className="additional-info">
            From day one, Ahmad and Nadeem built RapidBites to support local farmers and give back to our community. 
            Our revolutionary kitchen workflow delivers gourmet food with unprecedented speed, making us the preferred 
            choice for food lovers who value both quality and time.
          </p>
          
          <div className="video-container">
            <video 
              ref={videoRef}
              className="restaurant-video"
              loop
              muted
              playsInline
              poster={chefImg}
            >
              <source src={restaurantVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              className="video-play-fallback"
              ref={playButtonRef}
              onClick={handlePlayButtonClick}
              style={{ display: 'flex' }}
            >
              <span>▶</span>
            </div>
            <div className="video-overlay"></div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div
        className={`why-choose-us-section${whyChooseVisible ? ' animate' : ''}`}
        ref={whyChooseRef}
      >
        <div className="why-choose-header">
          <span className="why-choose-subtitle">WHY CHOOSE US</span>
          <h3 className="why-choose-title">What Makes <span className="highlight">RapidBites</span> Special</h3>
        </div>
        
        <div className="why-choose-grid">
          <div className="why-choose-card">
            <div className="card-icon speed-icon">
              <span>⚡</span>
            </div>
            <h4 className="card-title">Lightning Fast Service</h4>
            <p className="card-description">
              Our revolutionary kitchen workflow ensures your meal is prepared and served 
              in record time without compromising on taste or quality.
            </p>
          </div>

          <div className="why-choose-card">
            <div className="card-icon quality-icon">
              <span>👨‍🍳</span>
            </div>
            <h4 className="card-title">Master Chefs</h4>
            <p className="card-description">
              Ahmad and Nadeem bring over 15 years of culinary expertise, 
              blending traditional flavors with innovative cooking techniques.
            </p>
          </div>

          <div className="why-choose-card">
            <div className="card-icon fresh-icon">
              <span>🌱</span>
            </div>
            <h4 className="card-title">Farm-Fresh Ingredients</h4>
            <p className="card-description">
              We partner directly with local farmers to source the freshest ingredients 
              daily, supporting our community while ensuring premium quality.
            </p>
          </div>

          <div className="why-choose-card">
            <div className="card-icon community-icon">
              <span>🤝</span>
            </div>
            <h4 className="card-title">Community Focused</h4>
            <p className="card-description">
              RapidBites is more than a restaurant - we're committed to giving back 
              to our community and creating lasting relationships with our customers.
            </p>
          </div>

          <div className="why-choose-card">
            <div className="card-icon innovation-icon">
              <span>💡</span>
            </div>
            <h4 className="card-title">Culinary Innovation</h4>
            <p className="card-description">
              Our unique approach combines time-honored recipes with modern culinary 
              science to create flavors you won't find anywhere else.
            </p>
          </div>

          <div className="why-choose-card">
            <div className="card-icon experience-icon">
              <span>⭐</span>
            </div>
            <h4 className="card-title">Exceptional Experience</h4>
            <p className="card-description">
              From the moment you walk in until your last bite, we ensure every 
              aspect of your dining experience exceeds your expectations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;