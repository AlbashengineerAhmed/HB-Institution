import React, { useState } from 'react';
import styles from './CourseEvaluation.module.css';

const CourseEvaluation = ({ course, onBack, onSubmit }) => {
  const [evaluation, setEvaluation] = useState({
    overallRating: 0,
    contentQuality: 0,
    instructorRating: 0,
    difficultyLevel: 0,
    recommendation: 0,
    writtenFeedback: '',
    improvements: '',
    favoriteModule: '',
    wouldRecommend: true
  });

  const [hoveredRating, setHoveredRating] = useState({});

  const ratingCategories = [
    {
      key: 'overallRating',
      label: 'Overall Course Rating',
      description: 'How would you rate this course overall?'
    },
    {
      key: 'contentQuality',
      label: 'Content Quality',
      description: 'How would you rate the quality and relevance of the course content?'
    },
    {
      key: 'instructorRating',
      label: 'Instructor Performance',
      description: 'How would you rate the instructor\'s teaching effectiveness?'
    },
    {
      key: 'difficultyLevel',
      label: 'Difficulty Level',
      description: 'How appropriate was the difficulty level? (1 = Too Easy, 5 = Too Hard, 3 = Just Right)'
    },
    {
      key: 'recommendation',
      label: 'Likelihood to Recommend',
      description: 'How likely are you to recommend this course to others?'
    }
  ];

  const handleRatingChange = (category, rating) => {
    setEvaluation(prev => ({
      ...prev,
      [category]: rating
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvaluation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (evaluation.overallRating === 0) {
      alert('Please provide an overall rating for the course.');
      return;
    }
    
    if (evaluation.contentQuality === 0) {
      alert('Please rate the content quality.');
      return;
    }
    
    if (evaluation.instructorRating === 0) {
      alert('Please rate the instructor performance.');
      return;
    }

    onSubmit(evaluation);
  };

  const renderStarRating = (category, currentRating) => {
    return (
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${styles.star} ${
              star <= (hoveredRating[category] || currentRating) ? styles.filled : ''
            }`}
            onClick={() => handleRatingChange(category, star)}
            onMouseEnter={() => setHoveredRating(prev => ({ ...prev, [category]: star }))}
            onMouseLeave={() => setHoveredRating(prev => ({ ...prev, [category]: 0 }))}
          >
            ⭐
          </button>
        ))}
        <span className={styles.ratingText}>
          {currentRating > 0 ? `${currentRating}/5` : 'Not rated'}
        </span>
      </div>
    );
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[rating] || '';
  };

  return (
    <div className={styles.courseEvaluation}>
      <div className={styles.evaluationContainer}>
        {/* Header */}
        <div className={styles.evaluationHeader}>
          <div className={styles.courseInfo}>
            <h2 className={styles.courseTitle}>{course.title}</h2>
            <p className={styles.courseInstructor}>👨‍🏫 {course.instructor}</p>
            <p className={styles.completionInfo}>
              ✅ Completed on {new Date(course.completionDate).toLocaleDateString()}
            </p>
          </div>
          <div className={styles.evaluationBadge}>
            <span className={styles.badgeText}>Course Evaluation</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.evaluationForm}>
          {/* Rating Categories */}
          <div className={styles.ratingsSection}>
            <h3 className={styles.sectionTitle}>Rate Your Experience</h3>
            <p className={styles.sectionDescription}>
              Your feedback helps us improve our courses and helps other students make informed decisions.
            </p>

            {ratingCategories.map((category) => (
              <div key={category.key} className={styles.ratingCategory}>
                <div className={styles.categoryHeader}>
                  <h4 className={styles.categoryLabel}>{category.label}</h4>
                  <span className={styles.ratingLabel}>
                    {getRatingLabel(evaluation[category.key])}
                  </span>
                </div>
                <p className={styles.categoryDescription}>{category.description}</p>
                {renderStarRating(category.key, evaluation[category.key])}
              </div>
            ))}
          </div>

          {/* Written Feedback */}
          <div className={styles.feedbackSection}>
            <h3 className={styles.sectionTitle}>Written Feedback</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                What did you like most about this course? *
              </label>
              <textarea
                name="writtenFeedback"
                value={evaluation.writtenFeedback}
                onChange={handleInputChange}
                className={styles.formTextarea}
                rows="4"
                placeholder="Share what you found most valuable about this course..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                What could be improved?
              </label>
              <textarea
                name="improvements"
                value={evaluation.improvements}
                onChange={handleInputChange}
                className={styles.formTextarea}
                rows="4"
                placeholder="Suggest any improvements or areas that could be enhanced..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Which module was your favorite and why?
              </label>
              <select
                name="favoriteModule"
                value={evaluation.favoriteModule}
                onChange={handleInputChange}
                className={styles.formSelect}
              >
                <option value="">Select a module...</option>
                {course.modules.map((module) => (
                  <option key={module.id} value={module.title}>
                    {module.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Recommendation */}
          <div className={styles.recommendationSection}>
            <h3 className={styles.sectionTitle}>Recommendation</h3>
            
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="wouldRecommend"
                  checked={evaluation.wouldRecommend}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  I would recommend this course to other students
                </span>
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className={styles.summarySection}>
            <h3 className={styles.sectionTitle}>Evaluation Summary</h3>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Overall Rating:</span>
                <span className={styles.summaryValue}>
                  {evaluation.overallRating > 0 ? `${evaluation.overallRating}/5 ⭐` : 'Not rated'}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Content Quality:</span>
                <span className={styles.summaryValue}>
                  {evaluation.contentQuality > 0 ? `${evaluation.contentQuality}/5 ⭐` : 'Not rated'}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Instructor:</span>
                <span className={styles.summaryValue}>
                  {evaluation.instructorRating > 0 ? `${evaluation.instructorRating}/5 ⭐` : 'Not rated'}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Would Recommend:</span>
                <span className={styles.summaryValue}>
                  {evaluation.wouldRecommend ? '✅ Yes' : '❌ No'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onBack}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
            >
              📤 Submit Evaluation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEvaluation;