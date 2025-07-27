import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ContactPage.module.css';
import { sendContactMessage } from '../../services/contactService';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'courses', label: 'Course Information' },
    { value: 'enrollment', label: 'Enrollment Support' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', url: '#', name: 'Facebook' },
    { icon: 'fab fa-twitter', url: '#', name: 'Twitter' },
    { icon: 'fab fa-linkedin-in', url: '#', name: 'LinkedIn' },
    { icon: 'fab fa-instagram', url: '#', name: 'Instagram' },
    { icon: 'fab fa-youtube', url: '#', name: 'YouTube' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API call
      const contactData = {
        fullName: formData.name,
        phoneNumber: formData.phone || '',
        subject: formData.subject,
        message: formData.message
      };
      
      // Send contact message to API
      await sendContactMessage(contactData);
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Error handling is done in the service
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroDescription}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.contactContainer}>
        <div className={styles.contactContent}>
          
          {/* Contact Form */}
          <div className={styles.formSection}>
            <div className={styles.formHeader}>
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? styles.errorInput : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? styles.errorInput : ''}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? styles.errorInput : ''}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className={styles.selectInput}
                  >
                    {inquiryTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? styles.errorInput : ''}
                  placeholder="Enter the subject of your message"
                />
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? styles.errorInput : ''}
                  placeholder="Enter your message here..."
                  rows="6"
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information - Restructured */}
          <div className={styles.infoSection}>
            {/* Quick Contact Cards */}
            <div className={styles.quickContactGrid}>
              <div className={styles.quickContactCard}>
                <div className={styles.quickContactIcon}>
                  <i className="fas fa-phone"></i>
                </div>
                <div className={styles.quickContactContent}>
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567</p>
                  <span>Mon-Fri 9AM-6PM</span>
                </div>
              </div>

              <div className={styles.quickContactCard}>
                <div className={styles.quickContactIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.quickContactContent}>
                  <h3>Email Us</h3>
                  <p>support@hbinstitution.com</p>
                  <span>24/7 Response</span>
                </div>
              </div>
            </div>

            {/* Institution Overview */}
            <div className={styles.institutionOverview}>
              <div className={styles.overviewHeader}>
                <div className={styles.institutionLogo}>
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h3>HB Institution</h3>
                  <p>Premier Islamic Education Platform</p>
                </div>
              </div>
              
              <div className={styles.overviewStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>10K+</span>
                  <span className={styles.statLabel}>Students</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Courses</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>Countries</span>
                </div>
              </div>

              <div className={styles.overviewMission}>
                <h4>Our Mission</h4>
                <p>Making high-quality Islamic and academic education freely accessible to every soul, regardless of background or location.</p>
              </div>
            </div>

            {/* Social & Support */}
            <div className={styles.socialSupportSection}>
              <div className={styles.socialPart}>
                <h4>Connect With Us</h4>
                <div className={styles.socialLinks}>
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      className={styles.socialLink}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>

              <div className={styles.supportPart}>
                <h4>Support Hours</h4>
                <div className={styles.supportHours}>
                  <div className={styles.hourItem}>
                    <i className="fas fa-clock"></i>
                    <span>Mon-Fri: 9AM-6PM</span>
                  </div>
                  <div className={styles.hourItem}>
                    <i className="fas fa-calendar"></i>
                    <span>Sat: 10AM-4PM</span>
                  </div>
                  <div className={styles.hourItem}>
                    <i className="fas fa-moon"></i>
                    <span>24/7 Emergency Support</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;