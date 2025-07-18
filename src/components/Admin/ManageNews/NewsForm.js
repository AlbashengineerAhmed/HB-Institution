import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNews, updateNews } from '../../../store/slices/newsSlice';
import styles from './NewsForm.module.css';

const NewsForm = ({ 
  isOpen, 
  onClose, 
  editingNews = null, 
  onSuccess 
}) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.news);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title || '',
        content: editingNews.content || '',
        image: null // Don't set existing image as file
      });
      setImagePreview(editingNews.image || null);
    } else {
      setFormData({
        title: '',
        content: '',
        image: null
      });
      setImagePreview(null);
    }
  }, [editingNews, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!formData.content.trim()) {
      alert('Please enter content');
      return;
    }

    try {
      if (editingNews) {
        await dispatch(updateNews({ 
          newsId: editingNews._id || editingNews.id, 
          newsData: formData 
        }));
      } else {
        await dispatch(createNews(formData));
      }
      
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      image: null
    });
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{editingNews ? 'Edit News' : 'Create New News'}</h3>
          <button onClick={handleClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <p>Error: {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Title Field */}
          <div className={styles.formGroup}>
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter news title..."
              className={styles.titleInput}
            />
          </div>

          {/* Content Field */}
          <div className={styles.formGroup}>
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              placeholder="Write your news content here..."
              className={styles.contentTextarea}
              rows={8}
            />
            <small className={styles.charCount}>
              {formData.content.length} characters
            </small>
          </div>

          {/* Image Upload Field */}
          <div className={styles.formGroup}>
            <label>Featured Image</label>
            
            {imagePreview ? (
              <div className={styles.imagePreviewContainer}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className={styles.imagePreview}
                />
                <div className={styles.imageActions}>
                  <button
                    type="button"
                    onClick={removeImage}
                    className={styles.removeImageButton}
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className={`${styles.imageUploadArea} ${dragActive ? styles.dragActive : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className={styles.uploadContent}>
                  <div className={styles.uploadIcon}>📷</div>
                  <p>Drag and drop an image here, or click to select</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className={styles.fileInput}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading 
                ? (editingNews ? 'Updating...' : 'Creating...') 
                : (editingNews ? 'Update News' : 'Create News')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;