import React, { useState } from 'react';
import styles from './InstructorDashboard.module.css';
import ErrorBoundary from '../../components/ErrorBoundary';

// Lazy load components to identify loading issues
const MyCourses = React.lazy(() => import('../../components/Instructor/MyCourses/MyCourses'));
const MyStudents = React.lazy(() => import('../../components/Instructor/MyStudents/MyStudents'));
const CourseForm = React.lazy(() => import('../../components/Instructor/CourseForm/CourseForm'));
const RealTimeDashboard = React.lazy(() => import('../../components/Shared/RealTimeDashboard/RealTimeDashboard'));

const InstructorDashboard = () => {
  const [activeSection, setActiveSection] = useState('courses');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Mock instructor data
  const instructorData = {
    id: 1,
    name: 'Dr. Sarah Ahmed',
    email: 'sarah.ahmed@hbi.edu',
    specialty: 'Islamic Finance',
    totalCourses: 3,
    totalStudents: 105,
    averageRating: 4.8,
    joinDate: '2023-08-15'
  };

  const sidebarItems = [
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'students', label: 'My Students', icon: '👨‍🎓' },
    { id: 'live-dashboard', label: 'Live Dashboard', icon: '🔴' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ];

  const handleNewCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleCloseCourseForm = () => {
    setShowCourseForm(false);
    setEditingCourse(null);
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

    if (showCourseForm) {
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <CourseForm 
            course={editingCourse}
            onClose={handleCloseCourseForm}
            onSave={(courseData) => {
              console.log('Course saved:', courseData);
              handleCloseCourseForm();
            }}
          />
        </React.Suspense>
      );
    }

    switch (activeSection) {
      case 'courses':
        return (
          <React.Suspense fallback={<LoadingSpinner />}>
            <MyCourses 
              onNewCourse={handleNewCourse}
              onEditCourse={handleEditCourse}
            />
          </React.Suspense>
        );
      case 'students':
        return (
          <React.Suspense fallback={<LoadingSpinner />}>
            <MyStudents />
          </React.Suspense>
        );
      case 'live-dashboard':
        return (
          <React.Suspense fallback={<LoadingSpinner />}>
            <RealTimeDashboard userType="instructor" />
          </React.Suspense>
        );
      case 'analytics':
        return <div className={styles.comingSoon}>📊 Analytics coming soon...</div>;
      case 'messages':
        return <div className={styles.comingSoon}>💬 Messages coming soon...</div>;
      default:
        return (
          <React.Suspense fallback={<LoadingSpinner />}>
            <MyCourses onNewCourse={handleNewCourse} onEditCourse={handleEditCourse} />
          </React.Suspense>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className={styles.instructorDashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.instructorInfo}>
            <div className={styles.instructorAvatar}>
              {instructorData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className={styles.instructorDetails}>
              <h3 className={styles.instructorName}>{instructorData.name}</h3>
              <p className={styles.instructorTitle}>Instructor</p>
              <p className={styles.instructorSpecialty}>{instructorData.specialty}</p>
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
            <span className={styles.statValue}>⭐ {instructorData.averageRating}</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.sidebarItem} ${
                activeSection === item.id ? styles.active : ''
              }`}
              onClick={() => {
                setActiveSection(item.id);
                setShowCourseForm(false);
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
          <h1 className={styles.pageTitle}>
            {showCourseForm 
              ? (editingCourse ? 'Edit Course' : 'Create New Course')
              : sidebarItems.find(item => item.id === activeSection)?.label
            }
          </h1>
          <div className={styles.headerActions}>
            {activeSection === 'courses' && !showCourseForm && (
              <button 
                className={styles.newCourseBtn}
                onClick={handleNewCourse}
              >
                ➕ New Course
              </button>
            )}
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

export default InstructorDashboard;