import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginSignup.css';

// Import hooks
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

// Import your assets and icons
import logoo from '../../assets/logo1.png';
import formBg from '../../assets/hs1.jpeg';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const LoginSignup = () => {
  // State for toggling between Login and Sign Up form
  const [isLogin, setIsLogin] = useState(true);

  // Custom hook for managing form state
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  // Custom hook for handling authentication logic
  const { login, signup, isLoading, error, setError } = useAuth();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    resetForm(); // Clear form fields
    setError(null); // Clear any previous errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // For login, we only need email and password
      login({ email: values.email, password: values.password });
    } else {
      // For signup, we need all fields
      signup(values);
    }
  };

  return (
    <div className="login-signup-container" style={{ backgroundImage: `url(${formBg})` }}>
      <div className="form-box">
        <div className="form-logo">
          <Link to="/">
            <img src={logoo} alt="RapidBites Logo" />
          </Link>
        </div>

        <div className="form-header">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to continue your adventure' : 'Sign up to get started'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
          )}

          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
              minLength="6"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-form">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span onClick={toggleForm}>{isLogin ? ' Sign Up' : ' Login'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;