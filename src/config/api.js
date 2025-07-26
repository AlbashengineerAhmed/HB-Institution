/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

// Base URL for the HB Institution API
export const API_BASE_URL = 'https://hb-institution.vercel.app/api/v1';

// API configuration object with common settings
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 70000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
};

// Enrollment API base URL (different from main API)
export const ENROLLMENT_API_BASE_URL = 'https://hb-institution.vercel.app';

export default {
  API_BASE_URL,
  API_CONFIG,
  ENROLLMENT_API_BASE_URL,
};