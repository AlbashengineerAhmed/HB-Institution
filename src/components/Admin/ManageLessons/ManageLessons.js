import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './ManageLessons.module.css';
import { createLesson, updateLesson, deleteLesson } from '../../../store/slices/lessonSlice';
import { fetchUnits, fetchUnitById } from '../../../store/slices/unitSlice';
import { fetchCourses, fetchCourseById } from '../../../store/slices/courseSlice';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageLessons = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.lessons);
  const { units, unitLessons } = useSelector((state) => state.units);
  const { courses } = useSelector((state) => state.courses);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [authError, setAuthError] = useState('');
  const [networkError, setNetworkError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [lessonToEdit, setLessonToEdit] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [availableUnits, setAvailableUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [courseLessons, setCourseLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [courseUnitsMap, setCourseUnitsMap] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    content: '',
    unitId: '',
    resource: null
  });

  // Validation constants based on backend requirements
  const DESCRIPTION_MIN_LENGTH = 10;
  const CONTENT_MIN_LENGTH = 20;

  // Simple validation function
  const validateForm = () => {
    const errors = [];
    
    if (!lessonForm.title.trim()) {
      errors.push('Title is required');
    }
    
    if (!lessonForm.description.trim()) {
      errors.push('Description is required');
    } else if (lessonForm.description.trim().length < DESCRIPTION_MIN_LENGTH) {
      errors.push(`Description must be at least ${DESCRIPTION_MIN_LENGTH} characters long (current: ${lessonForm.description.trim().length})`);
    }
    
    if (lessonForm.content.trim() && lessonForm.content.trim().length < CONTENT_MIN_LENGTH) {
      errors.push(`Content must be at least ${CONTENT_MIN_LENGTH} characters long (current: ${lessonForm.content.trim().length})`);
    }
    
    if (!lessonForm.unitId) {
      errors.push('Please select a unit');
    }
    
    // Validate resource file (PDF only)
    if (lessonForm.resource) {
      const file = lessonForm.resource;
      
      // Check file type
      if (file.type !== 'application/pdf') {
        errors.push('Resource file must be a PDF document');
      }
      
      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        errors.push(`Resource file size must be less than 10MB (current: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      }
    }
    
    return errors;
  };

  // Check if form is valid
  const isFormValid = () => {
    return validateForm().length === 0;
  };

  // Check authentication and fetch initial data on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to manage lessons.');
      setInitialLoading(false);
      return;
    }
    
    setAuthError('');
    setNetworkError(false);
    
    // Fetch courses and their details when component opens
    const fetchInitialData = async () => {
      try {
        console.log('🚀 Fetching initial data for lesson management...');
        setInitialLoading(true);
        
        // First fetch all courses
        const coursesResult = await dispatch(fetchCourses()).unwrap();
        const allCourses = coursesResult.data || coursesResult || [];
        console.log('📚 Fetched courses:', allCourses);
        console.log('📊 Number of courses:', allCourses.length);
        
        // Then fetch course details (units) for each course
        const courseDetailsPromises = allCourses.map(async (course) => {
          try {
            console.log(`🔍 Fetching units for course: ${course.title || course.name} (${course._id})`);
            
            // Fetch units for this course
            const unitsResult = await dispatch(fetchUnits(course._id)).unwrap();
            console.log(`📋 Raw units result for course ${course._id}:`, unitsResult);
            
            // Handle different response structures
            let courseUnits = [];
            if (unitsResult) {
              if (Array.isArray(unitsResult)) {
                courseUnits = unitsResult;
              } else if (unitsResult.data && Array.isArray(unitsResult.data)) {
                courseUnits = unitsResult.data;
              } else if (unitsResult.units && Array.isArray(unitsResult.units)) {
                courseUnits = unitsResult.units;
              }
            }
            
            console.log(`✅ Processed units for course ${course._id}:`, courseUnits);
            console.log(`📊 Number of units: ${courseUnits.length}`);
            
            return {
              courseId: course._id,
              units: courseUnits
            };
          } catch (error) {
            console.error(`❌ Failed to fetch units for course ${course._id}:`, error);
            console.error('❌ Course details:', course);
            return {
              courseId: course._id,
              units: []
            };
          }
        });
        
        // Wait for all course units to be fetched
        const courseDetailsResults = await Promise.all(courseDetailsPromises);
        console.log('📋 All course units fetched:', courseDetailsResults);
        
        // Store course-unit mapping for quick access
        const unitsMap = {};
        courseDetailsResults.forEach(({ courseId, units }) => {
          unitsMap[courseId] = units;
          console.log(`📝 Mapped ${units.length} units for course ${courseId}`);
        });
        
        setCourseUnitsMap(unitsMap);
        console.log('🗺️ Course-units mapping created:', unitsMap);
        console.log('📊 Total courses with units:', Object.keys(unitsMap).length);
        
      } catch (error) {
        console.error('❌ Failed to fetch initial data:', error);
        setNetworkError(true);
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchInitialData();
  }, [dispatch]);

  // Monitor error state from Redux
  useEffect(() => {
    if (error) {
      console.error('❌ Redux error detected:', error);
      setNetworkError(true);
    }
  }, [error]);

  // Handle course filter selection - only load units, not lessons
  const handleCourseFilterSelection = async (courseId) => {
    console.log('🔍 Course filter selection started for:', courseId);
    setCourseFilter(courseId);
    setUnitFilter('all'); // Reset unit filter
    setCourseLessons([]); // Clear lessons when course changes
    
    if (!courseId) {
      console.log('ℹ️ No course selected, clearing data');
      setCourseLessons([]);
      setAvailableUnits([]);
      return;
    }

    try {
      console.log('🔍 Loading units for course:', courseId);
      console.log('🗺️ Available course units map:', courseUnitsMap);
      
      // Get units from the preloaded mapping
      const courseUnits = courseUnitsMap[courseId] || [];
      console.log('📋 Course units from mapping:', courseUnits);
      console.log('📊 Number of units found:', courseUnits.length);
      
      if (courseUnits.length === 0) {
        console.warn('⚠️ No units found for this course');
        console.log('🔍 Checking if course exists in mapping:', Object.keys(courseUnitsMap));
        setAvailableUnits([]);
        setCourseLessons([]);
        toast.info('No units found for this course');
        return;
      }
      
      setAvailableUnits(courseUnits);
      toast.success(`Found ${courseUnits.length} units. Select a unit to view lessons.`);
      
    } catch (error) {
      console.error('❌ Failed to load course units:', error);
      console.error('❌ Course ID:', courseId);
      console.error('❌ Course units map:', courseUnitsMap);
      toast.error('Failed to load course units');
      setAvailableUnits([]);
      setCourseLessons([]);
    }
  };

  // Handle unit filter selection - fetch lessons for selected unit
  const handleUnitFilterSelection = async (unitId) => {
    console.log('🔍 Unit filter selection started for:', unitId);
    setUnitFilter(unitId);
    
    if (unitId === 'all') {
      console.log('ℹ️ "All units" selected, clearing lessons');
      setCourseLessons([]);
      toast.info('Select a specific unit to view lessons');
      return;
    }

    if (!unitId) {
      console.log('ℹ️ No unit selected, clearing lessons');
      setCourseLessons([]);
      return;
    }

    setLoadingLessons(true);
    
    try {
      console.log('🔍 Loading lessons for unit:', unitId);
      
      // Find the selected unit
      const selectedUnit = availableUnits.find(unit => unit._id === unitId);
      if (!selectedUnit) {
        console.error('❌ Selected unit not found in available units');
        toast.error('Selected unit not found');
        setLoadingLessons(false);
        return;
      }

      console.log(`🔍 Fetching unit details and lessons for: ${selectedUnit.title || 'Unnamed Unit'} (${unitId})`);
      console.log(`🌐 Using endpoint: https://hb-institution.vercel.app/api/v1/unit/${unitId}`);
      
      // Use the unit details API to fetch unit with lessons
      const unitDetailsResult = await dispatch(fetchUnitById(unitId)).unwrap();
      console.log(`📚 Raw unit details result for unit ${unitId}:`, unitDetailsResult);
      
      // Handle different response structures for unit details
      let unitData = null;
      let unitLessons = [];
      
      if (unitDetailsResult) {
        // Extract unit data and lessons from the response
        if (unitDetailsResult.data) {
          unitData = unitDetailsResult.data.unit || unitDetailsResult.data;
          unitLessons = unitDetailsResult.data.lessons || [];
        } else if (unitDetailsResult.unit) {
          unitData = unitDetailsResult.unit;
          unitLessons = unitDetailsResult.lessons || [];
        } else {
          unitData = unitDetailsResult;
          unitLessons = unitDetailsResult.lessons || [];
        }
      }
      
      console.log(`📋 Unit data:`, unitData);
      console.log(`📚 Unit lessons:`, unitLessons);
      console.log(`✅ Processed ${Array.isArray(unitLessons) ? unitLessons.length : 0} lessons for unit ${unitId}`);
      
      if (Array.isArray(unitLessons) && unitLessons.length > 0) {
        // Add unit info to each lesson for display
        const lessonsWithUnit = unitLessons.map(lesson => ({
          ...lesson,
          unitId: unitId,
          unitTitle: selectedUnit.title || unitData?.title || 'Unnamed Unit'
        }));
        setCourseLessons(lessonsWithUnit);
        console.log(`✅ Loaded ${lessonsWithUnit.length} lessons from unit ${selectedUnit.title || unitData?.title}`);
        toast.success(`Found ${lessonsWithUnit.length} lessons in this unit`);
      } else {
        console.log(`ℹ️ No lessons found in unit ${selectedUnit.title || 'Unnamed Unit'}`);
        setCourseLessons([]);
        toast.info('No lessons found in this unit');
      }
      
    } catch (error) {
      console.error(`❌ Failed to fetch unit details for unit ${unitId}:`, error);
      console.error('❌ Error details:', {
        message: error.message,
        status: error.status,
        data: error.data,
        response: error.response
      });
      toast.error('Failed to load unit lessons');
      setCourseLessons([]);
    } finally {
      setLoadingLessons(false);
    }
  };

  // Handle course selection for lesson creation
  const handleCourseSelection = async (courseId) => {
    console.log('🔍 Course selection for lesson creation:', courseId);
    setSelectedCourse(courseId);
    setLessonForm({ ...lessonForm, unitId: '' }); // Reset unit selection
    
    if (!courseId) {
      return;
    }

    // Get units from the preloaded mapping - no need to fetch again
    const courseUnits = courseUnitsMap[courseId] || [];
    console.log('📋 Units for lesson creation:', courseUnits);
    console.log('📊 Number of units available:', courseUnits.length);
    
    // Units are already available from the initial load
    // No need to set loading state or make API calls
  };
  
  const filteredLessons = courseLessons.filter(lesson => {
    const matchesSearch = (lesson.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lesson.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const resetForm = () => {
    setLessonForm({
      title: '',
      description: '',
      content: '',
      unitId: '',
      resource: null
    });
    setSelectedCourse('');
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to create lessons.');
      return;
    }
    
    if (!selectedCourse) {
      toast.error('Please select a course first');
      return;
    }
    
    // FRONTEND VALIDATION - Prevent submission if validation fails
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      console.log('❌ Frontend validation failed');
      console.log('❌ Preventing form submission due to validation errors');
      
      // Show validation errors to user
      validationErrors.forEach((error, index) => {
        setTimeout(() => {
          toast.error(error);
        }, index * 100);
      });
      
      // STOP HERE - Do not proceed with API call
      return;
    }
    
    console.log('✅ Frontend validation passed, proceeding with lesson creation');
    
    try {
      // Create lesson with the required format
      const lessonData = {
        title: lessonForm.title.trim(),
        description: lessonForm.description.trim(),
        content: lessonForm.content.trim(),
        unitId: lessonForm.unitId,
        resource: lessonForm.resource
      };

      console.log('Creating lesson with validated data:', lessonData);
      await dispatch(createLesson(lessonData)).unwrap();
      
      setShowCreateForm(false);
      resetForm();
      
      // Refresh lessons for the current unit filter if it's set
      if (unitFilter && unitFilter !== 'all') {
        await handleUnitFilterSelection(unitFilter);
      }
      
      toast.success('Lesson created successfully!');
    } catch (error) {
      console.error('Failed to create lesson:', error);
      if (error.includes('Authentication') || error.includes('token')) {
        setAuthError('Authentication failed. Please login again.');
      }
    }
  };

  const handleEditLesson = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to edit lessons.');
      return;
    }
    
    // FRONTEND VALIDATION - Prevent submission if validation fails
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      console.log('❌ Frontend validation failed');
      
      // Show validation errors to user
      validationErrors.forEach((error, index) => {
        setTimeout(() => {
          toast.error(error);
        }, index * 100);
      });
      
      // STOP HERE - Do not proceed with API call
      return;
    }
    
    try {
      const lessonId = lessonToEdit.id || lessonToEdit._id;
      const lessonData = {
        title: lessonForm.title.trim(),
        description: lessonForm.description.trim(),
        content: lessonForm.content.trim(),
        unitId: lessonForm.unitId
      };
      
      await dispatch(updateLesson({ lessonId, lessonData })).unwrap();
      
      setShowEditForm(false);
      setLessonToEdit(null);
      resetForm();
      
      // Refresh lessons for the current unit filter if it's set
      if (unitFilter && unitFilter !== 'all') {
        await handleUnitFilterSelection(unitFilter);
      }
    } catch (error) {
      console.error('Failed to update lesson:', error);
      if (error.includes('Authentication') || error.includes('token')) {
        setAuthError('Authentication failed. Please login again.');
      }
    }
  };

  const handleEditClick = async (lesson) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to edit lessons.');
      return;
    }
    
    setLessonToEdit(lesson);
    setLessonForm({
      title: lesson.title || '',
      description: lesson.description || '',
      content: lesson.content || '',
      unitId: lesson.unitId || '',
      resource: null // Don't pre-populate file input
    });

    // Find the course that contains this unit
    const unit = availableUnits.find(u => u._id === lesson.unitId || u.id === lesson.unitId);
    if (unit && unit.courseId) {
      setSelectedCourse(unit.courseId);
      await handleCourseSelection(unit.courseId);
    }
    
    setShowEditForm(true);
  };

  const handleDeleteClick = (lesson) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to delete lessons.');
      return;
    }
    
    setLessonToDelete(lesson);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!lessonToDelete) return;

    try {
      const lessonId = lessonToDelete.id || lessonToDelete._id;
      await dispatch(deleteLesson(lessonId)).unwrap();
      
      // Refresh lessons for the current unit filter if it's set
      if (unitFilter && unitFilter !== 'all') {
        await handleUnitFilterSelection(unitFilter);
      }
    } catch (error) {
      console.error('Failed to delete lesson:', error);
    } finally {
      setShowDeleteModal(false);
      setLessonToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setLessonToDelete(null);
  };

  const handleRetry = () => {
    setNetworkError(false);
    const token = localStorage.getItem('authToken');
    if (token) {
      window.location.reload(); // Reload to retry initial data fetch
    }
  };

  const getUnitName = (unitId) => {
    const unit = availableUnits.find(u => u._id === unitId || u.id === unitId);
    return unit ? unit.title : 'Unknown Unit';
  };

  const getCourseName = (courseId) => {
    const course = courses.find(c => c._id === courseId || c.id === courseId);
    return course ? course.title || course.name : 'Unknown Course';
  };

  // Get units for the selected course in lesson creation form
  const getUnitsForSelectedCourse = () => {
    if (!selectedCourse) return [];
    const units = courseUnitsMap[selectedCourse] || [];
    console.log('📋 Getting units for selected course:', selectedCourse, units);
    return units;
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
        <p>Unable to load data. Please check your internet connection and try again.</p>
        <button 
          onClick={handleRetry}
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  // Show initial loading state
  if (initialLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading courses and course details...</p>
      </div>
    );
  }

  return (
    <div className={styles.manageLessons}>
      {/* Header with filters and create button */}
      <div className={styles.lessonHeader}>
        <div className={styles.headerTop}>
          <h2>Manage Lessons</h2>
          <button 
            className={styles.createBtn}
            onClick={() => {
              resetForm();
              setShowCreateForm(!showCreateForm);
              setShowEditForm(false);
            }}
          >
            {showCreateForm ? '✕ Cancel' : '+ Create Lesson'}
          </button>
        </div>
        
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filtersSection}>
          <select
            value={courseFilter}
            onChange={(e) => handleCourseFilterSelection(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Select a course to view units</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.title || course.name}
              </option>
            ))}
          </select>
          
          {courseFilter && availableUnits.length > 0 && (
            <select
              value={unitFilter}
              onChange={(e) => handleUnitFilterSelection(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Select a unit to view lessons</option>
              {availableUnits.map(unit => (
                <option key={unit._id} value={unit._id}>
                  {unit.title || 'Unnamed Unit'}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Create/Edit Lesson Form */}
      {(showCreateForm || showEditForm) && (
        <div className={styles.lessonForm}>
          <h3>{showEditForm ? 'Edit Lesson' : 'Create New Lesson'}</h3>
          <form onSubmit={showEditForm ? handleEditLesson : handleCreateLesson}>
            {/* Course Selection - Only show for create form */}
            {showCreateForm && (
              <div className={styles.formGroup}>
                <label>Select Course *</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => handleCourseSelection(e.target.value)}
                  required
                  className={styles.courseSelect}
                >
                  <option value="">Choose a course first</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>
                      {course.title || course.name}
                    </option>
                  ))}
                </select>
                <small className={styles.helpText}>
                  Select a course to load its units for lesson creation
                </small>
              </div>
            )}

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Lesson Title *</label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})}
                  placeholder="e.g., Introduction to JavaScript"
                  required
                  maxLength={100}
                />
                <small className={styles.charCount}>
                  {lessonForm.title.length}/100 characters
                </small>
              </div>
              <div className={styles.formGroup}>
                <label>Unit *</label>
                <select
                  value={lessonForm.unitId}
                  onChange={(e) => setLessonForm({...lessonForm, unitId: e.target.value})}
                  required
                  disabled={showCreateForm && !selectedCourse}
                >
                  <option value="">
                    {showCreateForm && !selectedCourse 
                      ? 'Select a course first' 
                      : 'Select Unit'
                    }
                  </option>
                  {(showCreateForm ? getUnitsForSelectedCourse() : availableUnits).map(unit => (
                    <option key={unit._id} value={unit._id}>
                      {unit.title || 'Unnamed Unit'}
                    </option>
                  ))}
                </select>
                {showCreateForm && selectedCourse && (
                  <small className={styles.helpText}>
                    {getUnitsForSelectedCourse().length} units available
                  </small>
                )}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Description * (minimum {DESCRIPTION_MIN_LENGTH} characters)</label>
              <textarea
                value={lessonForm.description}
                onChange={(e) => setLessonForm({...lessonForm, description: e.target.value})}
                rows="3"
                placeholder="e.g., Learn the fundamentals of JavaScript programming"
                required
                maxLength={300}
              />
              <small className={`${styles.charCount} ${lessonForm.description.trim().length < DESCRIPTION_MIN_LENGTH ? styles.warning : ''}`}>
                {lessonForm.description.length}/300 characters 
                (minimum {DESCRIPTION_MIN_LENGTH} required)
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label>Content (minimum {CONTENT_MIN_LENGTH} characters if provided)</label>
              <textarea
                value={lessonForm.content}
                onChange={(e) => setLessonForm({...lessonForm, content: e.target.value})}
                rows="6"
                placeholder="e.g., This lesson covers variables, data types, and basic syntax..."
                maxLength={2000}
              />
              <small className={`${styles.charCount} ${lessonForm.content.trim() && lessonForm.content.trim().length < CONTENT_MIN_LENGTH ? styles.warning : ''}`}>
                {lessonForm.content.length}/2000 characters 
                {lessonForm.content.trim() && `(minimum ${CONTENT_MIN_LENGTH} required)`}
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label>Resource File (PDF only, max 10MB)</label>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setLessonForm({...lessonForm, resource: file || null});
                }}
                className={styles.fileInput}
              />
              {lessonForm.resource && (
                <div className={styles.fileInfo}>
                  <small className={styles.fileName}>
                    📄 {lessonForm.resource.name} ({(lessonForm.resource.size / 1024 / 1024).toFixed(2)}MB)
                  </small>
                  <button
                    type="button"
                    onClick={() => setLessonForm({...lessonForm, resource: null})}
                    className={styles.removeFileBtn}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
              <small className={styles.helpText}>
                Optional: Upload a PDF resource file for this lesson (max 10MB)
              </small>
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.cancelBtn}
                onClick={() => {
                  setShowCreateForm(false);
                  setShowEditForm(false);
                  setLessonToEdit(null);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`${styles.submitBtn} ${!isFormValid() ? styles.disabled : ''}`}
                disabled={isLoading || (showCreateForm && !selectedCourse) || !isFormValid()}
              >
                {isLoading ? (showEditForm ? 'Updating...' : 'Creating...') : (showEditForm ? 'Update Lesson' : 'Create Lesson')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Course Selection Message */}
      {!courseFilter && !loadingLessons && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h3>Select a Course to View Units</h3>
          <p>Choose a course from the dropdown above to view its units, then select a unit to view lessons.</p>
          <p><small>Courses loaded: {courses.length} | Course details preloaded: {Object.keys(courseUnitsMap).length}</small></p>
        </div>
      )}

      {/* Unit Selection Message */}
      {courseFilter && availableUnits.length > 0 && unitFilter === 'all' && !loadingLessons && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📋</div>
          <h3>Select a Unit to View Lessons</h3>
          <p>Choose a unit from the dropdown above to view its lessons.</p>
          <p><small>Units available: {availableUnits.length}</small></p>
        </div>
      )}

      {/* Loading Lessons */}
      {loadingLessons && (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading lessons from selected unit...</p>
        </div>
      )}

      {/* Lessons Table */}
      {courseFilter && unitFilter !== 'all' && !loadingLessons && courseLessons.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📖</div>
          <h3>No Lessons Found</h3>
          <p>This unit doesn't have any lessons yet. Create your first lesson to get started.</p>
          <button 
            onClick={() => {
              resetForm();
              setShowCreateForm(true);
            }}
            className={styles.createFirstBtn}
          >
            Create First Lesson
          </button>
        </div>
      )}

      {courseFilter && unitFilter !== 'all' && !loadingLessons && courseLessons.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.lessonsTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Content Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id || lesson._id} className={styles.lessonRow}>
                  <td className={styles.titleCell}>
                    <h4 className={styles.lessonTitle}>{lesson.title}</h4>
                  </td>
                  <td className={styles.descriptionCell}>
                    <p className={styles.lessonDescription}>{lesson.description}</p>
                  </td>
                  <td className={styles.unitCell}>
                    <span className={styles.unitName}>{lesson.unitTitle || getUnitName(lesson.unitId)}</span>
                  </td>
                  <td className={styles.contentCell}>
                    <p className={styles.contentPreview}>
                      {lesson.content ? 
                        (lesson.content.length > 100 ? 
                          lesson.content.substring(0, 100) + '...' : 
                          lesson.content
                        ) : 
                        'No content'
                      }
                    </p>
                  </td>
                  <td className={styles.actionsCell}>
                    <div className={styles.actionButtons}>
                      <button
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={() => handleEditClick(lesson)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDeleteClick(lesson)}
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

      {filteredLessons.length === 0 && courseLessons.length > 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No Lessons Match Your Search</h3>
          <p>No lessons found matching your search criteria. Try adjusting your search.</p>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Lesson"
        message={
          lessonToDelete 
            ? `Are you sure you want to delete "${lessonToDelete.title}"? This action cannot be undone.`
            : 'Are you sure you want to delete this lesson?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default ManageLessons;