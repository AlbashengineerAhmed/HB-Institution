import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StudentDashboard.module.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import { fetchStudentDashboard, fetchUnitsData, fetchLessonsData } from '../../store/slices/studentDashboardSlice';
import SendNote from '../../components/SendNote/SendNote';

// Lazy load components to identify loading issues
const MyCourses = React.lazy(() => import('../../components/Student/MyCourses/MyCourses'));
const CourseContent = React.lazy(() => import('../../components/Student/CourseContent/CourseContent'));
const LessonDetails = React.lazy(() => import('../../components/Shared/LessonDetails/LessonDetails'));
const StudentCalendar = React.lazy(() => import('../../components/Student/StudentCalendar/StudentCalendar'));

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState(null);
    const [showAllLessons, setShowAllLessons] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');
  const [expandedUnits, setExpandedUnits] = useState({});

  // Get user data from auth state (same as Header component)
  const { user } = useSelector((state) => state.auth);
  const { courses, units, lessons, isLoading, isLoadingUnits, isLoadingLessons, error, unitsError, lessonsError } = useSelector((state) => state.studentDashboard);

  // Calculate student stats from new API data structure
  const studentStats = {
    enrolledCourses: courses.length,
    completedCourses: 0, // Will be updated when course completion data is available
    totalProgress: 0 // Will be updated when progress data is available
  };

  // Combine user data with stats (same approach as Header)
  const studentData = user ? {
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Student',
    email: user.email || 'student@hbi.edu',
    firstName: user.firstName || 'Student',
    lastName: user.lastName || '',
    userId: user._id || user.id,
    role: user.role,
    ...studentStats,
  } : null;

  useEffect(() => {
    dispatch(fetchStudentDashboard());
    
    // Check URL parameters for lessonId and groupId to handle redirects from calendar
    const urlParams = new URLSearchParams(window.location.search);
    const lessonIdParam = urlParams.get('lessonId');
    const groupIdParam = urlParams.get('groupId');
    
    if (lessonIdParam && groupIdParam) {
      // Set the selected lesson and active section
      setSelectedLesson({ lessonId: lessonIdParam, groupId: groupIdParam });
      setActiveSection('lessons');
    }
  }, [dispatch]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Navigation handlers
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedCourse(null);
    setShowAllLessons(false);
    setSelectedLesson(null);
    setExpandedUnits({});
    closeMobileMenu();
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowAllLessons(false);
    setSelectedLesson(null);
    setExpandedUnits({});
    closeMobileMenu(); // Close mobile menu when navigating
  };

  const handleViewAllLessons = (course) => {
    setSelectedCourse(course);
    setShowAllLessons(true);
    setSelectedLesson(null);
    setExpandedUnits({});
    closeMobileMenu();
    
    // Fetch units data using group ID and course ID
    if (course.group && course.group._id && course.id) {
      dispatch(fetchUnitsData({ groupId: course.group._id, courseId: course.id }));
    }
  };

  // Handle unit click to fetch lessons and toggle expansion
  const handleUnitClick = (unit) => {
    const isExpanding = !expandedUnits[unit.id];
    
    setExpandedUnits(prev => ({
      ...prev,
      [unit.id]: isExpanding
    }));

    // Fetch lessons if expanding and not already loaded
    if (isExpanding && selectedCourse && selectedCourse.group && selectedCourse.group._id) {
      dispatch(fetchLessonsData({ groupId: selectedCourse.group._id, unitId: unit.id }));
    }
  };

  
  const handleLessonClick = (lessonId, groupId) => {
    setSelectedLesson({ lessonId, groupId });
    setShowAllLessons(false);
    setExpandedUnits({});
    closeMobileMenu();
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setShowAllLessons(false);
    setSelectedLesson(null);
    setExpandedUnits({});
    setActiveSection('courses');
  };

  const handleBackToAllLessons = () => {
    setSelectedLesson(null);
    setShowAllLessons(true);
  };

  const renderActiveSection = () => {
    const LoadingSpinner = () => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        fontSize: '18px',
        color: 'var(--primary-color)'
      }}>
        <div>🔄 Loading...</div>
      </div>
    );

    // Show send note when send-note section is active
    if (activeSection === 'send-note') {
      return (
        <SendNote 
          onSuccess={() => {
            // Optionally navigate back to courses after successful send
            handleSectionChange('courses');
          }}
        />
      );
    }

    // Show calendar when calendar section is active
    if (activeSection === 'calendar') {
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <StudentCalendar />
        </React.Suspense>
      );
    }

    if (selectedLesson) {
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <div className={styles.lessonDetailsContainer}>
            <div className={styles.backButton}>
              <button 
                onClick={handleBackToAllLessons}
                className={styles.backBtn}
              >
                ← Back to Lessons
              </button>
            </div>
            <LessonDetails 
              lessonId={selectedLesson.lessonId}
              groupId={selectedLesson.groupId}
              userRole="student"
            />
          </div>
        </React.Suspense>
      );
    }

    
    if (showAllLessons && selectedCourse) {
      return (
        <div className={styles.courseDetailsView}>
          {/* Compact Course Header */}
          <div className={styles.compactCourseHeader}>
            <div className={styles.courseImageSmall}>
              <img 
                src={selectedCourse.thumbnail} 
                alt={selectedCourse.title}
                onError={(e) => {
                  e.target.src = '/images/default-course.jpg';
                }}
              />
            </div>
            <div className={styles.courseHeaderInfo}>
              <h2 className={styles.courseTitle}>{selectedCourse.title}</h2>
              <div className={styles.courseMeta}>
                <span className={styles.courseGroup}>
                  👥 {selectedCourse.group?.name || 'No Group'}
                </span>
                <span className={styles.courseLevel}>
                  📊 {selectedCourse.group?.level || 'N/A'}
                </span>
                <span className={styles.courseDuration}>
                  ⏱️ {selectedCourse.duration}
                </span>
                <span className={styles.coursePrice}>
                  💰 {selectedCourse.price === 0 ? 'Free' : `$${selectedCourse.price}`}
                </span>
              </div>
            </div>
          </div>

          {/* Course Schedule */}
          {selectedCourse.group?.schedule && selectedCourse.group.schedule.length > 0 && (
            <div className={styles.scheduleSection}>
              <h3 className={styles.sectionTitle}>📅 Class Schedule</h3>
              <div className={styles.scheduleGrid}>
                {selectedCourse.group.schedule.map((schedule, index) => (
                  <div key={index} className={styles.scheduleCard}>
                    <div className={styles.scheduleDay}>{schedule.dayOfWeek}</div>
                    <div className={styles.scheduleTime}>
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                    <div className={styles.scheduleTimezone}>{schedule.timezone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Content - Units with Dropdown Lessons */}
          <div className={styles.courseContentSection}>
            <h3 className={styles.sectionTitle}>📚 Course Content</h3>
            
            {isLoadingUnits ? (
              <div className={styles.loadingState}>
                <div className={styles.loadingSpinner}>🔄</div>
                <span>Loading course content...</span>
              </div>
            ) : unitsError ? (
              <div className={styles.errorState}>
                <div className={styles.errorIcon}>❌</div>
                <p>Error loading course content: {unitsError}</p>
              </div>
            ) : units.length > 0 ? (
              <div className={styles.unitsDropdownList}>
                {units.map((unit, index) => (
                  <div key={unit.id} className={styles.unitDropdownItem}>
                    {/* Unit Header - Clickable */}
                    <div 
                      className={`${styles.unitDropdownHeader} ${!unit.unlocked ? styles.disabled : ''}`}
                      onClick={() => unit.unlocked && handleUnitClick(unit)}
                    >
                      <div className={styles.unitHeaderLeft}>
                        <span className={styles.expandIcon}>
                          {expandedUnits[unit.id] ? '▼' : '▶'}
                        </span>
                        <div className={styles.unitInfo}>
                          <h4 className={styles.unitTitle}>
                            Unit {index + 1}: {unit.title}
                          </h4>
                          <p className={styles.unitMeta}>
                            Course: {unit.course}
                            <span className={`${styles.statusBadge} ${unit.completed ? styles.completed : styles.incomplete}`}>
                              {unit.completed ? '✅ Completed' : '⭕ In Progress'}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className={styles.unitHeaderRight}>
                        <span className={`${styles.statusBadge} ${unit.unlocked ? styles.unlocked : styles.locked}`}>
                          {unit.unlocked ? '🔓 Unlocked' : '🔒 Locked'}
                        </span>
                      </div>
                    </div>

                    {/* Unit Lessons Dropdown */}
                    {unit.unlocked && expandedUnits[unit.id] && (
                      <div className={styles.lessonsDropdown}>
                        {isLoadingLessons ? (
                          <div className={styles.loadingState}>
                            <div className={styles.loadingSpinner}>🔄</div>
                            <span>Loading lessons...</span>
                          </div>
                        ) : lessonsError ? (
                          <div className={styles.errorState}>
                            <div className={styles.errorIcon}>❌</div>
                            <p>Error loading lessons: {lessonsError}</p>
                          </div>
                        ) : lessons.length > 0 ? (
                          <div className={styles.lessonsList}>
                            {lessons.map((lesson, lessonIndex) => (
                              <div 
                                key={lesson.id} 
                                className={`${styles.lessonDropdownItem} ${!lesson.unlocked ? styles.disabled : ''}`}
                                onClick={() => lesson.unlocked && handleLessonClick(lesson.id, selectedCourse.group?._id)}
                              >
                                <div className={styles.lessonInfo}>
                                  <span className={styles.lessonOrder}>
                                    {lesson.order || lessonIndex + 1}
                                  </span>
                                  <div className={styles.lessonDetails}>
                                    <h5 className={styles.lessonTitle}>{lesson.title}</h5>
                                    <p className={styles.lessonUnit}>Unit: {lesson.unit}</p>
                                  </div>
                                </div>
                                <div className={styles.lessonActions}>
                                  <span className={`${styles.statusBadge} ${lesson.unlocked ? styles.unlocked : styles.locked}`}>
                                    {lesson.unlocked ? '🔓 Unlocked' : '🔒 Locked'}
                                  </span>
                                  {lesson.unlocked && (
                                    <button 
                                      className={styles.playButton}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleLessonClick(lesson.id, selectedCourse.group?._id);
                                      }}
                                      title="Study lesson"
                                    >
                                      📖 Study
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className={styles.emptyLessons}>
                            <span>📝 No lessons available for this unit</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📚</div>
                <h4>No Course Content Available</h4>
                <p>This course doesn't have any units or lessons yet.</p>
              </div>
            )}
          </div>

                  </div>
      );
    }

    if (selectedCourse) {
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <CourseContent 
            course={selectedCourse}
            onBack={handleBackToCourses}
          />
        </React.Suspense>
      );
    }

    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <MyCourses 
          onViewCourse={handleViewCourse}
          onViewAllLessons={handleViewAllLessons}
        />
      </React.Suspense>
    );
  };

  const getPageTitle = () => {
    if (activeSection === 'send-note') {
      return 'Send Note to Admin';
    }
    if (activeSection === 'calendar') {
      return 'Calendar';
    }
    if (selectedLesson) {
      return 'Lesson Details';
    }
        if (showAllLessons && selectedCourse) {
      return `Course Details: ${selectedCourse.title}`;
    }
    if (selectedCourse) {
      return selectedCourse.title;
    }
    return 'My Courses';
  };

  // Show loading state only while fetching data, not when no user data
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>🔄</div>
        <p>Loading student dashboard...</p>
      </div>
    );
  }

  // Show error state if no user data after loading
  if (!studentData) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>❌</div>
        <h3>User Data Not Available</h3>
        <p>Unable to load student information. Please try logging in again.</p>
        <button 
          className={styles.retryBtn}
          onClick={() => window.location.href = '/login'}
        >
          🔄 Go to Login
        </button>
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
          onClick={() => dispatch(fetchStudentDashboard())}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.studentDashboard}>
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
            
            <div className={styles.studentInfo}>
              <div className={styles.studentAvatar}>
                {(user?.avatar || user?.profilePicture || user?.image) ? (
                  <img 
                    src={user?.avatar || user?.profilePicture || user?.image} 
                    alt="Profile" 
                    className={styles.studentAvatarImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={styles.studentAvatarText}
                  style={{ display: (user?.avatar || user?.profilePicture || user?.image) ? 'none' : 'flex' }}
                >
                  {studentData.firstName?.charAt(0) || studentData.email?.charAt(0) || 'S'}
                </div>
              </div>
              <div className={styles.studentDetails}>
                <h3 className={styles.studentName}>{studentData.name}</h3>
                <p className={styles.studentTitle}>Student</p>
                <p className={styles.studentEmail}>{studentData.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{studentData.enrolledCourses}</span>
              <span className={styles.statLabel}>Enrolled</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{studentData.completedCourses}</span>
              <span className={styles.statLabel}>Completed</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className={styles.sidebarNav}>
            <button 
              className={`${styles.sidebarItem} ${activeSection === 'courses' ? styles.active : ''}`}
              onClick={() => handleSectionChange('courses')}
            >
              <span className={styles.sidebarIcon}>📚</span>
              <span className={styles.sidebarLabel}>My Courses</span>
            </button>
            <button
              className={`${styles.sidebarItem} ${activeSection === 'calendar' ? styles.active : ''}`}
              onClick={() => handleSectionChange('calendar')}
            >
              <span className={styles.sidebarIcon}>📅</span>
              <span className={styles.sidebarLabel}>Calendar</span>
            </button>
            <button
              className={`${styles.sidebarItem} ${activeSection === 'send-note' ? styles.active : ''}`}
              onClick={() => handleSectionChange('send-note')}
            >
              <span className={styles.sidebarIcon}>📝</span>
              <span className={styles.sidebarLabel}>Send Note</span>
            </button>
          </nav>
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
              {(selectedCourse || showAllLessons || selectedLesson) && (
                <button 
                  className={styles.backBtn}
                  onClick={selectedLesson ? handleBackToAllLessons : handleBackToCourses}
                >
                  ← {selectedLesson ? 'Back to Course' : 'Back to Courses'}
                </button>
              )}
              <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
            </div>
          </header>
          
          <div className={styles.contentArea}>
            <ErrorBoundary>
              {renderActiveSection()}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default StudentDashboard;