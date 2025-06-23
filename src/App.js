import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './styles/global.css';
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
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/*" element={<AboutPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/*" element={<CommunityPage />} />
          <Route path="/why-hbi" element={<WhyHBIPage />} />
          <Route path="/why-hbi/*" element={<WhyHBIPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-code" element={<VerifyCodePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
      {!isInitialLoad && <RouteChangeTracker />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
