import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Import assets and hooks
import logoo from "../../assets/logo1.png";
import { useAuthContext } from '../../context/AuthContext';

// Import icons
import { FiUser, FiCalendar, FiLogOut } from 'react-icons/fi';

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Chefs", href: "#chefs" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const { isAuthenticated, logout } = useAuthContext();

  // Your existing handleNavClick function is perfect for this.
  const handleNavClick = (e, href, name) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        
        // We only want to set the main links as "active"
        if (NAV_LINKS.some(link => link.name === name)) {
          setActive(name);
        }
        // Update URL history after scrolling
        setTimeout(() => { window.history.replaceState(null, "", href); }, 400);
      }
    }
  };

  useEffect(() => {
    // ... Your useEffect for handling scroll-based active state remains unchanged ...
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let found = false;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const { href, name } = NAV_LINKS[i];
        if (href.startsWith("#")) {
          const section = document.querySelector(href);
          if (section) {
            if (scrollPosition >= section.offsetTop) {
              if (active !== name) {
                setActive(name);
                if (window.location.hash !== href) {
                  window.history.replaceState(null, "", href);
                }
              }
              found = true;
              break;
            }
          }
        }
      }
      if (!found) {
        setActive("Home");
        if (window.location.hash !== "#home") {
          window.history.replaceState(null, "", "#home");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/"><img src={logoo} alt="logo" /></Link>
        </div>
        <ul className="navbar-links">
          {NAV_LINKS.map(link => (
            <li key={link.name}>
              <a
                href={link.href}
                className={active === link.name ? "active" : ""}
                onClick={e => handleNavClick(e, link.href, link.name)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          {isAuthenticated ? (
            // --- LOGGED IN STATE ---
            <>
              {/* --- UPDATED: This button now scrolls to the form --- */}
              <a 
                href="#book-a-table" 
                className="action-btn-primary" 
                onClick={(e) => handleNavClick(e, '#book-a-table', 'Book a Table')}
              >
                <FiCalendar />
                <span>Book a Table</span>
              </a>
              <button onClick={logout} className="action-btn-icon-only" title="Logout">
                <FiLogOut />
              </button>
            </>
          ) : (
            // --- LOGGED OUT STATE ---
            <>
              <Link to="/login" className="action-btn-secondary">
                <FiUser />
                <span>Login / Signup</span>
              </Link>
              {/* --- UPDATED: This button now also scrolls to the form --- */}
              <a 
                href="#book-a-table" 
                className="action-btn-primary" 
                onClick={(e) => handleNavClick(e, '#book-a-table', 'Book a Table')}
              >
                <FiCalendar />
                <span>Book a Table</span>
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;