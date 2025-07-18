import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import courseReducer from './slices/courseSlice';
import enrollmentReducer from './slices/enrollmentSlice';
import unitReducer from './slices/unitSlice';
import lessonReducer from './slices/lessonSlice';
import groupReducer from './slices/groupSlice';
import newsReducer from './slices/newsSlice';
import instructorDashboardReducer from './slices/instructorDashboardSlice';
import studentDashboardReducer from './slices/studentDashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    courses: courseReducer,
    enrollment: enrollmentReducer,
    units: unitReducer,
    lessons: lessonReducer,
    groups: groupReducer,
    news: newsReducer,
    instructorDashboard: instructorDashboardReducer,
    studentDashboard: studentDashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;