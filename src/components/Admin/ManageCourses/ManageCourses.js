import React, { useState, useEffect, useMemo } from 'react';
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
  
  // Simplified state management - removed bulk selection
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Fixed at 10 items per page
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

  // Simplified filtering and sorting logic
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = (course.title || course.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (course.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || (course.category || course.CategoryId || course.categoryId) === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = (a.title || a.name || '').toLowerCase();
          bValue = (b.title || b.name || '').toLowerCase();
          break;
        case 'duration':
          aValue = a.duration || '';
          bValue = b.duration || '';
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          aValue = a.title || a.name || '';
          bValue = b.title || b.name || '';
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [courses, searchTerm, categoryFilter, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage);
  const paginatedCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, sortBy, sortOrder]);

  // Check authentication on component mount and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to manage courses.');
      return;
    }
    
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

  useEffect(() => {
    if (error) {
      setNetworkError(true);
    }
  }, [error]);

  // Enhanced handlers
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleViewCourse = (course) => {
    // Placeholder for view functionality
    toast.info(`View functionality for "${course.title || course.name}" will be implemented soon`);
  };

  const handleEditCourse = (course) => {
    // Placeholder for edit functionality
    toast.info(`Edit functionality for "${course.title || course.name}" will be implemented soon`);
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    
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
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

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

  const handleDeleteClick = (course) => {
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
    } catch (error) {
      console.error('Failed to delete course:', error);
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
      {/* Simplified Header - removed bulk selection stats */}
      <div className={styles.courseHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <h2>Manage Courses</h2>
            <div className={styles.courseStats}>
              <span className={styles.statItem}>
                Total: <strong>{courses.length}</strong>
              </span>
              <span className={styles.statItem}>
                Filtered: <strong>{filteredAndSortedCourses.length}</strong>
              </span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <button 
              className={styles.createBtn}
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? '✕ Cancel' : '+ Create Course'}
            </button>
          </div>
        </div>
        
        {/* Simplified Search and Filters */}
        <div className={styles.filtersContainer}>
          <div className={styles.searchSection}>
            <div className={styles.searchInputContainer}>
              <input
                type="text"
                placeholder="Search courses by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <div className={styles.filtersSection}>
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

      {/* Simplified Courses Table - removed checkboxes */}
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
        <>
          {/* Desktop Table View */}
          <div className={styles.tableContainer}>
          <table className={styles.coursesTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('title')}
                >
                  Course Details
                  {sortBy === 'title' && (
                    <span className={styles.sortIcon}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('duration')}
                >
                  Duration
                  {sortBy === 'duration' && (
                    <span className={styles.sortIcon}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => (
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
                        <span className={styles.coursePrice}>
                          {course.price && parseFloat(course.price) > 0 
                            ? `$${parseFloat(course.price).toFixed(2)}` 
                            : 'Free'
                          }
                        </span>
                        {course.levels && course.levels.length > 0 && (
                          <div className={styles.courseLevels}>
                            {course.levels.map(level => (
                              <span key={level} className={styles.levelBadge}>
                                {level}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className={styles.durationCell}>
                    <span className={styles.courseDuration}>
                      {course.duration || 'N/A'}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <div className={styles.actionButtons}>
                      <button
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={() => handleEditCourse(course)}
                        title="Edit Course"
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.viewBtn}`}
                        onClick={() => handleViewCourse(course)}
                        title="View Details"
                      >
                        View
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDeleteClick(course)}
                        title="Delete Course"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <div className={styles.paginationInfo}>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedCourses.length)} of {filteredAndSortedCourses.length} courses
              </div>
              <div className={styles.paginationControls}>
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={styles.paginationBtn}
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={styles.paginationBtn}
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`${styles.paginationBtn} ${currentPage === pageNum ? styles.active : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={styles.paginationBtn}
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={styles.paginationBtn}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className={styles.mobileCardView}>
          {paginatedCourses.map((course) => (
            <div key={course.id || course._id} className={styles.courseCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardImageContainer}>
                  {course.image ? (
                    <img 
                      src={course.image} 
                      alt={course.title || course.name}
                      className={styles.cardImage}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={styles.cardNoImage} style={{ display: course.image ? 'none' : 'flex' }}>
                    <span>📷</span>
                    <small>No Image</small>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{course.title || course.name}</h4>
                  <p className={styles.cardDescription}>{course.description}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>
                      {course.category || categories.find(cat => cat._id === (course.CategoryId || course.categoryId))?.name || 'Unknown'}
                    </span>
                    <span className={styles.cardPrice}>
                      {course.price && parseFloat(course.price) > 0 
                        ? `${parseFloat(course.price).toFixed(2)}` 
                        : 'Free'
                      }
                    </span>
                    <span className={styles.cardDuration}>
                      {course.duration || 'N/A'}
                    </span>
                    {course.levels && course.levels.length > 0 && (
                      <div className={styles.cardLevels}>
                        {course.levels.map(level => (
                          <span key={level} className={styles.cardLevelBadge}>
                            {level}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.cardActionBtn} ${styles.cardEditBtn}`}
                    onClick={() => handleEditCourse(course)}
                    title="Edit Course"
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.cardActionBtn} ${styles.cardViewBtn}`}
                    onClick={() => handleViewCourse(course)}
                    title="View Details"
                  >
                    View
                  </button>
                  <button
                    className={`${styles.cardActionBtn} ${styles.cardDeleteBtn}`}
                    onClick={() => handleDeleteClick(course)}
                    title="Delete Course"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Mobile Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <div className={styles.paginationInfo}>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedCourses.length)} of {filteredAndSortedCourses.length} courses
              </div>
              <div className={styles.paginationControls}>
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={styles.paginationBtn}
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={styles.paginationBtn}
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`${styles.paginationBtn} ${currentPage === pageNum ? styles.active : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={styles.paginationBtn}
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={styles.paginationBtn}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
        </>
      )}

      {filteredAndSortedCourses.length === 0 && courses.length > 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No Courses Match Your Search</h3>
          <p>No courses found matching your search criteria. Try adjusting your filters.</p>
        </div>
      )}

      {/* Modal - removed bulk delete modal */}
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