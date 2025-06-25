// src/services/menuService.js
import api from './api';

/**
 * Fetches the list of all menu items.
 */
const getMenu = async () => {
  // We use your centralized 'api' instance here
  const response = await api.get('/menu');
  return response.data; // The interceptor will handle errors
};

// You can add other menu-related functions here later, e.g., getMenuItem(id)

export const menuService = {
  getMenu,
};