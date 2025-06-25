import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../heroSection/Navbar'; // Adjust path to your Navbar component

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* The <Outlet> component will render the specific page 
            component for the matched route (e.g., <Home />, <AboutUs />) */}
        <Outlet />
      </main>
      {/* You could also add a <Footer /> here if you had one */}
    </>
  );
};

export default MainLayout;