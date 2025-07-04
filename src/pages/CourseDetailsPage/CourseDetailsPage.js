import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById } from '../../store/slices/courseSlice';
import styles from './CourseDetailsPage.module.css';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCourse, isLoading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
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
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{course.rating || 'New'} Rating</span>
                </div>
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
                  <span>{course.units?.length || 0} Units</span>
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
                <h2>Course Curriculum</h2>
                {course.units && course.units.length > 0 ? (
                  <div className={styles.curriculum}>
                    {course.units.map((unit, index) => (
                      <div key={index} className={styles.curriculumItem}>
                        <div className={styles.unitNumber}>{index + 1}</div>
                        <div className={styles.unitContent}>
                          <h4>{unit.title}</h4>
                          <p>{unit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noCurriculum}>
                    <p>Curriculum details will be available soon.</p>
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
                    ${course.price || 'Free'}
                  </div>
                  {course.price && (
                    <div className={styles.originalPrice}>
                      ${Math.round(course.price * 1.3)}
                    </div>
                  )}
                </div>

                <Link 
                  to={`/enrollment/${course._id}`}
                  className={styles.enrollButton}
                >
                  Enroll Now
                </Link>

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