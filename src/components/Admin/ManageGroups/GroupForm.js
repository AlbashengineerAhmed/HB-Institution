import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructors, createGroup, updateGroup } from '../../../store/slices/groupSlice';
import { fetchCourses } from '../../../store/slices/courseSlice';
import styles from './GroupForm.module.css';

const GroupForm = ({ 
  isOpen, 
  onClose, 
  editingGroup = null, 
  preselectedCourseId = null,
  onSuccess 
}) => {
  const dispatch = useDispatch();
  const { instructors, isLoading, instructorsLoading, error } = useSelector((state) => state.groups);
  const { courses } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState({
    code: '',
    courseId: preselectedCourseId || '',
    instructorId: '',
    level: 'Beginner',
    maxStudents: 30,
    schedule: [
      {
        dayOfWeek: 'Monday',
        startTime: '10:00',
        endTime: '12:00',
        timezone: 'Africa/Cairo'
      }
    ]
  });

  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    if (isOpen) {
      console.log('GroupForm opened, fetching instructors...');
      dispatch(fetchInstructors());
      if (!courses.length) {
        console.log('Fetching courses...');
        dispatch(fetchCourses());
      }
    }
  }, [dispatch, isOpen, courses.length]);

  useEffect(() => {
    console.log('Instructors updated:', instructors);
  }, [instructors]);

  useEffect(() => {
    if (editingGroup) {
      setFormData({
        code: editingGroup.code || '',
        courseId: editingGroup.courseId || '',
        instructorId: editingGroup.instructorId || '',
        level: editingGroup.level || 'Beginner',
        maxStudents: editingGroup.maxStudents || 30,
        schedule: editingGroup.schedule || [
          {
            dayOfWeek: 'Monday',
            startTime: '10:00',
            endTime: '12:00',
            timezone: 'Africa/Cairo'
          }
        ]
      });
    } else if (preselectedCourseId) {
      setFormData(prev => ({
        ...prev,
        courseId: preselectedCourseId
      }));
    }
  }, [editingGroup, preselectedCourseId]);

  // Update selected instructor when instructorId changes
  useEffect(() => {
    if (formData.instructorId && instructors.length > 0) {
      const instructor = instructors.find(inst => (inst._id || inst.id) === formData.instructorId);
      setSelectedInstructor(instructor || null);
    } else {
      setSelectedInstructor(null);
    }
  }, [formData.instructorId, instructors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingGroup) {
        await dispatch(updateGroup({ groupId: editingGroup._id, groupData: formData }));
      } else {
        await dispatch(createGroup(formData));
      }
      
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error('Error saving group:', error);
    }
  };

  const handleInstructorChange = (instructorId) => {
    setFormData({ ...formData, instructorId });
    
    if (instructorId && instructors.length > 0) {
      const instructor = instructors.find(inst => (inst._id || inst.id) === instructorId);
      setSelectedInstructor(instructor || null);
    } else {
      setSelectedInstructor(null);
    }
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setFormData({ ...formData, schedule: newSchedule });
  };

  const addScheduleSlot = () => {
    setFormData({
      ...formData,
      schedule: [
        ...formData.schedule,
        {
          dayOfWeek: 'Monday',
          startTime: '10:00',
          endTime: '12:00',
          timezone: 'Africa/Cairo'
        }
      ]
    });
  };

  const removeScheduleSlot = (index) => {
    const newSchedule = formData.schedule.filter((_, i) => i !== index);
    setFormData({ ...formData, schedule: newSchedule });
  };

  const getAvailabilityForDay = (dayOfWeek) => {
    if (!selectedInstructor?.availableTime) return null;
    
    const dayKey = dayOfWeek.toLowerCase();
    return selectedInstructor.availableTime[dayKey] || null;
  };

  const isTimeSlotValid = (dayOfWeek, startTime, endTime) => {
    const availability = getAvailabilityForDay(dayOfWeek);
    if (!availability) return false;
    
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    
    return startHour >= availability.from && endHour <= availability.to;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{editingGroup ? 'Edit Group' : 'Create New Group'}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <p>Error: {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="code">Group Code *</label>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
              placeholder="e.g., ENG101-G"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="courseId">Course *</label>
            <select
              id="courseId"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              required
              disabled={!!preselectedCourseId}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="instructorId">Instructor *</label>
            <select
              id="instructorId"
              value={formData.instructorId}
              onChange={(e) => handleInstructorChange(e.target.value)}
              required
              disabled={instructorsLoading}
            >
              <option value="">
                {instructorsLoading ? 'Loading instructors...' : 'Select an instructor'}
              </option>
              {instructors && instructors.length > 0 ? (
                instructors.map((instructor) => (
                  <option key={instructor._id || instructor.id} value={instructor._id || instructor.id}>
                    {instructor.firstName} {instructor.lastName}
                  </option>
                ))
              ) : (
                !instructorsLoading && (
                  <option value="" disabled>No instructors available</option>
                )
              )}
            </select>
            {instructorsLoading && (
              <small className={styles.loadingText}>Loading instructors...</small>
            )}
            {!instructorsLoading && (!instructors || instructors.length === 0) && (
              <small className={styles.errorText}>
                No instructors found. Please check your connection or try again.
              </small>
            )}
          </div>

          {/* Instructor Availability Display */}
          {selectedInstructor && (
            <div className={styles.instructorAvailability}>
              <h4>📅 {selectedInstructor.firstName} {selectedInstructor.lastName}'s Availability</h4>
              {selectedInstructor.availableTime && Object.keys(selectedInstructor.availableTime).length > 0 ? (
                <div className={styles.availabilityGrid}>
                  {Object.entries(selectedInstructor.availableTime).map(([day, timeData]) => (
                    <div key={day} className={styles.availabilityDay}>
                      <div className={styles.dayName}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </div>
                      <div className={styles.timeRange}>
                        🕐 {timeData.from}:00 - {timeData.to}:00
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noAvailability}>
                  <span className={styles.warningIcon}>⚠️</span>
                  <span>This instructor has not set their availability yet.</span>
                </div>
              )}
            </div>
          )}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="level">Level</label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="maxStudents">Max Students</label>
              <input
                type="number"
                id="maxStudents"
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                min="1"
                max="100"
              />
            </div>
          </div>

          <div className={styles.scheduleSection}>
            <div className={styles.scheduleSectionHeader}>
              <h4>Schedule</h4>
              <button
                type="button"
                onClick={addScheduleSlot}
                className={styles.addScheduleButton}
              >
                + Add Time Slot
              </button>
            </div>

            {selectedInstructor && selectedInstructor.availableTime && Object.keys(selectedInstructor.availableTime).length > 0 && (
              <div className={styles.scheduleHint}>
                <span className={styles.hintIcon}>💡</span>
                <span>Schedule times must be within the instructor's available hours shown above.</span>
              </div>
            )}

            {formData.schedule.map((slot, index) => {
              const availability = getAvailabilityForDay(slot.dayOfWeek);
              const isValidSlot = selectedInstructor ? isTimeSlotValid(slot.dayOfWeek, slot.startTime, slot.endTime) : true;
              
              return (
                <div key={index} className={styles.scheduleSlotForm}>
                  <div className={styles.scheduleRow}>
                    <div className={styles.formGroup}>
                      <label>Day</label>
                      <select
                        value={slot.dayOfWeek}
                        onChange={(e) => handleScheduleChange(index, 'dayOfWeek', e.target.value)}
                        className={availability ? styles.availableDay : styles.unavailableDay}
                      >
                        {daysOfWeek.map((day) => {
                          const dayAvailability = getAvailabilityForDay(day);
                          return (
                            <option key={day} value={day}>
                              {day} {dayAvailability ? `(${dayAvailability.from}:00-${dayAvailability.to}:00)` : '(Not available)'}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Start Time</label>
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                        className={!isValidSlot ? styles.invalidTime : ''}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>End Time</label>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                        className={!isValidSlot ? styles.invalidTime : ''}
                      />
                    </div>

                    {formData.schedule.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeScheduleSlot(index)}
                        className={styles.removeScheduleButton}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Availability validation feedback */}
                  {selectedInstructor && (
                    <div className={styles.scheduleValidation}>
                      {!availability ? (
                        <div className={styles.validationError}>
                          <span className={styles.errorIcon}>❌</span>
                          <span>Instructor is not available on {slot.dayOfWeek}</span>
                        </div>
                      ) : !isValidSlot ? (
                        <div className={styles.validationError}>
                          <span className={styles.errorIcon}>❌</span>
                          <span>
                            Time slot must be within {availability.from}:00 - {availability.to}:00
                          </span>
                        </div>
                      ) : (
                        <div className={styles.validationSuccess}>
                          <span className={styles.successIcon}>✅</span>
                          <span>Valid time slot</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || instructorsLoading}
            >
              {isLoading ? 'Saving...' : editingGroup ? 'Update Group' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;