import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StudentDashboard.module.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import { fetchStudentDashboard } from '../../store/slices/studentDashboardSlice';

// Lazy load components to identify loading issues
const MyCourses = React.lazy(() => import('../../components/Student/MyCourses/MyCourses'));
const CourseContent = React.lazy(() => import('../../components/Student/CourseContent/CourseContent'));
const CourseEvaluation = React.lazy(() => import('../../components/Student/CourseEvaluation/CourseEvaluation'));
const LessonDetails = React.lazy(() => import('../../components/Student/LessonDetails/LessonDetails'));
const StudentCalendar = React.lazy(() => import('../../components/Student/StudentCalendar/StudentCalendar'));

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');

  // Get user data from auth state (same as Header component)
  const { user } = useSelector((state) => state.auth);
  const { courses, isLoading, error } = useSelector((state) => state.studentDashboard);

  // Calculate student stats from real data
  const studentStats = {
    enrolledCourses: courses.length,
    completedCourses: courses.filter(course => 
      course.units.every(unit => unit.completed)
    ).length,
    totalProgress: courses.length > 0 ? Math.round(
      courses.reduce((acc, course) => {
        const totalUnits = course.units.length;
        const completedUnits = course.units.filter(unit => unit.completed).length;
        return acc + (totalUnits > 0 ? (completedUnits / totalUnits) * 100 : 0);
      }, 0) / courses.length
    ) : 0
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
    setShowEvaluation(false);
    setShowAllLessons(false);
    setSelectedLesson(null);
    closeMobileMenu();
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowAllLessons(false);
    setSelectedLesson(null);
    closeMobileMenu(); // Close mobile menu when navigating
  };

  const handleViewAllLessons = (course) => {
    setSelectedCourse(course);
    setShowAllLessons(true);
    setShowEvaluation(false);
    setSelectedLesson(null);
    closeMobileMenu();
  };

  const handleEvaluateCourse = (course) => {
    setSelectedCourse(course);
    setShowEvaluation(true);
    setShowAllLessons(false);
    setSelectedLesson(null);
    closeMobileMenu(); // Close mobile menu when navigating
  };

  const handleLessonClick = (lessonId, courseId, unitId) => {
    setSelectedLesson({ lessonId, courseId, unitId });
    setShowAllLessons(false);
    setShowEvaluation(false);
    closeMobileMenu();
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setShowEvaluation(false);
    setShowAllLessons(false);
    setSelectedLesson(null);
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
          <LessonDetails 
            lessonId={selectedLesson.lessonId}
            courseId={selectedLesson.courseId}
            unitId={selectedLesson.unitId}
            onBack={handleBackToAllLessons}
          />
        </React.Suspense>
      );
    }

    if (showEvaluation && selectedCourse) {
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <CourseEvaluation 
            course={selectedCourse}
            onBack={handleBackToCourses}
            onSubmit={(evaluationData) => {
              console.log('Evaluation submitted:', evaluationData);
              handleBackToCourses();
            }}
          />
        </React.Suspense>
      );
    }

    if (showAllLessons && selectedCourse) {
      return (
        <div className={styles.allLessonsView}>
          <div className={styles.allLessonsHeader}>
            <h2>All Lessons - {selectedCourse.title}</h2>
            <p>Complete overview of all course lessons with their status</p>
          </div>
          <div className={styles.allLessonsContent}>
            {selectedCourse.units.map((unit, unitIndex) => (
              <div key={unit.id} className={styles.unitSection}>
                <div className={styles.unitHeader}>
                  <h3 className={styles.unitTitle}>
                    <span className={styles.unitNumber}>Unit {unitIndex + 1}</span>
                    <span className={styles.unitName}>{unit.title}</span>
                    <span className={styles.unitStatus}>
                      {unit.locked ? '🔒' : '🔓'} {unit.completed ? '✅' : '⭕'}
                    </span>
                  </h3>
                  <p className={styles.unitDescription}>{unit.description}</p>
                </div>
                <div className={styles.lessonsGrid}>
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <div 
                      key={lesson.id} 
                      className={`${styles.lessonCard} ${lesson.locked ? styles.locked : ''} ${lesson.completed ? styles.completed : ''}`}
                      onClick={() => handleLessonClick(lesson.id, selectedCourse.id, unit.id)}
                    >
                      <div className={styles.lessonNumber}>{lesson.order}</div>
                      <div className={styles.lessonContent}>
                        <h4 className={styles.lessonTitle}>{lesson.title}</h4>
                        <p className={styles.lessonDescription}>{lesson.description}</p>
                        <div className={styles.lessonStatus}>
                          <span className={styles.lockStatus}>
                            {lesson.locked ? '🔒 Locked' : '🔓 Unlocked'}
                          </span>
                          <span className={styles.completionStatus}>
                            {lesson.completed ? '✅ Completed' : '⭕ Not Completed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            onEvaluate={() => handleEvaluateCourse(selectedCourse)}
          />
        </React.Suspense>
      );
    }

    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <MyCourses 
          onViewCourse={handleViewCourse}
          onViewAllLessons={handleViewAllLessons}
          onEvaluateCourse={handleEvaluateCourse}
        />
      </React.Suspense>
    );
  };

  const getPageTitle = () => {
    if (activeSection === 'calendar') {
      return 'Calendar';
    }
    if (selectedLesson) {
      return 'Lesson Details';
    }
    if (showEvaluation && selectedCourse) {
      return `Evaluate: ${selectedCourse.title}`;
    }
    if (showAllLessons && selectedCourse) {
      return `All Lessons: ${selectedCourse.title}`;
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
            {/* Mobile Close Button */}
            <button 
              className={styles.mobileCloseBtn}
              onClick={closeMobileMenu}
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className={styles.studentInfo}>
              <div className={styles.studentAvatar}>
                {studentData.firstName?.charAt(0) || studentData.email?.charAt(0) || 'S'}
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
              {(selectedCourse || showEvaluation || showAllLessons || selectedLesson) && (
                <button 
                  className={styles.backBtn}
                  onClick={selectedLesson ? handleBackToAllLessons : handleBackToCourses}
                >
                  ← {selectedLesson ? 'Back to Lessons' : 'Back to Courses'}
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