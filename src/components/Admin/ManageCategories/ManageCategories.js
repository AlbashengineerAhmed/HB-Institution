import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, deleteCategory } from '../../../store/slices/categorySlice';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import styles from './ManageCategories.module.css';

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [authError, setAuthError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to manage categories.');
      return;
    }
    
    // Clear any previous auth errors and fetch categories
    setAuthError('');
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check authentication before submitting
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to create categories.');
      return;
    }

    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await dispatch(createCategory(formData)).unwrap();
      
      // Reset form on success
      setFormData({
        name: '',
        description: '',
        image: null
      });
      setImagePreview(null);
      setActiveTab('list');
      
      // Refresh categories list
      dispatch(fetchCategories());
    } catch (error) {
      console.error('Failed to create category:', error);
      if (error.includes('Authentication') || error.includes('token')) {
        setAuthError('Authentication failed. Please login again.');
      }
    }
  };

  const handleDeleteClick = (category) => {
    // Check authentication before showing delete modal
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthError('Authentication required. Please login to delete categories.');
      return;
    }

    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await dispatch(deleteCategory(categoryToDelete._id)).unwrap();
      // Refresh categories list
      dispatch(fetchCategories());
    } catch (error) {
      console.error('Failed to delete category:', error);
      if (error.includes('Authentication') || error.includes('token')) {
        setAuthError('Authentication failed. Please login again.');
      }
    } finally {
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const filteredCategories = categories.filter(category =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const renderCategoriesList = () => (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesHeader}>
        <h3>Categories Management</h3>
        <div className={styles.headerActions}>
          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button
            onClick={() => setActiveTab('create')}
            className={styles.createButton}
          >
            + Create Category
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading categories...</p>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <p>Error: {error}</p>
          <button onClick={() => dispatch(fetchCategories())} className={styles.retryButton}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className={styles.tableContainer}>
            <table className={styles.categoriesTable}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category._id} className={styles.categoryRow}>
                      <td>
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className={styles.categoryImage}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : (
                          <div className={styles.noImage}>No Image</div>
                        )}
                        <div className={styles.noImage} style={{display: 'none'}}>
                          Failed to load
                        </div>
                      </td>
                      <td className={styles.categoryName}>{category.name}</td>
                      <td className={styles.categoryDescription}>
                        {category.description?.length > 100
                          ? `${category.description.substring(0, 100)}...`
                          : category.description}
                      </td>
                      <td className={styles.categoryDate}>
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className={styles.categoryActions}>
                        <button
                          onClick={() => handleDeleteClick(category)}
                          className={styles.deleteButton}
                          title="Delete Category"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      {searchTerm ? 'No categories found matching your search.' : 'No categories available.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Enhanced Mobile Card View */}
          <div className={styles.mobileCardView}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div key={category._id} className={styles.categoryCard}>
                  <div className={styles.cardHeader}>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className={styles.cardImage}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <div className={styles.cardNoImage}>
                        <span>📷</span>
                        <small>No Image</small>
                      </div>
                    )}
                    <div className={styles.cardNoImage} style={{display: category.image ? 'none' : 'flex'}}>
                      <span>📷</span>
                      <small>No Image</small>
                    </div>
                    <div className={styles.cardContent}>
                      <h4 className={styles.cardTitle}>{category.name}</h4>
                    </div>
                  </div>
                  <p className={styles.cardDescription}>
                    {category.description}
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>
                      {category.createdAt
                        ? new Date(category.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </span>
                    <div className={styles.cardActions}>
                      <button
                        onClick={() => handleDeleteClick(category)}
                        className={styles.cardDeleteButton}
                        title="Delete Category"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noData}>
                {searchTerm ? 'No categories found matching your search.' : 'No categories available.'}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  const renderCreateForm = () => (
    <div className={styles.createContainer}>
      <div className={styles.createHeader}>
        <h3>Create New Category</h3>
        <button
          onClick={() => setActiveTab('list')}
          className={styles.backButton}
        >
          ← Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.createForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Category Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter category name"
            required
            className={styles.formInput}
            maxLength={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter category description"
            required
            rows={4}
            className={styles.formTextarea}
            maxLength={500}
          />
          <small className={styles.charCount}>
            {formData.description.length}/500 characters
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Category Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.formFileInput}
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
                  setFormData(prev => ({ ...prev, image: null }));
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
            onClick={() => setActiveTab('list')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Creating...' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className={styles.manageCategories}>
      {activeTab === 'list' ? renderCategoriesList() : renderCreateForm()}
      
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={
          categoryToDelete 
            ? `Are you sure you want to delete "${categoryToDelete.name}"? This action cannot be undone and may affect related courses.`
            : 'Are you sure you want to delete this category?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default ManageCategories;