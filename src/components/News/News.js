import React from 'react';
import { Link } from 'react-router-dom';
import styles from './News.module.css';

const News = () => {
  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: 'New Learning Methods for Online Education',
      image: '/images/live-thumb-1.jpg',
      date: 'October 15, 2023',
      category: 'Education',
      excerpt: 'Discover the latest learning methodologies that are transforming online education and making it more effective.'
    },
    {
      id: 2,
      title: 'How AI is Changing the Future of Learning',
      image: '/images/lms-KHn0r4lb.jpg',
      date: 'October 10, 2023',
      category: 'Technology',
      excerpt: 'Artificial Intelligence is revolutionizing how we learn and teach. Find out how AI tools are enhancing educational experiences.'
    },
    {
      id: 3,
      title: 'Student Success Stories: From Beginner to Expert',
      image: '/images/lms-iGLmkhSx.jpg',
      date: 'October 5, 2023',
      category: 'Success Stories',
      excerpt: 'Read inspiring stories of students who transformed their careers through our courses and dedicated learning.'
    }
  ];

  return (
    <section className={styles.newsSection}>
      {/* Decorative shapes */}
      <div className={`${styles.newsShape} ${styles.shape1}`}>
        <img src="/images/banner-2-svg-1.svg" alt="" />
      </div>
      <div className={`${styles.newsShape} ${styles.shape2}`}>
        <img src="/images/banner-2-svg-2.svg" alt="" />
      </div>
      <div className={`${styles.newsShape} ${styles.shape3}`}>
        <img src="/images/testimonial-shape-3.png" alt="" />
      </div>
      <div className={`${styles.newsShape} ${styles.shape4}`}>
        <img src="/images/menu-shape-2.png" alt="" />
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Updated News & Publications</h2>
          <Link to="/blog" className="view-all-link">View All News</Link>
        </div>
        
        <div className={styles.newsGrid}>
          {newsItems.map(item => (
            <div className={styles.newsCard} key={item.id}>
              <div className={styles.newsImageContainer}>
                <img src={item.image} alt={item.title} className={styles.newsImage} />
                <span className={styles.newsCategory}>{item.category}</span>
              </div>
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                </h3>
                <div className={styles.newsMeta}>
                  <span className={styles.newsDate}>{item.date}</span>
                </div>
                <p className={styles.newsExcerpt}>{item.excerpt}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;