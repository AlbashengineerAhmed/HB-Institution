import React, { useState } from 'react';
import './ApplicationPage.css';

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
    <div className="application-page">
      {/* Application Banner Section */}
      <section className="application-banner">
        <div className="container">
          <div className="banner-content">
            <h1 className="banner-title">Apply to HB Institution</h1>
            <p className="banner-description">
              Take the first step towards your academic journey with us. Our application process is designed to be straightforward and supportive.
            </p>
          </div>
        </div>
      </section>

      {/* Application Process Overview */}
      <section className="application-overview-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Application Process</h2>
          </div>
          <div className="process-steps">
            <div className="step-card">
              <div className="step-icon">
                <i className="fas fa-user-edit"></i>
              </div>
              <h3 className="step-title">Create Account</h3>
              <p className="step-description">Register on our application portal to begin your application process.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3 className="step-title">Complete Application</h3>
              <p className="step-description">Fill out the application form and provide all required information.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <i className="fas fa-upload"></i>
              </div>
              <h3 className="step-title">Upload Documents</h3>
              <p className="step-description">Submit your academic transcripts, certificates, and other required documents.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <i className="fas fa-credit-card"></i>
              </div>
              <h3 className="step-title">Pay Application Fee</h3>
              <p className="step-description">Pay the non-refundable application fee to process your application.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <i className="fas fa-hourglass-half"></i>
              </div>
              <h3 className="step-title">Application Review</h3>
              <p className="step-description">Our admissions committee will review your application and credentials.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <i className="fas fa-envelope-open-text"></i>
              </div>
              <h3 className="step-title">Admission Decision</h3>
              <p className="step-description">Receive your admission decision via email with further instructions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className="requirements-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Application Requirements</h2>
          </div>
          <div className="requirements-tabs">
            <div className="tab-buttons">
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
            
            <div className="tab-content">
              {activeTab === 'undergraduate' && (
                <div className="requirements-list">
                  <h3 className="requirements-title">Undergraduate Application Requirements</h3>
                  <ul>
                    <li>Completed application form</li>
                    <li>High school diploma or equivalent</li>
                    <li>Official high school transcripts</li>
                    <li>Standardized test scores (SAT/ACT)</li>
                    <li>Personal statement/Essay</li>
                    <li>Letters of recommendation (2)</li>
                    <li>Application fee</li>
                  </ul>
                  <div className="additional-info">
                    <h4>Additional Information</h4>
                    <p>Some programs may have specific requirements beyond those listed above. Please check the specific program page for detailed information.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'graduate' && (
                <div className="requirements-list">
                  <h3 className="requirements-title">Graduate Application Requirements</h3>
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
                  <div className="additional-info">
                    <h4>Additional Information</h4>
                    <p>Graduate program requirements vary by department. Please review the specific program requirements before applying.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'international' && (
                <div className="requirements-list">
                  <h3 className="requirements-title">International Student Requirements</h3>
                  <ul>
                    <li>All general requirements for undergraduate or graduate admission</li>
                    <li>Proof of English proficiency (TOEFL/IELTS/Duolingo English Test)</li>
                    <li>Credential evaluation for non-U.S. academic documents</li>
                    <li>Financial documentation showing ability to cover tuition and living expenses</li>
                    <li>Copy of passport</li>
                    <li>Visa documentation (after acceptance)</li>
                  </ul>
                  <div className="additional-info">
                    <h4>English Proficiency Requirements</h4>
                    <p>Minimum scores: TOEFL (80), IELTS (6.5), Duolingo English Test (105)</p>
                    <h4>Financial Documentation</h4>
                    <p>International students must provide bank statements or sponsorship letters showing sufficient funds for at least one year of study.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'transfer' && (
                <div className="requirements-list">
                  <h3 className="requirements-title">Transfer Student Requirements</h3>
                  <ul>
                    <li>Completed application form</li>
                    <li>Official transcripts from all colleges/universities attended</li>
                    <li>Minimum GPA of 2.5 on a 4.0 scale</li>
                    <li>Statement of good standing from previous institution</li>
                    <li>Course descriptions for transfer credit evaluation</li>
                    <li>High school transcripts (if fewer than 24 college credits completed)</li>
                    <li>Application fee</li>
                  </ul>
                  <div className="additional-info">
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
      <section className="application-form-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Start Your Application</h2>
            <p className="section-description">Fill out the form below to begin your application process. Fields marked with an asterisk (*) are required.</p>
          </div>
          
          <div className="application-form-container">
            <div className="form-progress">
              <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>Personal Information</div>
              <div className={`progress-step ${formStep >= 2 ? 'active' : ''}`}>Academic Background</div>
              <div className={`progress-step ${formStep >= 3 ? 'active' : ''}`}>Program Selection</div>
              <div className={`progress-step ${formStep >= 4 ? 'active' : ''}`}>Documents Upload</div>
            </div>
            
            <form className="application-form">
              {formStep === 1 && (
                <div className="form-step">
                  <h3 className="form-step-title">Personal Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input type="text" id="lastName" name="lastName" required />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" required />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth *</label>
                      <input type="date" id="dob" name="dob" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nationality">Nationality *</label>
                      <input type="text" id="nationality" name="nationality" required />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="address">Address *</label>
                    <textarea id="address" name="address" rows="3" required></textarea>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="button" className="btn-next" onClick={handleNextStep}>Next Step</button>
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div className="form-step">
                  <h3 className="form-step-title">Academic Background</h3>
                  
                  <div className="form-group full-width">
                    <label htmlFor="highSchool">High School/Previous Institution *</label>
                    <input type="text" id="highSchool" name="highSchool" required />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="graduationYear">Year of Graduation *</label>
                      <input type="number" id="graduationYear" name="graduationYear" min="1900" max="2099" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gpa">GPA/Grade Average *</label>
                      <input type="text" id="gpa" name="gpa" required />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="previousDegree">Previous Degree(s) (if applicable)</label>
                    <input type="text" id="previousDegree" name="previousDegree" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="testScores">Standardized Test Scores (if applicable)</label>
                    <textarea id="testScores" name="testScores" rows="3" placeholder="e.g., SAT: 1200, TOEFL: 90"></textarea>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="button" className="btn-prev" onClick={handlePrevStep}>Previous Step</button>
                    <button type="button" className="btn-next" onClick={handleNextStep}>Next Step</button>
                  </div>
                </div>
              )}
              
              {formStep === 3 && (
                <div className="form-step">
                  <h3 className="form-step-title">Program Selection</h3>
                  
                  <div className="form-group full-width">
                    <label htmlFor="programLevel">Program Level *</label>
                    <select id="programLevel" name="programLevel" required>
                      <option value="">Select Program Level</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="intensive">Intensive Arabic Program</option>
                      <option value="bridge">Bridge to Master's</option>
                    </select>
                  </div>
                  
                  <div className="form-group full-width">
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
                  
                  <div className="form-group full-width">
                    <label htmlFor="startTerm">Intended Start Term *</label>
                    <select id="startTerm" name="startTerm" required>
                      <option value="">Select Term</option>
                      <option value="fall_2023">Fall 2023</option>
                      <option value="spring_2024">Spring 2024</option>
                      <option value="summer_2024">Summer 2024</option>
                      <option value="fall_2024">Fall 2024</option>
                    </select>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="studyMode">Mode of Study *</label>
                    <select id="studyMode" name="studyMode" required>
                      <option value="">Select Mode</option>
                      <option value="full_time">Full-time</option>
                      <option value="part_time">Part-time</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="button" className="btn-prev" onClick={handlePrevStep}>Previous Step</button>
                    <button type="button" className="btn-next" onClick={handleNextStep}>Next Step</button>
                  </div>
                </div>
              )}
              
              {formStep === 4 && (
                <div className="form-step">
                  <h3 className="form-step-title">Documents Upload</h3>
                  
                  <div className="form-group full-width">
                    <label htmlFor="transcript">Academic Transcript *</label>
                    <input type="file" id="transcript" name="transcript" accept=".pdf,.doc,.docx" required />
                    <small className="file-info">Accepted formats: PDF, DOC, DOCX. Max size: 5MB</small>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="idDocument">ID/Passport *</label>
                    <input type="file" id="idDocument" name="idDocument" accept=".pdf,.jpg,.jpeg,.png" required />
                    <small className="file-info">Accepted formats: PDF, JPG, JPEG, PNG. Max size: 2MB</small>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="cv">CV/Resume</label>
                    <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" />
                    <small className="file-info">Accepted formats: PDF, DOC, DOCX. Max size: 3MB</small>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="personalStatement">Personal Statement/Statement of Purpose *</label>
                    <input type="file" id="personalStatement" name="personalStatement" accept=".pdf,.doc,.docx" required />
                    <small className="file-info">Accepted formats: PDF, DOC, DOCX. Max size: 3MB</small>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="additionalDocuments">Additional Documents (if applicable)</label>
                    <input type="file" id="additionalDocuments" name="additionalDocuments" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple />
                    <small className="file-info">Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG. Max size: 10MB total</small>
                  </div>
                  
                  <div className="form-group full-width">
                    <div className="checkbox-group">
                      <input type="checkbox" id="termsAgreement" name="termsAgreement" required />
                      <label htmlFor="termsAgreement">I certify that all information provided is true and accurate. I understand that any false or misleading information may result in the rejection of my application. *</label>
                    </div>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="button" className="btn-prev" onClick={handlePrevStep}>Previous Step</button>
                    <button type="submit" className="btn-submit">Submit Application</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Application Deadlines */}
      <section className="deadlines-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Application Deadlines</h2>
          </div>
          <div className="deadlines-table-container">
            <table className="deadlines-table">
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
          <div className="deadlines-note">
            <p><strong>Note:</strong> Applications received after the deadline may be considered on a rolling basis, subject to availability. International students are encouraged to apply well in advance of the deadlines to allow sufficient time for visa processing.</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Need Assistance?</h2>
          </div>
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3 className="contact-title">Email Us</h3>
              <p className="contact-detail">admissions@hbinstitution.edu</p>
              <p className="contact-description">Our admissions team typically responds within 24-48 hours.</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3 className="contact-title">Call Us</h3>
              <p className="contact-detail">+1 (555) 123-4567</p>
              <p className="contact-description">Available Monday-Friday, 9:00 AM - 5:00 PM EST</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="contact-title">Live Chat</h3>
              <p className="contact-detail">Chat with an Admissions Counselor</p>
              <p className="contact-description">Available Monday-Friday, 10:00 AM - 4:00 PM EST</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3 className="contact-title">Schedule a Meeting</h3>
              <p className="contact-detail">Book a Virtual Appointment</p>
              <p className="contact-description">Meet with an admissions counselor to discuss your application</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            <div className="faq-item">
              <h3 className="faq-question">What is the application fee?</h3>
              <p className="faq-answer">The application fee is $50 for domestic students and $75 for international students. This fee is non-refundable and must be paid at the time of application submission.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Can I apply to multiple programs?</h3>
              <p className="faq-answer">Yes, you can apply to up to three programs with a single application. However, you will need to indicate your program preferences in order of priority.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How long does the application review process take?</h3>
              <p className="faq-answer">The application review process typically takes 4-6 weeks from the date of submission. International applications may take longer due to additional document verification requirements.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Is financial aid available?</h3>
              <p className="faq-answer">Yes, HB Institution offers various scholarships, grants, and financial aid options for eligible students. You can apply for financial aid after submitting your application for admission.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Can I defer my admission?</h3>
              <p className="faq-answer">Yes, admitted students may request to defer their enrollment for up to one academic year. Deferral requests are evaluated on a case-by-case basis and require approval from the admissions committee.</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What if my documents are not in English?</h3>
              <p className="faq-answer">All documents submitted in a language other than English must be accompanied by certified English translations. Both the original documents and the translations must be submitted.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationPage;