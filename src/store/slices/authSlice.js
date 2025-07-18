import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://hb-institution.vercel.app/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to extract error message from backend response
const getErrorMessage = (error, defaultMessage = 'An error occurred') => {
  // Check different possible error message fields from backend
  return error.response?.data?.errMas || 
         error.response?.data?.message || 
         error.response?.data?.messege || 
         error.response?.data?.error ||
         error.message ||
         defaultMessage;
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    console.log('Making API request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    
    const token = localStorage.getItem('authToken');
    if (token) {
      // Ensure token starts with Bearer
      const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      config.headers.authorization = bearerToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response);
    return response;
  },
  (error) => {
    console.error('API error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.error('Session expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

// Async thunks for API calls
export const registerStudent = createAsyncThunk(
  'auth/registerStudent',
  async (userData, { rejectWithValue }) => {
    const requestData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.password, // Use same password for confirmation
      role: 'student'
    };
    
    try {
      console.log('Sending student registration data:', requestData);
      
      const response = await api.post('/auth/register', requestData);
      console.log('Student registration response:', response.data);
      
      toast.success('Student registration successful!');
      return response.data;
    } catch (error) {
      console.error('Student registration error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Request data that failed:', requestData);
      
      const errorMessage = getErrorMessage(error, 'Student registration failed');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerInstructor = createAsyncThunk(
  'auth/registerInstructor',
  async (userData, { rejectWithValue }) => {
    const requestData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.password, // Use same password for confirmation
      role: 'instructor',
      specialization: userData.specialization
    };
    
    try {
      console.log('Sending instructor registration data:', requestData);
      
      const response = await api.post('/auth/register', requestData);
      console.log('Instructor registration response:', response.data);
      
      toast.success('Instructor registration successful!');
      return response.data;
    } catch (error) {
      console.error('Instructor registration error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Request data that failed:', requestData);
      
      const errorMessage = getErrorMessage(error, 'Instructor registration failed');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Sending login data:', credentials);
      
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      
      // Store token and user data
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      const errorMessage = getErrorMessage(error, 'Login failed');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (email, { rejectWithValue }) => {
    try {
      console.log('Sending forget password request for email:', email);
      
      const response = await api.post('/auth/forget-password', { email });
      console.log('Forget password response:', response.data);
      
      toast.success('Password reset code sent to your email!');
      return response.data;
    } catch (error) {
      console.error('Forget password error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to send reset code');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyCode = createAsyncThunk(
  'auth/verifyCode',
  async (code, { rejectWithValue }) => {
    try {
      console.log('Sending verification code:', code);
      
      const response = await api.post('/auth/verify-code', { code });
      console.log('Verify code response:', response.data);
      
      toast.success('Code verified successfully!');
      return response.data;
    } catch (error) {
      console.error('Verify code error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Invalid verification code');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const requestData = { email, newPassword };
      console.log('Sending reset password request:', requestData);
      
      const response = await api.post('/auth/reset-password', requestData);
      console.log('Reset password response:', response.data);
      
      toast.success('Password reset successful!');
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Password reset failed');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('authToken') || null,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('authToken'),
  error: null,
  resetEmail: null, // Store email for password reset flow
  isCodeVerified: false, // Track if verification code is verified
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
    clearError: (state) => {
      state.error = null;
    },
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    clearResetState: (state) => {
      state.resetEmail = null;
      state.isCodeVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Student
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
      
      // Register Instructor
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
      
      // Login
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
      
      // Forget Password
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
      
      // Verify Code
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
      
      // Reset Password
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