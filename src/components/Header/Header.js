import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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

  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
    navigate('/');
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Close dropdowns when clicking outside
  const handleOutsideClick = () => {
    setActiveDropdown(null);
    setUserDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src="/images/logo-black.webp" alt="HB Institution Logo" className={styles.logo} />
          </Link>
        </div>
        
        <nav className={styles.mainNav}>
          <ul className={`${styles.navList} ${mobileMenuOpen ? styles.show : ''}`}>
            <li className={styles.navItem}><Link to="/" className={`${styles.navLink} ${styles.active}`}>Home</Link></li>
            <li className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'about' ? styles.active : ''}`}>
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('about')}
              >
                About <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'about' ? styles.show : ''}`}>
                <li><Link to="/about" className={styles.dropdownItem}>Who we are</Link></li>
                <li><Link to="/about/history" className={styles.dropdownItem}>History</Link></li>
                <li><Link to="/about/mission" className={styles.dropdownItem}>Mission</Link></li>
                <li><Link to="/about/founder" className={styles.dropdownItem}>Founder</Link></li>
                <li><Link to="/about/chancellor" className={styles.dropdownItem}>Chancellor's Message</Link></li>
                <li><Link to="/about/libraries" className={styles.dropdownItem}>Libraries</Link></li>
                <li><Link to="/about/milestones" className={styles.dropdownItem}>Milestones</Link></li>
                <li><Link to="/about/career" className={styles.dropdownItem}>Career</Link></li>
                <li><Link to="/contact" className={styles.dropdownItem}>Contact</Link></li>
                <li><Link to="/about/disclaimer" className={styles.dropdownItem}>Disclaimer</Link></li>
              </ul>
            </li>
            <li className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'faculty' ? styles.active : ''}`}>
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('faculty')}
              >
                Faculty <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'faculty' ? styles.show : ''}`}>
                <li><Link to="/faculty" className={styles.dropdownItem}>Faculty</Link></li>
                <li><Link to="/faculty/alumni" className={styles.dropdownItem}>Alumni</Link></li>
                <li><Link to="/faculty/representatives" className={styles.dropdownItem}>Representatives</Link></li>
                <li><Link to="/faculty/convocation" className={styles.dropdownItem}>Convocation</Link></li>
                <li><Link to="/faculty/iou-store" className={styles.dropdownItem}>IOU Store</Link></li>
                <li><Link to="/faculty/student-counselling" className={styles.dropdownItem}>Student Counselling</Link></li>
                <li><Link to="/faculty/student-discounts" className={styles.dropdownItem}>Student Discounts</Link></li>
                <li><Link to="/faculty/student-software" className={styles.dropdownItem}>Student Software</Link></li>
                <li><Link to="/faculty/statistics" className={styles.dropdownItem}>Statistics Till Spring 2022</Link></li>
                <li><Link to="/faculty/social-media" className={styles.dropdownItem}>Social Media</Link></li>
                <li><Link to="/faculty/corporate-relationship" className={styles.dropdownItem}>Corporate Relationship Program</Link></li>
              </ul>
            </li>
            <li className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'community' ? styles.active : ''}`}>
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('community')}
              >
                Community <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'community' ? styles.show : ''}`}>
                <li><Link to="/community" className={styles.dropdownItem}>Student Life</Link></li>
                <li><Link to="/community/clubs" className={styles.dropdownItem}>Student Clubs</Link></li>
                <li><Link to="/community/events" className={styles.dropdownItem}>Events Calendar</Link></li>
                <li><Link to="/community/alumni" className={styles.dropdownItem}>Alumni Network</Link></li>
                <li><Link to="/community/outreach" className={styles.dropdownItem}>Community Outreach</Link></li>
                <li><Link to="/community/gallery" className={styles.dropdownItem}>Photo Gallery</Link></li>
                <li><Link to="/community/news" className={styles.dropdownItem}>News & Announcements</Link></li>
              </ul>
            </li>
            <li className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'why-hbi' ? styles.active : ''}`}>
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('why-hbi')}
              >
                Why HBI <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'why-hbi' ? styles.show : ''}`}>
                <li><Link to="/why-hbi" className={styles.dropdownItem}>Why Study at HBI</Link></li>
                <li><Link to="/why-hbi/tuition-fees" className={styles.dropdownItem}>Tuition Fees</Link></li>
                <li><Link to="/why-hbi/accreditation" className={styles.dropdownItem}>Accreditation</Link></li>
                <li><Link to="/why-hbi/graduate-acceptance" className={styles.dropdownItem}>Graduate Acceptance</Link></li>
                <li><Link to="/why-hbi/exam-centers" className={styles.dropdownItem}>Exam Centers</Link></li>
                <li><Link to="/why-hbi/scholarships" className={styles.dropdownItem}>Scholarships</Link></li>
                <li><Link to="/why-hbi/testimonials" className={styles.dropdownItem}>Testimonials</Link></li>
                <li><Link to="/why-hbi/student-affairs" className={styles.dropdownItem}>Student Affairs Office</Link></li>
              </ul>
            </li>
            <li className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'programs' ? styles.active : ''}`}>
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('programs')}
              >
                Programs <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'programs' ? styles.show : ''}`}>
                <li><Link to="/programs/bachelor" className={styles.dropdownItem}>Bachelor Degree</Link></li>
                <li><Link to="/programs/intensive-arabic" className={styles.dropdownItem}>Intensive Arabic Program</Link></li>
                <li><Link to="/programs/bridge" className={styles.dropdownItem}>Bridge to Master's</Link></li>
                <li><Link to="/programs/master" className={styles.dropdownItem}>Master Degree</Link></li>
                <li><Link to="/programs/master-research" className={styles.dropdownItem}>Master Degree - Research</Link></li>
              </ul>
            </li>
            <li className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'publications' ? styles.active : ''}`}>
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('publications')}
              >
                Applications <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'publications' ? styles.show : ''}`}>
                <li><Link to="/publications/about" className={styles.dropdownItem}>About</Link></li>
                <li><Link to="/publications/iou-book" className={styles.dropdownItem}>IOU Book Publication</Link></li>
                <li><Link to="/publications/booklets" className={styles.dropdownItem}>Booklets</Link></li>
                <li><Link to="/publications/prospectus" className={styles.dropdownItem}>Prospectus</Link></li>
                <li><Link to="/publications/insights" className={styles.dropdownItem}>Insights Magazine</Link></li>
                <li><Link to="/publications/journals" className={styles.dropdownItem}>Journals</Link></li>
                <li><Link to="/publications/news" className={styles.dropdownItem}>News Portal</Link></li>
                <li><Link to="/publications/conferences" className={styles.dropdownItem}>Conferences</Link></li>
              </ul>
            </li>
            <li className={styles.navItem}><Link to="/contact" className={styles.navLink}>Contact us</Link></li>
          </ul>
        </nav>
        
        <div className={styles.headerActions}>
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <div className={styles.userProfile} onClick={toggleUserDropdown}>
                <div className={styles.userAvatar}>
                  {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <span className={styles.userName}>
                  {user?.firstName || 'User'}
                </span>
                <i className={`fas fa-chevron-down ${styles.userDropdownIcon} ${userDropdownOpen ? styles.open : ''}`}></i>
              </div>
              
              <div className={`${styles.userDropdown} ${userDropdownOpen ? styles.show : ''}`}>
                <div className={styles.userInfo}>
                  <div className={styles.userDetails}>
                    <h4>{user?.firstName} {user?.lastName}</h4>
                    <p>{user?.email}</p>
                    <span className={styles.userRole}>{user?.role || 'Student'}</span>
                  </div>
                </div>
                <div className={styles.userActions}>
                  <Link to="/profile" className={styles.userAction} onClick={() => setUserDropdownOpen(false)}>
                    <i className="fas fa-user"></i>
                    Profile
                  </Link>
                  <Link to="/courses" className={styles.userAction} onClick={() => setUserDropdownOpen(false)}>
                    <i className="fas fa-book"></i>
                    My Courses
                  </Link>
                  <Link to="/settings" className={styles.userAction} onClick={() => setUserDropdownOpen(false)}>
                    <i className="fas fa-cog"></i>
                    Settings
                  </Link>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginBtn}>Log in</Link>
              <Link to="/register" className={styles.registerBtn}>Sign up</Link>
            </div>
          )}
        </div>

        <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        
      </div>
    </header>
  );
};

export default Header;