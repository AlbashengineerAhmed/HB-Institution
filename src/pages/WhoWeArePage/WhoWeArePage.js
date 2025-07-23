import React from 'react';
import styles from './WhoWeArePage.module.css';

const WhoWeArePage = () => {
  return (
    <div className={styles.whoWeArePage}>
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.chairmanSection}>
              <div className={styles.chairmanImageContainer}>
                <img 
                  src="/images/chairman.jpg" 
                  alt="Chairman of HB Institution" 
                  className={styles.chairmanImage}
                />
              </div>
              <div className={styles.messageContent}>
                <h1 className={styles.messageTitle}>Message from the Chairman</h1>
                <div className={styles.messageText}>
                  <p className={styles.welcomeMessage}>
                    Welcome to HB Institution, a beacon of knowledge and spirituality dedicated to nurturing minds and souls. At HB Institution, we believe that education is a powerful tool to transform lives, and our mission is to make quality education accessible to everyone, regardless of their location or financial status. Where Knowledge Meets Faith.
                  </p>
                  
                  <div className={styles.topicSection}>
                    <h3 className={styles.topicTitle}>Our Vision</h3>
                    <p className={styles.topicContent}>
                      To illuminate the path of knowledge and faith for individuals across the globe, empowering them to connect deeply with their education and personal growth.
                    </p>
                  </div>

                  <div className={styles.topicSection}>
                    <h3 className={styles.topicTitle}>Our Mission</h3>
                    <p className={styles.topicContent}>
                      Our mission is to provide free, high-quality education to students worldwide. Through a combination of innovative technology, dedicated educators, and a commitment to excellence, we aim to:
                    </p>
                    <ul className={styles.missionList}>
                      <li>Teach the Quran with proper Tajweed</li>
                      <li>Instill the values of Islam through the study of Tafsir, Hadith, and Fiqh</li>
                      <li>Make Quran memorization (Hifz) achievable for all who aspire to it</li>
                      <li>Offer a comprehensive academic curriculum to empower students with knowledge in various fields</li>
                      <li>Foster a global community of learners united by faith, knowledge, and personal development</li>
                    </ul>
                  </div>

                  <div className={styles.topicSection}>
                    <h3 className={styles.topicTitle}>What We Offer</h3>
                    <ul className={styles.offerList}>
                      <li><strong>Comprehensive Quranic Education:</strong> From beginner-level recitation to advanced memorization and interpretation</li>
                      <li><strong>Academic Excellence:</strong> Courses in mathematics, science, language, and other key subjects to support holistic education</li>
                      <li><strong>Accessible Learning:</strong> Live online classes, recorded sessions, and personalized feedback to ensure every student progresses at their own pace</li>
                      <li><strong>Skilled Educators:</strong> Our teachers are highly qualified, experienced, and passionate about guiding students on their educational journey</li>
                      <li><strong>Global Reach:</strong> Our platform is designed to reach students in the most remote corners of the world, making quality education truly universal</li>
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

export default WhoWeArePage;