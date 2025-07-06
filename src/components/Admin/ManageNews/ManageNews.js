import React, { useState } from 'react';
import styles from './ManageNews.module.css';

const ManageNews = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'news',
    featuredImage: '',
    excerpt: '',
    tags: '',
    status: 'draft'
  });

  // Static news data
  const newsData = [
    {
      id: 1,
      title: 'New Islamic Studies Program Launched',
      excerpt: 'We are excited to announce the launch of our comprehensive Islamic Studies program...',
      content: 'Full content of the news article goes here...',
      category: 'news',
      author: 'Admin',
      publishDate: '2024-01-20',
      status: 'published',
      featuredImage: '/images/islamic-studies.jpg',
      tags: ['education', 'islamic studies', 'program'],
      views: 245
    },
    {
      id: 2,
      title: 'Ramadan Schedule and Guidelines',
      excerpt: 'Important information regarding our Ramadan schedule and special programs...',
      content: 'Full content of the religious alert goes here...',
      category: 'religious-alerts',
      author: 'Sheikh Omar Ali',
      publishDate: '2024-01-18',
      status: 'published',
      featuredImage: '/images/ramadan.jpg',
      tags: ['ramadan', 'schedule', 'guidelines'],
      views: 189
    },
    {
      id: 3,
      title: 'The Importance of Seeking Knowledge in Islam',
      excerpt: 'An in-depth article exploring the Islamic perspective on education and learning...',
      content: 'Full content of the article goes here...',
      category: 'articles',
      author: 'Dr. Ahmed Hassan',
      publishDate: '2024-01-15',
      status: 'published',
      featuredImage: '/images/knowledge.jpg',
      tags: ['knowledge', 'education', 'islam'],
      views: 312
    },
    {
      id: 4,
      title: 'Upcoming Quran Competition',
      excerpt: 'Registration is now open for our annual Quran recitation competition...',
      content: 'Full content of the news article goes here...',
      category: 'news',
      author: 'Admin',
      publishDate: '2024-01-12',
      status: 'draft',
      featuredImage: '/images/quran-competition.jpg',
      tags: ['quran', 'competition', 'event'],
      views: 0
    },
    {
      id: 5,
      title: 'Prayer Time Changes for Winter Season',
      excerpt: 'Updated prayer times for the winter season are now available...',
      content: 'Full content of the religious alert goes here...',
      category: 'religious-alerts',
      author: 'Sheikh Abdullah Rahman',
      publishDate: '2024-01-10',
      status: 'published',
      featuredImage: '/images/prayer-times.jpg',
      tags: ['prayer', 'winter', 'schedule'],
      views: 156
    }
  ];

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || news.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('News submitted:', formData);
    // Reset form
    setFormData({
      title: '',
      content: '',
      category: 'news',
      featuredImage: '',
      excerpt: '',
      tags: '',
      status: 'draft'
    });
    setActiveTab('list');
  };

  const handleEdit = (newsId) => {
    const newsItem = newsData.find(news => news.id === newsId);
    if (newsItem) {
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        category: newsItem.category,
        featuredImage: newsItem.featuredImage,
        excerpt: newsItem.excerpt,
        tags: newsItem.tags.join(', '),
        status: newsItem.status
      });
      setActiveTab('form');
    }
  };

  const handleDelete = (newsId) => {
    console.log(`Delete news ${newsId}`);
  };

  const getCategoryBadge = (category) => {
    const categoryClasses = {
      news: styles.categoryNews,
      articles: styles.categoryArticles,
      'religious-alerts': styles.categoryAlerts
    };
    
    const categoryLabels = {
      news: 'News',
      articles: 'Article',
      'religious-alerts': 'Religious Alert'
    };
    
    return (
      <span className={`${styles.categoryBadge} ${categoryClasses[category]}`}>
        {categoryLabels[category]}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      published: styles.statusPublished,
      draft: styles.statusDraft
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className={styles.manageNews}>
      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'list' ? styles.active : ''}`}
          onClick={() => setActiveTab('list')}
        >
          📰 News List
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'form' ? styles.active : ''}`}
          onClick={() => setActiveTab('form')}
        >
          ➕ Add/Edit News
        </button>
      </div>

      {activeTab === 'list' && (
        <div className={styles.newsListSection}>
          {/* Header with filters */}
          <div className={styles.newsHeader}>
            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filtersSection}>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Categories</option>
                <option value="news">News</option>
                <option value="articles">Articles</option>
                <option value="religious-alerts">Religious Alerts</option>
              </select>
            </div>
          </div>

          {/* News Grid */}
          <div className={styles.newsGrid}>
            {filteredNews.map((news) => (
              <div key={news.id} className={styles.newsCard}>
                <div className={styles.newsImage}>
                  <img src={news.featuredImage} alt={news.title} />
                  <div className={styles.newsOverlay}>
                    {getCategoryBadge(news.category)}
                    {getStatusBadge(news.status)}
                  </div>
                </div>
                
                <div className={styles.newsContent}>
                  <h3 className={styles.newsTitle}>{news.title}</h3>
                  <p className={styles.newsExcerpt}>{news.excerpt}</p>
                  
                  <div className={styles.newsMetadata}>
                    <div className={styles.newsAuthor}>
                      <span className={styles.authorLabel}>By:</span>
                      <span className={styles.authorName}>{news.author}</span>
                    </div>
                    <div className={styles.newsDate}>
                      {new Date(news.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className={styles.newsTags}>
                    {news.tags.map((tag, index) => (
                      <span key={index} className={styles.newsTag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className={styles.newsStats}>
                    <span className={styles.newsViews}>👁 {news.views} views</span>
                  </div>
                </div>
                
                <div className={styles.newsActions}>
                  <button
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    onClick={() => handleEdit(news.id)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => handleDelete(news.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className={styles.emptyState}>
              <p>No news found matching your criteria.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'form' && (
        <div className={styles.newsFormSection}>
          <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>Add/Edit News</h3>
            
            <form onSubmit={handleSubmit} className={styles.newsForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="news">News</option>
                    <option value="articles">Articles</option>
                    <option value="religious-alerts">Religious Alerts</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows="3"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows="8"
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Featured Image URL</label>
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="e.g., education, islam, news"
                />
              </div>
              
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={`${styles.formBtn} ${styles.cancelBtn}`}
                  onClick={() => setActiveTab('list')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${styles.formBtn} ${styles.submitBtn}`}
                >
                  Save News
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;