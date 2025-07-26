import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerStudent, registerInstructor, clearError } from '../../store/slices/authSlice';
import authImage from '../../assets/images/register.png';
import logo from '../../assets/images/logo-black.webp';
import styles from './AuthPages.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // State for instructor-specific fields
  const [specialization, setSpecialization] = useState('');
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('student');

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!email.trim()) errors.email = 'Email is required';
    if (!phone.trim()) errors.phone = 'Phone number is required';
    if (!password) errors.password = 'Password is required';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) errors.agreeTerms = 'You must read and agree to the Terms & Conditions and Privacy Policy';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (password && password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // Instructor-specific validation
    if (activeTab === 'instructor') {
      if (!specialization.trim()) errors.specialization = 'Specialization is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
    };

    try {
      if (activeTab === 'student') {
        await dispatch(registerStudent(userData)).unwrap();
        navigate('/login');
      } else {
        const instructorData = {
          ...userData,
          specialization: specialization.trim(),
        };
        await dispatch(registerInstructor(instructorData)).unwrap();
        navigate('/login');
      }
    } catch (error) {
      // Error is handled by Redux and displayed in the UI
      console.error('Registration failed:', error);
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
          <h2 className={styles.authTitle}>Create Your Account <span className={styles.buddyText}>Today!</span></h2>
          
          {/* Registration Type Tabs */}
          <div className={styles.registerTabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'student' ? styles.active : ''}`}
              onClick={() => setActiveTab('student')}
              type="button"
            >
              <i className="fas fa-user-graduate"></i> Student
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'instructor' ? styles.active : ''}`}
              onClick={() => setActiveTab('instructor')}
              type="button"
            >
              <i className="fas fa-chalkboard-teacher"></i> Instructor
            </button>
          </div>

          {/* Display errors */}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={validationErrors.firstName ? styles.errorInput : ''}
              />
              {validationErrors.firstName && (
                <span className={styles.fieldError}>{validationErrors.firstName}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={validationErrors.lastName ? styles.errorInput : ''}
              />
              {validationErrors.lastName && (
                <span className={styles.fieldError}>{validationErrors.lastName}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
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
                type="tel"
                id="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={validationErrors.phone ? styles.errorInput : ''}
              />
              {validationErrors.phone && (
                <span className={styles.fieldError}>{validationErrors.phone}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
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
                placeholder="Confirm Password"
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
            
            {/* Instructor-specific fields */}
            {activeTab === 'instructor' && (
              <div className={styles.instructorFields}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="specialization"
                    placeholder="Area of Specialization (e.g., Mathematics, Physics, Computer Science)"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                    className={validationErrors.specialization ? styles.errorInput : ''}
                  />
                  {validationErrors.specialization && (
                    <span className={styles.fieldError}>{validationErrors.specialization}</span>
                  )}
                </div>
              </div>
            )}
            
            <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className={validationErrors.agreeTerms ? styles.errorInput : ''}
              />
              <label htmlFor="terms" className={styles.checkboxLabel}>
                I have <strong>read</strong> and agree to the <Link to="/terms-privacy" target="_blank" rel="noopener noreferrer">Terms <Link to="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</Link> and <Link to="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> Conditions and Privacy Policy</Link>
              </label>
              {validationErrors.agreeTerms && (
                <span className={styles.fieldError}>{validationErrors.agreeTerms}</span>
              )}
            </div>
            
            <button 
              type="submit" 
              className={styles.authButton}
              disabled={isLoading || !agreeTerms}
            >
              {isLoading 
                ? (activeTab === 'student' ? 'Registering Student...' : 'Registering Instructor...') 
                : (activeTab === 'student' ? 'Register as Student' : 'Register as Instructor')
              }
            </button>
          </form>
          
          <div className={styles.authLinks}>
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
          
          <div className={styles.socialAuth}>
            <p>Or continue with</p>
            <div className={styles.socialButtons}>
              <button type="button" className={`${styles.socialButton} ${styles.google}`}>
                <i className="fab fa-Google"></i> Google
              </button>
              <button type="button" className={`${styles.socialButton} ${styles.facebook}`}>
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

export default RegisterPage;