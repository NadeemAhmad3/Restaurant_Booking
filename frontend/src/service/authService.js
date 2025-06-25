// src/services/authService.js
import api from './api';

const signup = async (userData) => {
  // userData should be an object: { name, email, password }
  const response = await api.post('/auth/signup', userData);
  return response.data; // Contains { message, token, user }
};

const login = async (credentials) => {
  // credentials should be an object: { email, password }
  const response = await api.post('/auth/login', credentials);
  return response.data; // Contains { message, token, user }
};

const logout = () => {
  // Simple logout by removing the token
  localStorage.removeItem('token');
};

export const authService = {
  signup,
  login,
  logout,
};