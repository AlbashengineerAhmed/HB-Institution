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
    if (token) {
      const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      config.headers.authorization = bearerToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// Async thunks for API calls
export const fetchLessons = createAsyncThunk(
  'lessons/fetchLessons',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params.unitId) queryParams.append('unitId', params.unitId);
      if (params.search) queryParams.append('search', params.search);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/lesson/?${queryString}` : '/lesson/';
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch lessons');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchLessonById = createAsyncThunk(
  'lessons/fetchLessonById',
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/lesson/${lessonId}`);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch lesson details');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createLesson = createAsyncThunk(
  'lessons/createLesson',
  async (lessonData, { rejectWithValue }) => {
    try {
      console.log('🚀 Creating lesson - Request data:', lessonData);
      console.log('🚀 API endpoint:', `${API_BASE_URL}/lesson/`);
      console.log('🚀 Request headers will include:', {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authToken')?.substring(0, 27) + '...'
      });
      
      const response = await api.post('/lesson/', lessonData);
      console.log('✅ Create lesson - Success response:', response);
      console.log('✅ Response data:', response.data);
      console.log('✅ Response status:', response.status);
      
      toast.success('Lesson created successfully!');
      return response.data;
    } catch (error) {
      console.error('❌ ========== CREATE LESSON ERROR ==========');
      console.error('❌ Full error object:', error);
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
      
      if (error.response) {
        console.error('❌ Response error details:');
        console.error('❌ Status:', error.response.status);
        console.error('❌ Status text:', error.response.statusText);
        console.error('❌ Headers:', error.response.headers);
        console.error('❌ Data:', error.response.data);
        
        // Try to parse and log specific validation errors
        if (error.response.data) {
          console.error('❌ Response data details:');
          console.error('❌ Error message:', error.response.data.message);
          console.error('❌ Error details:', error.response.data.error);
          console.error('❌ Validation errors:', error.response.data.errors);
          console.error('❌ Full response data:', JSON.stringify(error.response.data, null, 2));
        }
      } else if (error.request) {
        console.error('❌ Request error (no response received):');
        console.error('❌ Request:', error.request);
      } else {
        console.error('❌ Setup error:', error.message);
      }
      
      // Log the request configuration
      if (error.config) {
        console.error('❌ Request configuration:');
        console.error('❌ Method:', error.config.method);
        console.error('❌ URL:', error.config.url);
        console.error('❌ Base URL:', error.config.baseURL);
        console.error('❌ Headers:', error.config.headers);
        console.error('❌ Data sent:', error.config.data);
        console.error('❌ Full config:', error.config);
      }
      
      const errorMessage = getErrorMessage(error, 'Failed to create lesson');
      console.error('❌ Processed error message:', errorMessage);
      console.error('❌ ========================================');
      
      toast.error(errorMessage);
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: error.config,
        fullError: error
      });
    }
  }
);

export const updateLesson = createAsyncThunk(
  'lessons/updateLesson',
  async ({ lessonId, lessonData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/lesson/${lessonId}`, lessonData);
      toast.success('Lesson updated successfully!');
      return { lessonId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to update lesson');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'lessons/deleteLesson',
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/lesson/${lessonId}`);
      toast.success('Lesson deleted successfully!');
      return { lessonId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to delete lesson');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  lessons: [],
  selectedLesson: null,
  filteredLessons: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedUnit: 'all',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalLessons: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

// Lesson slice
const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedLesson: (state) => {
      state.selectedLesson = null;
    },
    setSelectedLesson: (state, action) => {
      state.selectedLesson = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
    },
    filterLessons: (state) => {
      let filtered = [...state.lessons];
      
      // Filter by search term
      if (state.searchTerm) {
        filtered = filtered.filter(lesson =>
          lesson.title?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          lesson.description?.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
      
      // Filter by unit
      if (state.selectedUnit && state.selectedUnit !== 'all') {
        filtered = filtered.filter(lesson =>
          lesson.unitId === state.selectedUnit
        );
      }
      
      state.filteredLessons = filtered;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedUnit = 'all';
      state.filteredLessons = [...state.lessons];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Lessons
      .addCase(fetchLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lessons = action.payload.data || [];
        state.filteredLessons = action.payload.data || [];
        state.pagination = action.payload.pagination || initialState.pagination;
        state.error = null;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.lessons = [];
        state.filteredLessons = [];
      })
      
      // Fetch Lesson by ID
      .addCase(fetchLessonById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedLesson = action.payload.data || null;
        state.error = null;
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.selectedLesson = null;
      })
      
      // Create Lesson
      .addCase(createLesson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        const newLesson = action.payload.lesson || action.payload.data;
        if (newLesson) {
          state.lessons.push(newLesson);
          state.filteredLessons.push(newLesson);
        }
        state.error = null;
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error('Redux state - Create lesson rejected with payload:', action.payload);
      })
      
      // Update Lesson
      .addCase(updateLesson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lessonId, data } = action.payload;
        const updatedLesson = data.lesson || data.data;
        
        if (updatedLesson) {
          // Update in lessons array
          const lessonIndex = state.lessons.findIndex(lesson => 
            (lesson.id || lesson._id) === lessonId
          );
          if (lessonIndex !== -1) {
            state.lessons[lessonIndex] = updatedLesson;
          }
          
          // Update in filtered lessons array
          const filteredIndex = state.filteredLessons.findIndex(lesson => 
            (lesson.id || lesson._id) === lessonId
          );
          if (filteredIndex !== -1) {
            state.filteredLessons[filteredIndex] = updatedLesson;
          }
        }
        state.error = null;
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Delete Lesson
      .addCase(deleteLesson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedLessonId = action.payload.lessonId;
        // Remove the deleted lesson from both arrays
        state.lessons = state.lessons.filter(lesson => 
          (lesson.id || lesson._id) !== deletedLessonId
        );
        state.filteredLessons = state.filteredLessons.filter(lesson => 
          (lesson.id || lesson._id) !== deletedLessonId
        );
        state.error = null;
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSelectedLesson, 
  setSelectedLesson, 
  setSearchTerm, 
  setSelectedUnit, 
  filterLessons, 
  clearFilters 
} = lessonSlice.actions;

export default lessonSlice.reducer;