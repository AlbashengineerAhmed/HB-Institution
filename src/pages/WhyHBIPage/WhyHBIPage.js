import React from 'react';
import styles from './WhyHBIPage.module.css';

const WhyHBIPage = () => {
  return (
    <div className={styles.whyHbiPage}>
      {/* Why HBI Banner Section */}
      <section className={styles.whyHbiBanner}>
        <div className="container">
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
        <div className="container">
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

      {/* Tuition Fees Section */}
      <section className={styles.tuitionSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tuition Fees</h2>
            <p className={styles.sectionDescription}>We strive to make quality education accessible through competitive tuition rates and various financial aid options.</p>
          </div>
          <div className={styles.tuitionTables}>
            <div className={styles.tuitionTableContainer}>
              <h3 className={styles.tableTitle}>Undergraduate Programs</h3>
              <table className={styles.tuitionTable}>
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Per Credit Hour</th>
                    <th>Full-time (Per Semester)</th>
                    <th>Full-time (Per Year)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Islamic Studies</td>
                    <td>$350</td>
                    <td>$5,250</td>
                    <td>$10,500</td>
                  </tr>
                  <tr>
                    <td>Arabic Language & Literature</td>
                    <td>$350</td>
                    <td>$5,250</td>
                    <td>$10,500</td>
                  </tr>
                  <tr>
                    <td>Business Administration</td>
                    <td>$400</td>
                    <td>$6,000</td>
                    <td>$12,000</td>
                  </tr>
                  <tr>
                    <td>Computer Science</td>
                    <td>$425</td>
                    <td>$6,375</td>
                    <td>$12,750</td>
                  </tr>
                  <tr>
                    <td>Education</td>
                    <td>$375</td>
                    <td>$5,625</td>
                    <td>$11,250</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className={styles.tuitionTableContainer}>
              <h3 className={styles.tableTitle}>Graduate Programs</h3>
              <table className={styles.tuitionTable}>
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Per Credit Hour</th>
                    <th>Full-time (Per Semester)</th>
                    <th>Full-time (Per Year)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Islamic Studies & Theology</td>
                    <td>$500</td>
                    <td>$4,500</td>
                    <td>$9,000</td>
                  </tr>
                  <tr>
                    <td>Arabic Linguistics</td>
                    <td>$500</td>
                    <td>$4,500</td>
                    <td>$9,000</td>
                  </tr>
                  <tr>
                    <td>Islamic Finance</td>
                    <td>$550</td>
                    <td>$4,950</td>
                    <td>$9,900</td>
                  </tr>
                  <tr>
                    <td>Educational Leadership</td>
                    <td>$525</td>
                    <td>$4,725</td>
                    <td>$9,450</td>
                  </tr>
                  <tr>
                    <td>Computer Science & IT</td>
                    <td>$575</td>
                    <td>$5,175</td>
                    <td>$10,350</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className={styles.tuitionTableContainer}>
              <h3 className={styles.tableTitle}>Special Programs</h3>
              <table className={styles.tuitionTable}>
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Duration</th>
                    <th>Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Intensive Arabic Program</td>
                    <td>3 Months</td>
                    <td>$3,500</td>
                  </tr>
                  <tr>
                    <td>Intensive Arabic Program</td>
                    <td>6 Months</td>
                    <td>$6,500</td>
                  </tr>
                  <tr>
                    <td>Intensive Arabic Program</td>
                    <td>12 Months</td>
                    <td>$12,000</td>
                  </tr>
                  <tr>
                    <td>Bridge to Master's</td>
                    <td>6 Months</td>
                    <td>$5,000</td>
                  </tr>
                  <tr>
                    <td>Bridge to Master's</td>
                    <td>12 Months</td>
                    <td>$9,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className={styles.additionalFees}>
            <h3 className={styles.feesTitle}>Additional Fees</h3>
            <div className={styles.feesGrid}>
              <div className={styles.feeItem}>
                <span className={styles.feeName}>Application Fee</span>
                <span className={styles.feeValue}>$50 (Domestic) / $75 (International)</span>
              </div>
              <div className={styles.feeItem}>
                <span className={styles.feeName}>Registration Fee</span>
                <span className={styles.feeValue}>$100 per semester</span>
              </div>
              <div className={styles.feeItem}>
                <span className={styles.feeName}>Technology Fee</span>
                <span className={styles.feeValue}>$150 per semester</span>
              </div>
              <div className={styles.feeItem}>
                <span className={styles.feeName}>Student Activity Fee</span>
                <span className={styles.feeValue}>$75 per semester</span>
              </div>
              <div className={styles.feeItem}>
                <span className={styles.feeName}>Graduation Fee</span>
                <span className={styles.feeValue}>$200 (one-time)</span>
              </div>
              <div className={styles.feeItem}>
                <span className={styles.feeName}>Transcript Fee</span>
                <span className={styles.feeValue}>$10 per copy</span>
              </div>
            </div>
          </div>
          
          <div className={styles.paymentOptions}>
            <h3 className={styles.paymentTitle}>Payment Options</h3>
            <p className={styles.paymentDescription}>We offer various payment plans to accommodate different financial situations:</p>
            <ul className={styles.paymentList}>
              <li>Full payment at the beginning of each semester (5% discount)</li>
              <li>Monthly installment plan (small administrative fee applies)</li>
              <li>Employer reimbursement deferred payment plan</li>
              <li>Financial aid and scholarship recipients payment plan</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      <section className={styles.accreditationSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Accreditation</h2>
            <p className={styles.sectionDescription}>HB Institution is committed to maintaining the highest standards of educational quality through accreditation by respected organizations.</p>
          </div>
          <div className={styles.accreditationContent}>
            <div className={styles.accreditationText}>
              <p>
                Accreditation is a voluntary process that ensures an institution meets or exceeds established standards of educational quality. HB Institution has earned accreditation from several respected organizations, demonstrating our commitment to excellence in education.
              </p>
              <p>
                Our accreditation status provides numerous benefits to our students, including eligibility for financial aid, recognition of credits for transfer, and validation of the quality of our academic programs by external reviewers.
              </p>
              <h3 className={styles.accreditationSubtitle}>Our Accreditations:</h3>
              <ul className={styles.accreditationList}>
                <li>
                  <strong>Higher Learning Commission (HLC)</strong> - Regional accreditation for the institution as a whole
                </li>
                <li>
                  <strong>Association of Theological Schools (ATS)</strong> - Specialized accreditation for our Islamic Studies and Theology programs
                </li>
                <li>
                  <strong>Accreditation Board for Engineering and Technology (ABET)</strong> - Specialized accreditation for our Computer Science program
                </li>
                <li>
                  <strong>Accreditation Council for Business Schools and Programs (ACBSP)</strong> - Specialized accreditation for our Business Administration program
                </li>
                <li>
                  <strong>Council for the Accreditation of Educator Preparation (CAEP)</strong> - Specialized accreditation for our Education program
                </li>
              </ul>
            </div>
            <div className={styles.accreditationLogos}>
              <div className={styles.logoItem}>
                <img src="/images/accreditation-1.png" alt="Higher Learning Commission" />
              </div>
              <div className={styles.logoItem}>
                <img src="/images/accreditation-2.png" alt="Association of Theological Schools" />
              </div>
              <div className={styles.logoItem}>
                <img src="/images/accreditation-3.png" alt="Accreditation Board for Engineering and Technology" />
              </div>
              <div className={styles.logoItem}>
                <img src="/images/accreditation-4.png" alt="Accreditation Council for Business Schools and Programs" />
              </div>
              <div className={styles.logoItem}>
                <img src="/images/accreditation-5.png" alt="Council for the Accreditation of Educator Preparation" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graduate Acceptance Section */}
      <section className={styles.graduateAcceptanceSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Graduate Acceptance</h2>
            <p className={styles.sectionDescription}>Our graduates are accepted into prestigious institutions worldwide for further studies and sought after by employers for their knowledge and skills.</p>
          </div>
          <div className={styles.graduateContent}>
            <div className={styles.graduateStats}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>94%</div>
                <div className={styles.statLabel}>Employment Rate</div>
                <p className={styles.statDescription}>of our graduates find employment within six months of graduation</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>85%</div>
                <div className={styles.statLabel}>Graduate School Acceptance</div>
                <p className={styles.statDescription}>of our graduates who apply to graduate programs are accepted</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>$65K</div>
                <div className={styles.statLabel}>Average Starting Salary</div>
                <p className={styles.statDescription}>for our graduates entering the workforce</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>78%</div>
                <div className={styles.statLabel}>International Opportunities</div>
                <p className={styles.statDescription}>of graduates have opportunities to work or study abroad</p>
              </div>
            </div>
            
            <div className={styles.graduateDestinations}>
              <h3 className={styles.destinationsTitle}>Where Our Graduates Go</h3>
              <div className={styles.destinationsTabs}>
                <div className={styles.destinationsCategory}>
                  <h4 className={styles.categoryTitle}>Top Graduate Schools</h4>
                  <ul className={styles.destinationsList}>
                    <li>Harvard University</li>
                    <li>Stanford University</li>
                    <li>Massachusetts Institute of Technology</li>
                    <li>University of Oxford</li>
                    <li>University of Cambridge</li>
                    <li>Al-Azhar University</li>
                    <li>Islamic University of Madinah</li>
                    <li>International Islamic University Malaysia</li>
                  </ul>
                </div>
                <div className={styles.destinationsCategory}>
                  <h4 className={styles.categoryTitle}>Top Employers</h4>
                  <ul className={styles.destinationsList}>
                    <li>Google</li>
                    <li>Microsoft</li>
                    <li>Islamic Development Bank</li>
                    <li>United Nations</li>
                    <li>World Bank</li>
                    <li>Qatar Foundation</li>
                    <li>Dubai Islamic Bank</li>
                    <li>International Islamic Relief Organizations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className={styles.alumniTestimonials}>
              <h3 className={styles.testimonialsTitle}>Alumni Success Stories</h3>
              <div className={styles.testimonialsSlider}>
                <div className={styles.testimonialCard}>
                  <div className={styles.testimonialImage}>
                    <img src="/images/testimonial-1.jpg" alt="Alumni" />
                  </div>
                  <div className={styles.testimonialContent}>
                    <p className={styles.testimonialText}>
                      "My education at HBI provided me with a strong foundation in Islamic finance and modern business practices. This unique combination helped me secure a position at Dubai Islamic Bank, where I now lead a team developing innovative Shariah-compliant financial products."
                    </p>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.authorName}>Ahmed Hassan</div>
                      <div className={styles.authorInfo}>MBA in Islamic Finance, 2018</div>
                      <div className={styles.authorPosition}>Senior Product Manager, Dubai Islamic Bank</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Centers Section */}
      <section className={styles.examCentersSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Exam Centers</h2>
            <p className={styles.sectionDescription}>HB Institution provides well-equipped examination centers to ensure a conducive environment for assessments.</p>
          </div>
          <div className={styles.examCentersContent}>
            <div className={styles.examCentersInfo}>
              <p>
                Our examination centers are designed to provide a quiet, secure, and comfortable environment for students taking exams. Each center is equipped with modern facilities and staffed by trained proctors to ensure the integrity of the examination process.
              </p>
              <h3 className={styles.examCentersSubtitle}>Exam Center Facilities:</h3>
              <ul className={styles.facilitiesList}>
                <li>Spacious examination halls with proper lighting and ventilation</li>
                <li>Ergonomic seating arrangements for maximum comfort during exams</li>
                <li>Computer labs for online and digital assessments</li>
                <li>Secure storage for personal belongings</li>
                <li>Accessible facilities for students with disabilities</li>
                <li>Quiet zones and distraction-free environment</li>
              </ul>
              
              <h3 className={styles.examCentersSubtitle}>Exam Types Supported:</h3>
              <ul className={styles.examTypesList}>
                <li>Course final examinations</li>
                <li>Midterm assessments</li>
                <li>Standardized tests (TOEFL, GRE, GMAT)</li>
                <li>Professional certification exams</li>
                <li>Language proficiency tests</li>
                <li>Placement and entrance examinations</li>
              </ul>
            </div>
            
            <div className={styles.examCentersLocations}>
              <h3 className={styles.locationsTitle}>Our Exam Center Locations</h3>
              <div className={styles.locationsGrid}>
                <div className={styles.locationCard}>
                  <div className={styles.locationIcon}>
                    <i className="fas fa-MapMarkerAlt"></i>
                  </div>
                  <h4 className={styles.locationName}>Main Campus</h4>
                  <p className={styles.locationAddress}>123 University Avenue, Cityville, State 12345</p>
                  <p className={styles.locationContact}>Phone: (123) 456-7890</p>
                </div>
                <div className={styles.locationCard}>
                  <div className={styles.locationIcon}>
                    <i className="fas fa-MapMarkerAlt"></i>
                  </div>
                  <h4 className={styles.locationName}>Downtown Center</h4>
                  <p className={styles.locationAddress}>456 Central Street, Cityville, State 12345</p>
                  <p className={styles.locationContact}>Phone: (123) 456-7891</p>
                </div>
                <div className={styles.locationCard}>
                  <div className={styles.locationIcon}>
                    <i className="fas fa-MapMarkerAlt"></i>
                  </div>
                  <h4 className={styles.locationName}>West Campus</h4>
                  <p className={styles.locationAddress}>789 West Boulevard, Cityville, State 12345</p>
                  <p className={styles.locationContact}>Phone: (123) 456-7892</p>
                </div>
                <div className={styles.locationCard}>
                  <div className={styles.locationIcon}>
                    <i className="fas fa-MapMarkerAlt"></i>
                  </div>
                  <h4 className={styles.locationName}>East Campus</h4>
                  <p className={styles.locationAddress}>321 East Avenue, Cityville, State 12345</p>
                  <p className={styles.locationContact}>Phone: (123) 456-7893</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section className={styles.scholarshipsSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Scholarships</h2>
            <p className={styles.sectionDescription}>HB Institution offers a variety of scholarships to recognize academic excellence, support students with financial need, and promote diversity.</p>
          </div>
          <div className={styles.scholarshipsContent}>
            <div className={styles.scholarshipsIntro}>
              <p>
                We believe that financial constraints should not prevent talented and motivated students from accessing quality education. Our scholarship programs are designed to make education more affordable and accessible to deserving students from diverse backgrounds.
              </p>
            </div>
            
            <div className={styles.scholarshipsCategories}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <i className="fas fa-Medal"></i>
                </div>
                <h3 className={styles.categoryTitle}>Merit-Based Scholarships</h3>
                <p className={styles.categoryDescription}>Awarded to students with outstanding academic achievements, leadership qualities, and extracurricular involvement.</p>
                <ul className={styles.scholarshipsList}>
                  <li>
                    <span className={styles.scholarshipName}>Presidential Scholarship</span>
                    <span className={styles.scholarshipValue}>Full tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Dean's Scholarship</span>
                    <span className={styles.scholarshipValue}>75% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Academic Excellence Scholarship</span>
                    <span className={styles.scholarshipValue}>50% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Honor Student Scholarship</span>
                    <span className={styles.scholarshipValue}>25% tuition</span>
                  </li>
                </ul>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <i className="fas fa-HandHoldingHeart"></i>
                </div>
                <h3 className={styles.categoryTitle}>Need-Based Scholarships</h3>
                <p className={styles.categoryDescription}>Provided to students who demonstrate financial need and meet academic requirements.</p>
                <ul className={styles.scholarshipsList}>
                  <li>
                    <span className={styles.scholarshipName}>Financial Need Grant</span>
                    <span className={styles.scholarshipValue}>Up to 80% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Opportunity Scholarship</span>
                    <span className={styles.scholarshipValue}>Up to 60% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Hardship Relief Fund</span>
                    <span className={styles.scholarshipValue}>Varies based on need</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Emergency Assistance Grant</span>
                    <span className={styles.scholarshipValue}>Varies based on need</span>
                  </li>
                </ul>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <i className="fas fa-GlobeAmericas"></i>
                </div>
                <h3 className={styles.categoryTitle}>International Scholarships</h3>
                <p className={styles.categoryDescription}>Designed for international students to promote cultural diversity and global perspectives.</p>
                <ul className={styles.scholarshipsList}>
                  <li>
                    <span className={styles.scholarshipName}>Global Diversity Scholarship</span>
                    <span className={styles.scholarshipValue}>Up to 70% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>International Excellence Award</span>
                    <span className={styles.scholarshipValue}>Up to 50% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Cultural Ambassador Scholarship</span>
                    <span className={styles.scholarshipValue}>Up to 40% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>International Student Grant</span>
                    <span className={styles.scholarshipValue}>Up to 30% tuition</span>
                  </li>
                </ul>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>
                  <i className="fas fa-BookReader"></i>
                </div>
                <h3 className={styles.categoryTitle}>Program-Specific Scholarships</h3>
                <p className={styles.categoryDescription}>Targeted scholarships for students in specific academic programs or fields of study.</p>
                <ul className={styles.scholarshipsList}>
                  <li>
                    <span className={styles.scholarshipName}>Islamic Studies Excellence Scholarship</span>
                    <span className={styles.scholarshipValue}>Up to 60% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Arabic Language Proficiency Award</span>
                    <span className={styles.scholarshipValue}>Up to 50% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>STEM Achievement Scholarship</span>
                    <span className={styles.scholarshipValue}>Up to 55% tuition</span>
                  </li>
                  <li>
                    <span className={styles.scholarshipName}>Business Leadership Scholarship</span>
                    <span className={styles.scholarshipValue}>Up to 45% tuition</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className={styles.scholarshipApplication}>
              <h3 className={styles.applicationTitle}>How to Apply for Scholarships</h3>
              <div className={styles.applicationSteps}>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Review Eligibility</h4>
                    <p className={styles.stepDescription}>Check the specific eligibility requirements for each scholarship you're interested in.</p>
                  </div>
                </div>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Complete Application</h4>
                    <p className={styles.stepDescription}>Fill out the scholarship application form, which can be accessed through our student portal.</p>
                  </div>
                </div>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Submit Documents</h4>
                    <p className={styles.stepDescription}>Provide all required documentation, including academic transcripts, financial information, and personal statements.</p>
                  </div>
                </div>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Interview (if required)</h4>
                    <p className={styles.stepDescription}>Some scholarships may require an interview as part of the selection process.</p>
                  </div>
                </div>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>5</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>Await Decision</h4>
                    <p className={styles.stepDescription}>Scholarship decisions are typically announced within 4-6 weeks after the application deadline.</p>
                  </div>
                </div>
              </div>
              <div className={styles.applicationCta}>
                <a href="#" className={styles.btnApply}>Apply for Scholarships</a>
                <a href="#" className={styles.btnLearnMore}>Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Testimonials</h2>
            <p className={styles.sectionDescription}>Hear what our students and alumni have to say about their experience at HB Institution.</p>
          </div>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "Studying at HBI has been a transformative experience. The blend of traditional Islamic knowledge and modern academic approaches has given me a unique perspective that I couldn't have gained elsewhere. The supportive faculty and diverse student community made my educational journey truly enriching."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorImage}>
                  <img src="/images/testimonial-1.jpg" alt="Student" />
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Sarah Ahmed</div>
                  <div className={styles.authorDetails}>Bachelor of Arts in Islamic Studies, Class of 2021</div>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "The quality of education and the level of support I received at HBI exceeded my expectations. The professors are not only experts in their fields but also genuinely care about student success. The skills and knowledge I gained have been invaluable in my professional career."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorImage}>
                  <img src="/images/testimonial-2.jpg" alt="Student" />
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Mohammed Ali</div>
                  <div className={styles.authorDetails}>Master of Science in Computer Science, Class of 2020</div>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "As an international student, I was concerned about adapting to a new environment, but the welcoming community at HBI made me feel at home from day one. The cultural diversity on campus enriched my learning experience, and the support services helped me navigate any challenges I faced."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorImage}>
                  <img src="/images/testimonial-3.jpg" alt="Student" />
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Aisha Rahman</div>
                  <div className={styles.authorDetails}>MBA in Islamic Finance, Class of 2019</div>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "The Intensive Arabic Program at HBI transformed my language skills in just six months. The immersive approach, combined with excellent teaching methods and cultural activities, helped me achieve fluency faster than I thought possible. I highly recommend this program to anyone serious about learning Arabic."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorImage}>
                  <img src="/images/testimonial-4.jpg" alt="Student" />
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>John Smith</div>
                  <div className={styles.authorDetails}>Intensive Arabic Program, 2022</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Affairs Office Section */}
      <section className={styles.studentAffairsSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Affairs Office</h2>
            <p className={styles.sectionDescription}>Our Student Affairs Office is dedicated to enhancing the student experience and providing comprehensive support services.</p>
          </div>
          <div className={styles.studentAffairsContent}>
            <div className={styles.studentAffairsImage}>
              <img src="/images/student-affairs.jpg" alt="Student Affairs Office" />
            </div>
            <div className={styles.studentAffairsInfo}>
              <p>
                The Student Affairs Office serves as a central resource for students, providing a wide range of services and support to enhance their academic and personal development. Our dedicated team is committed to creating a positive and inclusive campus environment where all students can thrive.
              </p>
              <h3 className={styles.servicesTitle}>Services Provided:</h3>
              <div className={styles.servicesGrid}>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <i className="fas fa-HandsHelping"></i>
                  </div>
                  <h4 className={styles.serviceTitle}>Academic Support</h4>
                  <p className={styles.serviceDescription}>Tutoring, academic advising, study skills workshops, and learning resources</p>
                </div>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <i className="fas fa-Heart"></i>
                  </div>
                  <h4 className={styles.serviceTitle}>Health & Wellness</h4>
                  <p className={styles.serviceDescription}>Counseling services, health education, and wellness programs</p>
                </div>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <i className="fas fa-Users"></i>
                  </div>
                  <h4 className={styles.serviceTitle}>Student Activities</h4>
                  <p className={styles.serviceDescription}>Clubs, organizations, events, and leadership development</p>
                </div>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <i className="fas fa-Home"></i>
                  </div>
                  <h4 className={styles.serviceTitle}>Housing Assistance</h4>
                  <p className={styles.serviceDescription}>On-campus housing, off-campus housing resources, and roommate matching</p>
                </div>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <i className="fas fa-Globe"></i>
                  </div>
                  <h4 className={styles.serviceTitle}>International Student Services</h4>
                  <p className={styles.serviceDescription}>Visa assistance, cultural adjustment support, and international student advising</p>
                </div>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <i className="fas fa-Briefcase"></i>
                  </div>
                  <h4 className={styles.serviceTitle}>Career Services</h4>
                  <p className={styles.serviceDescription}>Career counseling, job search assistance, resume workshops, and internship opportunities</p>
                </div>
              </div>
              <div className={styles.contactInfo}>
                <h3 className={styles.contactTitle}>Contact Student Affairs Office</h3>
                <p className={styles.contactDetails}>
                  <strong>Location:</strong> Student Center, Room 200<br />
                  <strong>Phone:</strong> (123) 456-7890<br />
                  <strong>Email:</strong> studentaffairs@hbinstitution.edu<br />
                  <strong>Hours:</strong> Monday-Friday, 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyHBIPage;