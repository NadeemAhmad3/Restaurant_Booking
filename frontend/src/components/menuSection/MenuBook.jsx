import React, { useState, useEffect, useRef } from 'react';
import './MenuBook.css';

// Import the new hook and constants
import { useMenu } from '../../hooks/useMenu';
import { IMAGE_BASE_URL } from '../../utils/constants';

// Import any components or assets if needed (e.g., a LoadingSpinner component)

const MenuBook = () => {
  // Get all state and logic from our custom hook!
  const { menuItems, isLoading, error } = useMenu();

  // --- UI-specific state and logic remains in the component ---
  const [modalImg, setModalImg] = useState(null);
  const [inView, setInView] = useState(false);
  const menuSectionRef = useRef(null);

  // Intersection Observer logic is purely for the UI, so it stays here.
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (menuSectionRef.current) {
      observer.observe(menuSectionRef.current);
    }

    return () => {
      if (menuSectionRef.current) {
        observer.unobserve(menuSectionRef.current);
      }
    };
  }, [isLoading]); // Re-run if loading state changes to re-attach observer

  const openImageModal = (imageSrc) => setModalImg(imageSrc);

  const closeModal = () => setModalImg(null);

  const handleCloseModal = (e) => {
    if (e.target.className === 'img-modal' || e.target.className === 'close-modal-btn') {
      closeModal();
    }
  };

  return (
    <div className="menu-container" ref={menuSectionRef}>
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
      </div>

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading delicious menu...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && (
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div
              key={item._id}
              className={`menu-card${inView ? ' in-view' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-image-container">
                {item.image ? (
                  <img
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    alt={item.name}
                    className="card-image"
                    onClick={() => openImageModal(`${IMAGE_BASE_URL}${item.image}`)}
                  />
                ) : (
                  <div className="card-image-placeholder">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              <div className="card-content">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">
                  {item.description || 'A delicious dish prepared by our finest chefs.'}
                </p>

                <div className="card-footer">
                  <span className="item-price">${item.price.toFixed(2)}</span>
                  <button className="add-to-cart-btn" aria-label={`Add ${item.name} to cart`}>
                    <span className="cart-icon" role="img" aria-hidden="true">🛒</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && menuItems.length === 0 && !error && (
        <div className="no-items">
          <p>No menu items available at the moment.</p>
        </div>
      )}

      {modalImg && (
        <div className="img-modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <button className="close-modal-btn" onClick={closeModal}>×</button>
            <img src={modalImg} alt="Menu Item Preview" className="modal-img-content" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBook;