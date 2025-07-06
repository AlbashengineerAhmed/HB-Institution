import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '../../../store/slices/enrollmentSlice';
import styles from './StepOne.module.css';

const StepOne = () => {
  const dispatch = useDispatch();
  const { selectedCourse } = useSelector((state) => state.courses);

  const handleNext = () => {
    dispatch(nextStep());
  };

  if (!selectedCourse) {
    return (
      <div className={styles.stepOne}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading course information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stepOne}>
      <div className={styles.stepHeader}>
        <h2>Course Enrollment</h2>
        <p>Ready to enroll in <strong>{selectedCourse.title}</strong>?</p>
      </div>

      <div className={styles.stepActions}>
        <button 
          onClick={handleNext}
          className={styles.nextButton}
        >
          Start Enrollment
        </button>
      </div>
    </div>
  );
};

export default StepOne;