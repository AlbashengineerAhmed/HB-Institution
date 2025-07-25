import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from '../../config/api';

/**
 * Creates axios instance with base configuration for unit-related API calls
 * Sets default headers and base URL for all unit requests
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
 * Async thunk to fetch units for a specific course
 * Retrieves all units belonging to a course
 * @param {string} courseId - The ID of the course to fetch units for
 * @returns {Promise} - Units data for the specified course
 */
export const fetchUnits = createAsyncThunk(
  'units/fetchUnits',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/unit/course/${courseId}`);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch units');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to fetch a specific unit by ID with its lessons
 * Retrieves detailed unit information including associated lessons
 * @param {string} unitId - The ID of the unit to fetch
 * @returns {Promise} - Unit details with lessons data
 */
export const fetchUnitById = createAsyncThunk(
  'units/fetchUnitById',
  async (unitId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/unit/${unitId}`);
      return { unitId, ...response.data };
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to fetch unit details');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to create a new unit for a course
 * Creates a unit with the provided data and associates it with a course
 * @param {Object} params - Object containing courseId and unitData
 * @param {string} params.courseId - The ID of the course to create the unit for
 * @param {Object} params.unitData - Unit data including title, description, etc.
 * @returns {Promise} - Created unit data
 */
export const createUnit = createAsyncThunk(
  'units/createUnit',
  async ({ courseId, unitData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/unit/${courseId}`, unitData);
      toast.success('Unit created successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to create unit');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to update an existing unit
 * Updates unit data with the provided information
 * @param {Object} params - Object containing unitId and unitData
 * @param {string} params.unitId - The ID of the unit to update
 * @param {Object} params.unitData - Updated unit data
 * @returns {Promise} - Updated unit data
 */
export const updateUnit = createAsyncThunk(
  'units/updateUnit',
  async ({ unitId, unitData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/unit/course/${unitId}`, unitData);
      toast.success('Unit updated successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to update unit');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to delete a unit
 * Removes a unit from the system permanently
 * @param {string} unitId - The ID of the unit to delete
 * @returns {Promise} - The deleted unit ID
 */
export const deleteUnit = createAsyncThunk(
  'units/deleteUnit',
  async (unitId, { rejectWithValue }) => {
    try {
      await api.delete(`/unit/${unitId}`);
      toast.success('Unit deleted successfully!');
      return unitId;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to delete unit');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  units: [],
  selectedUnit: null,
  unitLessons: {}, // Store lessons for each unit by unitId
  loading: false,
  error: null,
  selectedCourse: null,
};

const unitSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    clearUnits: (state) => {
      state.units = [];
      state.unitLessons = {};
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch units
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.units = [];
      })
      
      // Fetch unit by ID with lessons
      .addCase(fetchUnitById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnitById.fulfilled, (state, action) => {
        state.loading = false;
        const { unitId, data } = action.payload;
        
        if (data && data.unit) {
          state.selectedUnit = data.unit;
          // Store lessons for this unit
          state.unitLessons[unitId] = data.lessons || [];
        }
        state.error = null;
      })
      .addCase(fetchUnitById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedUnit = null;
      })
      
      // Create unit
      .addCase(createUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.units.push(action.payload.data);
        }
        state.error = null;
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update unit
      .addCase(updateUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUnit = action.payload.data || action.payload;
        const index = state.units.findIndex(unit => unit._id === updatedUnit._id);
        if (index !== -1) {
          state.units[index] = updatedUnit;
        }
        state.error = null;
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete unit
      .addCase(deleteUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUnitId = action.payload;
        state.units = state.units.filter(unit => unit._id !== deletedUnitId);
        // Remove lessons for deleted unit
        delete state.unitLessons[deletedUnitId];
        state.error = null;
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUnits, setSelectedCourse, setSelectedUnit, clearError } = unitSlice.actions;
export default unitSlice.reducer;