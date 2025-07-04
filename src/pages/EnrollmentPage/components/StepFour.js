import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getGroupsByCourseAndInstructor, 
  setSelectedGroup,
  setSelectedSchedule,
  nextStep, 
  prevStep 
} from '../../../store/slices/enrollmentSlice';
import styles from './StepFour.module.css';

const StepFour = () => {
  const dispatch = useDispatch();
  const { 
    courseId, 
    selectedLevel,
    selectedInstructor,
    availableGroups,
    selectedGroup,
    selectedSchedule,
    groupsLoading, 
    groupsError 
  } = useSelector((state) => state.enrollment);

  useEffect(() => {
    if (courseId && selectedLevel && selectedInstructor && availableGroups.length === 0) {
      dispatch(getGroupsByCourseAndInstructor({ 
        courseId, 
        level: selectedLevel, 
        instructorId: selectedInstructor._id 
      }));
    }
  }, [dispatch, courseId, selectedLevel, selectedInstructor, availableGroups.length]);

  const handleGroupSelect = (group) => {
    dispatch(setSelectedGroup(group));
    // Auto-select first schedule if only one available
    if (group.schedule && group.schedule.length === 1) {
      dispatch(setSelectedSchedule(group.schedule[0]));
    } else {
      dispatch(setSelectedSchedule(null));
    }
  };

  const handleScheduleSelect = (schedule) => {
    dispatch(setSelectedSchedule(schedule));
  };

  const handleNext = () => {
    if (selectedGroup && selectedSchedule) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  if (groupsLoading) {
    return (
      <div className={styles.stepFour}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading schedules...</p>
        </div>
      </div>
    );
  }

  if (groupsError) {
    return (
      <div className={styles.stepFour}>
        <div className={styles.error}>
          <h3>Error Loading Schedules</h3>
          <p>{groupsError}</p>
          <button 
            onClick={() => dispatch(getGroupsByCourseAndInstructor({ 
              courseId, 
              level: selectedLevel, 
              instructorId: selectedInstructor._id 
            }))}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stepFour}>
      <div className={styles.stepHeader}>
        <h2>Select Schedule</h2>
        <p>Choose your preferred time slot</p>
      </div>

      {availableGroups.length === 0 ? (
        <div className={styles.noGroups}>
          <h3>No Schedules Available</h3>
          <p>No schedules available for this instructor. Try selecting a different instructor.</p>
        </div>
      ) : (
        <div className={styles.groupsContainer}>
          <div className={styles.groupsGrid}>
            {availableGroups.map((group) => {
              const isSelected = selectedGroup?._id === group._id;
              const spotsLeft = group.spotsLeft || (group.maxStudents - group.currentStudents);
              const isAvailable = group.isAvailable && spotsLeft > 0;
              
              return (
                <div
                  key={group._id}
                  className={`${styles.groupCard} ${isSelected ? styles.selected : ''} ${!isAvailable ? styles.unavailable : ''}`}
                  onClick={() => isAvailable && handleGroupSelect(group)}
                >
                  <div className={styles.groupHeader}>
                    <div className={styles.groupInfo}>
                      <h3>Group {group._id.slice(-4).toUpperCase()}</h3>
                      <span className={`${styles.availabilityBadge} ${isAvailable ? styles.available : styles.full}`}>
                        {isAvailable ? `${spotsLeft} spots` : 'Full'}
                      </span>
                    </div>
                    {isSelected && (
                      <div className={styles.selectIndicator}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className={styles.scheduleSection}>
                    <div className={styles.scheduleList}>
                      {group.schedule.map((schedule, index) => {
                        const isScheduleSelected = selectedSchedule && 
                          selectedSchedule.dayOfWeek === schedule.dayOfWeek &&
                          selectedSchedule.startTime === schedule.startTime &&
                          selectedSchedule.endTime === schedule.endTime;
                        
                        return (
                          <div
                            key={index}
                            className={`${styles.scheduleItem} ${
                              isSelected && isScheduleSelected ? styles.selectedSchedule : ''
                            } ${isSelected ? styles.selectable : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isSelected) {
                                handleScheduleSelect(schedule);
                              }
                            }}
                          >
                            <div className={styles.scheduleDay}>
                              {schedule.dayOfWeek}
                            </div>
                            <div className={styles.scheduleTime}>
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                            <div className={styles.scheduleTimezone}>
                              {schedule.timezone}
                            </div>
                            {isSelected && isScheduleSelected && (
                              <div className={styles.scheduleCheckmark}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.groupStats}>
                    <span>{group.currentStudents || 0}/{group.maxStudents || 0} students</span>
                  </div>
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
          disabled={!selectedGroup || !selectedSchedule}
          className={`${styles.nextButton} ${(!selectedGroup || !selectedSchedule) ? styles.disabled : ''}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepFour;