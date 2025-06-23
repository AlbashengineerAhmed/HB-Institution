import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';
import logo from '../../assets/images/logo-black.webp';
// Using register.png for the auth page image
const authImage = process.env.PUBLIC_URL + '/images/register.png';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Handle password reset logic here
    console.log('Password reset with:', password);
    
    // Navigate to login page after successful reset
    navigate('/login', { state: { resetSuccess: true } });
  };

  return (
    <div className="auth-container">
      <div className="auth-left-panel">
        <div className="auth-image-container">
          <img src={authImage} alt="Reset Password" className="auth-image" />
        </div>
      </div>
      
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-logo">
            <img src={logo} alt="Website Logo" />
          </div>
          <h2 className="auth-title">Reset Your Password</h2>
          
          <p className="auth-description">Create a new password for your account.</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </button>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <i className="fas fa-lock"></i>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </button>
            </div>
            
            <div className="password-requirements">
              <p>Password must:</p>
              <ul>
                <li className={password.length >= 8 ? 'met' : ''}>
                  <i className={password.length >= 8 ? 'fas fa-check' : 'fas fa-times'}></i>
                  Be at least 8 characters long
                </li>
                <li className={/[A-Z]/.test(password) ? 'met' : ''}>
                  <i className={/[A-Z]/.test(password) ? 'fas fa-check' : 'fas fa-times'}></i>
                  Include at least one uppercase letter
                </li>
                <li className={/[0-9]/.test(password) ? 'met' : ''}>
                  <i className={/[0-9]/.test(password) ? 'fas fa-check' : 'fas fa-times'}></i>
                  Include at least one number
                </li>
                <li className={/[!@#$%^&*]/.test(password) ? 'met' : ''}>
                  <i className={/[!@#$%^&*]/.test(password) ? 'fas fa-check' : 'fas fa-times'}></i>
                  Include at least one special character (!@#$%^&*)
                </li>
              </ul>
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={password.length < 8 || password !== confirmPassword}
            >
              Reset Password
            </button>
          </form>
          
          <div className="auth-links">
            <p>Remember your password? <Link to="/login">Sign In</Link></p>
          </div>
          
          <div className="auth-footer">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;