import { useState, useEffect } from 'react';
import { chefService } from '../service/chefService';
import { logger } from '../utils/logger'; // Assuming you have a logger utility

export const useChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await chefService.getChefs();
        setChefs(data);
        logger.info('Successfully fetched chef data.');
      } catch (err) {
        // The error message is formatted by your api.js interceptor
        setError(err.message || 'Could not load our team. Please try again later.');
        setChefs([]); // Clear any old data
        logger.error('Failed to fetch chefs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChefs();
  }, []); // Empty dependency array means this runs once on component mount

  return { chefs, isLoading, error };
};