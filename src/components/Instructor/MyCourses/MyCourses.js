import React, { useState } from 'react';
import styles from './MyCourses.module.css';

const MyCourses = ({ onNewCourse, onEditCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock courses data
  const coursesData = [
    {
      id: 1,
      title: 'Islamic Finance Principles',
      description: 'Comprehensive course covering the fundamentals of Islamic finance, including Sharia-compliant banking, investment principles, and ethical financial practices.',
      category: 'Finance',
      level: 'Beginner',
      duration: '8 weeks',
      price: 299,
      status: 'active',
      studentsEnrolled: 45,
      rating: 4.8,
      reviews: 23,
      createdDate: '2023-09-15',
      lastUpdated: '2024-01-10',
      thumbnail: '/images/islamic-finance.jpg',
      modules: [
        { id: 1, title: 'Introduction to Islamic Finance', duration: '45 min', completed: true },
        { id: 2, title: 'Sharia Principles in Banking', duration: '60 min', completed: true },
        { id: 3, title: 'Islamic Investment Instruments', duration: '55 min', completed: false },
        { id: 4, title: 'Risk Management in Islamic Finance', duration: '50 min', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Advanced Islamic Banking',
      description: 'Deep dive into advanced concepts of Islamic banking including complex financial instruments, regulatory frameworks, and modern applications.',
      category: 'Finance',
      level: 'Advanced',
      duration: '12 weeks',
      price: 499,
      status: 'active',
      studentsEnrolled: 32,
      rating: 4.9,
      reviews: 18,
      createdDate: '2023-10-20',
      lastUpdated: '2024-01-15',
      thumbnail: '/images/islamic-banking.jpg',
      modules: [
        { id: 1, title: 'Advanced Sharia Compliance', duration: '70 min', completed: true },
        { id: 2, title: 'Complex Financial Instruments', duration: '80 min', completed: false },
        { id: 3, title: 'Regulatory Frameworks', duration: '65 min', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Sharia Compliance in Business',
      description: 'Learn how to implement Sharia-compliant practices in modern business operations, covering ethics, contracts, and operational guidelines.',
      category: 'Business',
      level: 'Intermediate',
      duration: '6 weeks',
      price: 199,
      status: 'pending',
      studentsEnrolled: 0,
      rating: 0,
      reviews: 0,
      createdDate: '2024-01-18',
      lastUpdated: '2024-01-18',
      thumbnail: '/images/sharia-business.jpg',
      modules: [
        { id: 1, title: 'Sharia Business Principles', duration: '40 min', completed: false },
        { id: 2, title: 'Contract Law in Islam', duration: '50 min', completed: false },
        { id: 3, title: 'Ethical Business Practices', duration: '45 min', completed: false }
      ]
    }
  ];

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteCourse = (courseId) => {
    const course = coursesData.find(c => c.id === courseId);
    if (course && course.status !== 'active') {
      console.log(`Deleting course ${courseId}`);
      // In real app, this would delete the course
    } else {
      alert('Cannot delete an active course with enrolled students.');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: styles.statusActive,
      pending: styles.statusPending,
      rejected: styles.statusRejected,
      draft: styles.statusDraft
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const levelClasses = {
      beginner: styles.levelBeginner,
      intermediate: styles.levelIntermediate,
      advanced: styles.levelAdvanced
    };
    
    return (
      <span className={`${styles.levelBadge} ${levelClasses[level.toLowerCase()]}`}>
        {level}
      </span>
    );
  };

  return (
    <div className={styles.myCourses}>
      {/* Header with filters */}
      <div className={styles.coursesHeader}>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filtersSection}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending Review</option>
            <option value="draft">Draft</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className={styles.coursesGrid}>
        {filteredCourses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <div className={styles.courseImage}>
              <img 
                src={course.thumbnail} 
                alt={course.title}
                onError={(e) => {
                  e.target.src = '/images/default-course.jpg';
                }}
              />
              <div className={styles.courseOverlay}>
                {getStatusBadge(course.status)}
                {getLevelBadge(course.level)}
              </div>
            </div>
            
            <div className={styles.courseContent}>
              <div className={styles.courseHeader}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <span className={styles.courseCategory}>{course.category}</span>
              </div>
              
              <p className={styles.courseDescription}>{course.description}</p>
              
              <div className={styles.courseStats}>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>👥</span>
                  <span className={styles.statText}>{course.studentsEnrolled} Students</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>⏱️</span>
                  <span className={styles.statText}>{course.duration}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>💰</span>
                  <span className={styles.statText}>${course.price}</span>
                </div>
                {course.rating > 0 && (
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>⭐</span>
                    <span className={styles.statText}>{course.rating} ({course.reviews})</span>
                  </div>
                )}
              </div>
              
              <div className={styles.courseProgress}>
                <h4 className={styles.progressTitle}>Course Modules ({course.modules.length})</h4>
                <div className={styles.modulesList}>
                  {course.modules.slice(0, 3).map((module) => (
                    <div key={module.id} className={styles.moduleItem}>
                      <span className={`${styles.moduleStatus} ${module.completed ? styles.completed : styles.pending}`}>
                        {module.completed ? '✓' : '○'}
                      </span>
                      <span className={styles.moduleTitle}>{module.title}</span>
                      <span className={styles.moduleDuration}>{module.duration}</span>
                    </div>
                  ))}
                  {course.modules.length > 3 && (
                    <div className={styles.moreModules}>
                      +{course.modules.length - 3} more modules
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className={styles.courseActions}>
              <button
                className={`${styles.actionBtn} ${styles.editBtn}`}
                onClick={() => onEditCourse(course)}
              >
                ✏️ Edit
              </button>
              
              <button
                className={`${styles.actionBtn} ${styles.viewBtn}`}
                onClick={() => console.log(`View course ${course.id}`)}
              >
                👁️ View
              </button>
              
              {course.status !== 'active' && (
                <button
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  🗑️ Delete
                </button>
              )}
              
              {course.status === 'active' && (
                <button
                  className={`${styles.actionBtn} ${styles.studentsBtn}`}
                  onClick={() => console.log(`View students for course ${course.id}`)}
                >
                  👥 Students
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h3 className={styles.emptyTitle}>No courses found</h3>
          <p className={styles.emptyText}>
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'Start by creating your first course!'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button 
              className={styles.createFirstCourseBtn}
              onClick={onNewCourse}
            >
              ➕ Create Your First Course
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;