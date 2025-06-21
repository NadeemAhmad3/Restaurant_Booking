import React from 'react';
import Navbar from './Navbar';
import './Herosection.css';
const Hero = () => {
return (
<div className="hero-container">
<Navbar />
<div className="hero-content">
<h1>Welcome to Our Website</h1>
<p>This is a simple hero section.</p>
<button className="hero-button">Get Started</button>
</div>
</div>
);
};
export default Hero;