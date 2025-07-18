import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './ManageUnits.module.css';
import { fetchUnits, createUnit, updateUnit, deleteUnit, setSelectedCourse, clearUnits } from '../../../store/slices/unitSlice';
import { fetchCourses } from '../../../store/slices/courseSlice';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageUnits = () => {
  const dispatch = useDispatch();
  const { units, loading, error, selectedCourse } = useSelector((state) => state.units);
  const { courses } = useSelector((state) => state.courses);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [authError, setAuthError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState(null);
  
  const [unitForm, setUnitForm] = useState({
    title: '',
    description: '',
    topic: [],
    content: '',
    courseId: ''
  });

  // Check authentication on component mount and scroll to top
  useEffect(() => {
    // Scroll to top when component mounts (page refresh)
    window.scrollTo(0, 0);
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to manage units.');
      return;
    }
    
    // Clear any previous auth errors and fetch data
    setAuthError('');
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourse) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setAuthError('Authentication required. Please login to view units.');
        return;
      }
      dispatch(fetchUnits(selectedCourse));
    }
  }, [dispatch, selectedCourse]);

  const handleCourseSelect = (courseId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to select courses.');
      return;
    }
    
    dispatch(setSelectedCourse(courseId));
    if (!courseId) {
      dispatch(clearUnits());
    }
  };

  const handleCreateUnit = async (e) => {
    e.preventDefault();
    
    // Check authentication before submitting
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to create units.');
      return;
    }
    
    if (!unitForm.courseId) {
      toast.error('Please select a course');
      return;
    }

    if (!unitForm.title.trim() || !unitForm.description.trim() || !unitForm.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      await dispatch(createUnit({ 
        courseId: unitForm.courseId, 
        unitData: {
          title: unitForm.title,
          description: unitForm.description,
          topic: unitForm.topic,
          content: unitForm.content
        }
      })).unwrap();
      
      // Reset form on success
      setShowCreateForm(false);
      setUnitForm({
        title: '',
        description: '',
        topic: [],
        content: '',
        courseId: ''
      });
      
      // Refresh units list if the created unit is for the currently selected course
      if (unitForm.courseId === selectedCourse) {
        dispatch(fetchUnits(selectedCourse));
      } else {
        // If creating for a different course, switch to that course
        dispatch(setSelectedCourse(unitForm.courseId));
      }
    } catch (error) {
      console.error('Failed to create unit:', error);
      if (error.includes('Authentication') || error.includes('token')) {
        setAuthError('Authentication failed. Please login again.');
      }
    }
  };

  const handleUpdateUnit = async (e) => {
    e.preventDefault();
    
    // Check authentication before updating
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to update units.');
      return;
    }
    
    if (!editingUnit) return;

    if (!unitForm.title.trim() || !unitForm.description.trim() || !unitForm.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      await dispatch(updateUnit({ 
        unitId: editingUnit._id, 
        unitData: {
          title: unitForm.title,
          description: unitForm.description,
          topic: unitForm.topic,
          content: unitForm.content
        }
      })).unwrap();
      
      // Reset form on success
      setShowEditForm(false);
      setEditingUnit(null);
      setUnitForm({
        title: '',
        description: '',
        topic: [],
        content: '',
        courseId: ''
      });
    } catch (error) {
      console.error('Failed to update unit:', error);
      if (error.includes('Authentication') || error.includes('token')) {
        setAuthError('Authentication failed. Please login again.');
      }
    }
  };

  const handleDeleteClick = (unit) => {
    // Check authentication before showing delete modal
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to delete units.');
      return;
    }
    
    setUnitToDelete(unit);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!unitToDelete) return;

    try {
      await dispatch(deleteUnit(unitToDelete._id)).unwrap();
    } catch (error) {
      console.error('Failed to delete unit:', error);
      if (error.includes('Authentication') || error.includes('token')) {
        setAuthError('Authentication failed. Please login again.');
      }
    } finally {
      setShowDeleteModal(false);
      setUnitToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setUnitToDelete(null);
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setUnitForm({
      title: unit.title || '',
      description: unit.description || '',
      topic: unit.topic || [],
      content: unit.content || '',
      courseId: ''
    });
    setShowEditForm(true);
  };

  const handleTopicChange = (e) => {
    const topics = e.target.value.split(',').map(topic => topic.trim()).filter(topic => topic);
    setUnitForm({ ...unitForm, topic: topics });
  };

  const handleCreateUnitClick = () => {
    // Pre-select the currently selected course when creating a new unit
    setUnitForm({
      title: '',
      description: '',
      topic: [],
      content: '',
      courseId: selectedCourse || ''
    });
    setShowCreateForm(true);
  };

  const filteredUnits = units.filter(unit =>
    unit.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCourseData = courses.find(course => course._id === selectedCourse);

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

  return (
    <div className={styles.manageUnits}>
      {/* Header */}
      <div className={styles.unitHeader}>
        <div className={styles.headerTop}>
          <h2>Manage Units</h2>
        </div>
        
        {/* Course Selection - Always visible */}
        <div className={styles.courseSelection}>
          <label>Select Course to View Units:</label>
          <select
            value={selectedCourse || ''}
            onChange={(e) => handleCourseSelect(e.target.value)}
            className={styles.courseSelect}
          >
            <option value="">Choose a course to view units...</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
          {selectedCourseData && (
            <span className={styles.selectedCourseInfo}>
              Viewing units for: <strong>{selectedCourseData.title}</strong>
            </span>
          )}
        </div>
        
        {/* Search and Create Unit Button - Always visible when there are courses */}
        {courses.length > 0 && (
          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder={selectedCourse ? "Search units..." : "Select a course first to search units"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              disabled={!selectedCourse}
            />
            <button 
              className={styles.createUnitBtn}
              onClick={() => {
                if (showCreateForm) {
                  setShowCreateForm(false);
                } else {
                  handleCreateUnitClick();
                }
              }}
            >
              {showCreateForm ? '✕ Cancel' : '+ Create Unit'}
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className={styles.errorMessage}>
          <div className={styles.errorIcon}>⚠️</div>
          <p>Error: {error}</p>
          <button 
            onClick={() => selectedCourse && dispatch(fetchUnits(selectedCourse))}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      )}

      {/* Create Unit Form */}
      {showCreateForm && (
        <div className={styles.createForm}>
          <h3>Create New Unit</h3>
          <form onSubmit={handleCreateUnit}>
            <div className={styles.formGroup}>
              <label>Select Course *</label>
              <select
                value={unitForm.courseId}
                onChange={(e) => setUnitForm({...unitForm, courseId: e.target.value})}
                className={styles.courseSelect}
                required
              >
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              {selectedCourseData && unitForm.courseId === selectedCourse && (
                <small className={styles.preSelectedNote}>
                  ✓ Pre-selected based on currently viewing course
                </small>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label>Unit Title *</label>
              <input
                type="text"
                value={unitForm.title}
                onChange={(e) => setUnitForm({...unitForm, title: e.target.value})}
                placeholder="Getting Started with JavaScript"
                required
                maxLength={100}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Description *</label>
              <textarea
                value={unitForm.description}
                onChange={(e) => setUnitForm({...unitForm, description: e.target.value})}
                rows="3"
                placeholder="In this unit, you'll learn the basics of JavaScript."
                required
                maxLength={300}
              />
              <small className={styles.charCount}>
                {unitForm.description.length}/300 characters
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label>Topics (comma-separated)</label>
              <input
                type="text"
                value={unitForm.topic.join(', ')}
                onChange={handleTopicChange}
                placeholder="Variables, Data Types, Operators"
              />
              <small className={styles.hint}>
                Enter topics separated by commas
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label>Content *</label>
              <textarea
                value={unitForm.content}
                onChange={(e) => setUnitForm({...unitForm, content: e.target.value})}
                rows="8"
                placeholder="This is the full unit content..."
                required
              />
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.cancelBtn}
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Creating...' : 'Create Unit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Unit Form */}
      {showEditForm && editingUnit && (
        <div className={styles.editForm}>
          <h3>Edit Unit: {editingUnit.title}</h3>
          <form onSubmit={handleUpdateUnit}>
            <div className={styles.formGroup}>
              <label>Unit Title *</label>
              <input
                type="text"
                value={unitForm.title}
                onChange={(e) => setUnitForm({...unitForm, title: e.target.value})}
                required
                maxLength={100}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Description *</label>
              <textarea
                value={unitForm.description}
                onChange={(e) => setUnitForm({...unitForm, description: e.target.value})}
                rows="3"
                required
                maxLength={300}
              />
              <small className={styles.charCount}>
                {unitForm.description.length}/300 characters
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label>Topics (comma-separated)</label>
              <input
                type="text"
                value={unitForm.topic.join(', ')}
                onChange={handleTopicChange}
                placeholder="Variables, Data Types, Operators"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Content *</label>
              <textarea
                value={unitForm.content}
                onChange={(e) => setUnitForm({...unitForm, content: e.target.value})}
                rows="8"
                required
              />
            </div>
            
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.cancelBtn}
                onClick={() => {
                  setShowEditForm(false);
                  setEditingUnit(null);
                  setUnitForm({
                    title: '',
                    description: '',
                    topic: [],
                    content: '',
                    courseId: ''
                  });
                }}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Updating...' : 'Update Unit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Units List */}
      {selectedCourse && (
        <div className={styles.unitsContainer}>
          <div className={styles.unitsHeader}>
            <h3>Units for {selectedCourseData?.title}</h3>
            <div className={styles.unitsStats}>
              <span className={styles.unitCount}>
                {filteredUnits.length} unit{filteredUnits.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading units...</p>
            </div>
          )}
          
          {!loading && filteredUnits.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📚</div>
              <h3>No Units Found</h3>
              <p>
                {searchTerm 
                  ? 'No units match your search criteria.' 
                  : 'No units found for this course. Create your first unit to get started.'
                }
              </p>
              {!searchTerm && (
                <button 
                  onClick={() => handleCreateUnitClick()}
                  className={styles.createFirstBtn}
                >
                  Create First Unit
                </button>
              )}
            </div>
          )}
          
          {!loading && filteredUnits.length > 0 && (
            <>
              {/* Desktop Grid View */}
              <div className={styles.unitsGrid}>
                {filteredUnits.map((unit) => (
                  <div key={unit._id} className={styles.unitCard}>
                    <div className={styles.unitHeader}>
                      <h4 className={styles.unitTitle}>{unit.title}</h4>
                      <div className={styles.unitActions}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEditUnit(unit)}
                          title="Edit Unit"
                        >
                          ✏️
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteClick(unit)}
                          title="Delete Unit"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <p className={styles.unitDescription}>{unit.description}</p>
                    
                    {unit.topic && unit.topic.length > 0 && (
                      <div className={styles.unitTopics}>
                        <strong>Topics:</strong>
                        <div className={styles.topicTags}>
                          {unit.topic.map((topic, index) => (
                            <span key={index} className={styles.topicTag}>
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className={styles.unitContent}>
                      <strong>Content Preview:</strong>
                      <p className={styles.contentPreview}>
                        {unit.content?.substring(0, 150)}
                        {unit.content?.length > 150 ? '...' : ''}
                      </p>
                    </div>
                    
                    <div className={styles.unitFooter}>
                      <small className={styles.unitDate}>
                        Created: {unit.createdAt ? new Date(unit.createdAt).toLocaleDateString() : 'N/A'}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Card View */}
              <div className={styles.mobileCardContainer}>
                {filteredUnits.map((unit) => (
                  <div key={unit._id} className={styles.mobileUnitCard}>
                    <div className={styles.mobileUnitHeader}>
                      <h4 className={styles.mobileUnitTitle}>{unit.title}</h4>
                      <div className={styles.mobileUnitMeta}>
                        <span className={styles.unitDate}>
                          {unit.createdAt ? new Date(unit.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <p className={styles.mobileUnitDescription}>{unit.description}</p>
                    </div>
                    
                    <div className={styles.mobileUnitBody}>
                      {unit.topic && unit.topic.length > 0 && (
                        <div className={styles.mobileUnitTopics}>
                          <strong>Topics:</strong>
                          <div className={styles.topicTags}>
                            {unit.topic.map((topic, index) => (
                              <span key={index} className={styles.topicTag}>
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className={styles.mobileUnitContent}>
                        <strong>Content Preview:</strong>
                        <p className={styles.contentPreview}>
                          {unit.content?.substring(0, 120)}
                          {unit.content?.length > 120 ? '...' : ''}
                        </p>
                      </div>
                    </div>
                    
                    <div className={styles.mobileUnitFooter}>
                      <span className={styles.unitDate}>
                        Created: {unit.createdAt ? new Date(unit.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                      <div className={styles.mobileUnitActions}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEditUnit(unit)}
                          title="Edit Unit"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteClick(unit)}
                          title="Delete Unit"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* No Course Selected State */}
      {!selectedCourse && !showCreateForm && (
        <div className={styles.noCourseSelected}>
          <div className={styles.emptyIcon}>🎯</div>
          <h3>Select a Course</h3>
          <p>Choose a course from the dropdown above to view and manage its units.</p>
          <p className={styles.hint}>
            You can also create a unit for any course using the "Create Unit" buttons.
          </p>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Unit"
        message={
          unitToDelete 
            ? `Are you sure you want to delete "${unitToDelete.title}"? This action cannot be undone and will remove all unit content and student progress.`
            : 'Are you sure you want to delete this unit?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default ManageUnits;