import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authImage from '../../assets/images/register.png';
import logo from '../../assets/images/logo-black.webp';
import './AuthPages.css';

const RegisterPage = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // State for instructor-specific fields
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (activeTab === 'student') {
      console.log('Student Registration:', { name, email, password, phone, agreeTerms });
    } else {
      console.log('Instructor Registration:', { 
        name, 
        email, 
        password, 
        phone,
        qualification,
        experience,
        specialization,
        agreeTerms 
      });
    }
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
          <h2 className="auth-title">Create Your Account <span className="buddy-text">Today!</span></h2>
          
          {/* Registration Type Tabs */}
          <div className="register-tabs">
            <button 
              className={`tab-button ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveTab('student')}
              type="button"
            >
              <i className="fas fa-user-graduate"></i> Student
            </button>
            <button 
              className={`tab-button ${activeTab === 'instructor' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructor')}
              type="button"
            >
              <i className="fas fa-chalkboard-teacher"></i> Instructor
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
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
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
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
            
            {/* Instructor-specific fields */}
            {activeTab === 'instructor' && (
              <div className="instructor-fields">
                <div className="form-group">
                  <input
                    type="text"
                    id="qualification"
                    placeholder="Highest Qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    id="experience"
                    placeholder="Years of Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    id="specialization"
                    placeholder="Area of Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="terms" className="checkbox-label">
                I agree to <Link to="/terms">Terms of Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>
            
            <button type="submit" className="auth-button">
              {activeTab === 'student' ? 'Register as Student' : 'Register as Instructor'}
            </button>
          </form>
          
          <div className="auth-links">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
          
          <div className="social-auth">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button type="button" className="social-button google">
                <i className="fab fa-google"></i> Google
              </button>
              <button type="button" className="social-button facebook">
                <i className="fab fa-facebook-f"></i> Facebook
              </button>
            </div>
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

export default RegisterPage;