import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  
  // Load YouTube API and initialize player when video is shown
  useEffect(() => {
    // Only load the API and create player when video is playing
    if (!isVideoPlaying) return;
    
    // Function to initialize YouTube player
    const initializeYouTubePlayer = () => {
      // Check if the YouTube API is already loaded
      if (window.YT && window.YT.Player && playerContainerRef.current) {
        // Create a new player instance
        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          videoId: '7ePjJloDO24',
          playerVars: {
            autoplay: 1,
            controls: 1, // Enable YouTube's native controls
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            fs: 1,
            playsinline: 1
          },
          events: {
            'onReady': (event) => {
              event.target.playVideo();
            },
            'onStateChange': (event) => {
              // When video ends (0), close the video and show the image again
              if (event.data === 0) {
                setIsVideoPlaying(false);
              }
            }
          }
        });
      }
    };

    // Load the YouTube API if it's not already loaded
    if (!window.YT) {
      // Create YouTube script tag
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      
      // Define callback for when API is ready
      window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
      
      // Add script tag to page
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // If API is already loaded, initialize player directly
      initializeYouTubePlayer();
    }

    // Clean up function
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [isVideoPlaying]);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };
  
  // Function to close video and show image again
  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
  };


  return (
    <section className="hero-section">
      {/* Decorative shapes */}
      <div className="shape shape-1">
        <img src="/images/hero-2-shape-2.png" alt="" />
      </div>
      <div className="shape shape-2">
        <img src="/images/hero-2-shape-3.png" alt="" />
      </div>
      <div className="shape shape-3">
        <img src="/images/hero-2-shape-4.png" alt="" />
      </div>
      <div className="shape shape-4">
        <img src="/images/wave.png" alt="" />
      </div>
      <div className="shape shape-5">
        <img src="/images/testimonial-shape-1.png" alt="" />
      </div>
      <div className="shape shape-6">
        <img src="/images/hero-2-svg-1.svg" alt="" />
      </div>
      <div className="shape shape-7">
        <img src="/images/banner-2-svg-1.svg" alt="" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <img src="/images/funfact-2-icon-2.svg" alt="" />
            <span>Top Rated Institution</span>
          </div>
          <h1 className="hero-title">
          Unlock Your Potential
            <span className="highlight">With HB Institution</span>
            <img src="/images/line-2-category.svg" alt="" className="title-underline" />
          </h1>
          <p className="hero-description">
            Explore world-class programs designed to enhance your knowledge, sharpen your skills, and accelerate your academic and professional growth. Join HB Institution and begin your journey toward excellence.
          </p>
          <div className="hero-buttons">
            <Link to="/programs" className="cta-button primary-btn">Get Started Now</Link>
            <Link to="/about" className="cta-button secondary-btn">Learn More</Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-video-wrapper">
            <img src="/images/hero-2-thumb-1.png" alt="Student learning" className="hero-image" />
            {!isVideoPlaying && (
              <div className="video-play-button" onClick={handlePlayVideo}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            {isVideoPlaying ? (
              <div className="video-container">
                <div className="hero-video playing" ref={playerContainerRef}></div>
                <button className="video-close-button" onClick={handleCloseVideo}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
          <div className="floating-icon icon-1">
            <img src="/images/cat-2-icon-1.svg" alt="" />
          </div>
          <div className="floating-icon icon-2">
            <img src="/images/cat-2-icon-3.svg" alt="" />
          </div>
          <div className="floating-icon icon-3">
            <img src="/images/cat-2-icon-5.svg" alt="" />
          </div>
          <div className="floating-icon icon-4">
            <img src="/images/cat-2-icon-7.svg" alt="" />
          </div>
        </div>
      </div>
      
      <div className="hero-cards-container">
        <div className="hero-card">
          <div className="hero-card-icon">
            <img src="/images/funfact-2-icon-1.svg" alt="" />
          </div>
          <h3 className="hero-card-title">Expert Instructors</h3>
          <p className="hero-card-description">Learn from industry professionals with years of experience</p>
        </div>
        <div className="hero-card">
          <div className="hero-card-icon">
            <img src="/images/funfact-2-icon-2.svg" alt="" />
          </div>
          <h3 className="hero-card-title">Quality Education</h3>
          <p className="hero-card-description">Curriculum designed to meet industry standards</p>
        </div>
        <div className="hero-card">
          <div className="hero-card-icon">
            <img src="/images/funfact-2-icon-3.svg" alt="" />
          </div>
          <h3 className="hero-card-title">Flexible Learning</h3>
          <p className="hero-card-description">Study at your own pace with 24/7 access to materials</p>
        </div>
        <div className="hero-card">
          <div className="hero-card-icon">
            <img src="/images/funfact-2-icon-4.svg" alt="" />
          </div>
          <h3 className="hero-card-title">Career Support</h3>
          <p className="hero-card-description">Get placement assistance and career guidance</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;