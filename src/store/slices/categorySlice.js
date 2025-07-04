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
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching categories...');
      
      const response = await api.get('/category/');
      console.log('Categories response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Fetch categories error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch categories');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      console.log('Fetching category by ID:', categoryId);
      
      const response = await api.get(`/category/${categoryId}`);
      console.log('Category by ID response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Fetch category by ID error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch category');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: null,
    totalPages: 1,
    totalCategories: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

// Category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.data || [];
        state.pagination = action.payload.pagination || initialState.pagination;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.categories = [];
      })
      
      // Fetch Category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCategory = action.payload.data || null;
        state.error = null;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.selectedCategory = null;
      });
  },
});

export const { clearError, clearSelectedCategory, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;