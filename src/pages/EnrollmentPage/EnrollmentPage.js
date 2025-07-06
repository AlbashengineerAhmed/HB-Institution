import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeEnrollment, resetEnrollment } from '../../store/slices/enrollmentSlice';
import { fetchCourseById } from '../../store/slices/courseSlice';
import StepIndicator from './components/StepIndicator';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import StepFive from './components/StepFive';
import styles from './EnrollmentPage.module.css';

const EnrollmentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedCourse, isLoading: courseLoading } = useSelector((state) => state.courses);
  const { currentStep, courseTitle, enrollmentSuccess } = useSelector((state) => state.enrollment);

  useEffect(() => {
    if (courseId) {
      // Fetch course details if not already loaded
      if (!selectedCourse || selectedCourse._id !== courseId) {
        dispatch(fetchCourseById(courseId));
      }
    } else {
      // Redirect to courses page if no courseId
      navigate('/courses');
    }

    // Cleanup on unmount
    return () => {
      dispatch(resetEnrollment());
    };
  }, [courseId, dispatch, navigate, selectedCourse]);

  useEffect(() => {
    // Initialize enrollment when course is loaded
    if (selectedCourse && selectedCourse._id === courseId) {
      dispatch(initializeEnrollment({
        courseId: selectedCourse._id,
        courseTitle: selectedCourse.title
      }));
    }
  }, [selectedCourse, courseId, dispatch]);

  // Redirect to success page after successful enrollment
  useEffect(() => {
    if (enrollmentSuccess) {
      navigate(`/enrollment-success/${courseId}`);
    }
  }, [enrollmentSuccess, courseId, navigate]);

  if (courseLoading) {
    return (
      <div className={styles.enrollmentPage}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className={styles.enrollmentPage}>
        <div className={styles.error}>
          <h2>Course Not Found</h2>
          <p>The course you're trying to enroll in doesn't exist or has been removed.</p>
          <Link to="/courses" className={styles.backButton}>
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      default:
        return <StepOne />;
    }
  };

  return (
    <div className={styles.enrollmentPage}>
      {/* Header Section */}
      <section className={styles.headerSection}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/courses">Courses</Link>
            <span>/</span>
            <Link to={`/course/${courseId}`}>{selectedCourse.title}</Link>
            <span>/</span>
            <span>Enrollment</span>
          </div>
          
          <div className={styles.headerContent}>
            <h1>Course Enrollment</h1>
            <p>Complete the following steps to enroll in <strong>{selectedCourse.title}</strong></p>
          </div>
        </div>
      </section>

      {/* Step Indicator */}
      <section className={styles.stepIndicatorSection}>
        <div className="container">
          <StepIndicator />
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        <div className="container">
          <div className={styles.stepContent}>
            {renderCurrentStep()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnrollmentPage;