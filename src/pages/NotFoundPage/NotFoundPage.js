import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        {/* 404 Animation */}
        <div className={styles.errorCode}>
          <span className={styles.digit}>4</span>
          <span className={styles.digit}>0</span>
          <span className={styles.digit}>4</span>
        </div>
        
        {/* Error Message */}
        <div className={styles.errorMessage}>
          <h1 className={styles.title}>Oops! Page Not Found</h1>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
            Don't worry, it happens to the best of us!
          </p>
        </div>
        
        {/* Illustration */}
        <div className={styles.illustration}>
          <div className={styles.astronaut}>
            <div className={styles.astronautBody}>🚀</div>
            <div className={styles.stars}>
              <span className={styles.star}>⭐</span>
              <span className={styles.star}>✨</span>
              <span className={styles.star}>🌟</span>
              <span className={styles.star}>💫</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button 
            onClick={handleGoHome}
            className={`${styles.actionBtn} ${styles.primaryBtn}`}
          >
            <i className="fas fa-home"></i>
            Go to Homepage
          </button>
          <button 
            onClick={handleGoBack}
            className={`${styles.actionBtn} ${styles.secondaryBtn}`}
          >
            <i className="fas fa-arrow-left"></i>
            Go Back
          </button>
        </div>
        
        {/* Contact Support */}
        <div className={styles.supportSection}>
          <p className={styles.supportText}>
            Still can't find what you're looking for?
          </p>
          <Link to="/contact" className={styles.supportLink}>
            <i className="fas fa-headset"></i>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;