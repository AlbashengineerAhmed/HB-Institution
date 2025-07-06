import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearError, clearResetState } from '../../store/slices/authSlice';
import styles from './AuthPages.module.css';
import logo from '../../assets/images/logo-black.webp';
// Using register.png for the auth page image
const authImage = process.env.PUBLIC_URL + '/images/register.png';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, resetEmail, isCodeVerified } = useSelector((state) => state.auth);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Redirect if not coming from verification
    if (!isCodeVerified || !resetEmail) {
      navigate('/forgot-password');
    }
  }, [isCodeVerified, resetEmail, navigate]);

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};

    if (!password) errors.password = 'Password is required';
    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Password validation
    if (password && password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
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
      await dispatch(resetPassword({ 
        email: resetEmail, 
        newPassword: password 
      })).unwrap();
      
      // Clear reset state and navigate to login
      dispatch(clearResetState());
      navigate('/login');
    } catch (error) {
      // Error is handled by Redux and displayed in the UI
      console.error('Password reset failed:', error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authLeftPanel}>
        <div className={styles.authImageContainer}>
          <img src={authImage} alt="Reset Password" className={styles.authImage} />
        </div>
      </div>
      
      <div className={styles.authRightPanel}>
        <div className={styles.authFormContainer}>
          <div className={styles.authLogo}>
            <img src={logo} alt="Website Logo" />
          </div>
          <h2 className={styles.authTitle}>Reset Your Password</h2>
          
          <p className={styles.authSubtitle}>Create a new password for your account.</p>
          
          {/* Display errors */}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter new password"
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
            
            <div className={styles.formGroup}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={validationErrors.confirmPassword ? styles.errorInput : ''}
              />
              <button 
                type="button" 
                className={styles.togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </button>
              {validationErrors.confirmPassword && (
                <span className={styles.fieldError}>{validationErrors.confirmPassword}</span>
              )}
            </div>
            
            <div className={styles.passwordRequirements}>
              <p>Password must be at least 6 characters long</p>
            </div>
            
            <button 
              type="submit" 
              className={styles.authButton}
              disabled={password.length < 6 || password !== confirmPassword || isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          
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

export default ResetPasswordPage;