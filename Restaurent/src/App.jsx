import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Keep this

// Import your pages and the layout
import Home from './pages/Home';
import LoginSignup from './components/LoginSignup/LoginSignup';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    // CORRECT ORDER: <Router> must wrap <AuthProvider>
    <Router>
      <AuthProvider>
        <Routes>
          {/* --- Routes WITH a Navbar --- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            {/* Add any other pages that need a navbar here */}
          </Route>

          {/* --- Routes WITHOUT a Navbar --- */}
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;