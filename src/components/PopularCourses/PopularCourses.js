import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './PopularCourses.module.css';
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
    className: 'course-slider',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className={styles.popularCoursesSection}>
      {/* Decorative shapes */}
      <div className={`${styles.courseShape} ${styles.shape1}`}>
        <img src="/images/course-2-shape-1.png" alt="" />
      </div>
      <div className={`${styles.courseShape} ${styles.shape2}`}>
        <img src="/images/course-2-svg-1.svg" alt="" />
      </div>
      <div className={`${styles.courseShape} ${styles.shape3}`}>
        <img src="/images/cat-2-icon-2.svg" alt="" />
      </div>
      <div className={`${styles.courseShape} ${styles.shape4}`}>
        <img src="/images/cat-2-icon-4.svg" alt="" />
      </div>
      <div className={`${styles.courseShape} ${styles.shape5}`}>
        <img src="/images/cat-2-icon-6.svg" alt="" />
      </div>
      <div className={`${styles.courseShape} ${styles.shape6}`}>
        <img src="/images/cat-2-icon-8.svg" alt="" />
      </div>
      
      <div className={`container ${styles.container}`}>
        <div className={`section-header ${styles.sectionHeader}`}>
          <h2 className={`section-title ${styles.sectionTitle}`}>Popular Courses</h2>
          <Link to="/courses" className={`view-all-link ${styles.viewAllLink}`}>View All</Link>
        </div>
        
        <div className={styles.coursesSliderContainer}>
          <Slider {...settings}>
            {courses.map(course => (
              <div key={course.id} className={styles.courseSlide}>
                <div className={styles.courseCard}>
                  <div className={styles.courseImageContainer}>
                    <img src={course.image} alt={course.title} className={styles.courseImage} />
                    <div className={styles.courseCategory}>{course.category}</div>
                  </div>
                  <div className={styles.courseContent}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <div className={styles.courseMeta}>
                      <div className={styles.courseRating}>
                        <span className={styles.ratingValue}>{course.rating}</span>
                        <span className={styles.ratingStars}>★★★★★</span>
                      </div>
                      <div className={styles.courseStudents}>{course.students} students</div>
                    </div>
                    <div className={styles.coursePrice}>${course.price}</div>
                    <Link to={`/course/${course.id}`} className={styles.enrollButton}>Enroll Now</Link>
                  </div>
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