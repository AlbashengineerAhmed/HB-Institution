import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://hb-institution.vercel.app/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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
      config.headers.BearerKey = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Async thunks for API calls
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('Fetching courses with params:', params);
      
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params.category) queryParams.append('category', params.category);
      if (params.search) queryParams.append('search', params.search);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/courses/?${queryString}` : '/courses/';
      
      const response = await api.get(url);
      console.log('Courses response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Fetch courses error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch courses');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId, { rejectWithValue }) => {
    try {
      console.log('Fetching course by ID:', courseId);
      
      const response = await api.get(`/courses/${courseId}`);
      console.log('Course by ID response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Fetch course by ID error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch course details');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const searchCourses = createAsyncThunk(
  'courses/searchCourses',
  async (searchTerm, { rejectWithValue }) => {
    try {
      console.log('Searching courses with term:', searchTerm);
      
      const response = await api.get(`/courses/?search=${encodeURIComponent(searchTerm)}`);
      console.log('Search courses response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Search courses error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to search courses');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCoursesByCategory = createAsyncThunk(
  'courses/fetchCoursesByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      console.log('Fetching courses by category:', categoryId);
      
      const response = await api.get(`/courses/?category=${categoryId}`);
      console.log('Courses by category response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Fetch courses by category error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch courses by category');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  courses: [],
  selectedCourse: null,
  filteredCourses: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedCategory: 'all',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCourses: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

// Course slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    filterCourses: (state) => {
      let filtered = [...state.courses];
      
      // Filter by search term
      if (state.searchTerm) {
        filtered = filtered.filter(course =>
          course.title?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          course.description?.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
      
      // Filter by category
      if (state.selectedCategory && state.selectedCategory !== 'all') {
        filtered = filtered.filter(course =>
          course.CategoryId?._id === state.selectedCategory
        );
      }
      
      state.filteredCourses = filtered;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.filteredCourses = [...state.courses];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.data || [];
        state.filteredCourses = action.payload.data || [];
        state.pagination = action.payload.pagination || initialState.pagination;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.courses = [];
        state.filteredCourses = [];
      })
      
      // Fetch Course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCourse = action.payload.data || null;
        state.error = null;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.selectedCourse = null;
      })
      
      // Search Courses
      .addCase(searchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredCourses = action.payload.data || [];
        state.error = null;
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Courses by Category
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredCourses = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSelectedCourse, 
  setSelectedCourse, 
  setSearchTerm, 
  setSelectedCategory, 
  filterCourses, 
  clearFilters 
} = courseSlice.actions;

export default courseSlice.reducer;