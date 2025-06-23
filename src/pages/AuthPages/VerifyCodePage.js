import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';
import logo from '../../assets/images/logo-black.webp';
// Using register.png for the auth page image
const authImage = process.env.PUBLIC_URL + '/images/register.png';

const VerifyCodePage = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      // If pasting multiple digits, distribute them across inputs
      const digits = value.split('');
      const newCode = [...code];
      
      digits.forEach((digit, i) => {
        if (index + i < code.length) {
          newCode[index + i] = digit;
        }
      });
      
      setCode(newCode);
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + digits.length, code.length - 1);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    } else {
      // Handle single digit input
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input after entering a digit
      if (value && index < code.length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to clear current input and focus previous
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log('Verification code submitted:', verificationCode);
    
    // If code is complete, navigate to reset password page
    if (verificationCode.length === 4) {
      navigate('/reset-password');
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
          <h2 className="auth-title">Verify Your Email</h2>
          
          <p className="auth-description">Enter the 4-digit verification code sent to your email address.</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="verification-code-container">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="verification-input"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              ))}
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={code.some(digit => !digit)}
            >
              Verify Code
            </button>
          </form>
          
          <div className="auth-links">
            <p>Didn't receive a code? <button className="text-button">Resend Code</button></p>
            <p><Link to="/forgot-password">Use a different email</Link></p>
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

export default VerifyCodePage;