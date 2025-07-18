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
    const token = localStorage.getItem('authToken');
    console.log('🔍 Raw token from localStorage:', token ? token.substring(0, 20) + '...' : 'No token');
    
    if (token) {
      // Check if token is valid (not empty, not null, not undefined)
      if (token.trim() === '' || token === 'null' || token === 'undefined') {
        console.error('❌ Invalid token detected:', token);
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return Promise.reject(new Error('Invalid token'));
      }
      
      const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      config.headers.authorization = bearerToken;
      console.log('✅ Token being sent:', bearerToken.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No token found in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error.response?.data);
    
    // Handle token-related errors
    if (error.response?.status === 401 || 
        error.response?.data?.message?.includes('token') ||
        error.response?.data?.message?.includes('Invalid token payload')) {
      console.error('❌ Authentication error detected, clearing token');
      localStorage.removeItem('authToken');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Fetch all instructors
export const fetchInstructors = createAsyncThunk(
  'instructorManagement/fetchInstructors',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔍 Fetching instructors...');
      const response = await api.get('/user/instructors');
      console.log('✅ Instructors fetched:', response.data);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch instructors');
      console.error('❌ Failed to fetch instructors:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Block/Unblock instructor
export const toggleInstructorBlock = createAsyncThunk(
  'instructorManagement/toggleInstructorBlock',
  async ({ instructorId, isBlocked }, { rejectWithValue }) => {
    try {
      const action = isBlocked ? 'unblock' : 'block';
      console.log(`🔄 ${action}ing instructor: ${instructorId}`);
      
      const response = await api.patch(`/user/${instructorId}`, {
        isBlocked: !isBlocked
      });
      
      console.log(`✅ Instructor ${action}ed:`, response.data);
      toast.success(`Instructor ${action}ed successfully!`);
      return { instructorId, isBlocked: !isBlocked, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, `Failed to ${isBlocked ? 'unblock' : 'block'} instructor`);
      console.error(`❌ Failed to ${isBlocked ? 'unblock' : 'block'} instructor:`, error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Approve instructor (change status to active)
export const approveInstructor = createAsyncThunk(
  'instructorManagement/approveInstructor',
  async ({ instructorId }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Approving instructor: ${instructorId}`);
      
      const response = await api.patch(`/user/${instructorId}`, {
        confirmed: true,
        isActive: true
      });
      
      console.log('✅ Instructor approved:', response.data);
      toast.success('Instructor approved successfully!');
      return { instructorId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to approve instructor');
      console.error('❌ Failed to approve instructor:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete instructor
export const deleteInstructor = createAsyncThunk(
  'instructorManagement/deleteInstructor',
  async ({ instructorId }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Deleting instructor: ${instructorId}`);
      
      const response = await api.delete(`/user/${instructorId}`);
      
      console.log('✅ Instructor deleted:', response.data);
      toast.success('Instructor deleted successfully!');
      return { instructorId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to delete instructor');
      console.error('❌ Failed to delete instructor:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  // Data
  instructors: [],
  
  // Loading states
  isLoading: false,
  isUpdating: false,
  isDeleting: false,
  
  // Error states
  error: null,
  updateError: null,
  deleteError: null,
  
  // UI state
  searchTerm: '',
  statusFilter: 'all',
  selectedInstructor: null,
};

// Instructor Management slice
const instructorManagementSlice = createSlice({
  name: 'instructorManagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.updateError = null;
      state.deleteError = null;
    },
    
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    
    setSelectedInstructor: (state, action) => {
      state.selectedInstructor = action.payload;
    },
    
    // Optimistic update for blocking/unblocking
    toggleInstructorBlockOptimistic: (state, action) => {
      const { instructorId, isBlocked } = action.payload;
      const instructor = state.instructors.find(i => i._id === instructorId);
      if (instructor) {
        instructor.isBlocked = !isBlocked;
      }
    },
    
    // Optimistic update for approval
    approveInstructorOptimistic: (state, action) => {
      const { instructorId } = action.payload;
      const instructor = state.instructors.find(i => i._id === instructorId);
      if (instructor) {
        instructor.confirmed = true;
        instructor.isActive = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Instructors
      .addCase(fetchInstructors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.instructors = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.instructors = [];
      })
      
      // Toggle Instructor Block
      .addCase(toggleInstructorBlock.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(toggleInstructorBlock.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateError = null;
        const { instructorId, isBlocked } = action.payload;
        const instructor = state.instructors.find(i => i._id === instructorId);
        if (instructor) {
          instructor.isBlocked = isBlocked;
        }
      })
      .addCase(toggleInstructorBlock.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload;
        // Revert optimistic update on error would go here if needed
      })
      
      // Approve Instructor
      .addCase(approveInstructor.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(approveInstructor.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateError = null;
        const { instructorId } = action.payload;
        const instructor = state.instructors.find(i => i._id === instructorId);
        if (instructor) {
          instructor.confirmed = true;
          instructor.isActive = true;
        }
      })
      .addCase(approveInstructor.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload;
        // Revert optimistic update on error would go here if needed
      })
      
      // Delete Instructor
      .addCase(deleteInstructor.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteInstructor.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.deleteError = null;
        const { instructorId } = action.payload;
        state.instructors = state.instructors.filter(i => i._id !== instructorId);
      })
      .addCase(deleteInstructor.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload;
      });
  },
});

export const { 
  clearError,
  setSearchTerm,
  setStatusFilter,
  setSelectedInstructor,
  toggleInstructorBlockOptimistic,
  approveInstructorOptimistic
} = instructorManagementSlice.actions;

export default instructorManagementSlice.reducer;