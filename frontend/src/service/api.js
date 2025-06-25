import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { logger } from '../utils/logger';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// NEW: Request Interceptor to add the Auth Token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Configure the header to send the token
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (existing code)
api.interceptors.response.use(
  (response) => {
    logger.info('API call successful', response.config.url);
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    logger.error(`API Error on ${error.config.url}:`, errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;