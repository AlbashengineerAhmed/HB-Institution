import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPages.css';
import logo from '../../assets/images/logo-black.webp';
// Using register.png for the auth page image
const authImage = process.env.PUBLIC_URL + '/images/register.png';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Forgot password request for:', email);
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-left-panel">
        <div className="auth-image-container">
          <img src={authImage} alt="Authentication" className="auth-image" />
        </div>
      </div>
      
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-logo">
            <img src={logo} alt="Website Logo" />
          </div>
          <h2 className="auth-title">Forgot Password</h2>
          
          {!submitted ? (
            <>
              <p className="auth-description">Enter your email address and we'll send you a verification code to reset your password.</p>
              
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="auth-button">Send Verification Code</button>
              </form>
            </>
          ) : (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>Verification Code Sent!</h3>
              <p>We've sent a verification code to {email}. Please check your inbox and use the code to reset your password.</p>
              <Link to="/verify-code" className="auth-button">Enter Verification Code</Link>
            </div>
          )}
          
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

export default ForgotPasswordPage;