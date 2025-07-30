import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../config/api';

/**
 * Creates axios instance with base configuration for user logs API calls
 * Sets default headers and base URL for all user logs requests
 */
const api = axios.create(API_CONFIG);

/**
 * Helper function to extract error message from backend response
 * Checks multiple possible error message fields and returns appropriate message
 * @param {Object} error - The error object from axios
 * @param {string} defaultMessage - Default message if no specific error found
 * @returns {string} - Formatted error message
 */
const getErrorMessage = (error, defaultMessage = 'An error occurred') => {
  return error.response?.data?.errMas || 
         error.response?.data?.message || 
         error.response?.data?.messege || 
         error.response?.data?.error ||
         error.message ||
         defaultMessage;
};

/**
 * Request interceptor to add authentication token to requests
 * Automatically adds Bearer token to authorization header if available
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      config.headers.authorization = bearerToken;
    }
    console.log('User Logs API Request:', config.method?.toUpperCase(), config.url, config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor for better error handling
 * Logs responses and handles authentication errors
 */
api.interceptors.response.use(
  (response) => {
    console.log('User Logs API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('User Logs API Error:', error.response?.status, error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Gets all users
 * @returns {Promise} - API response with users data
 */
export const getAllUsers = async () => {
  try {
    console.log('🔄 Fetching all users...');
    const response = await api.get('/user/');
    console.log('✅ Users fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch users');
    console.error('❌ Error fetching users:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Gets user history by user ID
 * @param {string} userId - The user ID to get history for
 * @returns {Promise} - API response with user history data
 */
export const getUserHistory = async (userId) => {
  try {
    console.log('🔄 Fetching user history for:', userId);
    const response = await api.get(`/history/user-history/${userId}`);
    console.log('✅ User history fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch user history');
    console.error('❌ Error fetching user history:', error);
    toast.error(errorMessage);
    throw error;
  }
};