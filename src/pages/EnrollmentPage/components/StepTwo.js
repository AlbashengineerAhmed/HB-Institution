import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getLevelsByCourse, 
  setSelectedLevel, 
  nextStep, 
  prevStep 
} from '../../../store/slices/enrollmentSlice';
import styles from './StepTwo.module.css';

const StepTwo = () => {
  const dispatch = useDispatch();
  const { 
    courseId, 
    levels, 
    selectedLevel, 
    levelsLoading, 
    levelsError 
  } = useSelector((state) => state.enrollment);

  useEffect(() => {
    if (courseId && levels.length === 0) {
      dispatch(getLevelsByCourse(courseId));
    }
  }, [dispatch, courseId, levels.length]);

  const handleLevelSelect = (level) => {
    dispatch(setSelectedLevel(level));
  };

  const handleNext = () => {
    if (selectedLevel) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  if (levelsLoading) {
    return (
      <div className={styles.stepTwo}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading levels...</p>
        </div>
      </div>
    );
  }

  if (levelsError) {
    return (
      <div className={styles.stepTwo}>
        <div className={styles.error}>
          <h3>Error Loading Levels</h3>
          <p>{levelsError}</p>
          <button 
            onClick={() => dispatch(getLevelsByCourse(courseId))}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stepTwo}>
      <div className={styles.stepHeader}>
        <h2>Choose Level</h2>
        <p>Select your skill level</p>
      </div>

      {levels.length === 0 ? (
        <div className={styles.noLevels}>
          <h3>No Levels Available</h3>
          <p>This course doesn't have specific levels. Contact support for assistance.</p>
        </div>
      ) : (
        <div className={styles.levelsContainer}>
          <div className={styles.levelsGrid}>
            {levels.map((level, index) => (
              <div
                key={index}
                className={`${styles.levelCard} ${
                  selectedLevel === level ? styles.selected : ''
                }`}
                onClick={() => handleLevelSelect(level)}
              >
                <div className={styles.levelIndicator}>
                  {getLevelIndicator(level)}
                </div>
                <div className={styles.levelContent}>
                  <h3>{level}</h3>
                  <p>{getLevelDescription(level)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.stepActions}>
        <button 
          onClick={handlePrev}
          className={styles.prevButton}
        >
          Back
        </button>
        
        <button 
          onClick={handleNext}
          disabled={!selectedLevel}
          className={`${styles.nextButton} ${!selectedLevel ? styles.disabled : ''}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Helper functions with course-related indicators
const getLevelIndicator = (level) => {
  switch (level.toLowerCase()) {
    case 'beginner':
      return '1';
    case 'intermediate':
      return '2';
    case 'advanced':
      return '3';
    default:
      return '•';
  }
};

const getLevelDescription = (level) => {
  switch (level.toLowerCase()) {
    case 'beginner':
      return 'Perfect for those new to the subject';
    case 'intermediate':
      return 'Ideal for learners with basic knowledge';
    case 'advanced':
      return 'For experienced learners ready for challenges';
    default:
      return 'Comprehensive level for various skills';
  }
};

export default StepTwo;