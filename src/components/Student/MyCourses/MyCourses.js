import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  toggleCourseExpansion, 
  toggleUnitExpansion,
  markLessonCompletedOptimistic,
  markLessonCompleted
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
    expandedUnits,
    isMarkingComplete 
  } = useSelector((state) => state.studentDashboard);

  // Transform API data based on actual backend response
  const enrolledCourses = courses.map(course => {
    const totalUnits = course.units.length;
    const totalLessons = course.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
    const completedLessons = course.units.reduce((sum, unit) => 
      sum + unit.lessons.filter(lesson => lesson.completed).length, 0
    );
    const unlockedLessons = course.units.reduce((sum, unit) => 
      sum + unit.lessons.filter(lesson => !lesson.islocked).length, 0
    );

    return {
      id: course._id,
      title: course.courseTitle,
      description: `${totalUnits} units • ${totalLessons} lessons`,
      duration: course.duration,
      price: course.price,
      thumbnail: course.courseImage,
      totalUnits: totalUnits,
      totalLessons: totalLessons,
      completedLessons: completedLessons,
      unlockedLessons: unlockedLessons,
      units: course.units,
      // Show first 3 units for preview
      unitsPreview: course.units.slice(0, 3).map((unit) => ({
        id: unit._id,
        title: unit.title,
        description: unit.description,
        completed: unit.completed,
        locked: unit.lock,
        lessonsCount: unit.lessons.length,
        unlockedLessonsCount: unit.lessons.filter(lesson => !lesson.islocked).length,
        completedLessonsCount: unit.lessons.filter(lesson => lesson.completed).length,
        lessons: unit.lessons.map(lesson => ({
          id: lesson._id,
          title: lesson.title,
          completed: lesson.completed,
          locked: lesson.islocked,
          order: lesson.order
        }))
      }))
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

  // Handle navigation to course details page
  const handleViewCourseDetails = (course) => {
    navigate(`/course/${course.id}`);
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
                  <span className={styles.statIcon}>��</span>
                  <span className={styles.statText}>{course.totalUnits} units</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>📖</span>
                  <span className={styles.statText}>{course.totalLessons} lessons</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>🔓</span>
                  <span className={styles.statText}>{course.unlockedLessons} unlocked</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>✅</span>
                  <span className={styles.statText}>{course.completedLessons} completed</span>
                </div>
              </div>
              
              <div className={styles.unitsSection}>
                <h4 className={styles.unitsTitle}>Course Units</h4>
                {course.unitsPreview.map((unit) => (
                  <div key={unit.id} className={styles.unitItem}>
                    <div 
                      className={styles.unitHeader}
                      onClick={() => toggleUnitDetails(course.id, unit.id)}
                    >
                      <div className={styles.unitInfo}>
                        <span className={styles.unitStatus}>
                          {getLockIcon(unit.locked)} {getCompletionIcon(unit.completed)}
                        </span>
                        <span className={styles.unitTitle}>{unit.title}</span>
                      </div>
                      <div className={styles.unitStats}>
                        <span className={styles.unitLessons}>
                          {unit.completedLessonsCount}/{unit.lessonsCount} lessons
                        </span>
                        <span className={styles.expandIcon}>
                          {expandedUnits[unit.id] ? '▼' : '▶'}
                        </span>
                      </div>
                    </div>
                    
                    {expandedUnits[unit.id] && (
                      <div className={styles.lessonsContainer}>
                        {unit.lessons.map((lesson) => (
                          <div key={lesson.id} className={styles.lessonItem}>
                            <span className={styles.lessonOrder}>{lesson.order}</span>
                            <span className={styles.lessonStatus}>
                              {getLockIcon(lesson.locked)} {getCompletionIcon(lesson.completed)}
                            </span>
                            <span className={`${styles.lessonTitle} ${lesson.locked ? styles.locked : ''}`}>
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {course.units.length > 3 && (
                  <div className={styles.moreUnits}>
                    +{course.units.length - 3} more units
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.courseActions}>
              <button
                className={`${styles.actionBtn} ${styles.viewBtn}`}
                onClick={() => handleViewCourseDetails(course)}
              >
                📖 View Course
              </button>
              
              <button
                className={`${styles.actionBtn} ${styles.viewAllBtn}`}
                onClick={() => onViewAllLessons(course)}
              >
                📋 View All Lessons
              </button>
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