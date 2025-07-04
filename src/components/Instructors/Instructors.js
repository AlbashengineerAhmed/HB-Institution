import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './Instructors.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Instructors = () => {
  // Sample instructor data
  const instructors = [
    {
      id: 1,
      name: 'Sarah Clark',
      role: 'Senior Instructor',
      image: '/images/team-2-thumb-1.png',
      courses: 12,
      students: 3500,
      rating: 4.9,
      bio: 'Experienced educator with over 10 years in teaching advanced programming concepts and software development.',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        facebook: '#',
        instagram: '#'
      },
      expertise: ['JavaScript', 'React', 'Node.js']
    },
    {
      id: 2,
      name: 'Michael Johnson',
      role: 'Web Development Expert',
      image: '/images/team-2-thumb-2.png',
      courses: 8,
      students: 2800,
      rating: 4.8,
      bio: 'Full-stack developer specializing in modern web technologies and responsive design principles.',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        facebook: '#',
        github: '#'
      },
      expertise: ['HTML/CSS', 'JavaScript', 'PHP']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Design Specialist',
      image: '/images/team-2-thumb-3.png',
      courses: 10,
      students: 3200,
      rating: 4.7,
      bio: 'Creative designer with a passion for user experience and interface design across multiple platforms.',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        dribbble: '#',
        behance: '#'
      },
      expertise: ['UI/UX', 'Adobe XD', 'Figma']
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Data Science Instructor',
      image: '/images/team-2-thumb-4.png',
      courses: 6,
      students: 1800,
      rating: 4.9,
      bio: 'Data scientist with expertise in machine learning algorithms and statistical analysis for business applications.',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        github: '#',
        kaggle: '#'
      },
      expertise: ['Python', 'Machine Learning', 'Data Analysis']
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
    className: 'instructor-slider',
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className={styles.instructorsSection}>
      {/* Decorative shapes */}
      <div className={`${styles.instructorShape} ${styles.shape1}`}>
        <img src="/images/team-2-svg-1.svg" alt="" />
      </div>
      <div className={`${styles.instructorShape} ${styles.shape2}`}>
        <img src="/images/testimonial-shape-1.png" alt="" />
      </div>
      <div className={`${styles.instructorShape} ${styles.shape3}`}>
        <img src="/images/cat-2-icon-7.svg" alt="" />
      </div>
      <div className={`${styles.instructorShape} ${styles.shape4}`}>
        <img src="/images/menu-shape-1.png" alt="" />
      </div>
      <div className={`${styles.instructorShape} ${styles.shape5}`}>
        <img src="/images/menu-shape-3.png" alt="" />
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet Our Expert Instructors</h2>
          <p className={styles.sectionSubtitle}>Learn from industry professionals with years of experience</p>
        </div>
        
        <div className={styles.instructorsSliderContainer}>
          <Slider {...settings}>
            {instructors.map(instructor => (
              <div className={styles.instructorSlide} key={instructor.id}>
                <div className={styles.instructorCard}>
                  <div className={styles.instructorImageContainer}>
                    <img src={instructor.image} alt={instructor.name} className={styles.instructorImage} />
                    <div className={styles.instructorSocial}>
                      {Object.entries(instructor.socialLinks).map(([platform, link]) => (
                        <a href={link} key={platform} className={`social-icon ${platform}`} target="_blank" rel="noopener noreferrer">
                          <span className={styles.socialIconText}>{platform.charAt(0).toUpperCase()}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className={styles.instructorContent}>
                    <h3 className={styles.instructorName}>{instructor.name}</h3>
                    <p className={styles.instructorRole}>{instructor.role}</p>
                    <div className={styles.instructorMeta}>
                      <div className={styles.instructorCourses}>
                        <span className={styles.metaIcon}>📚</span>
                        <span className={styles.metaText}>{instructor.courses} Courses</span>
                      </div>
                      <div className={styles.instructorStudents}>
                        <span className={styles.metaIcon}>👥</span>
                        <span className={styles.metaText}>{instructor.students} Students</span>
                      </div>
                      <div className={styles.instructorRating}>
                        <span className={styles.metaIcon}>⭐</span>
                        <span className={styles.metaText}>{instructor.rating}</span>
                      </div>
                    </div>
                    <div className={styles.instructorExpertise}>
                      {instructor.expertise.map(skill => (
                        <span key={skill} className={styles.expertiseTag}>{skill}</span>
                      ))}
                    </div>
                    <Link to={`/instructor/${instructor.id}`} className={styles.viewProfileButton}>View Profile</Link>
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

export default Instructors;