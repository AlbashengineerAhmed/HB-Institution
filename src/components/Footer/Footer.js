import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <img src="/images/logo-black.webp" alt="HB Institution Logo" className={styles.logo} />
            <p className={styles.footerDescription}>
              HB Institution is dedicated to providing high-quality education and empowering students to achieve their full potential through innovative learning experiences.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>FB</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>TW</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>IG</a>
            </div>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.footerLinksColumn}>
              <h3 className={styles.footerHeading}>Company</h3>
              <ul className={styles.footerList}>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerLinksColumn}>
              <h3 className={styles.footerHeading}>Courses</h3>
              <ul className={styles.footerList}>
                <li><Link to="/courses/web-development">Web Development</Link></li>
                <li><Link to="/courses/design">Design</Link></li>
                <li><Link to="/courses/marketing">Marketing</Link></li>
                <li><Link to="/courses/business">Business</Link></li>
                <li><Link to="/courses/all">All Courses</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerLinksColumn}>
              <h3 className={styles.footerHeading}>Subscribe to Newsletter</h3>
              <p className={styles.newsletterText}>Stay updated with our latest news and offers</p>
              <form className={styles.newsletterForm}>
                <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
                <button type="submit" className={styles.newsletterButton}>Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} HB Institution. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;