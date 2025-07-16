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
  const errorData = error.response?.data;
  
  if (errorData) {
    // Handle the specific case where errMas is "[object Object]"
    if (errorData.errMas === "[object Object]") {
      return 'Server error: Unable to process the request. Please check your data format.';
    }
    
    // If errMas is an object, try to extract meaningful info
    if (errorData.errMas && typeof errorData.errMas === 'object') {
      return errorData.errMas.message || 
             errorData.errMas.error || 
             JSON.stringify(errorData.errMas) || 
             defaultMessage;
    }
    
    // Try different message fields
    return errorData.errMas || 
           errorData.message || 
           errorData.messege || 
           errorData.error ||
           defaultMessage;
  }
  
  return error.message || defaultMessage;
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
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
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/category/');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch categories');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      // Validate required fields
      if (!categoryData.name || !categoryData.description) {
        const error = 'Name and description are required';
        toast.error(error);
        return rejectWithValue(error);
      }
      
      // Validate name and description are strings and not empty
      if (typeof categoryData.name !== 'string' || categoryData.name.trim() === '') {
        const error = 'Category name must be a non-empty string';
        toast.error(error);
        return rejectWithValue(error);
      }
      
      if (typeof categoryData.description !== 'string' || categoryData.description.trim() === '') {
        const error = 'Category description must be a non-empty string';
        toast.error(error);
        return rejectWithValue(error);
      }
      
      // Check if token exists before creating FormData
      const token = localStorage.getItem('authToken');
      if (!token) {
        const error = 'Authentication token not found. Please login again.';
        toast.error(error);
        return rejectWithValue(error);
      }
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', categoryData.name.trim());
      formData.append('description', categoryData.description.trim());
      
      if (categoryData.image) {
        formData.append('image', categoryData.image);
      }
      
      const response = await api.post('/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success('Category created successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to create category');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await api.delete(`/category/${categoryId}`);
      toast.success('Category deleted successfully!');
      return categoryId;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to delete category');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/category/${categoryId}`);
      return response.data;
    } catch (error) {
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
      
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data) {
          state.categories.push(action.payload.data);
        }
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          category => category._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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