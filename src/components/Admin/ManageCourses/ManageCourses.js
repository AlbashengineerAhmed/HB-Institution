import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './ManageCourses.module.css';
import { fetchCourses, createCourse, deleteCourse } from '../../../store/slices/courseSlice';
import { fetchCategories } from '../../../store/slices/categorySlice';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageCourses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading, error } = useSelector((state) => state.courses);
  const { categories } = useSelector((state) => state.categories);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [authError, setAuthError] = useState('');
  const [networkError, setNetworkError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: '',
    levels: [],
    duration: '',
    image: null,
    categoryId: ''
  });

  // Check authentication on component mount and scroll to top
  useEffect(() => {
    // Scroll to top when component mounts (page refresh)
    window.scrollTo(0, 0);
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to manage courses.');
      return;
    }
    
    // Clear any previous auth errors and fetch data
    setAuthError('');
    setNetworkError(false);
    
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCourses()).unwrap(),
          dispatch(fetchCategories()).unwrap()
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setNetworkError(true);
      }
    };
    
    fetchData();
  }, [dispatch]);

  // Monitor error state from Redux
  useEffect(() => {
    if (error) {
      setNetworkError(true);
    }
  }, [error]);
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = (course.title || course.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.instructor || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (course.status || 'approved') === statusFilter;
    const matchesCategory = categoryFilter === 'all' || (course.category || course.CategoryId || course.categoryId) === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    
    // Check authentication before submitting
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to create courses.');
      return;
    }
    
    if (!courseForm.categoryId) {
      toast.error('Please select a category');
      return;
    }

    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      const courseData = {
        title: courseForm.title,
        description: courseForm.description,
        price: courseForm.price,
        duration: courseForm.duration,
        levels: courseForm.levels,
        image: courseForm.image
      };

      await dispatch(createCourse({ categoryId: courseForm.categoryId, courseData })).unwrap();
      
      // Reset form on success
      setShowCreateForm(false);
      setCourseForm({
        title: '',
        description: '',
        price: '',
        levels: [],
        duration: '',
        image: null,
        categoryId: ''
      });
      setImagePreview(null);
      
      // Refresh courses list
      dispatch(fetchCourses());
    } catch (error) {
      console.error('Failed to create course:', error);
      if (error.includes('Authentication') || error.includes('token')) {
        setAuthError('Authentication failed. Please login again.');
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setCourseForm({ ...courseForm, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLevelChange = (level) => {
    const updatedLevels = courseForm.levels.includes(level)
      ? courseForm.levels.filter(l => l !== level)
      : [...courseForm.levels, level];
    setCourseForm({ ...courseForm, levels: updatedLevels });
  };

  const handleStatusChange = (courseId, newStatus) => {
    // Check authentication before changing status
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to manage courses.');
      return;
    }
    
    console.log(`Course ${courseId} status changed to ${newStatus}`);
    // In a real app, this would update the backend
    toast.success(`Course status changed to ${newStatus}`);
  };

  const handleDeleteClick = (course) => {
    // Check authentication before showing delete modal
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to delete courses.');
      return;
    }
    
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    try {
      const courseId = courseToDelete.id || courseToDelete._id;
      await dispatch(deleteCourse(courseId)).unwrap();
      
      // The success toast is already handled in the deleteCourse action
      // The course will be automatically removed from the state by the reducer
    } catch (error) {
      console.error('Failed to delete course:', error);
      // Error toast is already handled in the deleteCourse action
    } finally {
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  const handleRetry = () => {
    setNetworkError(false);
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(fetchCourses());
      dispatch(fetchCategories());
    }
  };

  const getStatusBadge = (status) => {
    // Default to 'approved' if status is undefined or null
    const courseStatus = status || 'approved';
    
    const statusClasses = {
      pending: styles.statusPending,
      approved: styles.statusApproved,
      rejected: styles.statusRejected
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[courseStatus]}`}>
        {courseStatus.charAt(0).toUpperCase() + courseStatus.slice(1)}
      </span>
    );
  };

  // Show authentication error if no token
  if (authError) {
    return (
      <div className={styles.authError}>
        <div className={styles.errorIcon}>🔒</div>
        <h3>Authentication Required</h3>
        <p>{authError}</p>
        <button 
          onClick={() => window.location.href = '/auth/login'}
          className={styles.loginButton}
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Show network error state
  if (networkError) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Network Error</h3>
        <p>Unable to load courses. Please check your internet connection and try again.</p>
        <button 
          onClick={handleRetry}
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  // Show loading state
  if (isLoading && courses.length === 0) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className={styles.manageCourses}>
      {/* Header with filters and create button */}
      <div className={styles.courseHeader}>
        <div className={styles.headerTop}>
          <h2>Manage Courses</h2>
          <button 
            className={styles.createBtn}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? '✕ Cancel' : '+ Create Course'}
          </button>
        </div>
        
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search courses or instructors..."
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
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Create Course Form */}
      {showCreateForm && (
        <div className={styles.createForm}>
          <h3>Create New Course</h3>
          <form onSubmit={handleCreateCourse}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Course Title *</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                  placeholder="Enter course title"
                  required
                  maxLength={100}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Category *</label>
                <select
                  value={courseForm.categoryId}
                  onChange={(e) => setCourseForm({...courseForm, categoryId: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Price ($) *</label>
                <input
                  type="number"
                  value={courseForm.price}
                  onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Duration *</label>
                <input
                  type="text"
                  placeholder="e.g., 6 weeks"
                  value={courseForm.duration}
                  onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Description *</label>
              <textarea
                value={courseForm.description}
                onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                rows="4"
                placeholder="Enter course description"
                required
                maxLength={500}
              />
              <small className={styles.charCount}>
                {courseForm.description.length}/500 characters
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label>Levels</label>
              <div className={styles.levelCheckboxes}>
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <label key={level} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={courseForm.levels.includes(level)}
                      onChange={() => handleLevelChange(level)}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Course Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              <small className={styles.fileHint}>
                Supported formats: JPG, PNG, GIF. Max size: 5MB
              </small>
              {imagePreview && (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setCourseForm({ ...courseForm, image: null });
                    }}
                    className={styles.removeImageBtn}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.cancelBtn}
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses Table */}
      {courses.length === 0 && !isLoading ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h3>No Courses Found</h3>
          <p>There are no courses available at the moment. Create your first course to get started.</p>
          <button 
            onClick={() => setShowCreateForm(true)}
            className={styles.createFirstBtn}
          >
            Create First Course
          </button>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.coursesTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Course Details</th>
                <th>Instructor</th>
                <th>Students</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id || course._id} className={styles.courseRow}>
                  <td className={styles.imageCell}>
                    <div className={styles.courseImageContainer}>
                      {course.image ? (
                        <img 
                          src={course.image} 
                          alt={course.title || course.name}
                          className={styles.courseImage}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={styles.noImagePlaceholder} style={{ display: course.image ? 'none' : 'flex' }}>
                        <span>📷</span>
                        <small>No Image</small>
                      </div>
                    </div>
                  </td>
                  <td className={styles.courseDetails}>
                    <div className={styles.courseInfo}>
                      <h4 className={styles.courseName}>{course.title || course.name}</h4>
                      <p className={styles.courseDescription}>{course.description}</p>
                      <div className={styles.courseMeta}>
                        <span className={styles.courseCategory}>
                          {course.category || categories.find(cat => cat._id === (course.CategoryId || course.categoryId))?.name || 'Unknown'}
                        </span>
                        {course.price && (
                          <span className={styles.coursePrice}>${course.price}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className={styles.instructorCell}>
                    <div className={styles.instructorInfo}>
                      <div className={styles.instructorAvatar}>
                        {course.instructor ? course.instructor.split(' ').map(n => n[0]).join('') : 'N/A'}
                      </div>
                      <span className={styles.instructorName}>{course.instructor || 'No instructor assigned'}</span>
                    </div>
                  </td>
                  <td className={styles.studentsCell}>
                    <span className={styles.studentsCount}>{course.students || 0}</span>
                  </td>
                  <td className={styles.statusCell}>
                    {getStatusBadge(course.status)}
                  </td>
                  <td className={styles.actionsCell}>
                    <div className={styles.actionButtons}>
                      {(course.status || 'approved') === 'pending' && (
                        <>
                          <button
                            className={`${styles.actionBtn} ${styles.approveBtn}`}
                            onClick={() => handleStatusChange(course.id || course._id, 'approved')}
                          >
                            ✓ Approve
                          </button>
                          <button
                            className={`${styles.actionBtn} ${styles.rejectBtn}`}
                            onClick={() => handleStatusChange(course.id || course._id, 'rejected')}
                          >
                            ✗ Reject
                          </button>
                        </>
                      )}
                      <button
                        className={`${styles.actionBtn} ${styles.viewBtn}`}
                        onClick={() => console.log(`View course ${course.id || course._id}`)}
                      >
                        👁 View
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDeleteClick(course)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredCourses.length === 0 && courses.length > 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No Courses Match Your Search</h3>
          <p>No courses found matching your search criteria. Try adjusting your filters.</p>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Course"
        message={
          courseToDelete 
            ? `Are you sure you want to delete "${courseToDelete.title || courseToDelete.name}"? This action cannot be undone and will remove all associated units and student progress.`
            : 'Are you sure you want to delete this course?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default ManageCourses;