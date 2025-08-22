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
                    Dear Students, Educators, and Supporters,
                    Welcome to HB Institution, a vision born from a deep commitment to knowledge, faith, and the transformative power of education. Our mission is both simple and profound: to make quality education, including academic, professional, and Islamic studies, accessible to all, regardless of background or circumstance.
                    As Chairman of HB Institution, I take immense pride in our dedication to empowering individuals to reach their highest potential. By harmonizing traditional values with modern disciplines, we strive to equip our students with the knowledge, skills, and character needed to succeed in this life and the Hereafter.
                    HB Institution is a self-funded initiative rooted in the belief that giving back to society is a sacred responsibility. Every course, program, and interaction is thoughtfully designed to reflect our unwavering commitment to quality, accessibility, and meaningful impact.
                    Thank you for choosing HB Institution as your partner in education and growth. Together, let us embark on a journey of learning, purpose, and transformation.      
                  </p>
                  
                  <div className={styles.topicSection}>
                    <h3 className={styles.topicTitle}>Warm regards,</h3>
                    <p className={styles.topicContent}>
                      Hamed Minhaj
                    </p>
                    <p className={styles.topicContent}>Chairman, HB Institution</p>
                    <p className={styles.topicContent}>Where Knowledge Meets Faith</p>
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