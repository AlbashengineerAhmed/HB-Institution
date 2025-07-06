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
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CommunityPage from './pages/CommunityPage/CommunityPage';
import WhyHBIPage from './pages/WhyHBIPage/WhyHBIPage';
import WhatsAppFloat from './components/WhatsAppFloat/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
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

// Admin Pages
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

// Profile Page
import ProfilePage from './pages/ProfilePage/ProfilePage';

// Dashboard Pages
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';

// Route change tracker wrapper component
const AppContent = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    // Mark initial load as complete after a short delay
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={styles.App}>
      <Header />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/*" element={<AboutPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/*" element={<CommunityPage />} />
          <Route path="/why-hbi" element={<WhyHBIPage />} />
          <Route path="/why-hbi/*" element={<WhyHBIPage />} />
          
          {/* Course Routes */}
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailsPage />} />
          <Route path="/enrollment/:courseId" element={<EnrollmentPage />} />
          <Route path="/enrollment-success/:courseId" element={<EnrollmentSuccessPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-code" element={<VerifyCodePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Profile Route */}
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Dashboard Routes */}
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
      {!isInitialLoad && <RouteChangeTracker />}
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
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--text-color)',
        }}
      />
    </div>
  );
};

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