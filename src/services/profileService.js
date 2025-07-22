import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../config/api';

/**
 * Creates axios instance with base configuration for profile-related API calls
 * Sets default headers and base URL for all profile requests
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
    console.log('Profile API Request:', config.method?.toUpperCase(), config.url, config.headers);
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
    console.log('Profile API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Profile API Error:', error.response?.status, error.response?.data || error.message);
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
 * Updates user password
 * @param {Object} passwordData - Object containing currentPassword and newPassword
 * @returns {Promise} - API response
 */
export const updatePassword = async (passwordData) => {
  try {
    console.log('🔄 Updating password...');
    const response = await api.patch('/auth/update-password', passwordData);
    console.log('✅ Password updated successfully:', response.data);
    toast.success('Password updated successfully!');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to update password');
    console.error('❌ Failed to update password:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Updates user profile with form data (including image upload)
 * @param {FormData} formData - FormData object containing profile data and optional image
 * @returns {Promise} - API response
 */
export const updateProfile = async (formData) => {
  try {
    console.log('🔄 Updating profile...');
    console.log('📝 Profile data being sent:', formData);
    
    const response = await api.put('/user/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('✅ Profile updated successfully:', response.data);
    toast.success('Profile updated successfully!');
    
    // Update user data in localStorage if the response contains updated user data
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to update profile');
    console.error('❌ Failed to update profile:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Gets current user profile data and updates localStorage
 * @returns {Promise} - API response with user profile data
 */
export const getUserProfile = async () => {
  try {
    console.log('🔍 Fetching user profile...');
    const response = await api.get('/user/profile');
    console.log('✅ User profile fetched:', response.data);
    
    // Update localStorage with complete user data
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('✅ User data updated in localStorage with complete profile');
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch user profile');
    console.error('❌ Failed to fetch user profile:', error);
    toast.error(errorMessage);
    throw error;
  }
};

export default {
  updatePassword,
  updateProfile,
  getUserProfile,
};