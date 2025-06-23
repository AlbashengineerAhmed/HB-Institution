import React from 'react';
import { Link } from 'react-router-dom';
import './News.css';

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
    <section className="news-section">
      {/* Decorative shapes */}
      <div className="news-shape shape-1">
        <img src="/images/banner-2-svg-1.svg" alt="" />
      </div>
      <div className="news-shape shape-2">
        <img src="/images/banner-2-svg-2.svg" alt="" />
      </div>
      <div className="news-shape shape-3">
        <img src="/images/testimonial-shape-3.png" alt="" />
      </div>
      <div className="news-shape shape-4">
        <img src="/images/menu-shape-2.png" alt="" />
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Updated News & Publications</h2>
          <Link to="/news" className="view-all-link">View All News</Link>
        </div>
        
        <div className="news-grid">
          {newsItems.map(item => (
            <div className="news-card" key={item.id}>
              <div className="news-image-container">
                <img src={item.image} alt={item.title} className="news-image" />
                <span className="news-category">{item.category}</span>
              </div>
              <div className="news-content">
                <h3 className="news-title">
                  <Link to={`/news/${item.id}`}>{item.title}</Link>
                </h3>
                <div className="news-meta">
                  <span className="news-date">{item.date}</span>
                </div>
                <p className="news-excerpt">{item.excerpt}</p>
                <Link to={`/news/${item.id}`} className="read-more-link">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;