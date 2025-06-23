import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Chairman's Message Section */}
      <section className="chairman-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Message from the Chairman</h2>
          </div>
          <div className="chairman-content">
            <div className="chairman-image-container">
              <img src="/images/teacher-1.png" alt="Chairman" className="chairman-image" />
              <div className="chairman-name">Dr. Hamid Bashir</div>
              <div className="chairman-title">Chairman, HB Institution</div>
            </div>
            <div className="chairman-message">
              <p>
                Welcome to <strong>HB Institution</strong>, a beacon of knowledge and spirituality dedicated to nurturing minds and souls. At HB Institution, we believe that education is a powerful tool to transform lives, and our mission is to make quality education accessible to everyone, regardless of their location or financial status.
              </p>
              <p className="highlight-text">
                <strong>Where Knowledge Meets Faith.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Vision</h2>
          </div>
          <div className="vision-content">
            <div className="vision-image">
              <img src="/images/hero-2-thumb-1.png" alt="Our Vision" />
            </div>
            <div className="vision-text">
              <p>
                To illuminate the path of knowledge and faith for individuals across the globe, empowering them to connect deeply with their education and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission</h2>
          </div>
          <div className="mission-content">
            <div className="mission-text">
              <p>
                Our mission is to provide free, high-quality education to students worldwide. Through a combination of innovative technology, dedicated educators, and a commitment to excellence, we aim to:
              </p>
              <ul className="mission-list">
                <li>Teach the Quran with proper Tajweed.</li>
                <li>Instill the values of Islam through the study of Tafsir, Hadith, and Fiqh.</li>
                <li>Make Quran memorization (Hifz) achievable for all who aspire to it.</li>
                <li>Offer a comprehensive academic curriculum to empower students with knowledge in various fields.</li>
                <li>Foster a global community of learners united by faith, knowledge, and personal development.</li>
              </ul>
            </div>
            <div className="mission-image">
              <img src="/images/quran.jpg" alt="Our Mission" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="offerings-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Offer</h2>
          </div>
          <div className="offerings-grid">
            <div className="offering-card">
              <div className="offering-icon">📖</div>
              <h3 className="offering-title">Comprehensive Quranic Education</h3>
              <p className="offering-description">From beginner-level recitation to advanced memorization and interpretation.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">🎓</div>
              <h3 className="offering-title">Academic Excellence</h3>
              <p className="offering-description">Courses in mathematics, science, language, and other key subjects to support holistic education.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">💻</div>
              <h3 className="offering-title">Accessible Learning</h3>
              <p className="offering-description">Live online classes, recorded sessions, and personalized feedback to ensure every student progresses at their own pace.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">👨‍🏫</div>
              <h3 className="offering-title">Skilled Educators</h3>
              <p className="offering-description">Our teachers are highly qualified, experienced, and passionate about guiding students on their educational journey.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">🌍</div>
              <h3 className="offering-title">Global Reach</h3>
              <p className="offering-description">Our platform is designed to reach students in the most remote corners of the world, making quality education truly universal.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;