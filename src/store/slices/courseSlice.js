import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../../config/api';

/**
 * Creates axios instance with base configuration for course-related API calls
 * Sets default headers and base URL for all course requests
 */
const api = axios.create(API_CONFIG);

/**
 * Helper function to extract error message from backend response
 * Checks multiple possible error message fields and returns appropriate message
 * @param {Object} error - The error object from axios
 * @param {string} defaultMessage - Default message if no specific error found
 * @returns {string} - Formatted error message
 */
const getErrorMessage = (error, defaultMessage = 'An error occurred') => {
  return error.response?.data?.errMas || 
         error.response?.data?.message || 
         error.response?.data?.messege || 
         error.response?.data?.error ||
         error.message ||
         defaultMessage;
};

/**
 * Request interceptor to add authentication token to requests
 * Automatically adds Bearer token to authorization header if available
 */
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

/**
 * Response interceptor for error handling
 * Passes through successful responses and rejects errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

/**
 * Async thunk to fetch courses with optional filtering parameters
 * Supports pagination, category filtering, and search functionality
 * @param {Object} params - Query parameters including category, search, page, limit
 * @returns {Promise} - Course data with pagination information
 */
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.category) queryParams.append('category', params.category);
      if (params.search) queryParams.append('search', params.search);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/courses/?${queryString}` : '/courses/';
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch courses');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to fetch a specific course by its ID
 * Retrieves detailed information about a single course
 * @param {string} courseId - The unique identifier of the course
 * @returns {Promise} - Detailed course data
 */
export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch course details');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to search courses by search term
 * Performs text-based search across course titles and descriptions
 * @param {string} searchTerm - The search query string
 * @returns {Promise} - Filtered course results matching search term
 */
export const searchCourses = createAsyncThunk(
  'courses/searchCourses',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/?search=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to search courses');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to fetch courses filtered by category
 * Retrieves all courses belonging to a specific category
 * @param {string} categoryId - The unique identifier of the category
 * @returns {Promise} - Courses belonging to the specified category
 */
export const fetchCoursesByCategory = createAsyncThunk(
  'courses/fetchCoursesByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/?category=${categoryId}`);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch courses by category');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to create a new course
 * Creates a new course with provided data including file upload support
 * @param {Object} data - Object containing categoryId and courseData
 * @param {string} data.categoryId - The category ID to assign the course to
 * @param {Object} data.courseData - Course information including title, description, price, etc.
 * @returns {Promise} - Created course data
 */
export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async ({ categoryId, courseData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('price', courseData.price);
      formData.append('duration', courseData.duration);
      
      // Handle multiple levels
      if (courseData.levels && Array.isArray(courseData.levels)) {
        courseData.levels.forEach(level => {
          formData.append('levels', level);
        });
      }
      
      if (courseData.image) {
        formData.append('image', courseData.image);
      }
      
      const response = await api.post(`/courses/${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success('Course created successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to create course');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to delete a course
 * Removes a course from the system permanently
 * @param {string} courseId - The unique identifier of the course to delete
 * @returns {Promise} - Confirmation of deletion with course ID
 */
export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/courses/${courseId}`);
      toast.success('Course deleted successfully!');
      return { courseId, data: response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to delete course');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Initial state for course slice
 * Defines default values for all course-related state properties
 */
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

/**
 * Course slice with reducers and extra reducers for async actions
 * Manages course state including filtering, searching, and CRUD operations
 */
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    /**
     * Clears any error messages from state
     * Used to reset error state after displaying to user
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Clears the currently selected course
     * Resets selectedCourse to null
     */
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
    /**
     * Sets the currently selected course
     * Updates selectedCourse with provided course data
     */
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    /**
     * Updates the search term for course filtering
     * Sets the search term used for filtering courses
     */
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    /**
     * Updates the selected category for course filtering
     * Sets the category used for filtering courses
     */
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    /**
     * Filters courses based on current search term and category
     * Applies both text search and category filtering to course list
     */
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
    /**
     * Clears all applied filters
     * Resets search term and category to default values
     */
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.filteredCourses = [...state.courses];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses cases
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
      
      // Fetch Course by ID cases
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
      
      // Search Courses cases
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
      
      // Fetch Courses by Category cases
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
      })
      
      // Create Course cases
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const newCourse = action.payload.course || action.payload.data;
        if (newCourse) {
          state.courses.push(newCourse);
          state.filteredCourses.push(newCourse);
        }
        state.error = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Delete Course cases
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedCourseId = action.payload.courseId;
        // Remove the deleted course from both arrays
        state.courses = state.courses.filter(course => 
          (course.id || course._id) !== deletedCourseId
        );
        state.filteredCourses = state.filteredCourses.filter(course => 
          (course.id || course._id) !== deletedCourseId
        );
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
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