import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://hb-institution.vercel.app';

// Create dedicated axios instance for enrollment (isolated from other slices)
const enrollmentApi = axios.create({
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

// Request interceptor ONLY for enrollment API - very specific token handling
enrollmentApi.interceptors.request.use(
  (config) => {
    console.log('🔍 Enrollment API Request:', config.method?.toUpperCase(), config.url);
    
    // Only add Bearer token for specific endpoints that require authentication
    const protectedEndpoints = [
      '/api/v1/courses/enroll'
    ];
    
    // Check if URL matches protected endpoint patterns
    const protectedPatterns = [
      /^\/api\/v1\/courses\/CourseLevel\/[^\/]+\/[^\/]+$/, // /api/v1/courses/CourseLevel/{level}/{courseId}
      /^\/api\/v1\/courses\/[^\/]+\/[^\/]+\/[^\/]+$/ // /api/v1/courses/{level}/{courseId}/{instructorId}
    ];
    
    const needsToken = protectedEndpoints.includes(config.url) || 
                      protectedPatterns.some(pattern => pattern.test(config.url));
    
    if (needsToken) {
      const token = localStorage.getItem('authToken');
      if (token) {
        const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        config.headers.Authorization = bearerToken;
        console.log('✅ Added Bearer token to protected endpoint:', config.url);
      } else {
        console.log('❌ No token found for protected endpoint:', config.url);
      }
    } else {
      console.log('🔓 Public endpoint - no token needed:', config.url);
      // Explicitly ensure no auth headers are added
      delete config.headers.Authorization;
      delete config.headers.BearerKey;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Async thunks for enrollment API calls

// Step 2: Get levels by course (GET - NO TOKEN REQUIRED)
export const getLevelsByCourse = createAsyncThunk(
  'enrollment/getLevelsByCourse',
  async (courseId, { rejectWithValue }) => {
    try {
      console.log('Fetching levels for course:', courseId);
      
      const response = await enrollmentApi.get(`/api/v1/courses/Get-Level-ByCourse/${courseId}`);
      console.log('Levels response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Get levels error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch course levels');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Step 3: Get instructors by course and level (GET - REQUIRES TOKEN)
// Updated URL format: /api/v1/courses/CourseLevel/{level}/{courseId}
export const getInstructorsByCourseAndLevel = createAsyncThunk(
  'enrollment/getInstructorsByCourseAndLevel',
  async ({ courseId, level }, { rejectWithValue }) => {
    try {
      console.log('Fetching instructors for course and level:', { courseId, level });
      
      // Updated URL format with path parameters
      const response = await enrollmentApi.get(`/api/v1/courses/CourseLevel/${level}/${courseId}`);
      console.log('Instructors response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Get instructors error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch instructors');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Step 4: Get groups by course and instructor (GET - REQUIRES TOKEN)
// Updated URL format: /api/v1/courses/{level}/{courseId}/{instructorId}
export const getGroupsByCourseAndInstructor = createAsyncThunk(
  'enrollment/getGroupsByCourseAndInstructor',
  async ({ courseId, level, instructorId }, { rejectWithValue }) => {
    try {
      console.log('Fetching groups for course and instructor:', { courseId, level, instructorId });
      
      // Updated URL format with path parameters
      const response = await enrollmentApi.get(`/api/v1/courses/${level}/${courseId}/${instructorId}`);
      console.log('Groups response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Get groups error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch groups');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Step 5a: Get enrollment review data (GET - REQUIRES TOKEN)
// URL format: /api/v1/courses/{level}/{courseId}/{instructorId}
export const getEnrollmentReview = createAsyncThunk(
  'enrollment/getEnrollmentReview',
  async ({ courseId, level, instructorId }, { rejectWithValue }) => {
    try {
      console.log('Fetching enrollment review data:', { courseId, level, instructorId });
      
      // GET request to review enrollment details
      const response = await enrollmentApi.get(`/api/v1/courses/${level}/${courseId}/${instructorId}`);
      console.log('Enrollment review response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Get enrollment review error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to fetch enrollment review');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Step 5b: Submit enrollment (POST - REQUIRES TOKEN)
export const submitEnrollment = createAsyncThunk(
  'enrollment/submitEnrollment',
  async (enrollmentData, { rejectWithValue }) => {
    try {
      console.log('Submitting enrollment:', enrollmentData);
      
      const response = await enrollmentApi.post('/api/v1/ClassSelection/', enrollmentData);
      console.log('Enrollment response:', response.data);
      
      toast.success('Enrollment submitted successfully!');
      return response.data;
    } catch (error) {
      console.error('Submit enrollment error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = getErrorMessage(error, 'Failed to submit enrollment');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  // Current step in the enrollment process
  currentStep: 1,
  
  // Course information
  courseId: null,
  courseTitle: '',
  
  // Step 2: Levels
  levels: [],
  selectedLevel: '',
  levelsLoading: false,
  levelsError: null,
  
  // Step 3: Instructors (separate from groups)
  instructors: [],
  selectedInstructor: null,
  instructorsLoading: false,
  instructorsError: null,
  
  // Step 4: Groups (fetched separately)
  availableGroups: [],
  selectedGroup: null,
  selectedSchedule: null,
  groupsLoading: false,
  groupsError: null,
  
  // Step 5: Enrollment review and submission
  enrollmentReview: null,
  enrollmentReviewLoading: false,
  enrollmentReviewError: null,
  enrollmentLoading: false,
  enrollmentError: null,
  enrollmentSuccess: false,
  
  // General loading and error states
  isLoading: false,
  error: null,
};

// Enrollment slice
const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    // Initialize enrollment with course data
    initializeEnrollment: (state, action) => {
      const { courseId, courseTitle } = action.payload;
      state.courseId = courseId;
      state.courseTitle = courseTitle;
      state.currentStep = 1;
      
      // Reset all other state
      state.levels = [];
      state.selectedLevel = '';
      state.instructors = [];
      state.selectedInstructor = null;
      state.availableGroups = [];
      state.selectedGroup = null;
      state.selectedSchedule = null;
      state.enrollmentReview = null;
      state.enrollmentSuccess = false;
      state.error = null;
    },
    
    // Navigation between steps
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },
    
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    
    // Level selection
    setSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
      // Reset dependent selections
      state.selectedInstructor = null;
      state.selectedGroup = null;
      state.selectedSchedule = null;
      state.instructors = [];
      state.availableGroups = [];
      state.enrollmentReview = null;
    },
    
    // Instructor selection
    setSelectedInstructor: (state, action) => {
      state.selectedInstructor = action.payload;
      // Reset dependent selections
      state.selectedGroup = null;
      state.selectedSchedule = null;
      state.availableGroups = [];
      state.enrollmentReview = null;
    },
    
    // Group selection
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
      state.selectedSchedule = null; // Reset schedule when group changes
      state.enrollmentReview = null;
    },
    
    // Schedule selection
    setSelectedSchedule: (state, action) => {
      state.selectedSchedule = action.payload;
      state.enrollmentReview = null;
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null;
      state.levelsError = null;
      state.instructorsError = null;
      state.groupsError = null;
      state.enrollmentReviewError = null;
      state.enrollmentError = null;
    },
    
    // Reset enrollment state
    resetEnrollment: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Levels by Course
      .addCase(getLevelsByCourse.pending, (state) => {
        state.levelsLoading = true;
        state.levelsError = null;
      })
      .addCase(getLevelsByCourse.fulfilled, (state, action) => {
        state.levelsLoading = false;
        state.levels = action.payload.data?.levels || [];
        state.levelsError = null;
      })
      .addCase(getLevelsByCourse.rejected, (state, action) => {
        state.levelsLoading = false;
        state.levelsError = action.payload;
        state.levels = [];
      })
      
      // Get Instructors by Course and Level (ignore groups from this response)
      .addCase(getInstructorsByCourseAndLevel.pending, (state) => {
        state.instructorsLoading = true;
        state.instructorsError = null;
      })
      .addCase(getInstructorsByCourseAndLevel.fulfilled, (state, action) => {
        state.instructorsLoading = false;
        // Only use instructors, ignore groups from this response
        state.instructors = action.payload.data?.instructors || [];
        state.instructorsError = null;
      })
      .addCase(getInstructorsByCourseAndLevel.rejected, (state, action) => {
        state.instructorsLoading = false;
        state.instructorsError = action.payload;
        state.instructors = [];
      })
      
      // Get Groups by Course and Instructor (separate API call)
      .addCase(getGroupsByCourseAndInstructor.pending, (state) => {
        state.groupsLoading = true;
        state.groupsError = null;
      })
      .addCase(getGroupsByCourseAndInstructor.fulfilled, (state, action) => {
        state.groupsLoading = false;
        state.availableGroups = action.payload.data || [];
        state.groupsError = null;
      })
      .addCase(getGroupsByCourseAndInstructor.rejected, (state, action) => {
        state.groupsLoading = false;
        state.groupsError = action.payload;
        state.availableGroups = [];
      })
      
      // Get Enrollment Review Data
      .addCase(getEnrollmentReview.pending, (state) => {
        state.enrollmentReviewLoading = true;
        state.enrollmentReviewError = null;
      })
      .addCase(getEnrollmentReview.fulfilled, (state, action) => {
        state.enrollmentReviewLoading = false;
        state.enrollmentReview = action.payload.data || action.payload;
        state.enrollmentReviewError = null;
      })
      .addCase(getEnrollmentReview.rejected, (state, action) => {
        state.enrollmentReviewLoading = false;
        state.enrollmentReviewError = action.payload;
        state.enrollmentReview = null;
      })
      
      // Submit Enrollment
      .addCase(submitEnrollment.pending, (state) => {
        state.enrollmentLoading = true;
        state.enrollmentError = null;
      })
      .addCase(submitEnrollment.fulfilled, (state, action) => {
        state.enrollmentLoading = false;
        state.enrollmentSuccess = true;
        state.enrollmentError = null;
      })
      .addCase(submitEnrollment.rejected, (state, action) => {
        state.enrollmentLoading = false;
        state.enrollmentError = action.payload;
        state.enrollmentSuccess = false;
      });
  },
});

export const {
  initializeEnrollment,
  nextStep,
  prevStep,
  setCurrentStep,
  setSelectedLevel,
  setSelectedInstructor,
  setSelectedGroup,
  setSelectedSchedule,
  clearError,
  resetEnrollment,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;