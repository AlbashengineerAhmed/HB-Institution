import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ContactPage.module.css';

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

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Our Location',
      details: ['123 Education Street', 'Learning District', 'Knowledge City, KC 12345']
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone Numbers',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543']
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Addresses',
      details: ['info@hb-institution.com', 'support@hb-institution.com']
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed']
    }
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Contact form submitted:', formData);
      
      toast.success('Thank you for your message! We\'ll get back to you soon.');
      
      // Reset form
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
      toast.error('Failed to send message. Please try again.');
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

          {/* Contact Information */}
          <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <h2>Contact Information</h2>
              <p>Reach out to us through any of these channels.</p>
            </div>

            <div className={styles.contactInfoGrid}>
              {contactInfo.map((info, index) => (
                <div key={index} className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    <i className={info.icon}></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className={styles.socialSection}>
              <h3>Follow Us</h3>
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

            {/* Quick Response */}
            <div className={styles.responseInfo}>
              <div className={styles.responseCard}>
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Quick Response</h4>
                  <p>We typically respond within 2-4 hours during business hours.</p>
                </div>
              </div>
              <div className={styles.responseCard}>
                <i className="fas fa-headset"></i>
                <div>
                  <h4>24/7 Support</h4>
                  <p>For urgent matters, our support team is available around the clock.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <div className={styles.mapPlaceholder}>
            <i className="fas fa-map-marked-alt"></i>
            <h3>Find Us Here</h3>
            <p>Visit our campus to experience our learning environment firsthand.</p>
            <button className={styles.mapBtn}>
              <i className="fas fa-directions"></i>
              Get Directions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;