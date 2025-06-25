import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../service/authService';
import { logger } from '../utils/logger';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: contextLogin } = useAuthContext();

  const handleAuthAction = async (action, credentials, successMessage, redirectPath) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await action(credentials);
      // Pass both token and user object to the context
      contextLogin(data.token, data.user); 
      logger.info(successMessage, data.user);
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (credentials) => {
    handleAuthAction(authService.login, credentials, 'Login Successful!', '/');
  };

  const signup = (userData) => {
    handleAuthAction(authService.signup, userData, 'Signup Successful!', '/');
  };

  return {
    login,
    signup,
    isLoading,
    error,
    setError,
  };
};