import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StudentDashboard.module.css';
import ErrorBoundary from '../../components/ErrorBoundary';
import { fetchStudentDashboard } from '../../store/slices/studentDashboardSlice';

// Lazy load components to identify loading issues
const MyCourses = React.lazy(() => import('../../components/Student/MyCourses/MyCourses'));
const CourseContent = React.lazy(() => import('../../components/Student/CourseContent/CourseContent'));
const CourseEvaluation = React.lazy(() => import('../../components/Student/CourseEvaluation/CourseEvaluation'));

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    closeMobileMenu(); // Close mobile menu when navigating
  };

  const handleEvaluateCourse = (course) => {
    setSelectedCourse(course);
    setShowEvaluation(true);
    closeMobileMenu(); // Close mobile menu when navigating
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setShowEvaluation(false);
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
          onEvaluateCourse={handleEvaluateCourse}
        />
      </React.Suspense>
    );
  };

  const getPageTitle = () => {
    if (showEvaluation && selectedCourse) {
      return `Evaluate: ${selectedCourse.title}`;
    }
    if (selectedCourse) {
      return selectedCourse.title;
    }
    return 'My Courses';
  };

  // Show loading state while fetching data or if no user data
  if (isLoading || !studentData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>🔄</div>
        <p>Loading student dashboard...</p>
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
            <div className={styles.statItem}>
              <span className={styles.statValue}>{studentData.totalProgress}%</span>
              <span className={styles.statLabel}>Progress</span>
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
              {(selectedCourse || showEvaluation) && (
                <button 
                  className={styles.backBtn}
                  onClick={handleBackToCourses}
                >
                  ← Back to Courses
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