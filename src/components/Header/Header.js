import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDropdownToggle = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Mobile menu state management is handled by toggleMobileMenu

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/">
            <img src="/images/logo-black.webp" alt="HB Institution Logo" className="logo" />
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul className={`nav-list ${mobileMenuOpen ? 'show' : ''}`}>
            <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
            <li className={`nav-item dropdown ${activeDropdown === 'about' ? 'active' : ''}`}>
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => handleDropdownToggle('about')}
              >
                About <i className="fas fa-chevron-down dropdown-icon"></i>
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'about' ? 'show' : ''}`}>
                <li><Link to="/about" className="dropdown-item">Who we are</Link></li>
                <li><Link to="/about/history" className="dropdown-item">History</Link></li>
                <li><Link to="/about/mission" className="dropdown-item">Mission</Link></li>
                <li><Link to="/about/founder" className="dropdown-item">Founder</Link></li>
                <li><Link to="/about/chancellor" className="dropdown-item">Chancellor's Message</Link></li>
                <li><Link to="/about/libraries" className="dropdown-item">Libraries</Link></li>
                <li><Link to="/about/milestones" className="dropdown-item">Milestones</Link></li>
                <li><Link to="/about/career" className="dropdown-item">Career</Link></li>
                <li><Link to="/contact" className="dropdown-item">Contact</Link></li>
                <li><Link to="/about/disclaimer" className="dropdown-item">Disclaimer</Link></li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${activeDropdown === 'faculty' ? 'active' : ''}`}>
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => handleDropdownToggle('faculty')}
              >
                Faculty <i className="fas fa-chevron-down dropdown-icon"></i>
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'faculty' ? 'show' : ''}`}>
                <li><Link to="/faculty" className="dropdown-item">Faculty</Link></li>
                <li><Link to="/faculty/alumni" className="dropdown-item">Alumni</Link></li>
                <li><Link to="/faculty/representatives" className="dropdown-item">Representatives</Link></li>
                <li><Link to="/faculty/convocation" className="dropdown-item">Convocation</Link></li>
                <li><Link to="/faculty/iou-store" className="dropdown-item">IOU Store</Link></li>
                <li><Link to="/faculty/student-counselling" className="dropdown-item">Student Counselling</Link></li>
                <li><Link to="/faculty/student-discounts" className="dropdown-item">Student Discounts</Link></li>
                <li><Link to="/faculty/student-software" className="dropdown-item">Student Software</Link></li>
                <li><Link to="/faculty/statistics" className="dropdown-item">Statistics Till Spring 2022</Link></li>
                <li><Link to="/faculty/social-media" className="dropdown-item">Social Media</Link></li>
                <li><Link to="/faculty/corporate-relationship" className="dropdown-item">Corporate Relationship Program</Link></li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${activeDropdown === 'community' ? 'active' : ''}`}>
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => handleDropdownToggle('community')}
              >
                Community <i className="fas fa-chevron-down dropdown-icon"></i>
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'community' ? 'show' : ''}`}>
                <li><Link to="/community" className="dropdown-item">Student Life</Link></li>
                <li><Link to="/community/clubs" className="dropdown-item">Student Clubs</Link></li>
                <li><Link to="/community/events" className="dropdown-item">Events Calendar</Link></li>
                <li><Link to="/community/alumni" className="dropdown-item">Alumni Network</Link></li>
                <li><Link to="/community/outreach" className="dropdown-item">Community Outreach</Link></li>
                <li><Link to="/community/gallery" className="dropdown-item">Photo Gallery</Link></li>
                <li><Link to="/community/news" className="dropdown-item">News & Announcements</Link></li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${activeDropdown === 'why-hbi' ? 'active' : ''}`}>
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => handleDropdownToggle('why-hbi')}
              >
                Why HBI <i className="fas fa-chevron-down dropdown-icon"></i>
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'why-hbi' ? 'show' : ''}`}>
                <li><Link to="/why-hbi" className="dropdown-item">Why Study at HBI</Link></li>
                <li><Link to="/why-hbi/tuition-fees" className="dropdown-item">Tuition Fees</Link></li>
                <li><Link to="/why-hbi/accreditation" className="dropdown-item">Accreditation</Link></li>
                <li><Link to="/why-hbi/graduate-acceptance" className="dropdown-item">Graduate Acceptance</Link></li>
                <li><Link to="/why-hbi/exam-centers" className="dropdown-item">Exam Centers</Link></li>
                <li><Link to="/why-hbi/scholarships" className="dropdown-item">Scholarships</Link></li>
                <li><Link to="/why-hbi/testimonials" className="dropdown-item">Testimonials</Link></li>
                <li><Link to="/why-hbi/student-affairs" className="dropdown-item">Student Affairs Office</Link></li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${activeDropdown === 'programs' ? 'active' : ''}`}>
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => handleDropdownToggle('programs')}
              >
                Programs <i className="fas fa-chevron-down dropdown-icon"></i>
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'programs' ? 'show' : ''}`}>
                <li><Link to="/programs/bachelor" className="dropdown-item">Bachelor Degree</Link></li>
                <li><Link to="/programs/intensive-arabic" className="dropdown-item">Intensive Arabic Program</Link></li>
                <li><Link to="/programs/bridge" className="dropdown-item">Bridge to Master's</Link></li>
                <li><Link to="/programs/master" className="dropdown-item">Master Degree</Link></li>
                <li><Link to="/programs/master-research" className="dropdown-item">Master Degree - Research</Link></li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${activeDropdown === 'publications' ? 'active' : ''}`}>
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => handleDropdownToggle('publications')}
              >
                Applications <i className="fas fa-chevron-down dropdown-icon"></i>
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'publications' ? 'show' : ''}`}>
                <li><Link to="/publications/about" className="dropdown-item">About</Link></li>
                <li><Link to="/publications/iou-book" className="dropdown-item">IOU Book Publication</Link></li>
                <li><Link to="/publications/booklets" className="dropdown-item">Booklets</Link></li>
                <li><Link to="/publications/prospectus" className="dropdown-item">Prospectus</Link></li>
                <li><Link to="/publications/insights" className="dropdown-item">Insights Magazine</Link></li>
                <li><Link to="/publications/journals" className="dropdown-item">Journals</Link></li>
                <li><Link to="/publications/news" className="dropdown-item">News Portal</Link></li>
                <li><Link to="/publications/conferences" className="dropdown-item">Conferences</Link></li>
              </ul>
            </li>
            <li className="nav-item"><Link to="/contact" className="nav-link">Contact us</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <Link to="/login" className="login-btn">Log in</Link>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        
      </div>
    </header>
  );
};

export default Header;