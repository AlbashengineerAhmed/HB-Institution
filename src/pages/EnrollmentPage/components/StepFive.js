import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  submitEnrollment, 
  prevStep 
} from '../../../store/slices/enrollmentSlice';
import styles from './StepFive.module.css';

const StepFive = () => {
  const dispatch = useDispatch();
  const { 
    courseId,
    courseTitle,
    selectedLevel,
    selectedInstructor,
    selectedGroup,
    selectedSchedule,
    enrollmentLoading,
    enrollmentError
  } = useSelector((state) => state.enrollment);

  const handleSubmit = () => {
    const enrollmentData = {
      courseId,
      level: selectedLevel,
      instructorId: selectedInstructor._id,
      groupId: selectedGroup._id,
      selectedSchedule: {
        dayOfWeek: selectedSchedule.dayOfWeek,
        startTime: selectedSchedule.startTime,
        endTime: selectedSchedule.endTime,
        timezone: selectedSchedule.timezone
      }
    };

    dispatch(submitEnrollment(enrollmentData));
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  return (
    <div className={styles.stepFive}>
      <div className={styles.stepHeader}>
        <h2>Confirm Enrollment</h2>
        <p>Review your selection for <strong>{courseTitle}</strong></p>
      </div>

      <div className={styles.reviewContainer}>
        {/* Selection Summary */}
        <div className={styles.selectionGrid}>
          <div className={styles.selectionItem}>
            <span className={styles.selectionLabel}>Level</span>
            <span className={styles.selectionValue}>{selectedLevel}</span>
          </div>
          
          <div className={styles.selectionItem}>
            <span className={styles.selectionLabel}>Instructor</span>
            <span className={styles.selectionValue}>
              {selectedInstructor?.name || `${selectedInstructor?.firstName} ${selectedInstructor?.lastName}`}
            </span>
          </div>
          
          <div className={styles.selectionItem}>
            <span className={styles.selectionLabel}>Group</span>
            <span className={styles.selectionValue}>
              {selectedGroup?._id.slice(-4).toUpperCase()}
            </span>
          </div>
          
          <div className={styles.selectionItem}>
            <span className={styles.selectionLabel}>Schedule</span>
            <span className={styles.selectionValue}>
              {selectedSchedule?.dayOfWeek} {selectedSchedule?.startTime} - {selectedSchedule?.endTime}
            </span>
          </div>
          
          <div className={styles.selectionItem}>
            <span className={styles.selectionLabel}>Timezone</span>
            <span className={styles.selectionValue}>{selectedSchedule?.timezone}</span>
          </div>
        </div>

        {/* Terms */}
        <div className={styles.termsSection}>
          <div className={styles.termsCheckbox}>
            <input 
              type="checkbox" 
              id="agreeTerms" 
              defaultChecked 
            />
            <label htmlFor="agreeTerms">
              I agree to the terms and conditions and enrollment policies
            </label>
          </div>
        </div>
      </div>

      {enrollmentError && (
        <div className={styles.errorMessage}>
          <h4>Enrollment Error</h4>
          <p>{enrollmentError}</p>
        </div>
      )}

      <div className={styles.stepActions}>
        <button 
          onClick={handlePrev}
          disabled={enrollmentLoading}
          className={styles.prevButton}
        >
          Back
        </button>
        
        <button 
          onClick={handleSubmit}
          disabled={enrollmentLoading}
          className={`${styles.submitButton} ${enrollmentLoading ? styles.loading : ''}`}
        >
          {enrollmentLoading ? (
            <>
              <div className={styles.submitSpinner}></div>
              Processing...
            </>
          ) : (
            'Confirm Enrollment'
          )}
        </button>
      </div>
    </div>
  );
};

export default StepFive;