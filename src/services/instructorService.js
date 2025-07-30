import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../config/api';

/**
 * Creates axios instance with base configuration for instructor-related API calls
 * Sets default headers and base URL for all instructor requests
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
    console.log('Instructor API Request:', config.method?.toUpperCase(), config.url, config.headers);
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
    console.log('Instructor API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Instructor API Error:', error.response?.status, error.response?.data || error.message);
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
 * Sets instructor availability for one or multiple days
 * @param {string} instructorId - ID of the instructor
 * @param {Object} availableTime - Object containing days and their time slots
 *   Example: { "monday": { "from": 10, "to": 17 }, "tuesday": { "from": 10, "to": 16 } }
 * @returns {Promise} - API response
 */
export const setInstructorAvailability = async (instructorId, availableTime) => {
  try {
    console.log(`🔄 Setting availability for instructor ${instructorId}...`);
    const requestBody = { availableTime };
    const response = await api.put(`/user/${instructorId}/availability`, requestBody);
    console.log('✅ Instructor availability set successfully:', response.data);
    
    const dayCount = Object.keys(availableTime).length;
    const dayText = dayCount === 1 ? 'day' : 'days';
    toast.success(`Availability for ${dayCount} ${dayText} updated successfully!`);
    
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to set instructor availability');
    console.error('❌ Failed to set instructor availability:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Gets all instructors with their availability data
 * @returns {Promise} - API response with instructors data
 */
export const getAllInstructors = async () => {
  try {
    console.log('🔍 Fetching all instructors...');
    const response = await api.get('/user/instructors');
    console.log('✅ Instructors fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch instructors');
    console.error('❌ Failed to fetch instructors:', error);
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Marks a lesson as completed for a specific group
 * @param {string} lessonId - ID of the lesson to mark as completed
 * @param {string} groupId - ID of the group
 * @returns {Promise} - API response with completion data
 */
export const markLessonAsCompleted = async (lessonId, groupId) => {
  try {
    console.log(`🔄 Marking lesson ${lessonId} as completed for group ${groupId}...`);
    const response = await api.post(`/lesson/${lessonId}/complete/${groupId}`);
    console.log('✅ Lesson marked as completed successfully:', response.data);
    
    if (response.data.success) {
      const nextLesson = response.data.data?.nextLessonUnlocked;
      const message = nextLesson 
        ? `Lesson completed! Next lesson "${nextLesson.title}" has been unlocked.`
        : 'Lesson marked as completed successfully!';
      toast.success(message);
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to mark lesson as completed');
    console.error('❌ Failed to mark lesson as completed:', error);
    toast.error(errorMessage);
    throw error;
  }
};

export default {
  setInstructorAvailability,
  getAllInstructors,
  markLessonAsCompleted,
};