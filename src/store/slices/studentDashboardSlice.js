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

// Fetch units data using group ID and course ID
export const fetchUnitsData = createAsyncThunk(
  'studentDashboard/fetchUnitsData',
  async ({ groupId, courseId }, { rejectWithValue }) => {
    try {
      console.log(`🔍 Fetching units data for group: ${groupId}, course: ${courseId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/unit/${groupId}/Units_Status/${courseId}`);
      const response = await api.get(`/unit/${groupId}/Units_Status/${courseId}`);
      console.log('✅ Units data:', response.data);
      return { groupId, courseId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch units data');
      console.error('❌ Failed to fetch units data:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch lessons data using group ID and unit ID
export const fetchLessonsData = createAsyncThunk(
  'studentDashboard/fetchLessonsData',
  async ({ groupId, unitId }, { rejectWithValue }) => {
    try {
      console.log(`🔍 Fetching lessons data for group: ${groupId}, unit: ${unitId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/lesson/${groupId}/status/${unitId}`);
      const response = await api.get(`/lesson/${groupId}/status/${unitId}`);
      console.log('✅ Lessons data:', response.data);
      return { groupId, unitId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch lessons data');
      console.error('❌ Failed to fetch lessons data:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Get lesson details
export const getLessonDetails = createAsyncThunk(
  'studentDashboard/getLessonDetails',
  async ({ lessonId }, { rejectWithValue }) => {
    try {
      console.log(`🔍 Fetching lesson details for: ${lessonId}`);
      const response = await api.get(`/lesson/${lessonId}`);
      console.log('✅ Lesson details fetched:', response.data);
      return { lessonId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch lesson details');
      console.error('❌ Failed to fetch lesson details:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  // Dashboard data
  courses: [],
  
  // Units data
  units: [],
  isLoadingUnits: false,
  unitsError: null,
  
  // Lessons data
  lessons: [],
  isLoadingLessons: false,
  lessonsError: null,
  
  // Lesson details
  selectedLessonDetails: null,
  isLoadingLessonDetails: false,
  lessonDetailsError: null,
  
  // Loading states
  isLoading: false,
  
  // Error states
  error: null,
  
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
      state.lessonDetailsError = null;
    },
    
    clearLessonDetails: (state) => {
      state.selectedLessonDetails = null;
      state.lessonDetailsError = null;
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
      
      // Get Lesson Details
      .addCase(getLessonDetails.pending, (state) => {
        state.isLoadingLessonDetails = true;
        state.lessonDetailsError = null;
      })
      .addCase(getLessonDetails.fulfilled, (state, action) => {
        state.isLoadingLessonDetails = false;
        state.selectedLessonDetails = action.payload.data;
        state.lessonDetailsError = null;
      })
      .addCase(getLessonDetails.rejected, (state, action) => {
        state.isLoadingLessonDetails = false;
        state.lessonDetailsError = action.payload;
        state.selectedLessonDetails = null;
      })
      
      // Fetch Units Data
      .addCase(fetchUnitsData.pending, (state) => {
        state.isLoadingUnits = true;
        state.unitsError = null;
      })
      .addCase(fetchUnitsData.fulfilled, (state, action) => {
        state.isLoadingUnits = false;
        state.units = action.payload.data.units || [];
        state.unitsError = null;
      })
      .addCase(fetchUnitsData.rejected, (state, action) => {
        state.isLoadingUnits = false;
        state.unitsError = action.payload;
        state.units = [];
      })
      
      // Fetch Lessons Data
      .addCase(fetchLessonsData.pending, (state) => {
        state.isLoadingLessons = true;
        state.lessonsError = null;
      })
      .addCase(fetchLessonsData.fulfilled, (state, action) => {
        state.isLoadingLessons = false;
        state.lessons = action.payload.data.lessons || [];
        state.lessonsError = null;
      })
      .addCase(fetchLessonsData.rejected, (state, action) => {
        state.isLoadingLessons = false;
        state.lessonsError = action.payload;
        state.lessons = [];
      });
  },
});

export const { 
  clearError, 
  clearLessonDetails,
  toggleCourseExpansion,
  toggleUnitExpansion,
  setSelectedCourse,
  setSelectedUnit,
  setSelectedLesson
} = studentDashboardSlice.actions;

export default studentDashboardSlice.reducer;