import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BlogPage.module.css';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Sample categories - in a real app, these would come from the API or be derived from articles
  const categories = ['all', 'Psychology', 'Islamic Studies', 'Education', 'Research'];
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://hb-institution.vercel.app/api/v1/news/');
        if (response.data.success) {
          setArticles(response.data.data);
        } else {
          setError('Failed to fetch articles');
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  // Filter articles by category
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => {
        // This is a placeholder - in a real app, articles would have category data
        // For now, we'll randomly assign categories for demonstration
        const articleCategories = [
          categories[Math.floor(Math.random() * (categories.length - 1)) + 1]
        ];
        return articleCategories.includes(activeCategory);
      });
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Share article
  const shareArticle = (article, platform) => {
    const url = `${window.location.origin}/blog/${article._id}`;
    const title = article.title;
    
    switch(platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        break;
    }
  };
  
  return (
    <div className={styles.blogPage}>
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.pageTitle}>Blog & Publications</h1>
            <p className={styles.pageDescription}>
              Explore our latest articles, research papers, and publications on various topics related to education, psychology, and Islamic studies.
            </p>
            
            {/* Category Filter */}
            <div className={styles.categoryFilter}>
              {categories.map(category => (
                <button 
                  key={category}
                  className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.articlesSection}>
        <div className="container">
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loader}></div>
              <p>Loading articles...</p>
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
              <button 
                className={styles.retryButton}
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className={styles.articlesGrid}>
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <div key={article._id} className={styles.articleCard}>
                    <div className={styles.articleImageContainer}>
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className={styles.articleImage} 
                      />
                      <div className={styles.articleDate}>
                        {formatDate(article.createdAt)}
                      </div>
                    </div>
                    <div className={styles.articleContent}>
                      <h3 className={styles.articleTitle}>
                        {article.title}
                      </h3>
                      <p className={styles.articleExcerpt}>
                        {article.content.length > 150 
                          ? `${article.content.substring(0, 150)}...` 
                          : article.content}
                      </p>
                      <div className={styles.articleFooter}>
                        <div className={styles.shareButtons}>
                          <button 
                            onClick={() => shareArticle(article, 'linkedin')}
                            className={styles.shareButton}
                            aria-label="Share on LinkedIn"
                          >
                            <i className="fab fa-linkedin"></i>
                          </button>
                          <button 
                            onClick={() => shareArticle(article, 'whatsapp')}
                            className={styles.shareButton}
                            aria-label="Share on WhatsApp"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </button>
                          <button 
                            onClick={() => shareArticle(article, 'facebook')}
                            className={styles.shareButton}
                            aria-label="Share on Facebook"
                          >
                            <i className="fab fa-facebook"></i>
                          </button>
                        </div>
                        <button 
                          onClick={() => window.open(article.link || '#', '_blank')}
                          className={styles.readMoreLink}
                        >
                          Visit Article
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noArticlesContainer}>
                  <p className={styles.noArticlesMessage}>
                    No articles found in this category.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;