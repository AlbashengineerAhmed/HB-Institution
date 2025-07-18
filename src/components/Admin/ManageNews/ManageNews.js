import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchNews, 
  deleteNews, 
  setSearchTerm, 
  filterNews, 
  clearFilters,
  setSelectedNews 
} from '../../../store/slices/newsSlice';
import NewsForm from './NewsForm';
import styles from './ManageNews.module.css';

const ManageNews = () => {
  const dispatch = useDispatch();
  const { 
    news, 
    filteredNews, 
    isLoading, 
    error, 
    searchTerm 
  } = useSelector((state) => state.news);

  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterNews());
  }, [dispatch, searchTerm, news]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCreateNews = () => {
    setEditingNews(null);
    setShowForm(true);
  };

  const handleEditNews = (newsItem) => {
    setEditingNews(newsItem);
    setShowForm(true);
  };

  const handleDeleteClick = (newsItem) => {
    setNewsToDelete(newsItem);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (newsToDelete) {
      await dispatch(deleteNews(newsToDelete._id || newsToDelete.id));
      setShowDeleteModal(false);
      setNewsToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingNews(null);
    dispatch(fetchNews()); // Refresh the list
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  if (isLoading && news.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading news...</p>
      </div>
    );
  }

  return (
    <div className={styles.manageNews}>
      {/* Header with filters and actions */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>Manage News & Blogs</h2>
          <p>Create, edit, and manage news articles and blog posts</p>
        </div>
        <div className={styles.headerRight}>
          <button 
            onClick={handleCreateNews}
            className={styles.createButton}
            disabled={isLoading}
          >
            + Create News
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search news by title or content..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              onClick={handleClearFilters}
              className={styles.clearButton}
            >
              Clear
            </button>
          )}
        </div>
        
        <div className={styles.statsContainer}>
          <span className={styles.statsText}>
            Showing {filteredNews.length} of {news.length} news articles
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
          <button onClick={() => dispatch(fetchNews())}>Retry</button>
        </div>
      )}

      {/* News Grid */}
      <div className={styles.newsGrid}>
        {filteredNews.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📰</div>
            <h3>No news found</h3>
            <p>
              {searchTerm 
                ? 'No news match your search criteria. Try adjusting your filters.'
                : 'Get started by creating your first news article.'
              }
            </p>
            {!searchTerm && (
              <button 
                onClick={handleCreateNews}
                className={styles.createButton}
              >
                Create First News
              </button>
            )}
          </div>
        ) : (
          filteredNews.map((newsItem) => (
            <div key={newsItem._id || newsItem.id} className={styles.newsCard}>
              {/* News Image */}
              <div className={styles.newsImageContainer}>
                {newsItem.image ? (
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.title}
                    className={styles.newsImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={styles.newsImagePlaceholder} style={{display: newsItem.image ? 'none' : 'flex'}}>
                  📰
                </div>
              </div>

              {/* News Content */}
              <div className={styles.newsContent}>
                <div className={styles.newsHeader}>
                  <h3 className={styles.newsTitle}>{newsItem.title}</h3>
                  <div className={styles.newsDate}>
                    {formatDate(newsItem.createdAt || newsItem.publishedAt)}
                  </div>
                </div>

                <div className={styles.newsExcerpt}>
                  {truncateContent(newsItem.content)}
                </div>

                <div className={styles.newsFooter}>
                  <div className={styles.newsStats}>
                    <span className={styles.statItem}>
                      📅 {formatDate(newsItem.updatedAt || newsItem.createdAt)}
                    </span>
                  </div>

                  <div className={styles.newsActions}>
                    <button
                      onClick={() => handleEditNews(newsItem)}
                      className={styles.editButton}
                      disabled={isLoading}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(newsItem)}
                      className={styles.deleteButton}
                      disabled={isLoading}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Loading overlay */}
      {isLoading && news.length > 0 && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}

      {/* News Form Modal */}
      <NewsForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        editingNews={editingNews}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Delete News</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Are you sure you want to delete this news article?</p>
              <p><strong>"{newsToDelete?.title}"</strong></p>
              <p>This action cannot be undone.</p>
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className={styles.confirmDeleteButton}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;