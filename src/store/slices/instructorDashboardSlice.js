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

// Fetch instructor dashboard data
export const fetchInstructorDashboard = createAsyncThunk(
  'instructorDashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔍 Fetching instructor dashboard data...');
      console.log('🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/user/InstructorDashboardData');
      const response = await api.get('/user/InstructorDashboardData');
      console.log('✅ Instructor dashboard data:', response.data);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch instructor dashboard');
      console.error('❌ Failed to fetch instructor dashboard:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch course units by course ID
export const fetchCourseUnits = createAsyncThunk(
  'instructorDashboard/fetchCourseUnits',
  async (courseId, { rejectWithValue }) => {
    try {
      console.log(`🔍 Fetching course units for: ${courseId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/unit/course/${courseId}`);
      const response = await api.get(`/unit/course/${courseId}`);
      console.log('✅ Course units:', response.data);
      return { courseId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch course units');
      console.error('❌ Failed to fetch course units:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch unit lessons
export const fetchUnitLessons = createAsyncThunk(
  'instructorDashboard/fetchUnitLessons',
  async (unitId, { rejectWithValue }) => {
    try {
      console.log(`🔍 Fetching unit lessons for: ${unitId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/unit/${unitId}`);
      const response = await api.get(`/unit/${unitId}`);
      console.log('✅ Unit lessons:', response.data);
      return { unitId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch unit lessons');
      console.error('❌ Failed to fetch unit lessons:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Toggle lesson lock status
export const toggleLessonLock = createAsyncThunk(
  'instructorDashboard/toggleLessonLock',
  async ({ lessonId }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Toggling lesson lock status: ${lessonId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/lesson/${lessonId}/toggle-lock`);
      const response = await api.patch(`/lesson/${lessonId}/toggle-lock`);
      console.log('✅ Lesson lock status toggled:', response.data);
      toast.success(response.data.message);
      return { lessonId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to toggle lesson lock status');
      console.error('❌ Failed to toggle lesson lock status:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Toggle unit lock status
export const toggleUnitLock = createAsyncThunk(
  'instructorDashboard/toggleUnitLock',
  async ({ unitId }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Toggling unit lock status: ${unitId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/unit/${unitId}/lock`);
      const response = await api.patch(`/unit/${unitId}/lock`);
      console.log('✅ Unit lock status toggled - Full response:', response.data);
      console.log('✅ Unit lock status - Data field:', response.data.data);
      console.log('✅ Unit lock status - Lock value:', response.data.data?.lock);
      toast.success(response.data.message);
      return { unitId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to toggle unit lock status');
      console.error('❌ Failed to toggle unit lock status:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  // Dashboard data
  groups: [],
  
  // Course units
  courseDetails: {},
  
  // Unit lessons
  unitLessons: {},
  
  // Loading states
  isLoading: false,
  isLoadingCourse: false,
  isLoadingLessons: false,
  isUpdatingLock: false,
  
  // Error states
  error: null,
  courseError: null,
  lessonsError: null,
  lockError: null,
  
  // UI state
  expandedCourses: {},
  expandedUnits: {},
};

// Instructor Dashboard slice
const instructorDashboardSlice = createSlice({
  name: 'instructorDashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.courseError = null;
      state.lessonsError = null;
      state.lockError = null;
    },
    
    toggleCourseExpansion: (state, action) => {
      const courseId = action.payload;
      state.expandedCourses[courseId] = !state.expandedCourses[courseId];
    },
    
    toggleUnitExpansion: (state, action) => {
      const unitId = action.payload;
      state.expandedUnits[unitId] = !state.expandedUnits[unitId];
    },
    
    // Optimistic update for lesson lock status
    updateLessonLockStatusOptimistic: (state, action) => {
      const { unitId, lessonId, isLocked } = action.payload;
      if (state.unitLessons[unitId] && state.unitLessons[unitId].lessons) {
        const lesson = state.unitLessons[unitId].lessons.find(l => l._id === lessonId);
        if (lesson) {
          lesson.islocked = isLocked;
        }
      }
    },

    // Optimistic update for unit lock status
    updateUnitLockStatusOptimistic: (state, action) => {
      const { courseId, unitId, isLocked } = action.payload;
      console.log('🔄 Optimistic update - courseId:', courseId, 'unitId:', unitId, 'isLocked:', isLocked);
      if (state.courseDetails[courseId]) {
        const unit = state.courseDetails[courseId].find(u => u._id === unitId);
        if (unit) {
          console.log('🔄 Found unit, updating lock status from', unit.lock, 'to', isLocked);
          unit.lock = isLocked;
        } else {
          console.log('❌ Unit not found in courseDetails');
        }
      } else {
        console.log('❌ Course not found in courseDetails');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Instructor Dashboard
      .addCase(fetchInstructorDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInstructorDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchInstructorDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.groups = [];
      })
      
      // Fetch Course Units
      .addCase(fetchCourseUnits.pending, (state) => {
        state.isLoadingCourse = true;
        state.courseError = null;
      })
      .addCase(fetchCourseUnits.fulfilled, (state, action) => {
        state.isLoadingCourse = false;
        const { courseId, data } = action.payload;
        state.courseDetails[courseId] = data.data || data;
        state.courseError = null;
        console.log('✅ Course units loaded for course:', courseId, 'Units:', state.courseDetails[courseId]);
      })
      .addCase(fetchCourseUnits.rejected, (state, action) => {
        state.isLoadingCourse = false;
        state.courseError = action.payload;
      })
      
      // Fetch Unit Lessons
      .addCase(fetchUnitLessons.pending, (state) => {
        state.isLoadingLessons = true;
        state.lessonsError = null;
      })
      .addCase(fetchUnitLessons.fulfilled, (state, action) => {
        state.isLoadingLessons = false;
        const { unitId, data } = action.payload;
        state.unitLessons[unitId] = data.data || data;
        state.lessonsError = null;
      })
      .addCase(fetchUnitLessons.rejected, (state, action) => {
        state.isLoadingLessons = false;
        state.lessonsError = action.payload;
      })
      
      // Toggle Lesson Lock
      .addCase(toggleLessonLock.pending, (state) => {
        state.isUpdatingLock = true;
        state.lockError = null;
      })
      .addCase(toggleLessonLock.fulfilled, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = null;
        const { lessonId, data } = action.payload;
        
        // Update the lesson lock status in all units that contain this lesson
        Object.keys(state.unitLessons).forEach(unitId => {
          if (state.unitLessons[unitId].lessons) {
            const lesson = state.unitLessons[unitId].lessons.find(l => l._id === lessonId);
            if (lesson) {
              lesson.islocked = data.islocked;
            }
          }
        });
      })
      .addCase(toggleLessonLock.rejected, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = action.payload;
      })
      
      // Toggle Unit Lock
      .addCase(toggleUnitLock.pending, (state) => {
        state.isUpdatingLock = true;
        state.lockError = null;
      })
      .addCase(toggleUnitLock.fulfilled, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = null;
        const { unitId, data } = action.payload;
        
        console.log('✅ Unit lock toggle successful - unitId:', unitId);
        console.log('✅ Response data:', data);
        console.log('✅ New lock status:', data.data?.lock);
        
        // Update the unit lock status in all courses that contain this unit
        // API response: { success: true, message: "Unit is now locked/unlocked", data: { _id, lock, ... } }
        const newLockStatus = data.data?.lock;
        
        Object.keys(state.courseDetails).forEach(courseId => {
          if (state.courseDetails[courseId]) {
            const unit = state.courseDetails[courseId].find(u => u._id === unitId);
            if (unit) {
              console.log('✅ Updating unit lock status from', unit.lock, 'to', newLockStatus);
              unit.lock = newLockStatus;
            }
          }
        });
      })
      .addCase(toggleUnitLock.rejected, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = action.payload;
        console.log('❌ Unit lock toggle failed:', action.payload);
      });
  },
});

export const { 
  clearError, 
  toggleCourseExpansion,
  toggleUnitExpansion,
  updateLessonLockStatusOptimistic,
  updateUnitLockStatusOptimistic
} = instructorDashboardSlice.actions;

export default instructorDashboardSlice.reducer;