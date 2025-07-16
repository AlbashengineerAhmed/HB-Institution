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
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
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
        state.units = state.units.filter(unit => unit._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUnits, setSelectedCourse, clearError } = unitSlice.actions;
export default unitSlice.reducer;