import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FacultyPage.module.css';
import hero from '../../assets/images/faculty.jpg'
import imageDefault from '../../assets/images/team.jpg'
const FacultyPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://hb-institution.vercel.app/api/v1/user/instructors');
        if (response.data.success) {
          setInstructors(response.data.data);
        } else {
          setError('Failed to fetch instructors');
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error('Error fetching instructors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  // Filter instructors by department
  const filteredInstructors = selectedDepartment === 'all'
    ? instructors
    : instructors.filter(instructor => {
        const specializationToDepartment = {
          'Quran, Classical Arabic and islamic Studies': 'islamic-studies',
          'Computer Science': 'computer-science',
          'Business Studies': 'business',
          'Languages': 'languages',
          'Sciences': 'sciences',
          'Arts & Humanities': 'arts'
        };
        
        return instructor.specialization?.some(spec => 
          specializationToDepartment[spec] === selectedDepartment
        ) || false;
      });
  return (
    <div className={styles.facultyPage}>
      {/* Faculty Banner Section */}
      <section className={styles.facultyBanner}>
        <div className="container">
          <div className={styles.bannerContent}>
            <div className={styles.bannerText}>
              <h1 className={styles.bannerTitle}>Our Faculty</h1>
              <p className={styles.bannerDescription}>
                Meet our distinguished faculty members who are dedicated to excellence in teaching, research, and mentoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Overview Section */}
      <section className={styles.facultyOverviewSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Faculty Overview</h2>
          </div>
          <div className={styles.overviewContent}>
            <div className={styles.overviewImage}>
              <img src={hero} alt="Faculty Overview" />
            </div>
            <div className={styles.overviewText}>
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
      <section className={styles.departmentsSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Academic Departments</h2>
          </div>
          <div className={styles.departmentsGrid}>
            <div className={styles.departmentCard}>
              <div className={styles.departmentIcon}>📚</div>
              <h3 className={styles.departmentTitle}>Islamic Studies</h3>
              <p className={styles.departmentDescription}>Offering comprehensive courses in Quran, Hadith, Fiqh, and Islamic history.</p>
            </div>
            <div className={styles.departmentCard}>
              <div className={styles.departmentIcon}>🔬</div>
              <h3 className={styles.departmentTitle}>Sciences</h3>
              <p className={styles.departmentDescription}>Covering physics, chemistry, biology, and mathematics with modern laboratory facilities.</p>
            </div>
            <div className={styles.departmentCard}>
              <div className={styles.departmentIcon}>💻</div>
              <h3 className={styles.departmentTitle}>Computer Science</h3>
              <p className={styles.departmentDescription}>Providing cutting-edge education in programming, artificial intelligence, and information technology.</p>
            </div>
            <div className={styles.departmentCard}>
              <div className={styles.departmentIcon}>🌐</div>
              <h3 className={styles.departmentTitle}>Languages</h3>
              <p className={styles.departmentDescription}>Offering courses in Arabic, English, and other languages with focus on proficiency and cultural understanding.</p>
            </div>
            <div className={styles.departmentCard}>
              <div className={styles.departmentIcon}>📊</div>
              <h3 className={styles.departmentTitle}>Business Studies</h3>
              <p className={styles.departmentDescription}>Covering management, finance, accounting, and Islamic economics.</p>
            </div>
            <div className={styles.departmentCard}>
              <div className={styles.departmentIcon}>🎨</div>
              <h3 className={styles.departmentTitle}>Arts & Humanities</h3>
              <p className={styles.departmentDescription}>Exploring history, philosophy, literature, and social sciences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Members Section */}
      <section className={styles.facultyMembersSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Faculty</h2>
          </div>

          {/* Department Filter */}
          <div className={styles.departmentFilter}>
            {[
              { id: 'all', name: 'All Departments' },
              { id: 'islamic-studies', name: 'Islamic Studies' },
              { id: 'computer-science', name: 'Computer Science' },
              { id: 'business', name: 'Business Studies' },
              { id: 'languages', name: 'Languages' },
              { id: 'sciences', name: 'Sciences' },
              { id: 'arts', name: 'Arts & Humanities' }
            ].map(dept => (
              <button
                key={dept.id}
                className={`${styles.filterButton} ${selectedDepartment === dept.id ? styles.active : ''}`}
                onClick={() => setSelectedDepartment(dept.id)}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loader}></div>
              <p>Loading faculty members...</p>
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
              <button 
                className={styles.retryButton}
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className={styles.facultyMembersGrid}>
              {filteredInstructors.map(instructor => (
                <div key={instructor._id} className={styles.facultyCard}>
                  <div className={styles.facultyImageContainer}>
                    <img 
                      src={instructor.avatar ? ` ${instructor.avatar}` : imageDefault} 
                      alt={`${instructor.firstName} ${instructor.lastName}`} 
                      className={styles.facultyImage} 
                      onError={(e) => {
                        e.target.src = imageDefault;
                      }}
                    />
                  </div>
                  <div className={styles.facultyDetails}>
                    <h3 className={styles.facultyName}>
                      {instructor.firstName} {instructor.lastName}
                    </h3>
                    <p className={styles.facultyPosition}>
                      {instructor.specialization?.length > 0 
                        ? instructor.specialization[0]
                        : 'Instructor'}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Our Faculty Section */}
      <section className={styles.joinFacultySection}>
        <div className="container">
          <div className={styles.joinFacultyContent}>
            <div className={styles.joinFacultyText}>
              <h2 className={styles.joinTitle}>Join Our Faculty</h2>
              <p className={styles.joinDescription}>
                We are always looking for talented and passionate educators to join our team. If you are committed to academic excellence and want to make a difference in students' lives, we invite you to explore career opportunities at HB Institution.
              </p>
              <div className={styles.joinCta}>
                <a href="#" className={styles.btnJoinFaculty}>View Open Positions</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Resources Section */}
      <section className={styles.facultyResourcesSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Faculty Resources</h2>
          </div>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}><i className="fas fa-Book"></i></div>
              <h3 className={styles.resourceTitle}>Research Support</h3>
              <p className={styles.resourceDescription}>Access to funding, facilities, and assistance for research projects.</p>
            </div>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}><i className="fas fa-Laptop"></i></div>
              <h3 className={styles.resourceTitle}>Teaching Resources</h3>
              <p className={styles.resourceDescription}>Tools and materials to enhance classroom instruction and student engagement.</p>
            </div>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}><i className="fas fa-Users"></i></div>
              <h3 className={styles.resourceTitle}>Professional Development</h3>
              <p className={styles.resourceDescription}>Workshops, seminars, and conferences to support continuous learning.</p>
            </div>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}><i className="fas fa-Handshake"></i></div>
              <h3 className={styles.resourceTitle}>Collaboration Opportunities</h3>
              <p className={styles.resourceDescription}>Partnerships with other institutions and industry for joint projects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;