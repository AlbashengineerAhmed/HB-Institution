import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './PopularCourses.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PopularCourses = () => {
  // Sample course data
  const courses = [
    {
      id: 1,
      title: 'Creative & Critical Thinking Masterclass',
      image: '/images/course-thumb-1.jpg',
      category: 'Thinking Skills',
      rating: 4.8,
      students: 1250,
      price: 89.99
    },
    {
      id: 2,
      title: 'Web Development for Beginners',
      image: '/images/course-thumb-2.jpg',
      category: 'Programming',
      rating: 4.7,
      students: 3420,
      price: 79.99
    },
    {
      id: 3,
      title: 'UI/UX Design',
      image: '/images/course-thumb-3.jpg',
      category: 'Design',
      rating: 4.9,
      students: 2150,
      price: 99.99
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: false,
    centerPadding: '30px',
    className: 'course-slider',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '15px'
        }
      }
    ]
  };

  return (
    <section className="popular-courses-section">
      {/* Decorative shapes */}
      <div className="course-shape shape-1">
        <img src="/images/course-2-shape-1.png" alt="" />
      </div>
      <div className="course-shape shape-2">
        <img src="/images/course-2-svg-1.svg" alt="" />
      </div>
      <div className="course-shape shape-3">
        <img src="/images/cat-2-icon-2.svg" alt="" />
      </div>
      <div className="course-shape shape-4">
        <img src="/images/cat-2-icon-4.svg" alt="" />
      </div>
      <div className="course-shape shape-5">
        <img src="/images/cat-2-icon-6.svg" alt="" />
      </div>
      <div className="course-shape shape-6">
        <img src="/images/cat-2-icon-8.svg" alt="" />
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Courses</h2>
          <Link to="/courses" className="view-all-link">View All</Link>
        </div>
        
        <div className="courses-slider-container">
          <Slider {...settings}>
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <div className="course-category">{course.category}</div>
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <div className="course-meta">
                    <div className="course-rating">
                      <span className="rating-value">{course.rating}</span>
                      <span className="rating-stars">★★★★★</span>
                    </div>
                    <div className="course-students">{course.students} students</div>
                  </div>
                  <div className="course-price">${course.price}</div>
                  <Link to={`/course/${course.id}`} className="enroll-button">Enroll Now</Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;