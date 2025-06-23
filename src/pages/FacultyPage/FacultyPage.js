import React from 'react';
import './FacultyPage.css';

const FacultyPage = () => {
  return (
    <div className="faculty-page">
      {/* Faculty Banner Section */}
      <section className="faculty-banner">
        <div className="container">
          <div className="banner-content">
            <h1 className="banner-title">Our Faculty</h1>
            <p className="banner-description">
              Meet our distinguished faculty members who are dedicated to excellence in teaching, research, and mentoring.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Overview Section */}
      <section className="faculty-overview-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Faculty Overview</h2>
          </div>
          <div className="overview-content">
            <div className="overview-image">
              <img src="/images/teacher-1.png" alt="Faculty Overview" />
            </div>
            <div className="overview-text">
              <p>
                Our faculty comprises highly qualified professors, researchers, and industry experts who bring a wealth of knowledge and experience to the classroom. With a commitment to academic excellence and student success, our faculty members create an engaging learning environment that fosters critical thinking, creativity, and intellectual growth.
              </p>
              <p>
                Many of our faculty members are recognized leaders in their fields, contributing to cutting-edge research and scholarly publications. Their expertise spans across various disciplines, ensuring that our students receive a well-rounded education that prepares them for the challenges of the modern world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Academic Departments</h2>
          </div>
          <div className="departments-grid">
            <div className="department-card">
              <div className="department-icon">📚</div>
              <h3 className="department-title">Islamic Studies</h3>
              <p className="department-description">Offering comprehensive courses in Quran, Hadith, Fiqh, and Islamic history.</p>
            </div>
            <div className="department-card">
              <div className="department-icon">🔬</div>
              <h3 className="department-title">Sciences</h3>
              <p className="department-description">Covering physics, chemistry, biology, and mathematics with modern laboratory facilities.</p>
            </div>
            <div className="department-card">
              <div className="department-icon">💻</div>
              <h3 className="department-title">Computer Science</h3>
              <p className="department-description">Providing cutting-edge education in programming, artificial intelligence, and information technology.</p>
            </div>
            <div className="department-card">
              <div className="department-icon">🌐</div>
              <h3 className="department-title">Languages</h3>
              <p className="department-description">Offering courses in Arabic, English, and other languages with focus on proficiency and cultural understanding.</p>
            </div>
            <div className="department-card">
              <div className="department-icon">📊</div>
              <h3 className="department-title">Business Studies</h3>
              <p className="department-description">Covering management, finance, accounting, and Islamic economics.</p>
            </div>
            <div className="department-card">
              <div className="department-icon">🎨</div>
              <h3 className="department-title">Arts & Humanities</h3>
              <p className="department-description">Exploring history, philosophy, literature, and social sciences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Members Section */}
      <section className="faculty-members-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Faculty</h2>
          </div>
          <div className="faculty-members-grid">
            <div className="faculty-card">
              <div className="faculty-image-container">
                <img src="/images/teacher-1.png" alt="Faculty Member" className="faculty-image" />
              </div>
              <div className="faculty-details">
                <h3 className="faculty-name">Dr. Ahmed Khan</h3>
                <p className="faculty-position">Professor of Islamic Studies</p>
                <p className="faculty-credentials">Ph.D. in Islamic Theology, Al-Azhar University</p>
                <p className="faculty-description">Specializes in Quranic exegesis and contemporary Islamic thought with over 15 years of teaching experience.</p>
              </div>
            </div>
            <div className="faculty-card">
              <div className="faculty-image-container">
                <img src="/images/teacher-2.png" alt="Faculty Member" className="faculty-image" />
              </div>
              <div className="faculty-details">
                <h3 className="faculty-name">Dr. Sarah Johnson</h3>
                <p className="faculty-position">Associate Professor of Computer Science</p>
                <p className="faculty-credentials">Ph.D. in Computer Science, MIT</p>
                <p className="faculty-description">Expert in artificial intelligence and machine learning with significant industry experience at leading tech companies.</p>
              </div>
            </div>
            <div className="faculty-card">
              <div className="faculty-image-container">
                <img src="/images/teacher-3.png" alt="Faculty Member" className="faculty-image" />
              </div>
              <div className="faculty-details">
                <h3 className="faculty-name">Prof. Muhammad Ali</h3>
                <p className="faculty-position">Head of Arabic Language Department</p>
                <p className="faculty-credentials">Ph.D. in Arabic Literature, University of Jordan</p>
                <p className="faculty-description">Renowned linguist with expertise in classical and modern Arabic literature and language teaching methodologies.</p>
              </div>
            </div>
            <div className="faculty-card">
              <div className="faculty-image-container">
                <img src="/images/teacher-4.png" alt="Faculty Member" className="faculty-image" />
              </div>
              <div className="faculty-details">
                <h3 className="faculty-name">Dr. Fatima Rahman</h3>
                <p className="faculty-position">Professor of Sciences</p>
                <p className="faculty-credentials">Ph.D. in Physics, Stanford University</p>
                <p className="faculty-description">Leading researcher in theoretical physics with numerous publications in prestigious scientific journals.</p>
              </div>
            </div>
          </div>
          <div className="faculty-cta">
            <a href="#" className="btn-view-all">View All Faculty Members</a>
          </div>
        </div>
      </section>

      {/* Join Our Faculty Section */}
      <section className="join-faculty-section">
        <div className="container">
          <div className="join-faculty-content">
            <div className="join-faculty-text">
              <h2 className="join-title">Join Our Faculty</h2>
              <p className="join-description">
                We are always looking for talented and passionate educators to join our team. If you are committed to academic excellence and want to make a difference in students' lives, we invite you to explore career opportunities at HB Institution.
              </p>
              <div className="join-cta">
                <a href="#" className="btn-join-faculty">View Open Positions</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Resources Section */}
      <section className="faculty-resources-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Faculty Resources</h2>
          </div>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon"><i className="fas fa-book"></i></div>
              <h3 className="resource-title">Research Support</h3>
              <p className="resource-description">Access to funding, facilities, and assistance for research projects.</p>
            </div>
            <div className="resource-card">
              <div className="resource-icon"><i className="fas fa-laptop"></i></div>
              <h3 className="resource-title">Teaching Resources</h3>
              <p className="resource-description">Tools and materials to enhance classroom instruction and student engagement.</p>
            </div>
            <div className="resource-card">
              <div className="resource-icon"><i className="fas fa-users"></i></div>
              <h3 className="resource-title">Professional Development</h3>
              <p className="resource-description">Workshops, seminars, and conferences to support continuous learning.</p>
            </div>
            <div className="resource-card">
              <div className="resource-icon"><i className="fas fa-handshake"></i></div>
              <h3 className="resource-title">Collaboration Opportunities</h3>
              <p className="resource-description">Partnerships with other institutions and industry for joint projects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;