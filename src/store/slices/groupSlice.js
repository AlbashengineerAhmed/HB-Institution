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
      // Ensure token starts with Bearer
      const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      config.headers.authorization = bearerToken;
      console.log('Token being sent:', bearerToken);
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// AVAILABLE API METHODS - Only create and update are working
export const fetchInstructors = createAsyncThunk(
  'groups/fetchInstructors',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching instructors from:', `${API_BASE_URL}/user/instructors`);
      const response = await api.get('/user/instructors');
      console.log('Instructors response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching instructors:', error);
      const errorMessage = getErrorMessage(error, 'Failed to fetch instructors');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      console.log('Creating group with data:', groupData);
      const response = await api.post('/group', groupData);
      console.log('Create group response:', response.data);
      toast.success('Group created successfully!');
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      const errorMessage = getErrorMessage(error, 'Failed to create group');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async ({ groupId, groupData }, { rejectWithValue }) => {
    try {
      console.log('Updating group:', groupId, 'with data:', groupData);
      const response = await api.put(`/group/${groupId}`, groupData);
      console.log('Update group response:', response.data);
      toast.success('Group updated successfully!');
      return { groupId, data: response.data };
    } catch (error) {
      console.error('Error updating group:', error);
      const errorMessage = getErrorMessage(error, 'Failed to update group');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  groups: [], // Will be populated when fetch methods are available
  instructors: [],
  selectedGroup: null,
  filteredGroups: [],
  isLoading: false,
  instructorsLoading: false,
  error: null,
  searchTerm: '',
  selectedCourse: 'all',
  selectedInstructor: 'all',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalGroups: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

// Group slice
const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedGroup: (state) => {
      state.selectedGroup = null;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setSelectedInstructor: (state, action) => {
      state.selectedInstructor = action.payload;
    },
    filterGroups: (state) => {
      let filtered = [...state.groups];
      
      // Filter by search term
      if (state.searchTerm) {
        filtered = filtered.filter(group =>
          group.code?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          group.level?.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
      
      // Filter by course
      if (state.selectedCourse && state.selectedCourse !== 'all') {
        filtered = filtered.filter(group =>
          group.courseId === state.selectedCourse
        );
      }
      
      // Filter by instructor
      if (state.selectedInstructor && state.selectedInstructor !== 'all') {
        filtered = filtered.filter(group =>
          group.instructorId === state.selectedInstructor
        );
      }
      
      state.filteredGroups = filtered;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCourse = 'all';
      state.selectedInstructor = 'all';
      state.filteredGroups = [...state.groups];
    },
    // Manual group management for demo purposes until fetch methods are available
    addGroupToState: (state, action) => {
      const newGroup = action.payload;
      state.groups.push(newGroup);
      state.filteredGroups.push(newGroup);
    },
    updateGroupInState: (state, action) => {
      const { groupId, groupData } = action.payload;
      const groupIndex = state.groups.findIndex(group => 
        (group.id || group._id) === groupId
      );
      if (groupIndex !== -1) {
        state.groups[groupIndex] = { ...state.groups[groupIndex], ...groupData };
      }
      const filteredIndex = state.filteredGroups.findIndex(group => 
        (group.id || group._id) === groupId
      );
      if (filteredIndex !== -1) {
        state.filteredGroups[filteredIndex] = { ...state.filteredGroups[filteredIndex], ...groupData };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Instructors
      .addCase(fetchInstructors.pending, (state) => {
        state.instructorsLoading = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.instructorsLoading = false;
        // Handle different response structures
        const instructorsData = action.payload.data || action.payload.instructors || action.payload;
        state.instructors = Array.isArray(instructorsData) ? instructorsData : [];
        console.log('Instructors stored in state:', state.instructors);
        state.error = null;
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.instructorsLoading = false;
        state.error = action.payload;
        state.instructors = [];
        console.error('Failed to fetch instructors:', action.payload);
      })
      
      // Create Group
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        const newGroup = action.payload.group || action.payload.data || action.payload;
        if (newGroup) {
          state.groups.push(newGroup);
          state.filteredGroups.push(newGroup);
        }
        state.error = null;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update Group
      .addCase(updateGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        const { groupId, data } = action.payload;
        const updatedGroup = data.group || data.data || data;
        
        if (updatedGroup) {
          // Update in groups array
          const groupIndex = state.groups.findIndex(group => 
            (group.id || group._id) === groupId
          );
          if (groupIndex !== -1) {
            state.groups[groupIndex] = updatedGroup;
          }
          
          // Update in filtered groups array
          const filteredIndex = state.filteredGroups.findIndex(group => 
            (group.id || group._id) === groupId
          );
          if (filteredIndex !== -1) {
            state.filteredGroups[filteredIndex] = updatedGroup;
          }
        }
        state.error = null;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSelectedGroup, 
  setSelectedGroup, 
  setSearchTerm, 
  setSelectedCourse,
  setSelectedInstructor,
  filterGroups, 
  clearFilters,
  addGroupToState,
  updateGroupInState
} = groupSlice.actions;

export default groupSlice.reducer;