import React from 'react';
import styles from './ProgramsPage.module.css';

const ProgramsPage = () => {
  return (
    <div className={styles.programsPage}>
      {/* Programs Banner Section */}
      <section className={styles.programsBanner}>
        <div className={container}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Academic Programs</h1>
            <p className={styles.bannerDescription}>
              Discover our comprehensive range of academic programs designed to provide quality education and prepare students for success.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className={styles.programsOverviewSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Our Programs</h2>
          </div>
          <div className={styles.overviewContent}>
            <div className={styles.overviewImage}>
              <img src="/images/hero-2-thumb-1.png" alt="Programs Overview" />
            </div>
            <div className={styles.overviewText}>
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
      <section className={`${styles.programSection} ${styles.bachelorSection}`}>
        <div className={container}>
          <div className={styles.programContent}>
            <div className={styles.programInfo}>
              <h2 className={styles.programTitle}>Bachelor Degree</h2>
              <p className={styles.programDescription}>
                Our Bachelor's degree programs provide a solid foundation in various disciplines, combining theoretical knowledge with practical skills. These four-year programs are designed to prepare students for successful careers or further academic pursuits.
              </p>
              <div className={styles.programDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>4 Years</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Credits:</span>
                  <span className={styles.detailValue}>120-130 Credit Hours</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Mode:</span>
                  <span className={styles.detailValue}>Full-time / Part-time</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Language:</span>
                  <span className={styles.detailValue}>English / Arabic</span>
                </div>
              </div>
              <div className={styles.programSpecializations}>
                <h3 className={styles.specializationsTitle}>Specializations:</h3>
                <ul className={styles.specializationsList}>
                  <li>Islamic Studies</li>
                  <li>Arabic Language and Literature</li>
                  <li>Business Administration</li>
                  <li>Computer Science</li>
                  <li>Education</li>
                </ul>
              </div>
              <div className={styles.programCta}>
                <a href="#" className={styles.btnProgram}>Program Details</a>
                <a href="#" className={styles.btnApply}>Apply Now</a>
              </div>
            </div>
            <div className={styles.programImage}>
              <img src="/images/course-thumb-1.jpg" alt="Bachelor Degree" />
            </div>
          </div>
        </div>
      </section>

      {/* Intensive Arabic Program Section */}
      <section className={`${styles.programSection} ${styles.arabicSection}`}>
        <div className={container}>
          <div className={`${styles.programContent} ${styles.reverse}`}>
            <div className={styles.programInfo}>
              <h2 className={styles.programTitle}>Intensive Arabic Program</h2>
              <p className={styles.programDescription}>
                Our Intensive Arabic Program is designed for students who want to achieve proficiency in Arabic language in a short period. The program focuses on all language skills: reading, writing, listening, and speaking, with emphasis on practical communication.
              </p>
              <div className={styles.programDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>3-12 Months</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Levels:</span>
                  <span className={styles.detailValue}>Beginner to Advanced</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Mode:</span>
                  <span className={styles.detailValue}>Full-time / Online</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Class Size:</span>
                  <span className={styles.detailValue}>10-15 Students</span>
                </div>
              </div>
              <div className={styles.programFeatures}>
                <h3 className={styles.featuresTitle}>Program Features:</h3>
                <ul className={styles.featuresList}>
                  <li>Immersive learning environment</li>
                  <li>Native Arabic-speaking instructors</li>
                  <li>Modern teaching methodologies</li>
                  <li>Cultural activities and excursions</li>
                  <li>Personalized attention and feedback</li>
                </ul>
              </div>
              <div className={styles.programCta}>
                <a href="#" className={styles.btnProgram}>Program Details</a>
                <a href="#" className={styles.btnApply}>Apply Now</a>
              </div>
            </div>
            <div className={styles.programImage}>
              <img src="/images/course-thumb-2.jpg" alt="Intensive Arabic Program" />
            </div>
          </div>
        </div>
      </section>

      {/* Bridge to Master's Section */}
      <section className={`${styles.programSection} ${styles.bridgeSection}`}>
        <div className={container}>
          <div className={styles.programContent}>
            <div className={styles.programInfo}>
              <h2 className={styles.programTitle}>Bridge to Master's</h2>
              <p className={styles.programDescription}>
                The Bridge to Master's program is designed for students who have a bachelor's degree in a different field and want to pursue a master's degree in a new area of study. This program provides the necessary foundation courses to prepare students for advanced studies.
              </p>
              <div className={styles.programDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>6-12 Months</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Credits:</span>
                  <span className={styles.detailValue}>15-30 Credit Hours</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Mode:</span>
                  <span className={styles.detailValue}>Full-time / Part-time</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Language:</span>
                  <span className={styles.detailValue}>English / Arabic</span>
                </div>
              </div>
              <div className={styles.programBenefits}>
                <h3 className={styles.benefitsTitle}>Program Benefits:</h3>
                <ul className={styles.benefitsList}>
                  <li>Smooth transition to master's studies</li>
                  <li>Personalized academic advising</li>
                  <li>Flexible scheduling options</li>
                  <li>Access to university resources and facilities</li>
                  <li>Preparation for advanced research and coursework</li>
                </ul>
              </div>
              <div className={styles.programCta}>
                <a href="#" className={styles.btnProgram}>Program Details</a>
                <a href="#" className={styles.btnApply}>Apply Now</a>
              </div>
            </div>
            <div className={styles.programImage}>
              <img src="/images/course-thumb-3.jpg" alt="Bridge to Master's" />
            </div>
          </div>
        </div>
      </section>

      {/* Master Degree Section */}
      <section className={`${styles.programSection} ${styles.masterSection}`}>
        <div className={container}>
          <div className={`${styles.programContent} ${styles.reverse}`}>
            <div className={styles.programInfo}>
              <h2 className={styles.programTitle}>Master Degree</h2>
              <p className={styles.programDescription}>
                Our Master's degree programs are designed for students seeking advanced knowledge and specialized skills in their chosen field. These programs combine rigorous coursework with opportunities for research and professional development.
              </p>
              <div className={styles.programDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>2 Years</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Credits:</span>
                  <span className={styles.detailValue}>36-42 Credit Hours</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Mode:</span>
                  <span className={styles.detailValue}>Full-time / Part-time</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Language:</span>
                  <span className={styles.detailValue}>English / Arabic</span>
                </div>
              </div>
              <div className={styles.programSpecializations}>
                <h3 className={styles.specializationsTitle}>Specializations:</h3>
                <ul className={styles.specializationsList}>
                  <li>Islamic Studies and Theology</li>
                  <li>Arabic Linguistics and Literature</li>
                  <li>Islamic Finance and Economics</li>
                  <li>Educational Leadership</li>
                  <li>Computer Science and Information Technology</li>
                </ul>
              </div>
              <div className={styles.programCta}>
                <a href="#" className={styles.btnProgram}>Program Details</a>
                <a href="#" className={styles.btnApply}>Apply Now</a>
              </div>
            </div>
            <div className={styles.programImage}>
              <img src="/images/course-thumb-4.jpg" alt="Master Degree" />
            </div>
          </div>
        </div>
      </section>

      {/* Master Degree - Research Section */}
      <section className={`${styles.programSection} ${styles.researchSection}`}>
        <div className={container}>
          <div className={styles.programContent}>
            <div className={styles.programInfo}>
              <h2 className={styles.programTitle}>Master Degree - Research</h2>
              <p className={styles.programDescription}>
                The Research Master's program is designed for students who want to focus on advanced research in their field of study. This program emphasizes independent research, critical analysis, and scholarly writing, preparing students for academic careers or doctoral studies.
              </p>
              <div className={styles.programDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>2-3 Years</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Credits:</span>
                  <span className={styles.detailValue}>30-36 Credit Hours</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Mode:</span>
                  <span className={styles.detailValue}>Full-time / Part-time</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Language:</span>
                  <span className={styles.detailValue}>English / Arabic</span>
                </div>
              </div>
              <div className={styles.programComponents}>
                <h3 className={styles.componentsTitle}>Program Components:</h3>
                <ul className={styles.componentsList}>
                  <li>Advanced research methodology courses</li>
                  <li>Literature review and scholarly writing</li>
                  <li>Independent research project</li>
                  <li>Faculty mentorship and supervision</li>
                  <li>Thesis preparation and defense</li>
                </ul>
              </div>
              <div className={styles.programCta}>
                <a href="#" className={styles.btnProgram}>Program Details</a>
                <a href="#" className={styles.btnApply}>Apply Now</a>
              </div>
            </div>
            <div className={styles.programImage}>
              <img src="/images/course-thumb-5.jpg" alt="Master Degree - Research" />
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process Section */}
      <section className={styles.admissionSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Admission Process</h2>
          </div>
          <div className={styles.admissionSteps}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Choose a Program</h3>
                <p className={styles.stepDescription}>Explore our programs and select the one that aligns with your academic and career goals.</p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Check Requirements</h3>
                <p className={styles.stepDescription}>Review the admission requirements for your chosen program, including academic qualifications and language proficiency.</p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Submit Application</h3>
                <p className={styles.stepDescription}>Complete the online application form and submit all required documents, including transcripts and letters of recommendation.</p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Application Review</h3>
                <p className={styles.stepDescription}>Our admissions committee will review your application and may request an interview or additional information.</p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Admission Decision</h3>
                <p className={styles.stepDescription}>You will receive an admission decision via email, along with information about next steps if accepted.</p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>6</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Enrollment</h3>
                <p className={styles.stepDescription}>Accept your offer, pay the tuition deposit, and complete the enrollment process to secure your place in the program.</p>
              </div>
            </div>
          </div>
          <div className={styles.admissionCta}>
            <a href="#" className={styles.btnApplyNow}>Apply Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;