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

// Fetch student dashboard data
export const fetchStudentDashboard = createAsyncThunk(
  'studentDashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔍 Fetching student dashboard data...');
      console.log('🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/user/StudentDashboardData');
      const response = await api.get('/user/StudentDashboardData');
      console.log('✅ Student dashboard data:', response.data);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch student dashboard');
      console.error('❌ Failed to fetch student dashboard:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Mark lesson as completed
export const markLessonCompleted = createAsyncThunk(
  'studentDashboard/markLessonCompleted',
  async ({ lessonId }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Marking lesson as completed: ${lessonId}`);
      const response = await api.patch(`/lesson/${lessonId}/complete`);
      console.log('✅ Lesson marked as completed:', response.data);
      toast.success('Lesson completed successfully!');
      return { lessonId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to mark lesson as completed');
      console.error('❌ Failed to mark lesson as completed:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Mark unit as completed
export const markUnitCompleted = createAsyncThunk(
  'studentDashboard/markUnitCompleted',
  async ({ unitId }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Marking unit as completed: ${unitId}`);
      const response = await api.patch(`/unit/${unitId}/complete`);
      console.log('✅ Unit marked as completed:', response.data);
      toast.success('Unit completed successfully!');
      return { unitId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to mark unit as completed');
      console.error('❌ Failed to mark unit as completed:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  // Dashboard data
  courses: [],
  
  // Loading states
  isLoading: false,
  isMarkingComplete: false,
  
  // Error states
  error: null,
  completeError: null,
  
  // UI state
  expandedCourses: {},
  expandedUnits: {},
  selectedCourse: null,
  selectedUnit: null,
  selectedLesson: null,
};

// Student Dashboard slice
const studentDashboardSlice = createSlice({
  name: 'studentDashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.completeError = null;
    },
    
    toggleCourseExpansion: (state, action) => {
      const courseId = action.payload;
      state.expandedCourses[courseId] = !state.expandedCourses[courseId];
    },
    
    toggleUnitExpansion: (state, action) => {
      const unitId = action.payload;
      state.expandedUnits[unitId] = !state.expandedUnits[unitId];
    },
    
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    
    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
    },
    
    setSelectedLesson: (state, action) => {
      state.selectedLesson = action.payload;
    },
    
    // Optimistic update for lesson completion
    markLessonCompletedOptimistic: (state, action) => {
      const { courseId, unitId, lessonId } = action.payload;
      const course = state.courses.find(c => c._id === courseId);
      if (course) {
        const unit = course.units.find(u => u._id === unitId);
        if (unit) {
          const lesson = unit.lessons.find(l => l._id === lessonId);
          if (lesson) {
            lesson.completed = true;
          }
        }
      }
    },
    
    // Optimistic update for unit completion
    markUnitCompletedOptimistic: (state, action) => {
      const { courseId, unitId } = action.payload;
      const course = state.courses.find(c => c._id === courseId);
      if (course) {
        const unit = course.units.find(u => u._id === unitId);
        if (unit) {
          unit.completed = true;
          // Mark all lessons in the unit as completed
          unit.lessons.forEach(lesson => {
            lesson.completed = true;
          });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Student Dashboard
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.courses = [];
      })
      
      // Mark Lesson Completed
      .addCase(markLessonCompleted.pending, (state) => {
        state.isMarkingComplete = true;
        state.completeError = null;
      })
      .addCase(markLessonCompleted.fulfilled, (state, action) => {
        state.isMarkingComplete = false;
        state.completeError = null;
        // The optimistic update already handled the UI change
      })
      .addCase(markLessonCompleted.rejected, (state, action) => {
        state.isMarkingComplete = false;
        state.completeError = action.payload;
        // Revert optimistic update on error would go here if needed
      })
      
      // Mark Unit Completed
      .addCase(markUnitCompleted.pending, (state) => {
        state.isMarkingComplete = true;
        state.completeError = null;
      })
      .addCase(markUnitCompleted.fulfilled, (state, action) => {
        state.isMarkingComplete = false;
        state.completeError = null;
        // The optimistic update already handled the UI change
      })
      .addCase(markUnitCompleted.rejected, (state, action) => {
        state.isMarkingComplete = false;
        state.completeError = action.payload;
        // Revert optimistic update on error would go here if needed
      });
  },
});

export const { 
  clearError, 
  toggleCourseExpansion,
  toggleUnitExpansion,
  setSelectedCourse,
  setSelectedUnit,
  setSelectedLesson,
  markLessonCompletedOptimistic,
  markUnitCompletedOptimistic
} = studentDashboardSlice.actions;

export default studentDashboardSlice.reducer;