import React, { useState } from 'react';
import styles from './StudentDashboard.module.css';
import ErrorBoundary from '../../components/ErrorBoundary';

// Lazy load components to identify loading issues
const MyCourses = React.lazy(() => import('../../components/Student/MyCourses/MyCourses'));
const CourseContent = React.lazy(() => import('../../components/Student/CourseContent/CourseContent'));
const CourseEvaluation = React.lazy(() => import('../../components/Student/CourseEvaluation/CourseEvaluation'));
const RealTimeDashboard = React.lazy(() => import('../../components/Shared/RealTimeDashboard/RealTimeDashboard'));

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  // Mock student data
  const studentData = {
    id: 1,
    name: 'Ahmed Mohammed',
    email: 'ahmed.mohammed@email.com',
    enrolledCourses: 3,
    completedCourses: 1,
    totalProgress: 68,
    joinDate: '2023-09-15'
  };

  const sidebarItems = [
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'realtime', label: 'Live Dashboard', icon: '🔴' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ];

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setActiveSection('content');
  };

  const handleEvaluateCourse = (course) => {
    setSelectedCourse(course);
    setShowEvaluation(true);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setActiveSection('courses');
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

    if (selectedCourse && activeSection === 'content') {
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

    switch (activeSection) {
      case 'courses':
        return (
          <React.Suspense fallback={<LoadingSpinner />}>
            <MyCourses 
              onViewCourse={handleViewCourse}
              onEvaluateCourse={handleEvaluateCourse}
            />
          </React.Suspense>
        );
      case 'realtime':
        return (
          <React.Suspense fallback={<LoadingSpinner />}>
            <RealTimeDashboard userType="student" />
          </React.Suspense>
        );
      case 'progress':
        return <div className={styles.comingSoon}>📈 Progress tracking coming soon...</div>;
      case 'certificates':
        return <div className={styles.comingSoon}>🏆 Certificates coming soon...</div>;
      case 'messages':
        return <div className={styles.comingSoon}>💬 Messages coming soon...</div>;
      default:
        return (
          <React.Suspense fallback={<LoadingSpinner />}>
            <MyCourses 
              onViewCourse={handleViewCourse}
              onEvaluateCourse={handleEvaluateCourse}
            />
          </React.Suspense>
        );
    }
  };

  const getPageTitle = () => {
    if (showEvaluation && selectedCourse) {
      return `Evaluate: ${selectedCourse.title}`;
    }
    if (selectedCourse && activeSection === 'content') {
      return selectedCourse.title;
    }
    return sidebarItems.find(item => item.id === activeSection)?.label || 'My Courses';
  };

  return (
    <ErrorBoundary>
      <div className={styles.studentDashboard}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.studentInfo}>
              <div className={styles.studentAvatar}>
                {studentData.name.split(' ').map(n => n[0]).join('')}
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

          <nav className={styles.sidebarNav}>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`${styles.sidebarItem} ${
                  activeSection === item.id && !selectedCourse ? styles.active : ''
                }`}
                onClick={() => {
                  setActiveSection(item.id);
                  setSelectedCourse(null);
                  setShowEvaluation(false);
                }}
              >
                <span className={styles.sidebarIcon}>{item.icon}</span>
                <span className={styles.sidebarLabel}>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <header className={styles.mainHeader}>
            <div className={styles.headerLeft}>
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