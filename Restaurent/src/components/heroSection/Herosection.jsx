import React, { useState, useEffect } from 'react';
import './Herosection.css';
import pizzaImg from "../../assets/pizza.png";
import burgerImg1 from "../../assets/burger.png";
import { IoRestaurantOutline, IoFlame, IoStopwatchOutline } from "react-icons/io5";

const Hero = () => {
  // Your timer logic is correct and remains unchanged.
  const defaultSaleDuration = 24 * 60 * 60 * 1000;
  const [endTime] = useState(() => new Date().getTime() + defaultSaleDuration);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    // --- THIS IS THE ONLY CHANGE YOU NEED TO MAKE ---
    <div className="hero-container" id="home"> 
      <div className="hero-content">
        <div className="hero-text">
          <div className="promo-bar">
            <div className="promo-deal">
              <IoFlame className="promo-icon deal-icon" />
              <span className="deal-text">HOT DEAL: <strong className="shimmer-text">60% OFF</strong></span>
            </div>
            <div className="promo-timer">
              <IoStopwatchOutline className="promo-icon timer-icon" />
              <div className="timer-display">
                <div className="timer-unit">
                  <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="timer-label">H</span>
                </div>
                <div className="timer-separator">:</div>
                <div className="timer-unit">
                  <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="timer-label">M</span>
                </div>
                <div className="timer-separator">:</div>
                <div className="timer-unit">
                  <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="timer-label">S</span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="typewriter">
            Sizzling Hot Deals!
          </h1>
          
          <p className="hero-description">
            <strong>Premium Flavors</strong> meet <strong>Lightning Speed</strong> – 
            Experience culinary excellence with our handcrafted burgers & artisan pizzas, 
            <strong> delivered fresh to your door!</strong>
          </p>
          
          <button className="hero-button">
            <IoRestaurantOutline className="button-icon" />
            <span className="button-text">Order Now</span>
          </button>
        </div>

        <div className="hero-images">
          <img
            src={pizzaImg}
            alt="A delicious pizza"
            className="pizza-image"
          />
          <div className="burger-orbit-container">
            <img src={burgerImg1} alt="Classic Burger" className="orbiting-burger" />
            <img src={burgerImg1} alt="Chicken Burger" className="orbiting-burger" />
            <img src={burgerImg1} alt="Bacon Burger" className="orbiting-burger" />
            <img src={burgerImg1} alt="Cheeseburger" className="orbiting-burger" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;