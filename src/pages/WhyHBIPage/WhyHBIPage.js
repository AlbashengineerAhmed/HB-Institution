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
     </div>
  );
};

export default WhyHBIPage;