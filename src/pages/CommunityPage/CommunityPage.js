import React from 'react';
import styles from './CommunityPage.module.css';
import styles from './CommunityPage.module.css';

const CommunityPage = () => {
  return (
    <div className={styles.communityPage}>
            {/* Community Banner Section */}
            <section className={styles.communityBanner}>
              <div className={container}>
                <div className={styles.bannerContent}>
                  <h1 className={styles.bannerTitle}>Our Community</h1>
                  <p className={styles.bannerDescription}>
                    At HB Institution, we believe in the power of community. Together, we create an environment where learning, growth, and meaningful connections flourish.
                  </p>
                </div>
              </div>
            </section>
      
            {/* Student Life Section */}
            <section className={styles.studentLifeSection}>
              <div className={container}>
                <div className="section-header">
                  <h2 className="section-title">Student Life</h2>
                </div>
                <div className={styles.studentLifeContent}>
                  <div className={styles.studentLifeImage}>
                    <img src="/images/student-life.jpg" alt="Student Life" />
                  </div>
                  <div className={styles.studentLifeText}>
                    <p>
                      Student life at HB Institution is vibrant and enriching. We foster an environment where students can explore their interests, develop leadership skills, and build lifelong friendships.
                    </p>
                    <p>
                      Our campus buzzes with activities ranging from academic clubs to cultural events, sports competitions to spiritual gatherings. We believe that learning extends beyond the classroom, and our diverse community activities reflect this philosophy.
                    </p>
                  </div>
                </div>
              </div>
            </section>     
    </div>
  );
};

export default CommunityPage;