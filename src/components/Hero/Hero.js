import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

/**
 * Hero component that displays the main landing section of the website
 * Features video playback functionality, statistics, and call-to-action buttons
 * @returns {JSX.Element} Hero section with interactive video and content cards
 */
const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  /**
   * Handles video play functionality
   * Sets video playing state and auto-plays the video after a short delay
   */
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // Auto-play the video when it becomes visible
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };
  
  /**
   * Handles video close functionality
   * Stops video playback and resets to initial state
   */
  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  /**
   * Handles video end event
   * Automatically closes video when playback completes
   */
  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  return (
    <section className={styles.heroSection}>
      {/* Decorative shapes */}
      <div className={`${styles.shape} ${styles.shape1}`}>
        <img src="/images/hero-2-shape-2.png" alt="" />
      </div>
      <div className={`${styles.shape} ${styles.shape2}`}>
        <img src="/images/hero-2-shape-3.png" alt="" />
      </div>
      <div className={`${styles.shape} ${styles.shape3}`}>
        <img src="/images/hero-2-shape-4.png" alt="" />
      </div>
      <div className={`${styles.shape} ${styles.shape4}`}>
        <img src="/images/wave.png" alt="" />
      </div>
      <div className={`${styles.shape} ${styles.shape5}`}>
        <img src="/images/testimonial-shape-1.png" alt="" />
      </div>
      <div className={`${styles.shape} ${styles.shape6}`}>
        <img src="/images/hero-2-svg-1.svg" alt="" />
      </div>
      <div className={`${styles.shape} ${styles.shape7}`}>
        <img src="/images/banner-2-svg-1.svg" alt="" />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <img src="/images/funfact-2-icon-2.svg" alt="" />
            <span>Top Rated Institution</span>
          </div>
          <h1 className={styles.heroTitle}>
          Unlock Your Potential
            <span className={styles.highlight}>With HB Institution</span>
            <img src="/images/line-2-category.svg" alt="" className={styles.titleUnderline} />
          </h1>
          <p className={styles.heroDescription}>
            Explore world-class programs designed to enhance your knowledge, sharpen your skills, and accelerate your academic and professional growth. Join HB Institution and begin your journey toward excellence.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/programs" className={`${styles.ctaButton} ${styles.primaryBtn}`}>Get Started Now</Link>
            <Link to="/about" className={`${styles.ctaButton} ${styles.secondaryBtn}`}>Learn More</Link>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Students</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>200+</div>
              <div className={styles.statLabel}>Courses</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Success Rate</div>
            </div>
          </div>
        </div>
        
        <div className={styles.heroImageContainer}>
          <div className={styles.heroVideoWrapper}>
            <img src="/images/hero-2-thumb-1.png" alt="Student learning" className={styles.heroImage} />
            {!isVideoPlaying && (
              <div className={styles.videoPlayButton} onClick={handlePlayVideo}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            {isVideoPlaying ? (
              <div className={styles.videoContainer}>
                <video 
                  ref={videoRef}
                  className={`${styles.heroVideo} ${styles.playing}`}
                  controls
                  autoPlay
                  onEnded={handleVideoEnd}
                >
                  <source src="/videos/intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button className={styles.videoCloseButton} onClick={handleCloseVideo}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
          <div className={`${styles.floatingIcon} ${styles.icon1}`}>
            <img src="/images/cat-2-icon-1.svg" alt="" />
          </div>
          <div className={`${styles.floatingIcon} ${styles.icon2}`}>
            <img src="/images/cat-2-icon-3.svg" alt="" />
          </div>
          <div className={`${styles.floatingIcon} ${styles.icon3}`}>
            <img src="/images/cat-2-icon-5.svg" alt="" />
          </div>
          <div className={`${styles.floatingIcon} ${styles.icon4}`}>
            <img src="/images/cat-2-icon-7.svg" alt="" />
          </div>
        </div>
      </div>
      
      <div className={styles.heroCardsContainer}>
        <div className={styles.heroCard}>
          <div className={styles.heroCardIcon}>
            <img src="/images/funfact-2-icon-1.svg" alt="" />
          </div>
          <h3 className={styles.heroCardTitle}>Expert Instructors</h3>
          <p className={styles.heroCardDescription}>Learn from industry professionals with years of experience</p>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroCardIcon}>
            <img src="/images/funfact-2-icon-2.svg" alt="" />
          </div>
          <h3 className={styles.heroCardTitle}>Quality Education</h3>
          <p className={styles.heroCardDescription}>Curriculum designed to meet industry standards</p>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroCardIcon}>
            <img src="/images/funfact-2-icon-3.svg" alt="" />
          </div>
          <h3 className={styles.heroCardTitle}>Flexible Learning</h3>
          <p className={styles.heroCardDescription}>Study at your own pace with 24/7 access to materials</p>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroCardIcon}>
            <img src="/images/funfact-2-icon-4.svg" alt="" />
          </div>
          <h3 className={styles.heroCardTitle}>Career Support</h3>
          <p className={styles.heroCardDescription}>Get placement assistance and career guidance</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;