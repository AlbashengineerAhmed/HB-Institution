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

// Async thunks for API calls

// 1. Create News/Blog
export const createNews = createAsyncThunk(
  'news/createNews',
  async (newsData, { rejectWithValue }) => {
    try {
      console.log('Creating news with data:', newsData);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', newsData.title);
      formData.append('content', newsData.content);
      
      if (newsData.image) {
        formData.append('image', newsData.image);
      }
      
      const response = await api.post('/news/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Create news response:', response.data);
      toast.success('News created successfully!');
      return response.data;
    } catch (error) {
      console.error('Error creating news:', error);
      const errorMessage = getErrorMessage(error, 'Failed to create news');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// 2. Get All News/Blogs
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching news from:', `${API_BASE_URL}/news/`);
      const response = await api.get('/news/');
      console.log('News response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      const errorMessage = getErrorMessage(error, 'Failed to fetch news');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// 3. Update News/Blog
export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({ newsId, newsData }, { rejectWithValue }) => {
    try {
      console.log('Updating news:', newsId, 'with data:', newsData);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', newsData.title);
      formData.append('content', newsData.content);
      
      if (newsData.image) {
        formData.append('image', newsData.image);
      }
      
      const response = await api.put(`/news/${newsId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Update news response:', response.data);
      toast.success('News updated successfully!');
      return { newsId, data: response.data };
    } catch (error) {
      console.error('Error updating news:', error);
      const errorMessage = getErrorMessage(error, 'Failed to update news');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// 4. Delete News/Blog
export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (newsId, { rejectWithValue }) => {
    try {
      console.log('Deleting news:', newsId);
      await api.delete(`/news/${newsId}`);
      console.log('News deleted successfully');
      toast.success('News deleted successfully!');
      return newsId;
    } catch (error) {
      console.error('Error deleting news:', error);
      const errorMessage = getErrorMessage(error, 'Failed to delete news');
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  news: [],
  selectedNews: null,
  filteredNews: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalNews: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

// News slice
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedNews: (state) => {
      state.selectedNews = null;
    },
    setSelectedNews: (state, action) => {
      state.selectedNews = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    filterNews: (state) => {
      let filtered = [...state.news];
      
      // Filter by search term
      if (state.searchTerm) {
        filtered = filtered.filter(newsItem =>
          newsItem.title?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          newsItem.content?.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
      
      state.filteredNews = filtered;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.filteredNews = [...state.news];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch News
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle different response structures
        const newsData = action.payload.data || action.payload.news || action.payload;
        state.news = Array.isArray(newsData) ? newsData : [];
        state.filteredNews = Array.isArray(newsData) ? newsData : [];
        state.pagination = action.payload.pagination || initialState.pagination;
        console.log('News stored in state:', state.news);
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.news = [];
        state.filteredNews = [];
        console.error('Failed to fetch news:', action.payload);
      })
      
      // Create News
      .addCase(createNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.isLoading = false;
        const newNews = action.payload.news || action.payload.data || action.payload;
        if (newNews) {
          state.news.unshift(newNews); // Add to beginning of array
          state.filteredNews.unshift(newNews);
        }
        state.error = null;
      })
      .addCase(createNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update News
      .addCase(updateNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.isLoading = false;
        const { newsId, data } = action.payload;
        const updatedNews = data.news || data.data || data;
        
        if (updatedNews) {
          // Update in news array
          const newsIndex = state.news.findIndex(newsItem => 
            (newsItem.id || newsItem._id) === newsId
          );
          if (newsIndex !== -1) {
            state.news[newsIndex] = updatedNews;
          }
          
          // Update in filtered news array
          const filteredIndex = state.filteredNews.findIndex(newsItem => 
            (newsItem.id || newsItem._id) === newsId
          );
          if (filteredIndex !== -1) {
            state.filteredNews[filteredIndex] = updatedNews;
          }
        }
        state.error = null;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Delete News
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedNewsId = action.payload;
        // Remove the deleted news from both arrays
        state.news = state.news.filter(newsItem => 
          (newsItem.id || newsItem._id) !== deletedNewsId
        );
        state.filteredNews = state.filteredNews.filter(newsItem => 
          (newsItem.id || newsItem._id) !== deletedNewsId
        );
        state.error = null;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSelectedNews, 
  setSelectedNews, 
  setSearchTerm, 
  filterNews, 
  clearFilters 
} = newsSlice.actions;

export default newsSlice.reducer;