import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  toggleCourseExpansion, 
  toggleUnitExpansion
} from '../../../store/slices/studentDashboardSlice';
import styles from './MyCourses.module.css';

const MyCourses = ({ onViewCourse, onViewAllLessons, onEvaluateCourse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { 
    courses, 
    isLoading, 
    error, 
    expandedCourses, 
    expandedUnits
  } = useSelector((state) => state.studentDashboard);

  // Transform API data based on new backend response structure
  const enrolledCourses = courses.map(course => {
    return {
      id: course.courseId,
      title: course.courseTitle,
      description: course.duration,
      duration: course.duration,
      price: course.price,
      thumbnail: course.courseImage,
      group: course.group,
      // Since the new API doesn't provide detailed unit/lesson data,
      // we'll show basic course information
      totalUnits: 0, // Will be updated when detailed course data is available
      totalLessons: 0,
      completedLessons: 0,
      unlockedLessons: 0,
      units: [], // Empty for now, will be populated when course details are fetched
      unitsPreview: [] // Empty for now
    };
  });

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const toggleUnitDetails = (courseId, unitId) => {
    dispatch(toggleUnitExpansion(unitId));
  };

  const getLockIcon = (isLocked) => {
    return isLocked ? '🔒' : '🔓';
  };

  const getCompletionIcon = (isCompleted) => {
    return isCompleted ? '✅' : '⭕';
  };

  return (
    <div className={styles.myCourses}>
      {/* Header with search */}
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
      </div>

      {/* Courses Grid */}
      <div className={styles.coursesGrid}>
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            className={styles.courseCard}
            onClick={() => onViewAllLessons(course)}
          >
            <div className={styles.courseImage}>
              <img 
                src={course.thumbnail} 
                alt={course.title}
                onError={(e) => {
                  e.target.src = '/images/default-course.jpg';
                }}
              />
              <div className={styles.courseOverlay}>
                <span className={styles.priceBadge}>
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
              </div>
            </div>
            
            <div className={styles.courseContent}>
              <div className={styles.courseHeader}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
              </div>
              
              <p className={styles.courseDescription}>{course.description}</p>
              
              <div className={styles.courseStats}>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>⏱️</span>
                  <span className={styles.statText}>{course.duration}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>👥</span>
                  <span className={styles.statText}>{course.group?.name || 'No Group'}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>📊</span>
                  <span className={styles.statText}>{course.group?.level || 'N/A'}</span>
                </div>
              </div>
              
              {course.group?.schedule && course.group.schedule.length > 0 && (
                <div className={styles.unitsSection}>
                  <h4 className={styles.unitsTitle}>Class Schedule</h4>
                  {course.group.schedule.map((schedule, index) => (
                    <div key={index} className={styles.unitItem}>
                      <div className={styles.unitHeader}>
                        <div className={styles.unitInfo}>
                          <span className={styles.unitStatus}>📅</span>
                          <span className={styles.unitTitle}>{schedule.dayOfWeek}</span>
                        </div>
                        <div className={styles.unitStats}>
                          <span className={styles.unitLessons}>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                          <span className={styles.expandIcon}>
                            {schedule.timezone}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h3 className={styles.emptyTitle}>
            {searchTerm 
              ? 'No courses found'
              : 'No Courses Registered'
            }
          </h3>
          <p className={styles.emptyText}>
            {searchTerm 
              ? 'Try adjusting your search.'
              : 'There are no courses registered for this student.'
            }
          </p>
          {!searchTerm && (
            <button 
              className={styles.browseCourseBtn}
              onClick={() => navigate('/courses')}
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