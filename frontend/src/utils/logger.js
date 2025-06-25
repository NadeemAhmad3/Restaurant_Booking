// src/utils/logger.js
const isDevelopment = process.env.NODE_ENV === 'development';

// Only log messages in development mode to avoid cluttering the production console

export const logger = {
  info: (message, ...optionalParams) => {
    if (isDevelopment) {
      console.log('[INFO]', message, ...optionalParams);
    }
  },
  warn: (message, ...optionalParams) => {
    if (isDevelopment) {
      console.warn('[WARN]', message, ...optionalParams);
    }
  },
  error: (message, ...optionalParams) => {
    if (isDevelopment) {
      console.error('[ERROR]', message, ...optionalParams);
    }
  },
};