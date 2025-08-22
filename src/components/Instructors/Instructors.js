import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import AuthGuard, { useAuthGuard } from '../AuthGuard/AuthGuard';
import styles from './Instructors.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imageDefault from '../../assets/images/team2.png'

const Instructors = () => {
  const { requireAuth } = useAuthGuard();

  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://hb-institution.vercel.app/api/v1/user/instructors');
        if (response.data.success) {
          // Only take the first 4 instructors for the slider
          setInstructors(response.data.data.slice(0, 4).map(instructor => ({
            id: instructor._id,
            name: `${instructor.firstName} ${instructor.lastName}`,
            role: instructor.specialization?.[0] || 'Instructor',
            image: `/images/${instructor.avatar}`,
            courses: instructor.courses?.length || 0,
            students: instructor.students?.length || 0,
            bio: instructor.bio || 'Experienced educator dedicated to student success.',
            socialLinks: {
              twitter: '#',
              linkedin: '#',
              facebook: '#',
              instagram: '#'
            },
            expertise: instructor.specialization || ['Teaching']
          })));
        } else {
          setError('Failed to fetch instructors');
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error('Error fetching instructors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

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

  const handleViewProfile = (instructorId) => {
    requireAuth(() => {
      window.location.href = `/faculty/${instructorId}`;
    }, "Please login to view instructor profiles");
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
                    <img 
                      src={instructor.avatar ? ` ${instructor.avatar}` : imageDefault} 
                      alt={`${instructor.firstName} ${instructor.lastName}`} 
                      className={styles.facultyImage} 
                      onError={(e) => {
                        e.target.src = imageDefault;
                      }}
                      />
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
                    </div>
                    <div className={styles.instructorExpertise}>
                      {instructor.expertise.map(skill => (
                        <span key={skill} className={styles.expertiseTag}>{skill}</span>
                      ))}
                    </div>
                    {/* <AuthGuard
                      fallback={
                        <button 
                          className={`${styles.viewProfileButton} ${styles.loginRequired}`}
                          onClick={() => handleViewProfile(instructor.id)}
                        >
                          Login to View Profile
                        </button>
                      }
                    >
                      <Link to={`/faculty/${instructor.id}`} className={styles.viewProfileButton}>
                        View Profile
                      </Link>
                    </AuthGuard> */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className={styles.viewAllLink}>
          <Link to="/faculty" className={styles.viewAllButton}>View All Faculty Members</Link>
        </div>
      </div>
    </section>
  );
};

export default Instructors;