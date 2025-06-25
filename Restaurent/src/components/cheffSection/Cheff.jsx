import React from 'react';
import { useChefs } from '../../hooks/useChefs';
import { IMAGE_BASE_URL } from '../../utils/constants';
import './Cheff.css'; // This should be the enhanced CSS file

// Helper component for social media icons
const SocialIcon = ({ type }) => {
  const icons = {
    facebook: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
    twitter: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
    instagram: <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {type === 'instagram' && <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>}
      {icons[type]}
    </svg>
  );
};


const Cheff = () => {
  const { chefs, isLoading, error } = useChefs();

  return (
    <div className="chefs-container">
      <div className="chefs-header">
        <h1 className="chefs-title">Our Master Chefs</h1>
        <p className="chefs-subtitle">The passion and expertise behind every dish</p>
      </div>

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Assembling our talented team...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && (
        <div className="chefs-grid">
          {chefs.map((chef, index) => (
            <div
              key={chef._id}
              className="chef-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="chef-card-image-wrapper">
                {chef.image ? (
                  <img
                    src={`${IMAGE_BASE_URL}chefs/${chef.image}`}
                    alt={chef.name}
                    className="chef-card-image"
                  />
                ) : (
                  <div className="chef-card-image-placeholder">
                    <span>?</span>
                  </div>
                )}
              </div>
              <div className="chef-card-content">
                <h3 className="chef-name">{chef.name}</h3>
                <p className="chef-designation">{chef.designation}</p>
                <p className="chef-description">
                  {chef.description || `A passionate artist dedicated to culinary excellence.`}
                </p>
                <div className="chef-social-links">
                  {chef.socialLinks?.facebook && (
                    <a href={chef.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${chef.name}'s Facebook`}>
                      <SocialIcon type="facebook" />
                    </a>
                  )}
                  {chef.socialLinks?.twitter && (
                    <a href={chef.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${chef.name}'s Twitter`}>
                      <SocialIcon type="twitter" />
                    </a>
                  )}
                  {chef.socialLinks?.instagram && (
                    <a href={chef.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${chef.name}'s Instagram`}>
                      <SocialIcon type="instagram" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && chefs.length === 0 && !error && (
        <div className="no-items">
          <p>Our team information is currently unavailable.</p>
        </div>
      )}
    </div>
  );
};

export default Cheff;