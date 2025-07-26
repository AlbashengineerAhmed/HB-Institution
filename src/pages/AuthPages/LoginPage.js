import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { getDashboardRoute } from '../../utils/roleUtils';
import styles from './AuthPages.module.css';
import logo from '../../assets/images/logo-black.webp';

const authImage = process.env.PUBLIC_URL + '/images/register.png';

/**
 * Login page component that handles user authentication
 * Provides form validation, URL parameter handling, and role-based navigation
 */
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const from = location.state?.from?.pathname;

  /**
   * Effect to handle URL parameters and display appropriate toast notifications
   * Processes various message types from email confirmations and redirects
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const message = urlParams.get('message');
    
    if (message) {
      /**
       * Handles different message types from backend redirects
       * Displays appropriate toast notifications based on message type
       */
      switch (message) {
        case 'confirmed':
          toast.success('Email confirmed successfully! You can now log in.');
          break;
        case 'alreadyConfirmed':
          toast.info('Your email is already confirmed. You can log in.');
          break;
        case 'passwordReset':
          toast.success('Password reset successfully! You can now log in with your new password.');
          break;
        case 'registrationComplete':
          toast.success('Registration completed successfully! Please log in.');
          break;
        case 'sessionExpired':
          toast.warning('Your session has expired. Please log in again.');
          break;
        case 'unauthorized':
          toast.error('Unauthorized access. Please log in to continue.');
          break;
        case 'accountActivated':
          toast.success('Account activated successfully! You can now log in.');
          break;
        case 'emailVerified':
          toast.success('Email verified successfully! You can now log in.');
          break;
        default:
          toast.info(decodeURIComponent(message));
          break;
      }
      
      /**
       * Cleans up the URL by removing the message parameter
       * Prevents message from showing again on page refresh
       */
      const newUrl = new URL(window.location);
      newUrl.searchParams.delete('message');
      window.history.replaceState({}, '', newUrl.pathname + newUrl.search);
    }
  }, [location.search]);

  /**
   * Effect to handle post-login navigation
   * Redirects users based on their role and intended destination
   */
  useEffect(() => {
    if (isAuthenticated && user) {
      if (from && from !== '/login') {
        navigate(from, { replace: true });
      } else {
        // Get the appropriate dashboard route based on user role
        const dashboardRoute = getDashboardRoute(user.role);
        
        // If user has a specific role, redirect to their dashboard
        if (user.role && dashboardRoute !== '/') {
          console.log('Redirecting user with role:', user.role, 'to:', dashboardRoute);
          navigate(dashboardRoute, { replace: true });
        } else {
          // Default redirect for users without specific roles
          navigate('/', { replace: true });
        }
      }
    }
  }, [isAuthenticated, user, navigate, from]);

  /**
   * Effect to clear any existing errors when component mounts
   * Ensures clean state for new login attempts
   */
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Validates the login form inputs
   * Checks for required fields and email format
   * @returns {boolean} - True if form is valid, false otherwise
   */
  const validateForm = () => {
    const errors = {};

    if (!email.trim()) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission for user login
   * Validates form data and dispatches login action
   * @param {Event} e - Form submission event
   */
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
    } catch (error) {
      // Error handling is managed by Redux slice
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
            <Link to="/terms-privacy">Terms of Service</Link>
            <Link to="/terms-privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;