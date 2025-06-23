import React, { useState } from 'react';
import './Contact.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show loading state
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Sending your message...'
    });
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Here you would typically send the form data to a server
      console.log('Form submitted:', formData);
      
      // Show success state
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1500); // Simulate network delay
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2 className="section-title">Get in Touch</h2>
            <p className="contact-description">
              Have questions about our courses or need more information? 
              Fill out the form and our team will get back to you as soon as possible.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>Our Location</h4>
                  <p>123 Education Street, Learning City, 10001</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4>Email Us</h4>
                  <p>info@educationplatform.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              {formStatus.submitted && (
                <div className={`form-status ${formStatus.success ? 'success' : 'sending'}`}>
                  <div className="status-icon">
                    {formStatus.success ? (
                      <i className="fas fa-check-circle"></i>
                    ) : (
                      <i className="fas fa-spinner fa-spin"></i>
                    )}
                  </div>
                  <div className="status-message">{formStatus.message}</div>
                </div>
              )}
              
              <div className="form-group" data-label="Your Name">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-label-input"
                  placeholder="Enter your full name"
                />
                <div className="input-highlight"></div>
              </div>
              
              <div className="form-group" data-label="Your Email">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-label-input"
                  placeholder="Enter your email address"
                />
                <div className="input-highlight"></div>
              </div>
              
              <div className="form-group" data-label="Subject">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-label-input"
                  placeholder="What is your message about?"
                />
                <div className="input-highlight"></div>
              </div>
              
              <div className="form-group" data-label="Your Message">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-label-input"
                  placeholder="Type your message here..."
                ></textarea>
                <div className="input-highlight"></div>
              </div>
              
              <button 
                type="submit" 
                className={`submit-button ${formStatus.submitted ? 'disabled' : ''}`}
                disabled={formStatus.submitted}
              >
                {formStatus.submitted ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;