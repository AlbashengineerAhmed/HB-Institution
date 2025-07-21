import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../../config/api';

/**
 * Creates axios instance with base configuration
 * Sets default headers and base URL for all requests
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
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor for global error handling
 * Handles 401 errors by clearing auth data and redirecting to login
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.error('Session expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

/**
 * Async thunk for student registration
 * Registers a new student account with provided user data
 * @param {Object} userData - User registration data including firstName, lastName, email, password
 * @returns {Promise} - Registration response data
 */
export const registerStudent = createAsyncThunk(
  'auth/registerStudent',
  async (userData, { rejectWithValue }) => {
    const requestData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.password,
      role: 'student'
    };
    
    try {
      const response = await api.post('/auth/register', requestData);
      toast.success('Student registration successful! Please check your email to confirm your account.');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Student registration failed');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk for instructor registration
 * Registers a new instructor account with provided user data and specialization
 * @param {Object} userData - User registration data including firstName, lastName, email, password, specialization
 * @returns {Promise} - Registration response data
 */
export const registerInstructor = createAsyncThunk(
  'auth/registerInstructor',
  async (userData, { rejectWithValue }) => {
    const requestData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.password,
      role: 'instructor',
      specialization: userData.specialization
    };
    
    try {
      const response = await api.post('/auth/register', requestData);
      toast.success('Instructor registration successful! Please check your email to confirm your account.');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Instructor registration failed');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk for user login
 * Authenticates user with email and password, stores token and user data
 * @param {Object} credentials - Login credentials containing email and password
 * @returns {Promise} - Login response with user data and token
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Store authentication data in localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Login failed');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk for password reset request
 * Sends password reset code to user's email address
 * @param {string} email - User's email address
 * @returns {Promise} - Response confirming reset code was sent
 */
export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/forget-password', { email });
      toast.success('Password reset code sent to your email!');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to send reset code');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk for verification code validation
 * Verifies the password reset code sent to user's email
 * @param {string} code - Verification code from email
 * @returns {Promise} - Response confirming code is valid
 */
export const verifyCode = createAsyncThunk(
  'auth/verifyCode',
  async (code, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-code', { code });
      toast.success('Code verified successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Invalid verification code');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk for password reset
 * Resets user's password after successful code verification
 * @param {Object} data - Object containing email and newPassword
 * @returns {Promise} - Response confirming password was reset
 */
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const requestData = { email, newPassword };
      const response = await api.post('/auth/reset-password', requestData);
      toast.success('Password reset successful!');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Password reset failed');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Initial state for authentication slice
 * Loads existing auth data from localStorage if available
 */
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('authToken') || null,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('authToken'),
  error: null,
  resetEmail: null,
  isCodeVerified: false,
};

/**
 * Authentication slice with reducers and extra reducers for async actions
 * Manages user authentication state and related operations
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Logs out user by clearing all authentication data
     * Removes token and user data from localStorage and state
     */
    logout: (state) => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.resetEmail = null;
      state.isCodeVerified = false;
      toast.success('Logged out successfully!');
    },
    /**
     * Clears any error messages from state
     * Used to reset error state after displaying to user
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Sets the email for password reset flow
     * Stores email to be used in subsequent reset steps
     */
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    /**
     * Clears password reset state
     * Resets email and verification status after successful reset
     */
    clearResetState: (state) => {
      state.resetEmail = null;
      state.isCodeVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Student cases
      .addCase(registerStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Register Instructor cases
      .addCase(registerInstructor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerInstructor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerInstructor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Forget Password cases
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Verify Code cases
      .addCase(verifyCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCodeVerified = true;
        state.error = null;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isCodeVerified = false;
      })
      
      // Reset Password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.resetEmail = null;
        state.isCodeVerified = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setResetEmail, clearResetState } = authSlice.actions;
export default authSlice.reducer;