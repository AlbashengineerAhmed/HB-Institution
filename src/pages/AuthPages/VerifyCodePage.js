import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCode, forgetPassword, clearError } from '../../store/slices/authSlice';
import styles from './AuthPages.module.css';
import logo from '../../assets/images/logo-black.webp';
// Using register.png for the auth page image
const authImage = process.env.PUBLIC_URL + '/images/register.png';

const VerifyCodePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, resetEmail, isCodeVerified } = useSelector((state) => state.auth);

  const [code, setCode] = useState(['', '', '', '', '', '']); // 6 digits for the API
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if code is verified
    if (isCodeVerified) {
      navigate('/reset-password');
    }
  }, [isCodeVerified, navigate]);

  const handleChange = (index, value) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) {
      // If pasting multiple digits, distribute them across inputs
      const digits = value.slice(0, 6).split('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      return;
    }

    try {
      await dispatch(verifyCode(verificationCode)).unwrap();
      // Navigation is handled by useEffect when isCodeVerified changes
    } catch (error) {
      // Error is handled by Redux and displayed in the UI
      console.error('Code verification failed:', error);
    }
  };

  const handleResendCode = async () => {
    if (resetEmail) {
      try {
        await dispatch(forgetPassword(resetEmail)).unwrap();
      } catch (error) {
        console.error('Resend code failed:', error);
      }
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
          <h2 className={styles.authTitle}>Verify Your Email</h2>
          
          <p className={styles.authSubtitle}>
            Enter the 6-digit verification code sent to {resetEmail || 'your email address'}.
          </p>
          
          {/* Display errors */}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.verificationCodeContainer}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={styles.verificationInput}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              ))}
            </div>
            
            <button 
              type="submit" 
              className={styles.authButton}
              disabled={code.some(digit => !digit) || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
          
          <div className={styles.authLinks}>
            <p>
              Didn't receive a code? 
              <button 
                className={styles.textButton}
                onClick={handleResendCode}
                disabled={isLoading}
              >
                Resend Code
              </button>
            </p>
            <p><Link to="/forgot-password">Use a different email</Link></p>
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

export default VerifyCodePage;