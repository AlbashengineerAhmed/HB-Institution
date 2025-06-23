import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/images/logo-black.webp" alt="HB Institution Logo" className="logo" />
            <p className="footer-description">
              HB Institution is dedicated to providing high-quality education and empowering students to achieve their full potential through innovative learning experiences.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">FB</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">TW</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">IG</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3 className="footer-heading">Company</h3>
              <ul className="footer-list">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-heading">Courses</h3>
              <ul className="footer-list">
                <li><Link to="/courses/web-development">Web Development</Link></li>
                <li><Link to="/courses/design">Design</Link></li>
                <li><Link to="/courses/marketing">Marketing</Link></li>
                <li><Link to="/courses/business">Business</Link></li>
                <li><Link to="/courses/all">All Courses</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-heading">Subscribe to Newsletter</h3>
              <p className="newsletter-text">Stay updated with our latest news and offers</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" />
                <button type="submit" className="newsletter-button">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} HB Institution. All rights reserved.</p>
          <div className="footer-bottom-links">
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