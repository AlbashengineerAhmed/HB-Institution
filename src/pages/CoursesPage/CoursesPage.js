import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, setSearchTerm, setSelectedCategory, filterCourses } from '../../store/slices/courseSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import styles from './CoursesPage.module.css';

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  const { 
    courses, 
    filteredCourses, 
    isLoading, 
    error, 
    searchTerm, 
    selectedCategory 
  } = useSelector((state) => state.courses);
  
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      dispatch(setSelectedCategory(categoryParam));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(filterCourses());
  }, [searchTerm, selectedCategory, courses, dispatch]);

  const handleCategoryChange = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  if (isLoading) {
    return (
      <div className={styles.coursesPage}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.coursesPage}>
        <div className={styles.error}>
          <div className={styles.errorIcon}>⚠️</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.coursesPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
          <div className={styles.heroShape3}></div>
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Discover Our Courses</h1>
            <p className={styles.heroDescription}>
              Explore our comprehensive collection of courses designed to enhance your knowledge and skills
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className={styles.searchSection}>
        <div className="container">
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            <button
              className={`${styles.categoryTab} ${selectedCategory === 'all' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category._id}
                className={`${styles.categoryTab} ${selectedCategory === category._id ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category._id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className={styles.coursesSection}>
        <div className="container">
          <div className={styles.coursesHeader}>
            <h2 className={styles.coursesTitle}>
              {selectedCategory === 'all' 
                ? `All Courses (${filteredCourses.length})` 
                : `${categories.find(cat => cat._id === selectedCategory)?.name || 'Category'} Courses (${filteredCourses.length})`
              }
            </h2>
          </div>

          {filteredCourses.length === 0 ? (
            <div className={styles.noCourses}>
              <div className={styles.noCoursesIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={styles.coursesGrid}>
              {filteredCourses.map(course => (
                <Link 
                  key={course._id} 
                  to={`/course/${course._id}`} 
                  className={styles.courseCard}
                >
                  <div className={styles.courseImageContainer}>
                    <img 
                      src={course.image || '/images/course-placeholder.jpg'} 
                      alt={course.title} 
                      className={styles.courseImage} 
                    />
                    <div className={styles.courseCategory}>
                      {course.CategoryId?.name || 'General'}
                    </div>
                    <div className={styles.courseLevels}>
                      {course.levels?.map((level, index) => (
                        <span key={index} className={styles.levelBadge}>
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.courseContent}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseDescription}>
                      {course.description?.length > 100 
                        ? course.description.substring(0, 100) + '...' 
                        : course.description
                      }
                    </p>
                    <div className={styles.courseMeta}>
                      <div className={styles.courseDuration}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {course.duration || 'Self-paced'}
                      </div>
                      <div className={styles.courseRating}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {course.rating || 'New'}
                      </div>
                    </div>
                    <div className={styles.courseFooter}>
                      <div className={styles.coursePrice}>
                        ${course.price || 'Free'}
                      </div>
                      <div className={styles.enrollButton}>
                        Enroll Now
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;