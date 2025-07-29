import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../config/api';

/**
 * Creates axios instance with base configuration for note-related API calls
 * Sets default headers and base URL for all note requests
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
    console.log('Note API Request:', config.method?.toUpperCase(), config.url, config.headers);
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
    console.log('Note API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Note API Error:', error.response?.status, error.response?.data || error.message);
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
 * Sends a note to admin
 * @param {string} note - The note content to send
 * @returns {Promise} - API response
 */
export const sendNote = async (note) => {
  try {
    console.log('🔄 Sending note to admin...');
    const requestBody = { note };
    const response = await api.post('/note/', requestBody);
    console.log('✅ Note sent successfully:', response.data);
    toast.success('Note sent to admin successfully!');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to send note');
    console.error('❌ Failed to send note:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Gets all notes (admin only)
 * @returns {Promise} - API response with notes data
 */
export const getAllNotes = async () => {
  try {
    console.log('🔍 Fetching all notes...');
    const response = await api.get('/note/');
    console.log('✅ Notes fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch notes');
    console.error('❌ Failed to fetch notes:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Deletes a note by ID (admin only)
 * @param {string} noteId - ID of the note to delete
 * @returns {Promise} - API response
 */
export const deleteNote = async (noteId) => {
  try {
    console.log(`🔄 Deleting note ${noteId}...`);
    const response = await api.delete(`/note/${noteId}`);
    console.log('✅ Note deleted successfully:', response.data);
    toast.success('Note deleted successfully!');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to delete note');
    console.error('❌ Failed to delete note:', error);
    toast.error(errorMessage);
    throw error;
  }
};

export default {
  sendNote,
  getAllNotes,
  deleteNote,
};