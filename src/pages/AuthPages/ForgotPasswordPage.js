import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, clearError, setResetEmail } from '../../store/slices/authSlice';
import styles from './AuthPages.module.css';
import logo from '../../assets/images/logo-black.webp';
// Using register.png for the auth page image
const authImage = process.env.PUBLIC_URL + '/images/register.png';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) errors.email = 'Email is required';

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
      await dispatch(forgetPassword(email.trim())).unwrap();
      dispatch(setResetEmail(email.trim()));
      setSubmitted(true);
    } catch (error) {
      // Error is handled by Redux and displayed in the UI
      console.error('Forgot password failed:', error);
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
          <h2 className={styles.authTitle}>Forgot Password</h2>
          
          {!submitted ? (
            <>
              <p className={styles.authSubtitle}>Enter your email address and we'll send you a verification code to reset your password.</p>
              
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
                
                <button 
                  type="submit" 
                  className={styles.authButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Verification Code'}
                </button>
              </form>
            </>
          ) : (
            <div className={styles.successMessage}>
              <i className="fas fa-CheckCircle"></i>
              <h3>Verification Code Sent!</h3>
              <p>We've sent a verification code to {email}. Please check your inbox and use the code to reset your password.</p>
              <Link to="/verify-code" className={styles.authButton}>Enter Verification Code</Link>
            </div>
          )}
          
          <div className={styles.authLinks}>
            <p>Remember your password? <Link to="/login">Sign In</Link></p>
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

export default ForgotPasswordPage;