import React from 'react';
import './WhyHBIPage.css';

const WhyHBIPage = () => {
  return (
    <div className="why-hbi-page">
      {/* Why HBI Banner Section */}
      <section className="why-hbi-banner">
        <div className="container">
          <div className="banner-content">
            <h1 className="banner-title">Why Choose HB Institution</h1>
            <p className="banner-description">
              Discover the unique advantages and opportunities that make HB Institution the ideal choice for your educational journey.
            </p>
          </div>
        </div>
      </section>

      {/* Why Study at HBI Section */}
      <section className="why-study-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Study at HBI</h2>
          </div>
          <div className="why-study-content">
            <div className="why-study-image">
              <img src="/images/hero-2-thumb-1.png" alt="Students at HBI" />
            </div>
            <div className="why-study-text">
              <p>
                At HB Institution, we offer a unique educational experience that combines academic excellence with a supportive and inclusive environment. Our institution is dedicated to providing students with the knowledge, skills, and values they need to succeed in their chosen fields and make meaningful contributions to society.
              </p>
              <div className="reasons-grid">
                <div className="reason-card">
                  <div className="reason-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h3 className="reason-title">Academic Excellence</h3>
                  <p className="reason-description">Our rigorous academic programs are designed to challenge and inspire students, fostering critical thinking and intellectual growth.</p>
                </div>
                <div className="reason-card">
                  <div className="reason-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="reason-title">Diverse Community</h3>
                  <p className="reason-description">Our diverse student body and faculty create a rich multicultural environment that enhances the learning experience.</p>
                </div>
                <div className="reason-card">
                  <div className="reason-icon">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h3 className="reason-title">Supportive Environment</h3>
                  <p className="reason-description">We provide comprehensive support services to help students succeed academically, personally, and professionally.</p>
                </div>
                <div className="reason-card">
                  <div className="reason-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <h3 className="reason-title">Global Perspective</h3>
                  <p className="reason-description">Our programs incorporate global perspectives, preparing students to thrive in an interconnected world.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition Fees Section */}
      <section className="tuition-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tuition Fees</h2>
            <p className="section-description">We strive to make quality education accessible through competitive tuition rates and various financial aid options.</p>
          </div>
          <div className="tuition-tables">
            <div className="tuition-table-container">
              <h3 className="table-title">Undergraduate Programs</h3>
              <table className="tuition-table">
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
            
            <div className="tuition-table-container">
              <h3 className="table-title">Graduate Programs</h3>
              <table className="tuition-table">
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
            
            <div className="tuition-table-container">
              <h3 className="table-title">Special Programs</h3>
              <table className="tuition-table">
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
          
          <div className="additional-fees">
            <h3 className="fees-title">Additional Fees</h3>
            <div className="fees-grid">
              <div className="fee-item">
                <span className="fee-name">Application Fee</span>
                <span className="fee-value">$50 (Domestic) / $75 (International)</span>
              </div>
              <div className="fee-item">
                <span className="fee-name">Registration Fee</span>
                <span className="fee-value">$100 per semester</span>
              </div>
              <div className="fee-item">
                <span className="fee-name">Technology Fee</span>
                <span className="fee-value">$150 per semester</span>
              </div>
              <div className="fee-item">
                <span className="fee-name">Student Activity Fee</span>
                <span className="fee-value">$75 per semester</span>
              </div>
              <div className="fee-item">
                <span className="fee-name">Graduation Fee</span>
                <span className="fee-value">$200 (one-time)</span>
              </div>
              <div className="fee-item">
                <span className="fee-name">Transcript Fee</span>
                <span className="fee-value">$10 per copy</span>
              </div>
            </div>
          </div>
          
          <div className="payment-options">
            <h3 className="payment-title">Payment Options</h3>
            <p className="payment-description">We offer various payment plans to accommodate different financial situations:</p>
            <ul className="payment-list">
              <li>Full payment at the beginning of each semester (5% discount)</li>
              <li>Monthly installment plan (small administrative fee applies)</li>
              <li>Employer reimbursement deferred payment plan</li>
              <li>Financial aid and scholarship recipients payment plan</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      <section className="accreditation-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Accreditation</h2>
            <p className="section-description">HB Institution is committed to maintaining the highest standards of educational quality through accreditation by respected organizations.</p>
          </div>
          <div className="accreditation-content">
            <div className="accreditation-text">
              <p>
                Accreditation is a voluntary process that ensures an institution meets or exceeds established standards of educational quality. HB Institution has earned accreditation from several respected organizations, demonstrating our commitment to excellence in education.
              </p>
              <p>
                Our accreditation status provides numerous benefits to our students, including eligibility for financial aid, recognition of credits for transfer, and validation of the quality of our academic programs by external reviewers.
              </p>
              <h3 className="accreditation-subtitle">Our Accreditations:</h3>
              <ul className="accreditation-list">
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
            <div className="accreditation-logos">
              <div className="logo-item">
                <img src="/images/accreditation-1.png" alt="Higher Learning Commission" />
              </div>
              <div className="logo-item">
                <img src="/images/accreditation-2.png" alt="Association of Theological Schools" />
              </div>
              <div className="logo-item">
                <img src="/images/accreditation-3.png" alt="Accreditation Board for Engineering and Technology" />
              </div>
              <div className="logo-item">
                <img src="/images/accreditation-4.png" alt="Accreditation Council for Business Schools and Programs" />
              </div>
              <div className="logo-item">
                <img src="/images/accreditation-5.png" alt="Council for the Accreditation of Educator Preparation" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graduate Acceptance Section */}
      <section className="graduate-acceptance-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Graduate Acceptance</h2>
            <p className="section-description">Our graduates are accepted into prestigious institutions worldwide for further studies and sought after by employers for their knowledge and skills.</p>
          </div>
          <div className="graduate-content">
            <div className="graduate-stats">
              <div className="stat-card">
                <div className="stat-value">94%</div>
                <div className="stat-label">Employment Rate</div>
                <p className="stat-description">of our graduates find employment within six months of graduation</p>
              </div>
              <div className="stat-card">
                <div className="stat-value">85%</div>
                <div className="stat-label">Graduate School Acceptance</div>
                <p className="stat-description">of our graduates who apply to graduate programs are accepted</p>
              </div>
              <div className="stat-card">
                <div className="stat-value">$65K</div>
                <div className="stat-label">Average Starting Salary</div>
                <p className="stat-description">for our graduates entering the workforce</p>
              </div>
              <div className="stat-card">
                <div className="stat-value">78%</div>
                <div className="stat-label">International Opportunities</div>
                <p className="stat-description">of graduates have opportunities to work or study abroad</p>
              </div>
            </div>
            
            <div className="graduate-destinations">
              <h3 className="destinations-title">Where Our Graduates Go</h3>
              <div className="destinations-tabs">
                <div className="destinations-category">
                  <h4 className="category-title">Top Graduate Schools</h4>
                  <ul className="destinations-list">
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
                <div className="destinations-category">
                  <h4 className="category-title">Top Employers</h4>
                  <ul className="destinations-list">
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
            
            <div className="alumni-testimonials">
              <h3 className="testimonials-title">Alumni Success Stories</h3>
              <div className="testimonials-slider">
                <div className="testimonial-card">
                  <div className="testimonial-image">
                    <img src="/images/testimonial-1.jpg" alt="Alumni" />
                  </div>
                  <div className="testimonial-content">
                    <p className="testimonial-text">
                      "My education at HBI provided me with a strong foundation in Islamic finance and modern business practices. This unique combination helped me secure a position at Dubai Islamic Bank, where I now lead a team developing innovative Shariah-compliant financial products."
                    </p>
                    <div className="testimonial-author">
                      <div className="author-name">Ahmed Hassan</div>
                      <div className="author-info">MBA in Islamic Finance, 2018</div>
                      <div className="author-position">Senior Product Manager, Dubai Islamic Bank</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Centers Section */}
      <section className="exam-centers-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Exam Centers</h2>
            <p className="section-description">HB Institution provides well-equipped examination centers to ensure a conducive environment for assessments.</p>
          </div>
          <div className="exam-centers-content">
            <div className="exam-centers-info">
              <p>
                Our examination centers are designed to provide a quiet, secure, and comfortable environment for students taking exams. Each center is equipped with modern facilities and staffed by trained proctors to ensure the integrity of the examination process.
              </p>
              <h3 className="exam-centers-subtitle">Exam Center Facilities:</h3>
              <ul className="facilities-list">
                <li>Spacious examination halls with proper lighting and ventilation</li>
                <li>Ergonomic seating arrangements for maximum comfort during exams</li>
                <li>Computer labs for online and digital assessments</li>
                <li>Secure storage for personal belongings</li>
                <li>Accessible facilities for students with disabilities</li>
                <li>Quiet zones and distraction-free environment</li>
              </ul>
              
              <h3 className="exam-centers-subtitle">Exam Types Supported:</h3>
              <ul className="exam-types-list">
                <li>Course final examinations</li>
                <li>Midterm assessments</li>
                <li>Standardized tests (TOEFL, GRE, GMAT)</li>
                <li>Professional certification exams</li>
                <li>Language proficiency tests</li>
                <li>Placement and entrance examinations</li>
              </ul>
            </div>
            
            <div className="exam-centers-locations">
              <h3 className="locations-title">Our Exam Center Locations</h3>
              <div className="locations-grid">
                <div className="location-card">
                  <div className="location-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h4 className="location-name">Main Campus</h4>
                  <p className="location-address">123 University Avenue, Cityville, State 12345</p>
                  <p className="location-contact">Phone: (123) 456-7890</p>
                </div>
                <div className="location-card">
                  <div className="location-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h4 className="location-name">Downtown Center</h4>
                  <p className="location-address">456 Central Street, Cityville, State 12345</p>
                  <p className="location-contact">Phone: (123) 456-7891</p>
                </div>
                <div className="location-card">
                  <div className="location-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h4 className="location-name">West Campus</h4>
                  <p className="location-address">789 West Boulevard, Cityville, State 12345</p>
                  <p className="location-contact">Phone: (123) 456-7892</p>
                </div>
                <div className="location-card">
                  <div className="location-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h4 className="location-name">East Campus</h4>
                  <p className="location-address">321 East Avenue, Cityville, State 12345</p>
                  <p className="location-contact">Phone: (123) 456-7893</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section className="scholarships-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Scholarships</h2>
            <p className="section-description">HB Institution offers a variety of scholarships to recognize academic excellence, support students with financial need, and promote diversity.</p>
          </div>
          <div className="scholarships-content">
            <div className="scholarships-intro">
              <p>
                We believe that financial constraints should not prevent talented and motivated students from accessing quality education. Our scholarship programs are designed to make education more affordable and accessible to deserving students from diverse backgrounds.
              </p>
            </div>
            
            <div className="scholarships-categories">
              <div className="category-card">
                <div className="category-icon">
                  <i className="fas fa-medal"></i>
                </div>
                <h3 className="category-title">Merit-Based Scholarships</h3>
                <p className="category-description">Awarded to students with outstanding academic achievements, leadership qualities, and extracurricular involvement.</p>
                <ul className="scholarships-list">
                  <li>
                    <span className="scholarship-name">Presidential Scholarship</span>
                    <span className="scholarship-value">Full tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Dean's Scholarship</span>
                    <span className="scholarship-value">75% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Academic Excellence Scholarship</span>
                    <span className="scholarship-value">50% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Honor Student Scholarship</span>
                    <span className="scholarship-value">25% tuition</span>
                  </li>
                </ul>
              </div>
              
              <div className="category-card">
                <div className="category-icon">
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <h3 className="category-title">Need-Based Scholarships</h3>
                <p className="category-description">Provided to students who demonstrate financial need and meet academic requirements.</p>
                <ul className="scholarships-list">
                  <li>
                    <span className="scholarship-name">Financial Need Grant</span>
                    <span className="scholarship-value">Up to 80% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Opportunity Scholarship</span>
                    <span className="scholarship-value">Up to 60% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Hardship Relief Fund</span>
                    <span className="scholarship-value">Varies based on need</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Emergency Assistance Grant</span>
                    <span className="scholarship-value">Varies based on need</span>
                  </li>
                </ul>
              </div>
              
              <div className="category-card">
                <div className="category-icon">
                  <i className="fas fa-globe-americas"></i>
                </div>
                <h3 className="category-title">International Scholarships</h3>
                <p className="category-description">Designed for international students to promote cultural diversity and global perspectives.</p>
                <ul className="scholarships-list">
                  <li>
                    <span className="scholarship-name">Global Diversity Scholarship</span>
                    <span className="scholarship-value">Up to 70% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">International Excellence Award</span>
                    <span className="scholarship-value">Up to 50% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Cultural Ambassador Scholarship</span>
                    <span className="scholarship-value">Up to 40% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">International Student Grant</span>
                    <span className="scholarship-value">Up to 30% tuition</span>
                  </li>
                </ul>
              </div>
              
              <div className="category-card">
                <div className="category-icon">
                  <i className="fas fa-book-reader"></i>
                </div>
                <h3 className="category-title">Program-Specific Scholarships</h3>
                <p className="category-description">Targeted scholarships for students in specific academic programs or fields of study.</p>
                <ul className="scholarships-list">
                  <li>
                    <span className="scholarship-name">Islamic Studies Excellence Scholarship</span>
                    <span className="scholarship-value">Up to 60% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Arabic Language Proficiency Award</span>
                    <span className="scholarship-value">Up to 50% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">STEM Achievement Scholarship</span>
                    <span className="scholarship-value">Up to 55% tuition</span>
                  </li>
                  <li>
                    <span className="scholarship-name">Business Leadership Scholarship</span>
                    <span className="scholarship-value">Up to 45% tuition</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="scholarship-application">
              <h3 className="application-title">How to Apply for Scholarships</h3>
              <div className="application-steps">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4 className="step-title">Review Eligibility</h4>
                    <p className="step-description">Check the specific eligibility requirements for each scholarship you're interested in.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4 className="step-title">Complete Application</h4>
                    <p className="step-description">Fill out the scholarship application form, which can be accessed through our student portal.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4 className="step-title">Submit Documents</h4>
                    <p className="step-description">Provide all required documentation, including academic transcripts, financial information, and personal statements.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4 className="step-title">Interview (if required)</h4>
                    <p className="step-description">Some scholarships may require an interview as part of the selection process.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h4 className="step-title">Await Decision</h4>
                    <p className="step-description">Scholarship decisions are typically announced within 4-6 weeks after the application deadline.</p>
                  </div>
                </div>
              </div>
              <div className="application-cta">
                <a href="#" className="btn-apply">Apply for Scholarships</a>
                <a href="#" className="btn-learn-more">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Testimonials</h2>
            <p className="section-description">Hear what our students and alumni have to say about their experience at HB Institution.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Studying at HBI has been a transformative experience. The blend of traditional Islamic knowledge and modern academic approaches has given me a unique perspective that I couldn't have gained elsewhere. The supportive faculty and diverse student community made my educational journey truly enriching."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="/images/testimonial-1.jpg" alt="Student" />
                </div>
                <div className="author-info">
                  <div className="author-name">Sarah Ahmed</div>
                  <div className="author-details">Bachelor of Arts in Islamic Studies, Class of 2021</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "The quality of education and the level of support I received at HBI exceeded my expectations. The professors are not only experts in their fields but also genuinely care about student success. The skills and knowledge I gained have been invaluable in my professional career."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="/images/testimonial-2.jpg" alt="Student" />
                </div>
                <div className="author-info">
                  <div className="author-name">Mohammed Ali</div>
                  <div className="author-details">Master of Science in Computer Science, Class of 2020</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "As an international student, I was concerned about adapting to a new environment, but the welcoming community at HBI made me feel at home from day one. The cultural diversity on campus enriched my learning experience, and the support services helped me navigate any challenges I faced."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="/images/testimonial-3.jpg" alt="Student" />
                </div>
                <div className="author-info">
                  <div className="author-name">Aisha Rahman</div>
                  <div className="author-details">MBA in Islamic Finance, Class of 2019</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "The Intensive Arabic Program at HBI transformed my language skills in just six months. The immersive approach, combined with excellent teaching methods and cultural activities, helped me achieve fluency faster than I thought possible. I highly recommend this program to anyone serious about learning Arabic."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="/images/testimonial-4.jpg" alt="Student" />
                </div>
                <div className="author-info">
                  <div className="author-name">John Smith</div>
                  <div className="author-details">Intensive Arabic Program, 2022</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Affairs Office Section */}
      <section className="student-affairs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Affairs Office</h2>
            <p className="section-description">Our Student Affairs Office is dedicated to enhancing the student experience and providing comprehensive support services.</p>
          </div>
          <div className="student-affairs-content">
            <div className="student-affairs-image">
              <img src="/images/student-affairs.jpg" alt="Student Affairs Office" />
            </div>
            <div className="student-affairs-info">
              <p>
                The Student Affairs Office serves as a central resource for students, providing a wide range of services and support to enhance their academic and personal development. Our dedicated team is committed to creating a positive and inclusive campus environment where all students can thrive.
              </p>
              <h3 className="services-title">Services Provided:</h3>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h4 className="service-title">Academic Support</h4>
                  <p className="service-description">Tutoring, academic advising, study skills workshops, and learning resources</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h4 className="service-title">Health & Wellness</h4>
                  <p className="service-description">Counseling services, health education, and wellness programs</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4 className="service-title">Student Activities</h4>
                  <p className="service-description">Clubs, organizations, events, and leadership development</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <h4 className="service-title">Housing Assistance</h4>
                  <p className="service-description">On-campus housing, off-campus housing resources, and roommate matching</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <h4 className="service-title">International Student Services</h4>
                  <p className="service-description">Visa assistance, cultural adjustment support, and international student advising</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <h4 className="service-title">Career Services</h4>
                  <p className="service-description">Career counseling, job search assistance, resume workshops, and internship opportunities</p>
                </div>
              </div>
              <div className="contact-info">
                <h3 className="contact-title">Contact Student Affairs Office</h3>
                <p className="contact-details">
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