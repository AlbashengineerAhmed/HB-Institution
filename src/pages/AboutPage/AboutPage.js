import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      {/* About Page Hero Section */}
      <section className={styles.aboutHero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About HB Institution</h1>
            <p className={styles.heroDescription}>
              Learn more about our institution, our history, and our commitment to providing quality education that combines knowledge with faith.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;