import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categorySlice';
import styles from './Categories.module.css';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return (
      <section className={styles.categoriesSection}>
        <div className={`container ${styles.container}`}>
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.categoriesSection}>
        <div className={`container ${styles.container}`}>
          <div className={styles.error}>
            <div className={styles.errorIcon}>⚠️</div>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.categoriesSection}>
      {/* Decorative shapes */}
      <div className={`${styles.categoryShape} ${styles.shape1}`}>
        <div className={styles.shapeElement}></div>
      </div>
      <div className={`${styles.categoryShape} ${styles.shape2}`}>
        <div className={styles.shapeElement}></div>
      </div>
      <div className={`${styles.categoryShape} ${styles.shape3}`}>
        <div className={styles.shapeElement}></div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className="section-header">
          <h2 className="section-title">Course Categories</h2>
          <Link to="/courses" className="view-all-link">View All</Link>
        </div>
        
        <div className={styles.categoriesGrid}>
          {categories.slice(0, 6).map(category => (
            <Link 
              key={category._id} 
              to={`/courses?category=${category._id}`} 
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageContainer}>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className={styles.categoryImage} 
                />
                <div className={styles.categoryOverlay}>
                  <div className={styles.categoryIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>{category.name}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
                {category.recommended && (
                  <div className={styles.recommendedBadge}>Recommended</div>
                )}
                <div className={styles.exploreButton}>
                  <span>Explore Courses</span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;