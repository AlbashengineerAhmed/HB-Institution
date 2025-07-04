import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetEnrollment } from '../../store/slices/enrollmentSlice';
import styles from './EnrollmentSuccessPage.module.css';

const EnrollmentSuccessPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedCourse } = useSelector((state) => state.courses);

  useEffect(() => {
    // Reset enrollment state when component mounts
    dispatch(resetEnrollment());
  }, [dispatch]);

  // If no course data, redirect to courses page
  useEffect(() => {
    if (!selectedCourse && courseId) {
      const timer = setTimeout(() => {
        navigate('/courses');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedCourse, courseId, navigate]);

  return (
    <div className={styles.successPage}>
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successHeader}>
            <div className={styles.checkmark}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <h1>Enrollment Successful!</h1>
            <p>You have successfully enrolled in {selectedCourse?.title || 'the course'}.</p>
          </div>
          
          <div className={styles.nextSteps}>
            <h3>What's Next?</h3>
            <div className={styles.stepsList}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <span>Check your email for confirmation</span>
              </div>
              
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <span>Prepare materials for your first class</span>
              </div>
              
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <span>Join your scheduled class session</span>
              </div>
            </div>
          </div>
          
          <div className={styles.actions}>
            <Link to="/courses" className={styles.primaryButton}>
              Browse More Courses
            </Link>
            
            <Link to="/" className={styles.secondaryButton}>
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className={styles.supportInfo}>
          <h3>Need Help?</h3>
          <p>Contact support: support@hb-institution.com</p>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSuccessPage;