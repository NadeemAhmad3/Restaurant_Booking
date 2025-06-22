import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logoo from "../../assets/logo1.png";
import { FiUser, FiCalendar } from 'react-icons/fi';

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Chefs", href: "#chefs" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");

  // Scroll to section smoothly and update hash
  const handleNavClick = (e, href, name) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          window.history.replaceState(null, "", href);
        }, 400); // Wait for scroll to finish
        setActive(name);
      }
    }
  };

  // Update active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      let found = false;

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const { href, name } = NAV_LINKS[i];
        if (href.startsWith("#")) {
          const section = document.querySelector(href);
          if (section) {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
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
    // Run once on mount to set initial active link
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [active]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <a href="/"><img src={logoo} alt="logo" /></a>
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
          <a href="/login" className="action-btn-secondary">
            <FiUser />
            <span>Login / Signup</span>
          </a>
          <a href="/booking" className="action-btn-primary">
            <FiCalendar />
            <span>Book a Table</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
