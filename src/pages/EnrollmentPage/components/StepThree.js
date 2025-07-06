import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getInstructorsByCourseAndLevel, 
  setSelectedInstructor, 
  nextStep, 
  prevStep 
} from '../../../store/slices/enrollmentSlice';
import styles from './StepThree.module.css';

const StepThree = () => {
  const dispatch = useDispatch();
  const { 
    courseId, 
    selectedLevel,
    instructors, 
    selectedInstructor, 
    instructorsLoading, 
    instructorsError 
  } = useSelector((state) => state.enrollment);

  useEffect(() => {
    if (courseId && selectedLevel && instructors.length === 0) {
      dispatch(getInstructorsByCourseAndLevel({ courseId, level: selectedLevel }));
    }
  }, [dispatch, courseId, selectedLevel, instructors.length]);

  const handleInstructorSelect = (instructor) => {
    dispatch(setSelectedInstructor(instructor));
  };

  const handleNext = () => {
    if (selectedInstructor) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  if (instructorsLoading) {
    return (
      <div className={styles.stepThree}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading instructors...</p>
        </div>
      </div>
    );
  }

  if (instructorsError) {
    return (
      <div className={styles.stepThree}>
        <div className={styles.error}>
          <h3>Error Loading Instructors</h3>
          <p>{instructorsError}</p>
          <button 
            onClick={() => dispatch(getInstructorsByCourseAndLevel({ courseId, level: selectedLevel }))}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stepThree}>
      <div className={styles.stepHeader}>
        <h2>Select Instructor</h2>
        <p>Choose your instructor for {selectedLevel} level</p>
      </div>

      {instructors.length === 0 ? (
        <div className={styles.noInstructors}>
          <h3>No Instructors Available</h3>
          <p>No instructors available for {selectedLevel} level. Try a different level.</p>
        </div>
      ) : (
        <div className={styles.instructorsContainer}>
          <div className={styles.instructorsGrid}>
            {instructors.map((instructor) => {
              const isSelected = selectedInstructor?._id === instructor._id;
              
              return (
                <div
                  key={instructor._id}
                  className={`${styles.instructorCard} ${isSelected ? styles.selected : ''}`}
                  onClick={() => handleInstructorSelect(instructor)}
                >
                  <div className={styles.instructorHeader}>
                    <div className={styles.instructorAvatar}>
                      {instructor.avatar && instructor.avatar !== 'default-avatar.jpg' ? (
                        <img src={instructor.avatar} alt={instructor.name} />
                      ) : (
                        <span>{instructor.firstName?.charAt(0) || instructor.name?.charAt(0) || 'I'}</span>
                      )}
                    </div>
                    <div className={styles.instructorInfo}>
                      <h3>{instructor.name || `${instructor.firstName} ${instructor.lastName}`}</h3>
                      <p className={styles.instructorEmail}>{instructor.email}</p>
                    </div>
                    {isSelected && (
                      <div className={styles.selectIndicator}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {instructor.specialization && instructor.specialization.length > 0 && (
                    <div className={styles.specializations}>
                      {instructor.specialization.slice(0, 2).map((spec, index) => (
                        <span key={index} className={styles.specializationTag}>
                          {spec}
                        </span>
                      ))}
                      {instructor.specialization.length > 2 && (
                        <span className={styles.moreSpecs}>
                          +{instructor.specialization.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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
          disabled={!selectedInstructor}
          className={`${styles.nextButton} ${!selectedInstructor ? styles.disabled : ''}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepThree;