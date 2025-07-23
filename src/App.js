import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store/store';
import styles from './App.module.css';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROLES } from './utils/roleUtils';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import WhoWeArePage from './pages/WhoWeArePage/WhoWeArePage';
import CommunityPage from './pages/CommunityPage/CommunityPage';
import WhyHBIPage from './pages/WhyHBIPage/WhyHBIPage';
import WhatsAppFloat from './components/WhatsAppFloat/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange';
import RouteChangeTracker from './components/LoadingIndicator/RouteChangeTracker';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Auth Pages
import LoginPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import ForgotPasswordPage from './pages/AuthPages/ForgotPasswordPage';
import VerifyCodePage from './pages/AuthPages/VerifyCodePage';
import ResetPasswordPage from './pages/AuthPages/ResetPasswordPage';

// New Pages
import CoursesPage from './pages/CoursesPage/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage/CourseDetailsPage';
import EnrollmentPage from './pages/EnrollmentPage/EnrollmentPage';
import EnrollmentSuccessPage from './pages/EnrollmentSuccessPage/EnrollmentSuccessPage';
import ContactPage from './pages/ContactPage/ContactPage';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

// Profile Pages
import ProfilePage from './pages/ProfilePage/ProfilePage';

// Dashboard Pages
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';

// 404 Page
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

/**
 * Main application content component that handles routing and layout
 * Manages initial loading state and determines when to show/hide footer
 */
const AppContent = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();
  
  /**
   * Effect to handle initial loading state
   * Sets loading to false after 1 second delay to allow components to initialize
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  /**
   * Array of routes where footer should be hidden
   * Includes dashboard and profile pages for cleaner UI
   */
  const dashboardRoutes = [
    '/admin',
    '/instructor-dashboard',
    '/student-dashboard',
    '/profile'
  ];

  /**
   * Determines if current route is a dashboard route
   * Used to conditionally hide footer on dashboard pages
   */
  const isDashboardRoute = dashboardRoutes.some(route => 
    location.pathname.startsWith(route)
  );
  
  return (
    <div className={styles.App}>
      <Header />
      <ScrollToTopOnRouteChange />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/*" element={<AboutPage />} />
          <Route path="/who-we-are" element={<WhoWeArePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/*" element={<CommunityPage />} />
          <Route path="/why-hbi" element={<WhyHBIPage />} />
          <Route path="/why-hbi/*" element={<WhyHBIPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Course Routes */}
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailsPage />} />
          <Route 
            path="/enrollment/:courseId" 
            element={
              <ProtectedRoute>
                <EnrollmentPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/enrollment-success/:courseId" 
            element={
              <ProtectedRoute>
                <EnrollmentSuccessPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-code" element={<VerifyCodePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Profile Route - Protected */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard Routes - Role Protected */}
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/instructor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}>
                <InstructorDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes - Admin Only */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Catch-All Route - Must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: 'var(--gradient-end)',
          color: 'var(--text-color)',
        }}
      />
      {/* Conditionally render Footer - HIDDEN on dashboard and profile pages */}
      {!isDashboardRoute && <Footer />}
      
      <WhatsAppFloat />
      <ScrollToTop />
      {!isInitialLoad && <RouteChangeTracker />}

    </div>
  );
};

/**
 * Root App component that provides Redux store and routing context
 * Wraps the entire application with necessary providers
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;