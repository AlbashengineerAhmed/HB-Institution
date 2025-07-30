import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../../utils/priceUtils';
import styles from './InstructorDashboard.module.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import SendNote from '../../components/SendNote/SendNote';
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
  clearError
} from '../../store/slices/instructorDashboardSlice';

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    lockError
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

  const formatSchedule = (schedule) => {
    if (!schedule || schedule.length === 0) return 'No schedule';
    return schedule.map(s => 
      `${s.dayOfWeek} ${s.startTime}-${s.endTime}`
    ).join(', ');
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
      </div>
    </ErrorBoundary>
  );
};

export default InstructorDashboard;