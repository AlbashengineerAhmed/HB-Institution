import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../../utils/priceUtils';
import styles from './InstructorDashboard.module.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import LessonDetails from '../../components/Shared/LessonDetails/LessonDetails';
import AttendanceDetails from '../../components/Instructor/AttendanceDetails/AttendanceDetails';
import { 
  fetchInstructorDashboard,
  fetchCourseUnits,
  fetchUnitLessons,
  toggleLessonLock,
  toggleUnitLock,
  markLessonAsCompleted,
  toggleCourseExpansion,
  toggleUnitExpansion,
  updateLessonLockStatusOptimistic,
  updateUnitLockStatusOptimistic,
  clearError,
  createMeeting
} from '../../store/slices/instructorDashboardSlice';

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showLessonDetails, setShowLessonDetails] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showMeetingFormFor, setShowMeetingFormFor] = useState(null);
  const [meetingForm, setMeetingForm] = useState({ 
    duration: 60,
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: new Date().toTimeString().slice(0, 5)
  });

  // Get user data from auth state (same as Header component)
  const { user } = useSelector((state) => state.auth);
  
  const { 
    groups, 
    courseDetails, 
    unitLessons, 
    expandedCourses, 
    expandedUnits,
    isLoading, 
    isLoadingCourse,
    isLoadingLessons,
    isUpdatingLock,
    error,
    courseError,
    lessonsError,
    lockError,
    isCreatingMeeting,
    createMeetingError
  } = useSelector((state) => state.instructorDashboard);

  // Calculate instructor stats from real data
  const instructorStats = {
    totalGroups: groups.length,
    totalStudents: groups.reduce((sum, group) => sum + group.currentStudents, 0),
    totalCourses: new Set(groups.map(group => group.course._id)).size,
  };

  // Combine user data with stats (same approach as Header)
  const instructorData = user ? {
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Instructor',
    email: user.email || 'instructor@hbi.edu',
    firstName: user.firstName || 'Instructor',
    lastName: user.lastName || '',
    userId: user._id || user.id,
    role: user.role,
    ...instructorStats,
  } : null;

  useEffect(() => {
    dispatch(fetchInstructorDashboard());
  }, [dispatch]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle group expansion and fetch course units
  const handleGroupToggle = async (groupId, courseId) => {
    dispatch(toggleCourseExpansion(groupId)); // Using groupId as key for expansion
    
    // Fetch course units if not already loaded and expanding
    if (!expandedCourses[groupId] && !courseDetails[courseId]) {
      dispatch(fetchCourseUnits({ groupId, courseId }));
    }
  };

  // Handle unit expansion and fetch lessons
  const handleUnitToggle = async (unitId, isLocked, groupId) => {
    // Prevent expansion if unit is locked
    if (isLocked) {
      console.log('🔒 Unit is locked, preventing expansion:', unitId);
      return;
    }
    
    dispatch(toggleUnitExpansion(unitId));

    // Fetch unit lessons if not already loaded and expanding
    if (!expandedUnits[unitId] && !unitLessons[unitId]) {
      dispatch(fetchUnitLessons({ groupId, unitId }));
    }
  };

  // Handle lesson lock/unlock toggle
  const handleLessonLockToggle = async (lessonId, currentUnlockedStatus, unitId, groupId) => {
    console.log('🔄 Lesson lock toggle clicked:', {
      lessonId,
      currentUnlockedStatus,
      unitId,
      groupId,
      newStatus: !currentUnlockedStatus
    });
    
    // Optimistic update
    dispatch(updateLessonLockStatusOptimistic({
      unitId,
      lessonId,
      isUnlocked: !currentUnlockedStatus
    }));
    
    // API call
    try {
      const result = await dispatch(toggleLessonLock({ lessonId, groupId })).unwrap();
      console.log('✅ Lesson lock toggle API success:', result);
    } catch (error) {
      console.log('❌ Lesson lock toggle API failed:', error);
      // Revert optimistic update on error
      dispatch(updateLessonLockStatusOptimistic({
        unitId,
        lessonId,
        isUnlocked: currentUnlockedStatus
      }));
    }
  };

  // Handle unit lock/unlock toggle
  const handleUnitLockToggle = async (unitId, currentUnlockedStatus, courseId, groupId) => {
    console.log('🔄 Unit lock toggle clicked:', {
      unitId,
      currentUnlockedStatus,
      courseId,
      groupId,
      newStatus: !currentUnlockedStatus
    });
    
    // Optimistic update
    dispatch(updateUnitLockStatusOptimistic({
      courseId,
      unitId,
      isUnlocked: !currentUnlockedStatus
    }));
    
    // API call
    try {
      const result = await dispatch(toggleUnitLock({ unitId, groupId })).unwrap();
      console.log('✅ Unit lock toggle API success:', result);
    } catch (error) {
      console.log('❌ Unit lock toggle API failed:', error);
      // Revert optimistic update on error
      dispatch(updateUnitLockStatusOptimistic({
        courseId,
        unitId,
        isUnlocked: currentUnlockedStatus
      }));
    }
  };

  // Handle mark lesson as completed
  const handleMarkLessonAsCompleted = async (lessonId, groupId) => {
    console.log('🔄 Mark lesson as completed clicked:', {
      lessonId,
      groupId
    });
    
    try {
      const result = await dispatch(markLessonAsCompleted({ lessonId, groupId })).unwrap();
      console.log('✅ Lesson marked as completed successfully:', result);
    } catch (error) {
      console.log('❌ Failed to mark lesson as completed:', error);
    }
  };

  // Create meeting handlers
  const handleOpenMeetingForm = (lessonId, groupId) => {
    setShowMeetingFormFor({ lessonId, groupId });
    setMeetingForm({ duration: 60, scheduledDate: '', scheduledTime: '' });
  };

  const handleCreateMeeting = async () => {
    if (!showMeetingFormFor) return;
    const { lessonId, groupId } = showMeetingFormFor;
    
    try {
      // Combine date and time to create ISO string
      const scheduledDateTime = new Date(meetingForm.scheduledDate + 'T' + meetingForm.scheduledTime);
      
      await dispatch(createMeeting({ 
        lessonId, 
        groupId, 
        duration: meetingForm.duration,
        scheduledStartTime: scheduledDateTime.toISOString()
      })).unwrap();
      setShowMeetingFormFor(null);
    } catch (e) {
      // Errors are handled via toast in thunk
    }
  };

  // Handle lesson details view
  const handleViewLessonDetails = (lessonId, groupId) => {
    setSelectedLessonId(lessonId);
    setSelectedGroupId(groupId);
    setShowLessonDetails(true);
  };

  // Handle close lesson details
  const handleCloseLessonDetails = () => {
    setShowLessonDetails(false);
    setSelectedLessonId(null);
    setSelectedGroupId(null);
  };

  // Handle view attendance details
  const handleViewAttendance = (lessonId) => {
    setSelectedLessonId(lessonId);
    setShowAttendance(true);
  };

  // Handle close attendance details
  const handleCloseAttendance = () => {
    setShowAttendance(false);
    setSelectedLessonId(null);
  };

  const getLevelBadgeClass = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return styles.levelBeginner;
      case 'intermediate': return styles.levelIntermediate;
      case 'advanced': return styles.levelAdvanced;
      default: return styles.levelBeginner;
    }
  };

  const renderMyGroups = () => {
    if (groups.length === 0) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>👥</div>
          <h3 className={styles.emptyTitle}>No Groups Assigned</h3>
          <p className={styles.emptyText}>You don't have any groups assigned yet.</p>
        </div>
      );
    }

    return (
      <div className={styles.groupsSection}>
        <h2>My Groups ({groups.length})</h2>
        
        <div className={styles.groupsList}>
          {groups.map((group) => (
            <div key={group._id} className={styles.groupCard}>
              {/* Group Header */}
              <div 
                className={styles.groupHeader}
                onClick={() => handleGroupToggle(group._id, group.course._id)}
              >
                <div className={styles.courseImage}>
                  <img src={group.course.image} alt={group.course.title} />
                </div>
                <div className={styles.groupInfo}>
                  <div className={styles.groupTitleSection}>
                    <h3>{group.course.title}</h3>
                    <div className={styles.groupBadges}>
                      <span className={styles.groupCodeBadge}>{group.code}</span>
                      <span className={`${styles.levelBadge} ${getLevelBadgeClass(group.level)}`}>
                        {group.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.groupMeta}>
                    <span className={styles.duration}>📅 {group.course.duration}</span>
                    <span className={styles.price}>💰 {formatPrice(group.course.price)}</span>
                    <span className={styles.enrollment}>
                      👥 {group.currentStudents}/{group.maxStudents} students
                    </span>
                  </div>

                  <div className={styles.scheduleInfo}>
                    <h4 className={styles.scheduleTitle}>📅 Schedule</h4>
                    <div className={styles.scheduleDetails}>
                      {group.schedule.map((scheduleItem, index) => (
                        <span key={scheduleItem._id || index} className={styles.scheduleItem}>
                          {scheduleItem.dayOfWeek} {scheduleItem.startTime}-{scheduleItem.endTime}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.expandIcon}>
                  {expandedCourses[group._id] ? '▼' : '▶'}
                </div>
              </div>

              {/* Group Course Content */}
              {expandedCourses[group._id] && (
                <div className={styles.groupContent}>
                  <div className={styles.groupContentHeader}>
                    <h4>Course Content for Group: {group.code}</h4>
                    <div className={styles.groupActions}>
                      <button className={styles.viewStudentsBtn}>
                        👥 View Students ({group.currentStudents})
                      </button>
                      <button className={styles.groupSettingsBtn}>
                        ⚙️ Group Settings
                      </button>
                    </div>
                  </div>

                  {isLoadingCourse ? (
                    <div className={styles.loadingUnits}>
                      <div className={styles.loadingSpinner}></div>
                      <p>Loading course units...</p>
                    </div>
                  ) : courseError ? (
                    <div className={styles.errorMessage}>
                      <p>❌ Failed to load course units</p>
                    </div>
                  ) : courseDetails[group.course._id] ? (
                    <div className={styles.unitsSection}>
                      <h5>Course Units ({courseDetails[group.course._id].length || 0})</h5>
                      <div className={styles.unitsList}>
                        {courseDetails[group.course._id]?.map((unit) => {
                          console.log('🔍 Rendering unit:', unit.id, 'unlocked status:', unit.unlocked);
                          return (
                            <div key={unit.id} className={`${styles.unitCard} ${!unit.unlocked ? styles.lockedUnit : ''}`}>
                              {/* Unit Header */}
                              <div 
                                className={`${styles.unitHeader} ${!unit.unlocked ? styles.lockedHeader : ''}`}
                                onClick={() => handleUnitToggle(unit.id, !unit.unlocked, group._id)}
                                style={{ cursor: !unit.unlocked ? 'not-allowed' : 'pointer' }}
                              >
                                <div className={styles.unitInfo}>
                                  <h6>{unit.title}</h6>
                                  <p>{unit.course}</p>
                                  {!unit.unlocked && (
                                    <p className={styles.lockedMessage}>
                                      🔒 This unit is locked. Unlock it to view lessons.
                                    </p>
                                  )}
                                </div>
                                <div className={styles.unitControls}>
                                  <button
                                    className={`${styles.lockButton} ${!unit.unlocked ? styles.locked : styles.unlocked}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUnitLockToggle(unit.id, unit.unlocked, group.course._id, group._id);
                                    }}
                                    disabled={isUpdatingLock}
                                    title={`${!unit.unlocked ? 'Unlock' : 'Lock'} unit for group ${group.code}`}
                                  >
                                    {!unit.unlocked ? '🔒 Locked' : '🔓 Unlocked'}
                                  </button>
                                  <div className={`${styles.expandIcon} ${!unit.unlocked ? styles.disabled : ''}`}>
                                    {!unit.unlocked ? '🔒' : (expandedUnits[unit.id] ? '▼' : '▶')}
                                  </div>
                                </div>
                              </div>

                              {/* Unit Lessons - Only show if unit is unlocked */}
                              {unit.unlocked && expandedUnits[unit.id] && (
                                <div className={styles.lessonsSection}>
                                  {isLoadingLessons ? (
                                    <div className={styles.loadingLessons}>
                                      <div className={styles.loadingSpinner}></div>
                                      <p>Loading lessons...</p>
                                    </div>
                                  ) : lessonsError ? (
                                    <div className={styles.errorMessage}>
                                      <p>❌ Failed to load lessons</p>
                                    </div>
                                  ) : unitLessons[unit.id] ? (
                                    <div className={styles.lessonsList}>
                                      <div className={styles.lessonsHeader}>
                                        <h6>Lessons ({unitLessons[unit.id]?.length || 0})</h6>
                                        <span className={styles.groupNote}>Managing for group: {group.code}</span>
                                      </div>
                                      {unitLessons[unit.id]?.length === 0 ? (
                                        <p className={styles.noLessons}>No lessons available</p>
                                      ) : (
                                        unitLessons[unit.id]?.map((lesson) => (
                                          <div key={lesson.id} className={styles.lessonItem}>
                                            <div className={styles.lessonInfo}>
                                              <span className={styles.lessonOrder}>#{lesson.order}</span>
                                              <div className={styles.lessonDetails}>
                                                <h6>{lesson.title}</h6>
                                                <p>{lesson.unit}</p>
                                              </div>
                                            </div>
                                            <div className={styles.lessonControls}>
                                              <button
                                                className={styles.detailsButton}
                                                onClick={() => lesson.unlocked && handleViewLessonDetails(lesson.id, group._id)}
                                                title={lesson.unlocked ? `View lesson details for ${lesson.title}` : 'Lesson is locked'}
                                                disabled={!lesson.unlocked}
                                              >
                                                📖 Study Lesson
                                              </button>
                                              <button
                                                className={`${styles.lockButton} ${!lesson.unlocked ? styles.locked : styles.unlocked}`}
                                                onClick={() => handleLessonLockToggle(lesson.id, lesson.unlocked, unit.id, group._id)}
                                                disabled={isUpdatingLock}
                                                title={`${!lesson.unlocked ? 'Unlock' : 'Lock'} lesson for group ${group.code}`}
                                              >
                                                {!lesson.unlocked ? '🔒 Locked' : '🔓 Unlocked'}
                                              </button>
                                              <button
                                                className={styles.completeButton}
                                                onClick={() => handleMarkLessonAsCompleted(lesson.id, group._id)}
                                                disabled={isUpdatingLock}
                                                title={`Mark lesson as completed for group ${group.code}`}
                                              >
                                                ✅ Mark Complete
                                              </button>
                                              <button
                                                className={styles.attendanceButton}
                                                onClick={() => handleViewAttendance(lesson.id)}
                                                title={`View attendance for ${lesson.title}`}
                                              >
                                                📊 Attendance
                                              </button>
                                              <button
                                                className={styles.newCourseBtn}
                                                onClick={() => handleOpenMeetingForm(lesson.id, group._id)}
                                                title={`Create meeting for ${lesson.title}`}
                                              >
                                                🧑‍🏫 Create Meeting
                                              </button>
                                            </div>
                                          </div>
                                        ))
                                      )}
                                    </div>
                                  ) : (
                                    <p>Click to load lessons</p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p>Click to load course units</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Show loading state while fetching data or if no user data
  if (isLoading || !instructorData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>🔄</div>
        <p>Loading instructor dashboard...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>❌</div>
        <h3>Error Loading Dashboard</h3>
        <p>{error}</p>
        <button 
          className={styles.retryBtn}
          onClick={() => dispatch(fetchInstructorDashboard())}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.instructorDashboard}>
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div className={styles.mobileOverlay} onClick={closeMobileMenu}></div>
        )}

        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.sidebarHeader}>
            {/* Close Button - Always visible */}
            <button 
              className={styles.closeBtn}
              onClick={closeMobileMenu}
              title="Close sidebar"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className={styles.instructorInfo}>
              <div className={styles.instructorAvatar}>
                {instructorData.firstName?.charAt(0) || instructorData.email?.charAt(0) || 'I'}
              </div>
              <div className={styles.instructorDetails}>
                <h3 className={styles.instructorName}>{instructorData.name}</h3>
                <p className={styles.instructorTitle}>Instructor</p>
                <p className={styles.instructorEmail}>{instructorData.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{instructorData.totalCourses}</span>
              <span className={styles.statLabel}>Courses</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{instructorData.totalStudents}</span>
              <span className={styles.statLabel}>Students</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{instructorData.totalGroups}</span>
              <span className={styles.statLabel}>Groups</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <header className={styles.mainHeader}>
            <div className={styles.headerLeft}>
              <button 
                className={styles.mobileMenuToggle}
                onClick={toggleMobileMenu}
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
              <h1 className={styles.pageTitle}>My Groups</h1>
            </div>
          </header>
          
          <div className={styles.contentArea}>
            <ErrorBoundary>
              {/* Error Display */}
              {(error || courseError || lessonsError || lockError) && (
                <div className={styles.errorMessage}>
                  <p>❌ {error || courseError || lessonsError || lockError}</p>
                  <button onClick={() => dispatch(clearError())}>Dismiss</button>
                </div>
              )}
              
              {renderMyGroups()}
            </ErrorBoundary>
          </div>
        </main>

        {/* Lesson Details Modal */}
        {showLessonDetails && selectedLessonId && selectedGroupId && (
          <div className={styles.modalOverlay} onClick={handleCloseLessonDetails}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>Lesson Details</h3>
                <button 
                  className={styles.closeModalBtn}
                  onClick={handleCloseLessonDetails}
                  title="Close lesson details"
                >
                  ✕
                </button>
              </div>
              <div className={styles.modalBody}>
                <LessonDetails 
                  lessonId={selectedLessonId}
                  groupId={selectedGroupId}
                  userRole="instructor"
                />
              </div>
            </div>
          </div>
        )}

        {/* Create Meeting Modal */}
        {showMeetingFormFor && (
          <div className={styles.modalOverlay} onClick={() => setShowMeetingFormFor(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>Create Meeting</h3>
                <button 
                  className={styles.closeModalBtn}
                  onClick={() => setShowMeetingFormFor(null)}
                  title="Close meeting form"
                >
                  ✕
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formRow}>
                  <label>Scheduled Date</label>
                  <input
                    type="date"
                    value={meetingForm.scheduledDate}
                    onChange={(e) => setMeetingForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className={styles.formInput}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className={styles.formRow}>
                  <label>Scheduled Time</label>
                  <input
                    type="time"
                    value={meetingForm.scheduledTime}
                    onChange={(e) => setMeetingForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formRow}>
                  <label>Meeting Duration</label>
                  <input
                    type="number"
                    min="15"
                    max="180"
                    value={meetingForm.duration}
                    onChange={(e) => setMeetingForm(prev => ({ ...prev, duration: Number(e.target.value) }))}
                    className={styles.formInput}
                    placeholder="Duration in minutes"
                  />
                </div>
                {createMeetingError && (
                  <div className={styles.errorMessage}>
                    <p>❌ {createMeetingError}</p>
                  </div>
                )}
              </div>
              <div className={styles.modalFooter}>
                <button 
                  className={styles.newCourseBtn} 
                  onClick={handleCreateMeeting} 
                  disabled={isCreatingMeeting}
                  style={{ padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '0.95rem', borderRadius: '8px' }}
                >
                  {isCreatingMeeting ? '🔄 Creating...' : '✅ Create Meeting'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Modal */}
        {showAttendance && selectedLessonId && (
          <div className={styles.modalOverlay} onClick={handleCloseAttendance}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ width: '90%', maxWidth: '1000px' }}>
              <div className={styles.modalHeader}>
                <h3>Lesson Attendance</h3>
                <button 
                  className={styles.closeModalBtn}
                  onClick={handleCloseAttendance}
                  title="Close attendance details"
                >
                  ✕
                </button>
              </div>
              <div className={styles.modalBody}>
                <AttendanceDetails 
                  lessonId={selectedLessonId}
                  onClose={handleCloseAttendance}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default InstructorDashboard;