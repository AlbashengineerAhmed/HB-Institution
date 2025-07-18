import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { getDashboardRoute } from '../../utils/roleUtils';
import styles from './AuthPages.module.css';
import logo from '../../assets/images/logo-black.webp';
// Using register.png for the auth page image
const authImage = process.env.PUBLIC_URL + '/images/register.png';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Get the intended destination from location state or default to role-based dashboard
  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (isAuthenticated && user) {
      // If there's a specific page they were trying to access, go there
      if (from && from !== '/login') {
        navigate(from, { replace: true });
      } else {
        // Otherwise, redirect to their role-specific dashboard
        const dashboardRoute = getDashboardRoute(user.role);
        navigate(dashboardRoute, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, from]);

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(loginUser({ 
        email: email.trim(), 
        password 
      })).unwrap();
      // Navigation is handled in useEffect after successful login
    } catch (error) {
      // Error is handled by Redux and displayed in the UI
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authLeftPanel}>
        <div className={styles.authImageContainer}>
          <img src={authImage} alt="Authentication" className={styles.authImage} />
        </div>
      </div>
      
      <div className={styles.authRightPanel}>
        <div className={styles.authFormContainer}>
          <div className={styles.authLogo}>
            <img src={logo} alt="Website Logo" />
          </div>
          <h2 className={styles.authTitle}>Welcome to Sign In <span className={styles.buddyText}>Buddy!</span></h2>
          
          {/* Display errors */}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={validationErrors.email ? styles.errorInput : ''}
              />
              {validationErrors.email && (
                <span className={styles.fieldError}>{validationErrors.email}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={validationErrors.password ? styles.errorInput : ''}
              />
              <button 
                type="button" 
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </button>
              {validationErrors.password && (
                <span className={styles.fieldError}>{validationErrors.password}</span>
              )}
            </div>
            
            <button 
              type="submit" 
              className={styles.authButton}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className={styles.authLinks}>
            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>
          
          <div className={styles.socialAuth}>
            <p>Or continue with</p>
            <div className={styles.socialButtons}>
              <button className={`${styles.socialButton} ${styles.google}`}>
                <i className="fab fa-Google"></i> Google
              </button>
              <button className={`${styles.socialButton} ${styles.facebook}`}>
                <i className="fab fa-FacebookF"></i> Facebook
              </button>
            </div>
          </div>
          
          <div className={styles.authFooter}>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;