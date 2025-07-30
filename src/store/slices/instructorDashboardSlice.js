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

// Get units status for specific group
export const fetchCourseUnits = createAsyncThunk(
  'instructorDashboard/fetchCourseUnits',
  async ({ groupId, courseId }, { rejectWithValue }) => {
    try {
      console.log(`🔍 Fetching units status for group: ${groupId} and course: ${courseId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/unit/${groupId}/Units_Status/${courseId}`);
      const response = await api.get(`/unit/${groupId}/Units_Status/${courseId}`);
      console.log('✅ Units status:', response.data);
      return { groupId, courseId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch units status');
      console.error('❌ Failed to fetch units status:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Get lessons for specific group
export const fetchUnitLessons = createAsyncThunk(
  'instructorDashboard/fetchUnitLessons',
  async ({ groupId, unitId }, { rejectWithValue }) => {
    try {
      console.log(`🔍 Fetching lessons for group: ${groupId} and unit: ${unitId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/lesson/${groupId}/status/${unitId}`);
      const response = await api.get(`/lesson/${groupId}/status/${unitId}`);
      console.log('✅ Unit lessons:', response.data);
      return { groupId, unitId, data: response.data };
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
  async ({ lessonId, groupId }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Toggling lesson lock status: ${lessonId} for group: ${groupId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/lesson/${lessonId}/toggle-access/${groupId}`);
      const response = await api.patch(`/lesson/${lessonId}/toggle-access/${groupId}`);
      console.log('✅ Lesson lock status toggled:', response.data);
      toast.success(response.data.message);
      return { lessonId, groupId, data: response.data };
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
  async ({ unitId, groupId }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Toggling unit lock status: ${unitId} for group: ${groupId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/unit/${unitId}/toggle_Access/${groupId}`);
      const response = await api.patch(`/unit/${unitId}/toggle_Access/${groupId}`);
      console.log('✅ Unit lock status toggled - Full response:', response.data);
      console.log('✅ Unit lock status - Data field:', response.data.data);
      console.log('✅ Unit lock status - Unlocked value:', response.data.data?.unlocked);
      toast.success(response.data.message);
      return { unitId, groupId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to toggle unit lock status');
      console.error('❌ Failed to toggle unit lock status:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Mark lesson as completed
export const markLessonAsCompleted = createAsyncThunk(
  'instructorDashboard/markLessonAsCompleted',
  async ({ lessonId, groupId }, { rejectWithValue, dispatch, getState }) => {
    try {
      console.log(`🔄 Marking lesson as completed: ${lessonId} for group: ${groupId}`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/lesson/${lessonId}/complete/${groupId}`);
      const response = await api.patch(`/lesson/${lessonId}/complete/${groupId}`);
      console.log('✅ Lesson marked as completed:', response.data);
      
      if (response.data.success) {
        const nextLesson = response.data.data?.nextLessonUnlocked;
        const message = nextLesson 
          ? `Lesson completed! Next lesson "${nextLesson.title}" has been unlocked.`
          : 'Lesson marked as completed successfully!';
        toast.success(message);
        
        // Refresh lessons data to show updated unlock status
        const state = getState();
        const unitLessons = state.instructorDashboard.unitLessons;
        
        // Find which unit contains this lesson and refresh its data
        for (const [unitId, lessons] of Object.entries(unitLessons)) {
          if (Array.isArray(lessons) && lessons.some(l => l.id === lessonId)) {
            console.log('🔄 Refreshing lessons for unit:', unitId);
            dispatch(fetchUnitLessons({ groupId, unitId }));
            break;
          }
        }
      }
      
      return { lessonId, groupId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to mark lesson as completed');
      console.error('❌ Failed to mark lesson as completed:', error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Refresh units and lessons data after completion
export const refreshUnitsAndLessons = createAsyncThunk(
  'instructorDashboard/refreshUnitsAndLessons',
  async ({ groupId, courseId, unitId }, { dispatch, rejectWithValue }) => {
    try {
      console.log('🔄 Refreshing units and lessons data...');
      
      // Refresh units data
      if (courseId) {
        await dispatch(fetchCourseUnits({ groupId, courseId }));
      }
      
      // Refresh lessons data
      if (unitId) {
        await dispatch(fetchUnitLessons({ groupId, unitId }));
      }
      
      console.log('✅ Units and lessons data refreshed');
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to refresh units and lessons:', error);
      return rejectWithValue('Failed to refresh data');
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
      const { unitId, lessonId, isUnlocked } = action.payload;
      if (state.unitLessons[unitId] && Array.isArray(state.unitLessons[unitId])) {
        const lesson = state.unitLessons[unitId].find(l => l.id === lessonId);
        if (lesson) {
          lesson.unlocked = isUnlocked;
        }
      }
    },

    // Optimistic update for unit lock status
    updateUnitLockStatusOptimistic: (state, action) => {
      const { courseId, unitId, isUnlocked } = action.payload;
      console.log('🔄 Optimistic update - courseId:', courseId, 'unitId:', unitId, 'isUnlocked:', isUnlocked);
      if (state.courseDetails[courseId]) {
        const unit = state.courseDetails[courseId].find(u => u.id === unitId);
        if (unit) {
          console.log('🔄 Found unit, updating unlock status from', unit.unlocked, 'to', isUnlocked);
          unit.unlocked = isUnlocked;
        } else {
          console.log('❌ Unit not found in courseDetails');
        }
      } else {
        console.log('❌ Course not found in courseDetails');
      }
    },

    // Update lesson completion status
    updateLessonCompletionStatus: (state, action) => {
      const { lessonId, completed, nextLessonId } = action.payload;
      
      // Mark the completed lesson
      Object.keys(state.unitLessons).forEach(unitId => {
        if (Array.isArray(state.unitLessons[unitId])) {
          const lesson = state.unitLessons[unitId].find(l => l.id === lessonId);
          if (lesson) {
            lesson.completed = completed;
          }
          
          // Unlock the next lesson if provided
          if (nextLessonId) {
            const nextLesson = state.unitLessons[unitId].find(l => l.id === nextLessonId);
            if (nextLesson) {
              nextLesson.unlocked = true;
            }
          }
        }
      });
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
        state.courseDetails[courseId] = data.units || data.data || data;
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
        state.unitLessons[unitId] = data.lessons || data.data || data;
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
        const { lessonId, groupId, data } = action.payload;
        
        console.log('✅ Lesson lock toggle successful - lessonId:', lessonId, 'groupId:', groupId);
        console.log('✅ Response data:', data);
        console.log('✅ New unlocked status:', data.data?.unlocked);
        
        // Update the lesson lock status in all units that contain this lesson
        const newUnlockedStatus = data.data?.unlocked;
        
        Object.keys(state.unitLessons).forEach(unitId => {
          if (Array.isArray(state.unitLessons[unitId])) {
            const lesson = state.unitLessons[unitId].find(l => l.id === lessonId);
            if (lesson) {
              lesson.unlocked = newUnlockedStatus;
              console.log('✅ Updated lesson unlock status - unlocked:', newUnlockedStatus);
            }
          }
        });
      })
      .addCase(toggleLessonLock.rejected, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = action.payload;
        console.log('❌ Lesson lock toggle failed:', action.payload);
      })
      
      // Toggle Unit Lock
      .addCase(toggleUnitLock.pending, (state) => {
        state.isUpdatingLock = true;
        state.lockError = null;
      })
      .addCase(toggleUnitLock.fulfilled, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = null;
        const { unitId, groupId, data } = action.payload;
        
        console.log('✅ Unit lock toggle successful - unitId:', unitId, 'groupId:', groupId);
        console.log('✅ Response data:', data);
        console.log('✅ New unlocked status:', data.data?.unlocked);
        
        // Update the unit lock status in all courses that contain this unit
        const newUnlockedStatus = data.data?.unlocked;
        
        Object.keys(state.courseDetails).forEach(courseId => {
          if (state.courseDetails[courseId]) {
            const unit = state.courseDetails[courseId].find(u => u.id === unitId);
            if (unit) {
              unit.unlocked = newUnlockedStatus;
              console.log('✅ Updated unit unlock status - unlocked:', newUnlockedStatus);
            }
          }
        });
      })
      .addCase(toggleUnitLock.rejected, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = action.payload;
        console.log('❌ Unit lock toggle failed:', action.payload);
      })
      
      // Mark Lesson as Completed
      .addCase(markLessonAsCompleted.pending, (state) => {
        state.isUpdatingLock = true;
        state.lockError = null;
      })
      .addCase(markLessonAsCompleted.fulfilled, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = null;
        const { lessonId, groupId, data } = action.payload;
        
        console.log('✅ Lesson marked as completed - lessonId:', lessonId, 'groupId:', groupId);
        console.log('✅ Response data:', data);
        
        // Update lesson completion status immediately
        if (data.success) {
          // Mark the completed lesson
          Object.keys(state.unitLessons).forEach(unitId => {
            if (Array.isArray(state.unitLessons[unitId])) {
              const lesson = state.unitLessons[unitId].find(l => l.id === lessonId);
              if (lesson) {
                lesson.completed = true;
                console.log('✅ Marked lesson as completed in state - lessonId:', lessonId);
              }
            }
          });

          // If there's a next lesson that was unlocked, update it
          if (data.data?.nextLessonUnlocked) {
            const nextLesson = data.data.nextLessonUnlocked;
            console.log('✅ Next lesson unlocked:', nextLesson);
            
            Object.keys(state.unitLessons).forEach(unitId => {
              if (Array.isArray(state.unitLessons[unitId])) {
                const lesson = state.unitLessons[unitId].find(l => l.id === nextLesson.id);
                if (lesson) {
                  lesson.unlocked = true;
                  console.log('✅ Updated next lesson unlock status - lessonId:', nextLesson.id, 'unlocked: true');
                }
              }
            });
          }
        }
      })
      .addCase(markLessonAsCompleted.rejected, (state, action) => {
        state.isUpdatingLock = false;
        state.lockError = action.payload;
        console.log('❌ Mark lesson as completed failed:', action.payload);
      })
      
      // Refresh Units and Lessons
      .addCase(refreshUnitsAndLessons.pending, (state) => {
        // Don't show loading for refresh operations
      })
      .addCase(refreshUnitsAndLessons.fulfilled, (state, action) => {
        console.log('✅ Units and lessons refreshed successfully');
      })
      .addCase(refreshUnitsAndLessons.rejected, (state, action) => {
        console.log('❌ Failed to refresh units and lessons:', action.payload);
      });
  },
});

export const { 
  clearError, 
  toggleCourseExpansion,
  toggleUnitExpansion,
  updateLessonLockStatusOptimistic,
  updateUnitLockStatusOptimistic,
  updateLessonCompletionStatus
} = instructorDashboardSlice.actions;

export default instructorDashboardSlice.reducer;