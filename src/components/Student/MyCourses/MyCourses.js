import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  toggleCourseExpansion, 
  toggleUnitExpansion,
  markLessonCompletedOptimistic,
  markLessonCompleted
} from '../../../store/slices/studentDashboardSlice';
import styles from './MyCourses.module.css';

const MyCourses = ({ onViewCourse, onEvaluateCourse }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { 
    courses, 
    isLoading, 
    error, 
    expandedCourses, 
    expandedUnits,
    isMarkingComplete 
  } = useSelector((state) => state.studentDashboard);

  // Transform API data to match component expectations
  const enrolledCourses = courses.map(course => {
    const totalUnits = course.units.length;
    const completedUnits = course.units.filter(unit => unit.completed).length;
    const totalLessons = course.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
    const completedLessons = course.units.reduce((sum, unit) => 
      sum + unit.lessons.filter(lesson => lesson.completed).length, 0
    );
    
    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const status = completedUnits === totalUnits && totalUnits > 0 ? 'completed' : 
                  completedLessons > 0 ? 'in-progress' : 'not-started';

    return {
      id: course._id,
      title: course.courseTitle,
      instructor: 'Instructor', // Not provided in API
      description: `Course with ${totalUnits} units and ${totalLessons} lessons`,
      category: 'Islamic Studies', // Not provided in API
      level: 'Beginner', // Not provided in API
      duration: course.duration,
      enrollmentDate: new Date().toISOString().split('T')[0], // Not provided in API
      progress: progress,
      status: status,
      completedModules: completedUnits,
      totalModules: totalUnits,
      nextModule: course.units.find(unit => !unit.completed)?.title || null,
      grade: progress >= 80 ? 'A' : progress >= 60 ? 'B' : progress >= 40 ? 'C' : 'F',
      thumbnail: course.courseImage,
      canEvaluate: status === 'completed',
      price: course.price,
      units: course.units,
      modules: course.units.map((unit, index) => ({
        id: unit._id,
        title: unit.title,
        completed: unit.completed,
        duration: `${unit.lessons.length} lessons`
      }))
    };
  });

  // Keep original mock data structure for comparison
  const originalMockCourses = [
    {
      id: 1,
      title: 'Islamic Finance Principles',
      instructor: 'Dr. Sarah Ahmed',
      description: 'Comprehensive course covering the fundamentals of Islamic finance, including Sharia-compliant banking and investment principles.',
      category: 'Finance',
      level: 'Beginner',
      duration: '8 weeks',
      enrollmentDate: '2023-09-15',
      progress: 75,
      status: 'in-progress',
      completedModules: 3,
      totalModules: 4,
      nextModule: 'Risk Management in Islamic Finance',
      grade: 'A',
      thumbnail: '/images/islamic-finance.jpg',
      canEvaluate: false,
      modules: [
        { id: 1, title: 'Introduction to Islamic Finance', completed: true, duration: '45 min' },
        { id: 2, title: 'Sharia Principles in Banking', completed: true, duration: '60 min' },
        { id: 3, title: 'Islamic Investment Instruments', completed: true, duration: '55 min' },
        { id: 4, title: 'Risk Management in Islamic Finance', completed: false, duration: '50 min' }
      ]
    },
    {
      id: 2,
      title: 'Arabic Language Fundamentals',
      instructor: 'Prof. Fatima Al-Zahra',
      description: 'Master the basics of Arabic language including grammar, vocabulary, and pronunciation for Islamic studies.',
      category: 'Language',
      level: 'Beginner',
      duration: '10 weeks',
      enrollmentDate: '2023-10-01',
      progress: 60,
      status: 'in-progress',
      completedModules: 3,
      totalModules: 5,
      nextModule: 'Arabic Grammar Essentials',
      grade: 'B+',
      thumbnail: '/images/arabic-language.jpg',
      canEvaluate: false,
      modules: [
        { id: 1, title: 'Arabic Alphabet and Pronunciation', completed: true, duration: '40 min' },
        { id: 2, title: 'Basic Vocabulary', completed: true, duration: '50 min' },
        { id: 3, title: 'Simple Sentence Structure', completed: true, duration: '45 min' },
        { id: 4, title: 'Arabic Grammar Essentials', completed: false, duration: '60 min' },
        { id: 5, title: 'Reading Comprehension', completed: false, duration: '55 min' }
      ]
    },
    {
      id: 3,
      title: 'Advanced Islamic Studies',
      instructor: 'Dr. Ahmed Hassan',
      description: 'Deep dive into advanced Islamic theology, jurisprudence, and contemporary issues in Islamic scholarship.',
      category: 'Islamic Studies',
      level: 'Advanced',
      duration: '12 weeks',
      enrollmentDate: '2023-08-15',
      progress: 100,
      status: 'completed',
      completedModules: 6,
      totalModules: 6,
      nextModule: null,
      grade: 'A+',
      thumbnail: '/images/islamic-studies.jpg',
      canEvaluate: true,
      completionDate: '2023-12-15',
      modules: [
        { id: 1, title: 'Advanced Theology', completed: true, duration: '70 min' },
        { id: 2, title: 'Islamic Jurisprudence', completed: true, duration: '80 min' },
        { id: 3, title: 'Contemporary Issues', completed: true, duration: '65 min' },
        { id: 4, title: 'Comparative Religion', completed: true, duration: '75 min' },
        { id: 5, title: 'Islamic Philosophy', completed: true, duration: '60 min' },
        { id: 6, title: 'Research Methodology', completed: true, duration: '55 min' }
      ]
    }
  ];

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      'in-progress': styles.statusInProgress,
      'completed': styles.statusCompleted,
      'not-started': styles.statusNotStarted
    };
    
    const statusLabels = {
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'not-started': 'Not Started'
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {statusLabels[status]}
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

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4da6ff';
    if (progress >= 60) return '#fdc62c';
    if (progress >= 40) return '#feda6a';
    return '#ff4c4c';
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
            <option value="all">All Courses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="not-started">Not Started</option>
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
              
              <p className={styles.courseInstructor}>👨‍🏫 {course.instructor}</p>
              <p className={styles.courseDescription}>{course.description}</p>
              
              <div className={styles.courseStats}>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>📅</span>
                  <span className={styles.statText}>Enrolled: {new Date(course.enrollmentDate).toLocaleDateString()}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>⏱️</span>
                  <span className={styles.statText}>{course.duration}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>🎯</span>
                  <span className={styles.statText}>Grade: {course.grade}</span>
                </div>
                {course.status === 'completed' && course.completionDate && (
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>🏆</span>
                    <span className={styles.statText}>Completed: {new Date(course.completionDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <h4 className={styles.progressTitle}>Progress</h4>
                  <span className={styles.progressPercentage}>{course.progress}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${course.progress}%`,
                      backgroundColor: getProgressColor(course.progress)
                    }}
                  ></div>
                </div>
                <div className={styles.modulesProgress}>
                  {course.completedModules}/{course.totalModules} modules completed
                </div>
                {course.nextModule && (
                  <div className={styles.nextModule}>
                    <span className={styles.nextModuleLabel}>Next:</span>
                    <span className={styles.nextModuleTitle}>{course.nextModule}</span>
                  </div>
                )}
              </div>
              
              <div className={styles.modulesList}>
                <h4 className={styles.modulesTitle}>Course Modules</h4>
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
            
            <div className={styles.courseActions}>
              <button
                className={`${styles.actionBtn} ${styles.viewBtn}`}
                onClick={() => onViewCourse(course)}
              >
                {course.status === 'completed' ? '👁️ Review Content' : '📖 Continue Learning'}
              </button>
              
              {course.canEvaluate && course.status === 'completed' && (
                <button
                  className={`${styles.actionBtn} ${styles.evaluateBtn}`}
                  onClick={() => onEvaluateCourse(course)}
                >
                  ⭐ Evaluate Course
                </button>
              )}
              
              {course.status === 'completed' && (
                <button
                  className={`${styles.actionBtn} ${styles.certificateBtn}`}
                  onClick={() => console.log(`Download certificate for course ${course.id}`)}
                >
                  🏆 Certificate
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
              : 'You haven\'t enrolled in any courses yet.'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button 
              className={styles.browseCourseBtn}
              onClick={() => console.log('Browse courses')}
            >
              🔍 Browse Available Courses
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;