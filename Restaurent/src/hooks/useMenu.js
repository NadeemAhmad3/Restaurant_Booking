// src/hooks/useMenu.js
import { useState, useEffect } from 'react';
import { menuService } from '../service/menuService';
import { logger } from '../utils/logger';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await menuService.getMenu();
        setMenuItems(data);
        logger.info('Successfully fetched menu items.');
      } catch (err) {
        // The error is already formatted by your api.js interceptor
        setError(err.message);
        setMenuItems([]); // Clear any old data
        logger.error('Failed to fetch menu:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []); // Empty dependency array means this runs once on component mount

  return { menuItems, isLoading, error };
};