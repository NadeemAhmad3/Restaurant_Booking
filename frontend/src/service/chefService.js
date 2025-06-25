import api from './api'; // Assuming you have a central api.js for axios

/**
 * Fetches the list of all chefs.
 */
const getChefs = async () => {
  // The 'api' instance will use the base URL and handle errors
  const response = await api.get('/chefs');
  return response.data;
};

export const chefService = {
  getChefs,
};