import React, { useState, useEffect } from 'react';
import styles from './CourseForm.module.css';

const CourseForm = ({ course, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Islamic Studies',
    level: 'Beginner',
    duration: '',
    price: '',
    thumbnail: '',
    modules: [
      { id: 1, title: '', description: '', duration: '', videoUrl: '', materials: [] }
    ]
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Initialize form data when editing
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        category: course.category || 'Islamic Studies',
        level: course.level || 'Beginner',
        duration: course.duration || '',
        price: course.price || '',
        thumbnail: course.thumbnail || '',
        modules: course.modules || [
          { id: 1, title: '', description: '', duration: '', videoUrl: '', materials: [] }
        ]
      });
    }
  }, [course]);

  const categories = [
    'Islamic Studies',
    'Quran Studies',
    'Arabic Language',
    'Islamic History',
    'Islamic Finance',
    'Hadith Studies',
    'Islamic Law',
    'Islamic Philosophy'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModuleChange = (moduleIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map((module, index) => 
        index === moduleIndex 
          ? { ...module, [field]: value }
          : module
      )
    }));
  };

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [
        ...prev.modules,
        { 
          id: prev.modules.length + 1, 
          title: '', 
          description: '', 
          duration: '', 
          videoUrl: '', 
          materials: [] 
        }
      ]
    }));
  };

  const removeModule = (moduleIndex) => {
    if (formData.modules.length > 1) {
      setFormData(prev => ({
        ...prev,
        modules: prev.modules.filter((_, index) => index !== moduleIndex)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course data:', formData);
    onSave(formData);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Basic Information</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Course Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={styles.formTextarea}
                rows="4"
                placeholder="Describe what students will learn in this course"
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={styles.formSelect}
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Level *</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className={styles.formSelect}
                  required
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Price (USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Thumbnail Image URL</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Course Modules</h3>
            <p className={styles.stepDescription}>
              Add modules to structure your course content. Each module should focus on a specific topic.
            </p>

            <div className={styles.modulesList}>
              {formData.modules.map((module, index) => (
                <div key={module.id} className={styles.moduleCard}>
                  <div className={styles.moduleHeader}>
                    <h4 className={styles.moduleTitle}>Module {index + 1}</h4>
                    {formData.modules.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeModuleBtn}
                        onClick={() => removeModule(index)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Module Title *</label>
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                      className={styles.formInput}
                      placeholder="Enter module title"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Module Description</label>
                    <textarea
                      value={module.description}
                      onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                      className={styles.formTextarea}
                      rows="3"
                      placeholder="Describe what this module covers"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Duration *</label>
                      <input
                        type="text"
                        value={module.duration}
                        onChange={(e) => handleModuleChange(index, 'duration', e.target.value)}
                        className={styles.formInput}
                        placeholder="e.g., 45 min"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Video URL</label>
                      <input
                        type="url"
                        value={module.videoUrl}
                        onChange={(e) => handleModuleChange(index, 'videoUrl', e.target.value)}
                        className={styles.formInput}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.addModuleBtn}
              onClick={addModule}
            >
              ➕ Add Another Module
            </button>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Review & Submit</h3>
            <p className={styles.stepDescription}>
              Review your course details before submitting for approval.
            </p>

            <div className={styles.reviewSection}>
              <div className={styles.reviewCard}>
                <h4 className={styles.reviewTitle}>Course Overview</h4>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Title:</span>
                  <span className={styles.reviewValue}>{formData.title}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Category:</span>
                  <span className={styles.reviewValue}>{formData.category}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Level:</span>
                  <span className={styles.reviewValue}>{formData.level}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Duration:</span>
                  <span className={styles.reviewValue}>{formData.duration}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Price:</span>
                  <span className={styles.reviewValue}>${formData.price}</span>
                </div>
              </div>

              <div className={styles.reviewCard}>
                <h4 className={styles.reviewTitle}>Course Modules ({formData.modules.length})</h4>
                {formData.modules.map((module, index) => (
                  <div key={module.id} className={styles.reviewModule}>
                    <span className={styles.moduleNumber}>{index + 1}.</span>
                    <div className={styles.moduleInfo}>
                      <span className={styles.moduleName}>{module.title || 'Untitled Module'}</span>
                      <span className={styles.moduleDuration}>{module.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.reviewCard}>
                <h4 className={styles.reviewTitle}>Description</h4>
                <p className={styles.reviewDescription}>{formData.description}</p>
              </div>
            </div>

            <div className={styles.submitNote}>
              <p>
                📝 <strong>Note:</strong> Your course will be submitted for review and approval. 
                You'll be notified once the review process is complete.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.courseForm}>
      <div className={styles.formContainer}>
        {/* Progress Steps */}
        <div className={styles.progressSteps}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`${styles.progressStep} ${
                step <= currentStep ? styles.active : ''
              } ${step < currentStep ? styles.completed : ''}`}
            >
              <div className={styles.stepNumber}>
                {step < currentStep ? '✓' : step}
              </div>
              <div className={styles.stepLabel}>
                {step === 1 && 'Basic Info'}
                {step === 2 && 'Modules'}
                {step === 3 && 'Review'}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {renderStepContent()}

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>

            <div className={styles.navigationBtns}>
              {currentStep > 1 && (
                <button
                  type="button"
                  className={styles.prevBtn}
                  onClick={prevStep}
                >
                  ← Previous
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={nextStep}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.submitBtn}
                >
                  {course ? 'Update Course' : 'Submit for Review'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;