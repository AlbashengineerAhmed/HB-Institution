import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Chairman's Message Section */}
      <section className={styles.chairmanSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Message from the Chairman</h2>
          </div>
          <div className={styles.chairmanContent}>
            <div className={styles.chairmanImageContainer}>
              <img src="/images/teacher-1.png" alt="Chairman" className={styles.chairmanImage} />
              <div className={styles.chairmanName}>Dr. Hamid Bashir</div>
              <div className={styles.chairmanTitle}>Chairman, HB Institution</div>
            </div>
            <div className={styles.chairmanMessage}>
              <p>
                Welcome to <strong>HB Institution</strong>, a beacon of knowledge and spirituality dedicated to nurturing minds and souls. At HB Institution, we believe that education is a powerful tool to transform lives, and our mission is to make quality education accessible to everyone, regardless of their location or financial status.
              </p>
              <p className={styles.highlightText}>
                <strong>Where Knowledge Meets Faith.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className={styles.visionSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Vision</h2>
          </div>
          <div className={styles.visionContent}>
            <div className={styles.visionImage}>
              <img src="/images/hero-2-thumb-1.png" alt="Our Vision" />
            </div>
            <div className={styles.visionText}>
              <p>
                To illuminate the path of knowledge and faith for individuals across the globe, empowering them to connect deeply with their education and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission</h2>
          </div>
          <div className={styles.missionContent}>
            <div className={styles.missionText}>
              <p>
                Our mission is to provide free, high-quality education to students worldwide. Through a combination of innovative technology, dedicated educators, and a commitment to excellence, we aim to:
              </p>
              <ul className={styles.missionList}>
                <li>Teach the Quran with proper Tajweed.</li>
                <li>Instill the values of Islam through the study of Tafsir, Hadith, and Fiqh.</li>
                <li>Make Quran memorization (Hifz) achievable for all who aspire to it.</li>
                <li>Offer a comprehensive academic curriculum to empower students with knowledge in various fields.</li>
                <li>Foster a global community of learners united by faith, knowledge, and personal development.</li>
              </ul>
            </div>
            <div className={styles.missionImage}>
              <img src="/images/quran.jpg" alt="Our Mission" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className={styles.offeringsSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Offer</h2>
          </div>
          <div className={styles.offeringsGrid}>
            <div className={styles.offeringCard}>
              <div className={styles.offeringIcon}>📖</div>
              <h3 className={styles.offeringTitle}>Comprehensive Quranic Education</h3>
              <p className={styles.offeringDescription}>From beginner-level recitation to advanced memorization and interpretation.</p>
            </div>
            <div className={styles.offeringCard}>
              <div className={styles.offeringIcon}>🎓</div>
              <h3 className={styles.offeringTitle}>Academic Excellence</h3>
              <p className={styles.offeringDescription}>Courses in mathematics, science, language, and other key subjects to support holistic education.</p>
            </div>
            <div className={styles.offeringCard}>
              <div className={styles.offeringIcon}>💻</div>
              <h3 className={styles.offeringTitle}>Accessible Learning</h3>
              <p className={styles.offeringDescription}>Live online classes, recorded sessions, and personalized feedback to ensure every student progresses at their own pace.</p>
            </div>
            <div className={styles.offeringCard}>
              <div className={styles.offeringIcon}>👨‍🏫</div>
              <h3 className={styles.offeringTitle}>Skilled Educators</h3>
              <p className={styles.offeringDescription}>Our teachers are highly qualified, experienced, and passionate about guiding students on their educational journey.</p>
            </div>
            <div className={styles.offeringCard}>
              <div className={styles.offeringIcon}>🌍</div>
              <h3 className={styles.offeringTitle}>Global Reach</h3>
              <p className={styles.offeringDescription}>Our platform is designed to reach students in the most remote corners of the world, making quality education truly universal.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;