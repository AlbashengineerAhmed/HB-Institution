import React from 'react';
import styles from './WhyHBIPage.module.css';

const WhyHBIPage = () => {
  return (
    <div className={styles.whyHbiPage}>
      {/* Why HBI Banner Section */}
      <section className={styles.whyHbiBanner}>
        <div className={styles.container}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Why Choose HB Institution</h1>
            <p className={styles.bannerDescription}>
              Discover the unique advantages and opportunities that make HB Institution the ideal choice for your educational journey.
            </p>
          </div>
        </div>
      </section>

      {/* Why Study at HBI Section */}
      <section className={styles.whyStudySection}>
        <div className={styles.container}>
          <div className="section-header">
            <h2 className="section-title">Why Study at HBI</h2>
          </div>
          <div className={styles.whyStudyContent}>
            <div className={styles.whyStudyImage}>
              <img src="/images/hero-2-thumb-1.png" alt="Students at HBI" />
            </div>
            <div className={styles.whyStudyText}>
              <p>
                At HB Institution, we offer a unique educational experience that combines academic excellence with a supportive and inclusive environment. Our institution is dedicated to providing students with the knowledge, skills, and values they need to succeed in their chosen fields and make meaningful contributions to society.
              </p>
              <div className={styles.reasonsGrid}>
                <div className={styles.reasonCard}>
                  <div className={styles.reasonIcon}>
                    <i className="fas fa-GraduationCap"></i>
                  </div>
                  <h3 className={styles.reasonTitle}>Academic Excellence</h3>
                  <p className={styles.reasonDescription}>Our rigorous academic programs are designed to challenge and inspire students, fostering critical thinking and intellectual growth.</p>
                </div>
                <div className={styles.reasonCard}>
                  <div className={styles.reasonIcon}>
                    <i className="fas fa-Users"></i>
                  </div>
                  <h3 className={styles.reasonTitle}>Diverse Community</h3>
                  <p className={styles.reasonDescription}>Our diverse student body and faculty create a rich multicultural environment that enhances the learning experience.</p>
                </div>
                <div className={styles.reasonCard}>
                  <div className={styles.reasonIcon}>
                    <i className="fas fa-HandsHelping"></i>
                  </div>
                  <h3 className={styles.reasonTitle}>Supportive Environment</h3>
                  <p className={styles.reasonDescription}>We provide comprehensive support services to help students succeed academically, personally, and professionally.</p>
                </div>
                <div className={styles.reasonCard}>
                  <div className={styles.reasonIcon}>
                    <i className="fas fa-Globe"></i>
                  </div>
                  <h3 className={styles.reasonTitle}>Global Perspective</h3>
                  <p className={styles.reasonDescription}>Our programs incorporate global perspectives, preparing students to thrive in an interconnected world.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     </div>
  );
};

export default WhyHBIPage;