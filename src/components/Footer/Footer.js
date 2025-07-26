import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* About Section */}
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>
              <img src="/images/logo-black.webp" alt="HB Institution" className={styles.logo} />
            </div>
            <p className={styles.footerDescription}>
              Making high-quality Islamic and academic education freely accessible to every soul worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerList}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Contact</h4>
            <div className={styles.contactInfo}>
              <p>
                <i className="fas fa-envelope"></i>
                <a href="mailto:support@hbinstitution.com">support@hbinstitution.com</a>
              </p>
              <p>
                <i className="fas fa-globe"></i>
                <a href="https://hbinstitution.com" target="_blank" rel="noopener noreferrer">
                  hbinstitution.com
                </a>
              </p>
              <p>
                <i className="fas fa-clock"></i>
                24/7 Online Support
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com/hbinstitution" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/hbinstitution" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/hbinstitution" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/company/hbinstitution" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://youtube.com/hbinstitution" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://telegram.me/hbinstitution" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <i className="fab fa-telegram-plane"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} HB Institution. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link to="/terms-privacy">Privacy Policy</Link>
            <Link to="/terms-privacy">Terms of Use</Link>
            <Link to="/terms-privacy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;