import React from 'react';
import './ProgramsPage.css';

const ProgramsPage = () => {
  return (
    <div className="programs-page">
      {/* Programs Banner Section */}
      <section className="programs-banner">
        <div className="container">
          <div className="banner-content">
            <h1 className="banner-title">Academic Programs</h1>
            <p className="banner-description">
              Discover our comprehensive range of academic programs designed to provide quality education and prepare students for success.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="programs-overview-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Programs</h2>
          </div>
          <div className="overview-content">
            <div className="overview-image">
              <img src="/images/hero-2-thumb-1.png" alt="Programs Overview" />
            </div>
            <div className="overview-text">
              <p>
                At HB Institution, we offer a diverse range of academic programs that combine traditional Islamic knowledge with modern educational approaches. Our programs are designed to meet the needs of students at various stages of their educational journey, from undergraduate to postgraduate studies.
              </p>
              <p>
                Each program is carefully structured to provide a balanced curriculum that promotes critical thinking, research skills, and practical application of knowledge. Our faculty members, who are experts in their respective fields, ensure that students receive high-quality education that prepares them for successful careers and meaningful contributions to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bachelor Degree Section */}
      <section className="program-section bachelor-section">
        <div className="container">
          <div className="program-content">
            <div className="program-info">
              <h2 className="program-title">Bachelor Degree</h2>
              <p className="program-description">
                Our Bachelor's degree programs provide a solid foundation in various disciplines, combining theoretical knowledge with practical skills. These four-year programs are designed to prepare students for successful careers or further academic pursuits.
              </p>
              <div className="program-details">
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">4 Years</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Credits:</span>
                  <span className="detail-value">120-130 Credit Hours</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mode:</span>
                  <span className="detail-value">Full-time / Part-time</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">English / Arabic</span>
                </div>
              </div>
              <div className="program-specializations">
                <h3 className="specializations-title">Specializations:</h3>
                <ul className="specializations-list">
                  <li>Islamic Studies</li>
                  <li>Arabic Language and Literature</li>
                  <li>Business Administration</li>
                  <li>Computer Science</li>
                  <li>Education</li>
                </ul>
              </div>
              <div className="program-cta">
                <a href="#" className="btn-program">Program Details</a>
                <a href="#" className="btn-apply">Apply Now</a>
              </div>
            </div>
            <div className="program-image">
              <img src="/images/course-thumb-1.jpg" alt="Bachelor Degree" />
            </div>
          </div>
        </div>
      </section>

      {/* Intensive Arabic Program Section */}
      <section className="program-section arabic-section">
        <div className="container">
          <div className="program-content reverse">
            <div className="program-info">
              <h2 className="program-title">Intensive Arabic Program</h2>
              <p className="program-description">
                Our Intensive Arabic Program is designed for students who want to achieve proficiency in Arabic language in a short period. The program focuses on all language skills: reading, writing, listening, and speaking, with emphasis on practical communication.
              </p>
              <div className="program-details">
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">3-12 Months</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Levels:</span>
                  <span className="detail-value">Beginner to Advanced</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mode:</span>
                  <span className="detail-value">Full-time / Online</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Class Size:</span>
                  <span className="detail-value">10-15 Students</span>
                </div>
              </div>
              <div className="program-features">
                <h3 className="features-title">Program Features:</h3>
                <ul className="features-list">
                  <li>Immersive learning environment</li>
                  <li>Native Arabic-speaking instructors</li>
                  <li>Modern teaching methodologies</li>
                  <li>Cultural activities and excursions</li>
                  <li>Personalized attention and feedback</li>
                </ul>
              </div>
              <div className="program-cta">
                <a href="#" className="btn-program">Program Details</a>
                <a href="#" className="btn-apply">Apply Now</a>
              </div>
            </div>
            <div className="program-image">
              <img src="/images/course-thumb-2.jpg" alt="Intensive Arabic Program" />
            </div>
          </div>
        </div>
      </section>

      {/* Bridge to Master's Section */}
      <section className="program-section bridge-section">
        <div className="container">
          <div className="program-content">
            <div className="program-info">
              <h2 className="program-title">Bridge to Master's</h2>
              <p className="program-description">
                The Bridge to Master's program is designed for students who have a bachelor's degree in a different field and want to pursue a master's degree in a new area of study. This program provides the necessary foundation courses to prepare students for advanced studies.
              </p>
              <div className="program-details">
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">6-12 Months</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Credits:</span>
                  <span className="detail-value">15-30 Credit Hours</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mode:</span>
                  <span className="detail-value">Full-time / Part-time</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">English / Arabic</span>
                </div>
              </div>
              <div className="program-benefits">
                <h3 className="benefits-title">Program Benefits:</h3>
                <ul className="benefits-list">
                  <li>Smooth transition to master's studies</li>
                  <li>Personalized academic advising</li>
                  <li>Flexible scheduling options</li>
                  <li>Access to university resources and facilities</li>
                  <li>Preparation for advanced research and coursework</li>
                </ul>
              </div>
              <div className="program-cta">
                <a href="#" className="btn-program">Program Details</a>
                <a href="#" className="btn-apply">Apply Now</a>
              </div>
            </div>
            <div className="program-image">
              <img src="/images/course-thumb-3.jpg" alt="Bridge to Master's" />
            </div>
          </div>
        </div>
      </section>

      {/* Master Degree Section */}
      <section className="program-section master-section">
        <div className="container">
          <div className="program-content reverse">
            <div className="program-info">
              <h2 className="program-title">Master Degree</h2>
              <p className="program-description">
                Our Master's degree programs are designed for students seeking advanced knowledge and specialized skills in their chosen field. These programs combine rigorous coursework with opportunities for research and professional development.
              </p>
              <div className="program-details">
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">2 Years</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Credits:</span>
                  <span className="detail-value">36-42 Credit Hours</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mode:</span>
                  <span className="detail-value">Full-time / Part-time</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">English / Arabic</span>
                </div>
              </div>
              <div className="program-specializations">
                <h3 className="specializations-title">Specializations:</h3>
                <ul className="specializations-list">
                  <li>Islamic Studies and Theology</li>
                  <li>Arabic Linguistics and Literature</li>
                  <li>Islamic Finance and Economics</li>
                  <li>Educational Leadership</li>
                  <li>Computer Science and Information Technology</li>
                </ul>
              </div>
              <div className="program-cta">
                <a href="#" className="btn-program">Program Details</a>
                <a href="#" className="btn-apply">Apply Now</a>
              </div>
            </div>
            <div className="program-image">
              <img src="/images/course-thumb-4.jpg" alt="Master Degree" />
            </div>
          </div>
        </div>
      </section>

      {/* Master Degree - Research Section */}
      <section className="program-section research-section">
        <div className="container">
          <div className="program-content">
            <div className="program-info">
              <h2 className="program-title">Master Degree - Research</h2>
              <p className="program-description">
                The Research Master's program is designed for students who want to focus on advanced research in their field of study. This program emphasizes independent research, critical analysis, and scholarly writing, preparing students for academic careers or doctoral studies.
              </p>
              <div className="program-details">
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">2-3 Years</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Credits:</span>
                  <span className="detail-value">30-36 Credit Hours</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mode:</span>
                  <span className="detail-value">Full-time / Part-time</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">English / Arabic</span>
                </div>
              </div>
              <div className="program-components">
                <h3 className="components-title">Program Components:</h3>
                <ul className="components-list">
                  <li>Advanced research methodology courses</li>
                  <li>Literature review and scholarly writing</li>
                  <li>Independent research project</li>
                  <li>Faculty mentorship and supervision</li>
                  <li>Thesis preparation and defense</li>
                </ul>
              </div>
              <div className="program-cta">
                <a href="#" className="btn-program">Program Details</a>
                <a href="#" className="btn-apply">Apply Now</a>
              </div>
            </div>
            <div className="program-image">
              <img src="/images/course-thumb-5.jpg" alt="Master Degree - Research" />
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process Section */}
      <section className="admission-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Admission Process</h2>
          </div>
          <div className="admission-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Choose a Program</h3>
                <p className="step-description">Explore our programs and select the one that aligns with your academic and career goals.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Check Requirements</h3>
                <p className="step-description">Review the admission requirements for your chosen program, including academic qualifications and language proficiency.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Submit Application</h3>
                <p className="step-description">Complete the online application form and submit all required documents, including transcripts and letters of recommendation.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Application Review</h3>
                <p className="step-description">Our admissions committee will review your application and may request an interview or additional information.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3 className="step-title">Admission Decision</h3>
                <p className="step-description">You will receive an admission decision via email, along with information about next steps if accepted.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">6</div>
              <div className="step-content">
                <h3 className="step-title">Enrollment</h3>
                <p className="step-description">Accept your offer, pay the tuition deposit, and complete the enrollment process to secure your place in the program.</p>
              </div>
            </div>
          </div>
          <div className="admission-cta">
            <a href="#" className="btn-apply-now">Apply Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;