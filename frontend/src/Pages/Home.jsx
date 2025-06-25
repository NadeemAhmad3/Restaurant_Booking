import React from 'react';
import Hero from '../components/heroSection/Herosection';
import AboutUs from '../components/aboutSection/AboutUs';
import Menu from '../components/menuSection/MenuBook'
import Cheff from '../components/cheffSection/Cheff'
import BookingForm from '../components/bookingSection/BookingForm';
import ContactUs from '../components/contactSection/ContactUs'; // <-- Import
import Footer from '../components/footer/Footer';
const Home = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
       <Menu />
       <Cheff />
      <BookingForm />
      <ContactUs /> {/* <-- Add the new section */}
      <Footer/>
    </div>
  );
};

export default Home;