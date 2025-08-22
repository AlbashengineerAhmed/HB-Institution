import React from 'react';
import styles from './AboutUsPage.module.css';

const AboutUsPage = () => {
  return (
    <div className={styles.aboutUsPage}>
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.aboutSection}>
              <div className={styles.aboutImageContainer}>
                <img 
                  src="/images/chairman.jpg" 
                  alt="About HB Institution" 
                  className={styles.aboutImage}
                />
              </div>
              <div className={styles.messageContent}>
                <h1 className={styles.messageTitle}>About HB Institution</h1>
                <div className={styles.messageText}>
                  <p className={styles.welcomeMessage}>
                    Welcome to HB Institution, where tradition meets innovation in education. Our institution stands as a beacon of knowledge, combining academic excellence with spiritual growth. We are committed to providing a comprehensive educational experience that nurtures both the mind and soul of our students.
                  </p>
                  
                  <div className={styles.topicSection}>
                    <h3 className={styles.topicTitle}>Our Legacy</h3>
                    <p className={styles.topicContent}>
                      Founded on the principles of academic excellence and spiritual guidance, HB Institution has grown to become a leading educational institution. Our journey is marked by continuous innovation in education while staying true to our core values and traditions.
                    </p>
                  </div>

                  <div className={styles.topicSection}>
                    <h3 className={styles.topicTitle}>Our Commitment</h3>
                    <p className={styles.topicContent}>
                      At HB Institution, we are dedicated to:
                    </p>
                    <ul className={styles.commitmentList}>
                      <li>Providing world-class education accessible to all</li>
                      <li>Fostering an environment of intellectual growth and spiritual development</li>
                      <li>Building a global community of learners and educators</li>
                      <li>Promoting research and innovation in education</li>
                      <li>Maintaining high standards of academic excellence</li>
                    </ul>
                  </div>

                  <div className={styles.topicSection}>
                    <h3 className={styles.topicTitle}>Our Facilities</h3>
                    <ul className={styles.facilitiesList}>
                      <li><strong>Modern Classrooms:</strong> State-of-the-art learning spaces equipped with latest technology</li>
                      <li><strong>Digital Library:</strong> Extensive collection of digital resources and research materials</li>
                      <li><strong>Research Centers:</strong> Dedicated facilities for advanced research and studies</li>
                      <li><strong>Prayer Halls:</strong> Peaceful spaces for spiritual reflection and prayer</li>
                      <li><strong>Student Support:</strong> Comprehensive support services for all students</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;