import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById } from '../../store/slices/courseSlice';
import { fetchUnits, fetchUnitById } from '../../store/slices/unitSlice';
import { formatPrice } from '../../utils/priceUtils';
import AuthGuard, { useAuthGuard } from '../../components/AuthGuard/AuthGuard';
import styles from './CourseDetailsPage.module.css';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { requireAuth } = useAuthGuard();
  const { selectedCourse, isLoading, error } = useSelector((state) => state.courses);
  const { units, unitLessons, loading: unitsLoading } = useSelector((state) => state.units);
  const [expandedUnits, setExpandedUnits] = useState({});
  const [loadingUnits, setLoadingUnits] = useState({}); // Track loading state for individual units

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
      dispatch(fetchUnits(id));
    }
  }, [dispatch, id]);

  const handleEnrollClick = (e) => {
    e.preventDefault();
    requireAuth(() => {
      window.location.href = `/enrollment/${id}`;
    }, "Please login to enroll in this course");
  };

  const toggleUnit = async (unitId) => {
    const isExpanding = !expandedUnits[unitId];
    
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: isExpanding
    }));

    // Fetch unit details with lessons if expanding and not already loaded
    if (isExpanding && !unitLessons[unitId]) {
      // Set loading state for this specific unit
      setLoadingUnits(prev => ({
        ...prev,
        [unitId]: true
      }));

      try {
        await dispatch(fetchUnitById(unitId));
      } finally {
        // Remove loading state for this unit
        setLoadingUnits(prev => ({
          ...prev,
          [unitId]: false
        }));
      }
    }
  };

  const getUnitLessons = (unitId) => {
    return unitLessons[unitId] || [];
  };

  const getTotalLessons = () => {
    return Object.values(unitLessons).reduce((total, lessons) => total + lessons.length, 0);
  };

  // Only show page loading for initial course and units load
  if (isLoading || (unitsLoading && !units.length)) {
    return (
      <div className={styles.courseDetailsPage}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.courseDetailsPage}>
        <div className={styles.error}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Error Loading Course</h2>
          <p>{error}</p>
          <Link to="/courses" className={styles.backButton}>
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className={styles.courseDetailsPage}>
        <div className={styles.error}>
          <div className={styles.errorIcon}>📚</div>
          <h2>Course Not Found</h2>
          <p>The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className={styles.backButton}>
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const course = selectedCourse;

  return (
    <div className={styles.courseDetailsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
        </div>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/courses">Courses</Link>
            <span>/</span>
            <span>{course.title}</span>
          </div>
          
          <div className={styles.heroContent}>
            <div className={styles.courseInfo}>
              <div className={styles.courseMeta}>
                <span className={styles.categoryBadge}>
                  {course.CategoryId?.name || 'General'}
                </span>
                <div className={styles.courseLevels}>
                  {course.levels?.map((level, index) => (
                    <span key={index} className={styles.levelBadge}>
                      {level}
                    </span>
                  ))}
                </div>
              </div>
              
              <h1 className={styles.courseTitle}>{course.title}</h1>
              <p className={styles.courseDescription}>{course.description}</p>
              
              <div className={styles.courseStats}>
                <div className={styles.statItem}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>{course.duration || 'Self-paced'}</span>
                </div>
                <div className={styles.statItem}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
                  </svg>
                  <span>{units?.length || 0} Units</span>
                </div>
                <div className={styles.statItem}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  <span>{getTotalLessons()} Lessons</span>
                </div>
              </div>
              
              <div className={styles.instructorInfo}>
                <h3>Instructor</h3>
                <div className={styles.instructor}>
                  <div className={styles.instructorAvatar}>
                    {course.CreatedBy?.firstName?.charAt(0) || 'I'}
                  </div>
                  <div className={styles.instructorDetails}>
                    <h4>{course.CreatedBy?.firstName} {course.CreatedBy?.lastName}</h4>
                    <p>{course.CreatedBy?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.courseImage}>
              <img 
                src={course.image || '/images/course-placeholder.jpg'} 
                alt={course.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              <div className={styles.section}>
                <h2>Course Overview</h2>
                <p>{course.description}</p>
              </div>

              <div className={styles.section}>
                <h2>What You'll Learn</h2>
                <ul className={styles.learningPoints}>
                  <li>Master the fundamentals of {course.CategoryId?.name}</li>
                  <li>Apply practical skills in real-world scenarios</li>
                  <li>Build confidence through hands-on exercises</li>
                  <li>Receive personalized feedback from instructors</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>Course Content</h2>
                <div className={styles.curriculumHeader}>
                  <p className={styles.curriculumStats}>
                    {units?.length || 0} sections • {getTotalLessons()} lectures
                  </p>
                </div>
                
                {units && units.length > 0 ? (
                  <div className={styles.curriculum}>
                    {units.map((unit, index) => (
                      <div key={unit._id} className={styles.curriculumItem}>
                        <div 
                          className={styles.unitHeader} 
                          onClick={() => toggleUnit(unit._id)}
                        >
                          <div className={styles.unitHeaderLeft}>
                            <span className={styles.expandIcon}>
                              {expandedUnits[unit._id] ? '▼' : '▶'}
                            </span>
                            <div className={styles.unitInfo}>
                              <h4 className={styles.unitTitle}>
                                Section {index + 1}: {unit.title}
                              </h4>
                              <p className={styles.unitMeta}>
                                {getUnitLessons(unit._id).length} lectures
                                <span className={styles.lockBadge}>
                                  🔒 Locked
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className={styles.unitHeaderRight}>
                            {loadingUnits[unit._id] ? (
                              <div className={styles.unitLoadingSpinner}></div>
                            ) : (
                              <span className={styles.lockIcon} title="This section is locked">🔒</span>
                            )}
                          </div>
                        </div>
                        
                        {expandedUnits[unit._id] && (
                          <div className={styles.unitContent}>
                            <div className={styles.unitDescription}>
                              <p>{unit.description}</p>
                              {unit.topic && unit.topic.length > 0 && (
                                <div className={styles.unitTopics}>
                                  <strong>Topics covered: </strong>
                                  {unit.topic.join(', ')}
                                </div>
                              )}
                            </div>
                            
                            {loadingUnits[unit._id] ? (
                              <div className={styles.unitLoading}>
                                <div className={styles.unitLoadingContent}>
                                  <div className={styles.unitLoadingSpinner}></div>
                                  <p>Loading lessons...</p>
                                </div>
                              </div>
                            ) : getUnitLessons(unit._id).length > 0 ? (
                              <div className={styles.lessonsList}>
                                {[...getUnitLessons(unit._id)]
                                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                                  .map((lesson, lessonIndex) => (
                                    <div key={lesson._id} className={styles.lessonItem}>
                                      <div className={styles.lessonLeft}>
                                        <span className={styles.lessonIcon}>
                                          🔒
                                        </span>
                                        <div className={styles.lessonInfo}>
                                          <h6 className={styles.lessonTitle}>
                                            {lesson.order || lessonIndex + 1}. {lesson.title}
                                          </h6>
                                          {lesson.description && (
                                            <p className={styles.lessonDescription}>
                                              {lesson.description}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className={styles.lessonRight}>
                                        {lesson.duration && (
                                          <span className={styles.lessonDuration}>
                                            {lesson.duration}
                                          </span>
                                        )}
                                        <span className={styles.lockedBadge}>Locked</span>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <div className={styles.noLessons}>
                                <p>No lessons available for this section yet.</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noCurriculum}>
                    <p>Course content will be available soon.</p>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                <h2>Prerequisites</h2>
                <ul className={styles.prerequisites}>
                  <li>Basic understanding of the subject matter</li>
                  <li>Willingness to learn and practice</li>
                  <li>Access to a computer and internet connection</li>
                </ul>
              </div>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.enrollmentCard}>
                <div className={styles.priceSection}>
                  <div className={styles.price}>
                    {formatPrice(course.price)}
                  </div>
                </div>

                <AuthGuard
                  fallback={
                    <button 
                      className={`${styles.enrollButton} ${styles.loginRequired}`}
                      onClick={handleEnrollClick}
                    >
                      Login to Enroll
                    </button>
                  }
                >
                  <Link 
                    to={`/enrollment/${course._id}`}
                    className={styles.enrollButton}
                  >
                    Enroll Now
                  </Link>
                </AuthGuard>

                <div className={styles.courseFeatures}>
                  <div className={styles.feature}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Lifetime Access</span>
                  </div>
                  <div className={styles.feature}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Certificate of Completion</span>
                  </div>
                  <div className={styles.feature}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Mobile & Desktop Access</span>
                  </div>
                  <div className={styles.feature}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Instructor Support</span>
                  </div>
                </div>

                <div className={styles.shareSection}>
                  <h4>Share this course</h4>
                  <div className={styles.shareButtons}>
                    <button className={styles.shareButton}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className={styles.shareButton}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className={styles.shareButton}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;