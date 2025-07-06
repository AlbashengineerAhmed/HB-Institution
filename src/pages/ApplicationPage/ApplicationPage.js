import React, { useState } from 'react';
import styles from './ApplicationPage.module.css';

const ApplicationPage = () => {
  const [activeTab, setActiveTab] = useState('undergraduate');
  const [formStep, setFormStep] = useState(1);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormStep(1);
  };
  
  const handleNextStep = () => {
    setFormStep(prevStep => prevStep + 1);
  };
  
  const handlePrevStep = () => {
    setFormStep(prevStep => prevStep - 1);
  };
  
  return (
    <div className={styles.applicationPage}>
      {/* Application Banner Section */}
      <section className={styles.applicationBanner}>
        <div className={container}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Apply to HB Institution</h1>
            <p className={styles.bannerDescription}>
              Take the first step towards your academic journey with us. Our application process is designed to be straightforward and supportive.
            </p>
          </div>
        </div>
      </section>

      {/* Application Process Overview */}
      <section className={styles.applicationOverviewSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Application Process</h2>
          </div>
          <div className={styles.processSteps}>
            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <i className="fas fa-UserEdit"></i>
              </div>
              <h3 className={styles.stepTitle}>Create Account</h3>
              <p className={styles.stepDescription}>Register on our application portal to begin your application process.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <i className="fas fa-FileAlt"></i>
              </div>
              <h3 className={styles.stepTitle}>Complete Application</h3>
              <p className={styles.stepDescription}>Fill out the application form and provide all required information.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <i className="fas fa-Upload"></i>
              </div>
              <h3 className={styles.stepTitle}>Upload Documents</h3>
              <p className={styles.stepDescription}>Submit your academic transcripts, certificates, and other required documents.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <i className="fas fa-CreditCard"></i>
              </div>
              <h3 className={styles.stepTitle}>Pay Application Fee</h3>
              <p className={styles.stepDescription}>Pay the non-refundable application fee to process your application.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <i className="fas fa-HourglassHalf"></i>
              </div>
              <h3 className={styles.stepTitle}>Application Review</h3>
              <p className={styles.stepDescription}>Our admissions committee will review your application and credentials.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <i className="fas fa-EnvelopeOpenText"></i>
              </div>
              <h3 className={styles.stepTitle}>Admission Decision</h3>
              <p className={styles.stepDescription}>Receive your admission decision via email with further instructions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className={styles.requirementsSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Application Requirements</h2>
          </div>
          <div className={styles.requirementsTabs}>
            <div className={styles.tabButtons}>
              <button 
                className={`tab-button ${activeTab === 'undergraduate' ? 'active' : ''}`}
                onClick={() => handleTabChange('undergraduate')}
              >
                Undergraduate
              </button>
              <button 
                className={`tab-button ${activeTab === 'graduate' ? 'active' : ''}`}
                onClick={() => handleTabChange('graduate')}
              >
                Graduate
              </button>
              <button 
                className={`tab-button ${activeTab === 'international' ? 'active' : ''}`}
                onClick={() => handleTabChange('international')}
              >
                International
              </button>
              <button 
                className={`tab-button ${activeTab === 'transfer' ? 'active' : ''}`}
                onClick={() => handleTabChange('transfer')}
              >
                Transfer
              </button>
            </div>
            
            <div className={styles.tabContent}>
              {activeTab === 'undergraduate' && (
                <div className={styles.requirementsList}>
                  <h3 className={styles.requirementsTitle}>Undergraduate Application Requirements</h3>
                  <ul>
                    <li>Completed application form</li>
                    <li>High school diploma or equivalent</li>
                    <li>Official high school transcripts</li>
                    <li>Standardized test scores (SAT/ACT)</li>
                    <li>Personal statement/Essay</li>
                    <li>Letters of recommendation (2)</li>
                    <li>Application fee</li>
                  </ul>
                  <div className={styles.additionalInfo}>
                    <h4>Additional Information</h4>
                    <p>Some programs may have specific requirements beyond those listed above. Please check the specific program page for detailed information.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'graduate' && (
                <div className={styles.requirementsList}>
                  <h3 className={styles.requirementsTitle}>Graduate Application Requirements</h3>
                  <ul>
                    <li>Completed application form</li>
                    <li>Bachelor's degree from an accredited institution</li>
                    <li>Official transcripts from all colleges/universities attended</li>
                    <li>GRE/GMAT scores (program-specific)</li>
                    <li>Statement of purpose</li>
                    <li>Curriculum vitae/Resume</li>
                    <li>Letters of recommendation (3)</li>
                    <li>Writing sample (for specific programs)</li>
                    <li>Application fee</li>
                  </ul>
                  <div className={styles.additionalInfo}>
                    <h4>Additional Information</h4>
                    <p>Graduate program requirements vary by department. Please review the specific program requirements before applying.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'international' && (
                <div className={styles.requirementsList}>
                  <h3 className={styles.requirementsTitle}>International Student Requirements</h3>
                  <ul>
                    <li>All general requirements for undergraduate or graduate admission</li>
                    <li>Proof of English proficiency (TOEFL/IELTS/Duolingo English Test)</li>
                    <li>Credential evaluation for non-U.S. academic documents</li>
                    <li>Financial documentation showing ability to cover tuition and living expenses</li>
                    <li>Copy of passport</li>
                    <li>Visa documentation (after acceptance)</li>
                  </ul>
                  <div className={styles.additionalInfo}>
                    <h4>English Proficiency Requirements</h4>
                    <p>Minimum scores: TOEFL (80), IELTS (6.5), Duolingo English Test (105)</p>
                    <h4>Financial Documentation</h4>
                    <p>International students must provide bank statements or sponsorship letters showing sufficient funds for at least one year of study.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'transfer' && (
                <div className={styles.requirementsList}>
                  <h3 className={styles.requirementsTitle}>Transfer Student Requirements</h3>
                  <ul>
                    <li>Completed application form</li>
                    <li>Official transcripts from all colleges/universities attended</li>
                    <li>Minimum GPA of 2.5 on a 4.0 scale</li>
                    <li>Statement of good standing from previous institution</li>
                    <li>Course descriptions for transfer credit evaluation</li>
                    <li>High school transcripts (if fewer than 24 college credits completed)</li>
                    <li>Application fee</li>
                  </ul>
                  <div className={styles.additionalInfo}>
                    <h4>Transfer Credit Policy</h4>
                    <p>Credits earned with a grade of C or better from accredited institutions may be eligible for transfer. A maximum of 60 credits can be transferred for undergraduate programs.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className={styles.applicationFormSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Start Your Application</h2>
            <p className={styles.sectionDescription}>Fill out the form below to begin your application process. Fields marked with an asterisk (*) are required.</p>
          </div>
          
          <div className={styles.applicationFormContainer}>
            <div className={styles.formProgress}>
              <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>Personal Information</div>
              <div className={`progress-step ${formStep >= 2 ? 'active' : ''}`}>Academic Background</div>
              <div className={`progress-step ${formStep >= 3 ? 'active' : ''}`}>Program Selection</div>
              <div className={`progress-step ${formStep >= 4 ? 'active' : ''}`}>Documents Upload</div>
            </div>
            
            <form className={styles.applicationForm}>
              {formStep === 1 && (
                <div className={styles.formStep}>
                  <h3 className={styles.formStepTitle}>Personal Information</h3>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">First Name *</label>
                      <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName">Last Name *</label>
                      <input type="text" id="lastName" name="lastName" required />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" required />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="dob">Date of Birth *</label>
                      <input type="date" id="dob" name="dob" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="nationality">Nationality *</label>
                      <input type="text" id="nationality" name="nationality" required />
                    </div>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="address">Address *</label>
                    <textarea id="address" name="address" rows="3" required></textarea>
                  </div>
                  
                  <div className={styles.formButtons}>
                    <button type="button" className={styles.btnNext} onClick={handleNextStep}>Next Step</button>
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div className={styles.formStep}>
                  <h3 className={styles.formStepTitle}>Academic Background</h3>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="highSchool">High School/Previous Institution *</label>
                    <input type="text" id="highSchool" name="highSchool" required />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="graduationYear">Year of Graduation *</label>
                      <input type="number" id="graduationYear" name="graduationYear" min="1900" max="2099" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="gpa">GPA/Grade Average *</label>
                      <input type="text" id="gpa" name="gpa" required />
                    </div>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="previousDegree">Previous Degree(s) (if applicable)</label>
                    <input type="text" id="previousDegree" name="previousDegree" />
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="testScores">Standardized Test Scores (if applicable)</label>
                    <textarea id="testScores" name="testScores" rows="3" placeholder="e.g., SAT: 1200, TOEFL: 90"></textarea>
                  </div>
                  
                  <div className={styles.formButtons}>
                    <button type="button" className={styles.btnPrev} onClick={handlePrevStep}>Previous Step</button>
                    <button type="button" className={styles.btnNext} onClick={handleNextStep}>Next Step</button>
                  </div>
                </div>
              )}
              
              {formStep === 3 && (
                <div className={styles.formStep}>
                  <h3 className={styles.formStepTitle}>Program Selection</h3>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="programLevel">Program Level *</label>
                    <select id="programLevel" name="programLevel" required>
                      <option value="">Select Program Level</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="intensive">Intensive Arabic Program</option>
                      <option value="bridge">Bridge to Master's</option>
                    </select>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="programChoice">Program of Interest *</label>
                    <select id="programChoice" name="programChoice" required>
                      <option value="">Select Program</option>
                      <option value="islamic_studies">Islamic Studies</option>
                      <option value="arabic_language">Arabic Language and Literature</option>
                      <option value="business">Business Administration</option>
                      <option value="computer_science">Computer Science</option>
                      <option value="education">Education</option>
                      <option value="islamic_finance">Islamic Finance</option>
                    </select>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="startTerm">Intended Start Term *</label>
                    <select id="startTerm" name="startTerm" required>
                      <option value="">Select Term</option>
                      <option value="fall_2023">Fall 2023</option>
                      <option value="spring_2024">Spring 2024</option>
                      <option value="summer_2024">Summer 2024</option>
                      <option value="fall_2024">Fall 2024</option>
                    </select>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="studyMode">Mode of Study *</label>
                    <select id="studyMode" name="studyMode" required>
                      <option value="">Select Mode</option>
                      <option value="full_time">Full-time</option>
                      <option value="part_time">Part-time</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                  
                  <div className={styles.formButtons}>
                    <button type="button" className={styles.btnPrev} onClick={handlePrevStep}>Previous Step</button>
                    <button type="button" className={styles.btnNext} onClick={handleNextStep}>Next Step</button>
                  </div>
                </div>
              )}
              
              {formStep === 4 && (
                <div className={styles.formStep}>
                  <h3 className={styles.formStepTitle}>Documents Upload</h3>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="transcript">Academic Transcript *</label>
                    <input type="file" id="transcript" name="transcript" accept=".pdf,.doc,.docx" required />
                    <small className={styles.fileInfo}>Accepted formats: PDF, DOC, DOCX. Max size: 5MB</small>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="idDocument">ID/Passport *</label>
                    <input type="file" id="idDocument" name="idDocument" accept=".pdf,.jpg,.jpeg,.png" required />
                    <small className={styles.fileInfo}>Accepted formats: PDF, JPG, JPEG, PNG. Max size: 2MB</small>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="cv">CV/Resume</label>
                    <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" />
                    <small className={styles.fileInfo}>Accepted formats: PDF, DOC, DOCX. Max size: 3MB</small>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="personalStatement">Personal Statement/Statement of Purpose *</label>
                    <input type="file" id="personalStatement" name="personalStatement" accept=".pdf,.doc,.docx" required />
                    <small className={styles.fileInfo}>Accepted formats: PDF, DOC, DOCX. Max size: 3MB</small>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="additionalDocuments">Additional Documents (if applicable)</label>
                    <input type="file" id="additionalDocuments" name="additionalDocuments" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple />
                    <small className={styles.fileInfo}>Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG. Max size: 10MB total</small>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <div className={styles.checkboxGroup}>
                      <input type="checkbox" id="termsAgreement" name="termsAgreement" required />
                      <label htmlFor="termsAgreement">I certify that all information provided is true and accurate. I understand that any false or misleading information may result in the rejection of my application. *</label>
                    </div>
                  </div>
                  
                  <div className={styles.formButtons}>
                    <button type="button" className={styles.btnPrev} onClick={handlePrevStep}>Previous Step</button>
                    <button type="submit" className={styles.btnSubmit}>Submit Application</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Application Deadlines */}
      <section className={styles.deadlinesSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Application Deadlines</h2>
          </div>
          <div className={styles.deadlinesTableContainer}>
            <table className={styles.deadlinesTable}>
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Fall Semester</th>
                  <th>Spring Semester</th>
                  <th>Summer Semester</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Undergraduate Programs</td>
                  <td>June 1</td>
                  <td>November 1</td>
                  <td>April 1</td>
                </tr>
                <tr>
                  <td>Graduate Programs</td>
                  <td>May 1</td>
                  <td>October 1</td>
                  <td>March 1</td>
                </tr>
                <tr>
                  <td>Intensive Arabic Program</td>
                  <td>July 15</td>
                  <td>December 15</td>
                  <td>April 15</td>
                </tr>
                <tr>
                  <td>Bridge to Master's</td>
                  <td>May 15</td>
                  <td>October 15</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>International Students</td>
                  <td>April 1</td>
                  <td>September 1</td>
                  <td>February 1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.deadlinesNote}>
            <p><strong>Note:</strong> Applications received after the deadline may be considered on a rolling basis, subject to availability. International students are encouraged to apply well in advance of the deadlines to allow sufficient time for visa processing.</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className={styles.contactSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Need Assistance?</h2>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className="fas fa-Envelope"></i>
              </div>
              <h3 className={styles.contactTitle}>Email Us</h3>
              <p className={styles.contactDetail}>admissions@hbinstitution.edu</p>
              <p className={styles.contactDescription}>Our admissions team typically responds within 24-48 hours.</p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className="fas fa-PhoneAlt"></i>
              </div>
              <h3 className={styles.contactTitle}>Call Us</h3>
              <p className={styles.contactDetail}>+1 (555) 123-4567</p>
              <p className={styles.contactDescription}>Available Monday-Friday, 9:00 AM - 5:00 PM EST</p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className="fas fa-Comments"></i>
              </div>
              <h3 className={styles.contactTitle}>Live Chat</h3>
              <p className={styles.contactDetail}>Chat with an Admissions Counselor</p>
              <p className={styles.contactDescription}>Available Monday-Friday, 10:00 AM - 4:00 PM EST</p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className="fas fa-CalendarCheck"></i>
              </div>
              <h3 className={styles.contactTitle}>Schedule a Meeting</h3>
              <p className={styles.contactDetail}>Book a Virtual Appointment</p>
              <p className={styles.contactDescription}>Meet with an admissions counselor to discuss your application</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqContainer}>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>What is the application fee?</h3>
              <p className={styles.faqAnswer}>The application fee is $50 for domestic students and $75 for international students. This fee is non-refundable and must be paid at the time of application submission.</p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Can I apply to multiple programs?</h3>
              <p className={styles.faqAnswer}>Yes, you can apply to up to three programs with a single application. However, you will need to indicate your program preferences in order of priority.</p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>How long does the application review process take?</h3>
              <p className={styles.faqAnswer}>The application review process typically takes 4-6 weeks from the date of submission. International applications may take longer due to additional document verification requirements.</p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Is financial aid available?</h3>
              <p className={styles.faqAnswer}>Yes, HB Institution offers various scholarships, grants, and financial aid options for eligible students. You can apply for financial aid after submitting your application for admission.</p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Can I defer my admission?</h3>
              <p className={styles.faqAnswer}>Yes, admitted students may request to defer their enrollment for up to one academic year. Deferral requests are evaluated on a case-by-case basis and require approval from the admissions committee.</p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>What if my documents are not in English?</h3>
              <p className={styles.faqAnswer}>All documents submitted in a language other than English must be accompanied by certified English translations. Both the original documents and the translations must be submitted.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationPage;