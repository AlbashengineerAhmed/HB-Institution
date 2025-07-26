import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../config/api';

/**
 * Creates axios instance with base configuration for contact-related API calls
 * Sets default headers and base URL for all contact requests
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
    console.log('Contact API Request:', config.method?.toUpperCase(), config.url, config.headers);
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
    console.log('Contact API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Contact API Error:', error.response?.status, error.response?.data || error.message);
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
 * Sends a contact message
 * @param {Object} contactData - Object containing fullName, phoneNumber, subject, message
 * @returns {Promise} - API response
 */
export const sendContactMessage = async (contactData) => {
  try {
    console.log('🔄 Sending contact message...');
    const response = await api.post('/Contact/', contactData);
    console.log('✅ Contact message sent successfully:', response.data);
    toast.success('Thank you for your message! We\'ll get back to you soon.');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to send message');
    console.error('❌ Failed to send contact message:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Gets all contact messages (Admin only)
 * @returns {Promise} - API response with contact messages
 */
export const getContactMessages = async () => {
  try {
    console.log('🔍 Fetching contact messages...');
    const response = await api.get('/Contact/');
    console.log('✅ Contact messages fetched:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch contact messages');
    console.error('❌ Failed to fetch contact messages:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Deletes a contact message (Admin only)
 * @param {string} messageId - ID of the message to delete
 * @returns {Promise} - API response
 */
export const deleteContactMessage = async (messageId) => {
  try {
    console.log('🗑️ Deleting contact message:', messageId);
    const response = await api.delete(`/Contact/${messageId}`);
    console.log('✅ Contact message deleted successfully:', response.data);
    toast.success('Contact message deleted successfully!');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to delete contact message');
    console.error('❌ Failed to delete contact message:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Deletes all contact messages (Admin only)
 * @returns {Promise} - API response
 */
export const deleteAllContactMessages = async () => {
  try {
    console.log('🗑️ Deleting all contact messages...');
    const response = await api.delete('/Contact/');
    console.log('✅ All contact messages deleted successfully:', response.data);
    toast.success('All contact messages deleted successfully!');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to delete all contact messages');
    console.error('❌ Failed to delete all contact messages:', error);
    toast.error(errorMessage);
    throw error;
  }
};

export default {
  sendContactMessage,
  getContactMessages,
  deleteContactMessage,
  deleteAllContactMessages,
};