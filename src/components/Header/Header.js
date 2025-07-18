import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { getDashboardLink, getRoleDisplayName } from '../../utils/roleUtils';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  // Get dashboard link based on user role
  const dashboardLink = getDashboardLink(user?.role);
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  // Refs for timeout management
  const dropdownTimeoutRef = useRef(null);
  const userDropdownTimeoutRef = useRef(null);

  const handleDropdownToggle = (dropdownName) => {
    // Clear any existing timeout when clicking
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    
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
    // Clear any existing timeout when clicking
    if (userDropdownTimeoutRef.current) {
      clearTimeout(userDropdownTimeoutRef.current);
      userDropdownTimeoutRef.current = null;
    }
    
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Close dropdowns when clicking outside
  const handleOutsideClick = () => {
    setActiveDropdown(null);
    setUserDropdownOpen(false);
  };

  // Close dropdown when a link is clicked
  const handleLinkClick = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  // Handle dropdown mouse leave with delay
  const handleDropdownMouseLeave = () => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    
    // Set a new timeout to close the dropdown after 300ms
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  // Handle dropdown mouse enter to cancel closing
  const handleDropdownMouseEnter = () => {
    // Clear the timeout if mouse re-enters
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  // Handle user dropdown mouse leave with delay
  const handleUserDropdownMouseLeave = () => {
    // Clear any existing timeout
    if (userDropdownTimeoutRef.current) {
      clearTimeout(userDropdownTimeoutRef.current);
    }
    
    // Set a new timeout to close the dropdown after 300ms
    userDropdownTimeoutRef.current = setTimeout(() => {
      setUserDropdownOpen(false);
    }, 300);
  };

  // Handle user dropdown mouse enter to cancel closing
  const handleUserDropdownMouseEnter = () => {
    // Clear the timeout if mouse re-enters
    if (userDropdownTimeoutRef.current) {
      clearTimeout(userDropdownTimeoutRef.current);
      userDropdownTimeoutRef.current = null;
    }
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
            <li 
              className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'about' ? styles.active : ''}`}
              onMouseLeave={handleDropdownMouseLeave}
              onMouseEnter={handleDropdownMouseEnter}
            >
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('about')}
              >
                About <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'about' ? styles.show : ''}`}>
                <li><Link to="/about" className={styles.dropdownItem} onClick={handleLinkClick}>Who we are</Link></li>
                <li><Link to="/about/history" className={styles.dropdownItem} onClick={handleLinkClick}>History</Link></li>
                <li><Link to="/about/mission" className={styles.dropdownItem} onClick={handleLinkClick}>Mission</Link></li>
                <li><Link to="/about/founder" className={styles.dropdownItem} onClick={handleLinkClick}>Founder</Link></li>
                <li><Link to="/about/chancellor" className={styles.dropdownItem} onClick={handleLinkClick}>Chancellor's Message</Link></li>
                <li><Link to="/about/libraries" className={styles.dropdownItem} onClick={handleLinkClick}>Libraries</Link></li>
                <li><Link to="/about/milestones" className={styles.dropdownItem} onClick={handleLinkClick}>Milestones</Link></li>
                <li><Link to="/about/career" className={styles.dropdownItem} onClick={handleLinkClick}>Career</Link></li>
                <li><Link to="/contact" className={styles.dropdownItem} onClick={handleLinkClick}>Contact</Link></li>
                <li><Link to="/about/disclaimer" className={styles.dropdownItem} onClick={handleLinkClick}>Disclaimer</Link></li>
              </ul>
            </li>
            <li 
              className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'faculty' ? styles.active : ''}`}
              onMouseLeave={handleDropdownMouseLeave}
              onMouseEnter={handleDropdownMouseEnter}
            >
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('faculty')}
              >
                Faculty <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'faculty' ? styles.show : ''}`}>
                <li><Link to="/faculty" className={styles.dropdownItem} onClick={handleLinkClick}>Faculty</Link></li>
                <li><Link to="/faculty/alumni" className={styles.dropdownItem} onClick={handleLinkClick}>Alumni</Link></li>
                <li><Link to="/faculty/representatives" className={styles.dropdownItem} onClick={handleLinkClick}>Representatives</Link></li>
                <li><Link to="/faculty/convocation" className={styles.dropdownItem} onClick={handleLinkClick}>Convocation</Link></li>
                <li><Link to="/faculty/iou-store" className={styles.dropdownItem} onClick={handleLinkClick}>IOU Store</Link></li>
                <li><Link to="/faculty/student-counselling" className={styles.dropdownItem} onClick={handleLinkClick}>Student Counselling</Link></li>
                <li><Link to="/faculty/student-discounts" className={styles.dropdownItem} onClick={handleLinkClick}>Student Discounts</Link></li>
                <li><Link to="/faculty/student-software" className={styles.dropdownItem} onClick={handleLinkClick}>Student Software</Link></li>
                <li><Link to="/faculty/statistics" className={styles.dropdownItem} onClick={handleLinkClick}>Statistics Till Spring 2022</Link></li>
                <li><Link to="/faculty/social-media" className={styles.dropdownItem} onClick={handleLinkClick}>Social Media</Link></li>
                <li><Link to="/faculty/corporate-relationship" className={styles.dropdownItem} onClick={handleLinkClick}>Corporate Relationship Program</Link></li>
              </ul>
            </li>
            <li 
              className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'community' ? styles.active : ''}`}
              onMouseLeave={handleDropdownMouseLeave}
              onMouseEnter={handleDropdownMouseEnter}
            >
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('community')}
              >
                Community <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'community' ? styles.show : ''}`}>
                <li><Link to="/community" className={styles.dropdownItem} onClick={handleLinkClick}>Student Life</Link></li>
                <li><Link to="/community/clubs" className={styles.dropdownItem} onClick={handleLinkClick}>Student Clubs</Link></li>
                <li><Link to="/community/events" className={styles.dropdownItem} onClick={handleLinkClick}>Events Calendar</Link></li>
                <li><Link to="/community/alumni" className={styles.dropdownItem} onClick={handleLinkClick}>Alumni Network</Link></li>
                <li><Link to="/community/outreach" className={styles.dropdownItem} onClick={handleLinkClick}>Community Outreach</Link></li>
                <li><Link to="/community/gallery" className={styles.dropdownItem} onClick={handleLinkClick}>Photo Gallery</Link></li>
                <li><Link to="/community/news" className={styles.dropdownItem} onClick={handleLinkClick}>News & Announcements</Link></li>
              </ul>
            </li>
            <li 
              className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'why-hbi' ? styles.active : ''}`}
              onMouseLeave={handleDropdownMouseLeave}
              onMouseEnter={handleDropdownMouseEnter}
            >
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('why-hbi')}
              >
                Why HBI <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'why-hbi' ? styles.show : ''}`}>
                <li><Link to="/why-hbi" className={styles.dropdownItem} onClick={handleLinkClick}>Why Study at HBI</Link></li>
                <li><Link to="/why-hbi/tuition-fees" className={styles.dropdownItem} onClick={handleLinkClick}>Tuition Fees</Link></li>
                <li><Link to="/why-hbi/accreditation" className={styles.dropdownItem} onClick={handleLinkClick}>Accreditation</Link></li>
                <li><Link to="/why-hbi/graduate-acceptance" className={styles.dropdownItem} onClick={handleLinkClick}>Graduate Acceptance</Link></li>
                <li><Link to="/why-hbi/exam-centers" className={styles.dropdownItem} onClick={handleLinkClick}>Exam Centers</Link></li>
                <li><Link to="/why-hbi/scholarships" className={styles.dropdownItem} onClick={handleLinkClick}>Scholarships</Link></li>
                <li><Link to="/why-hbi/testimonials" className={styles.dropdownItem} onClick={handleLinkClick}>Testimonials</Link></li>
                <li><Link to="/why-hbi/student-affairs" className={styles.dropdownItem} onClick={handleLinkClick}>Student Affairs Office</Link></li>
              </ul>
            </li>
            <li 
              className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'programs' ? styles.active : ''}`}
              onMouseLeave={handleDropdownMouseLeave}
              onMouseEnter={handleDropdownMouseEnter}
            >
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('programs')}
              >
                Programs <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'programs' ? styles.show : ''}`}>
                <li><Link to="/programs/bachelor" className={styles.dropdownItem} onClick={handleLinkClick}>Bachelor Degree</Link></li>
                <li><Link to="/programs/intensive-arabic" className={styles.dropdownItem} onClick={handleLinkClick}>Intensive Arabic Program</Link></li>
                <li><Link to="/programs/bridge" className={styles.dropdownItem} onClick={handleLinkClick}>Bridge to Master's</Link></li>
                <li><Link to="/programs/master" className={styles.dropdownItem} onClick={handleLinkClick}>Master Degree</Link></li>
                <li><Link to="/programs/master-research" className={styles.dropdownItem} onClick={handleLinkClick}>Master Degree - Research</Link></li>
              </ul>
            </li>
            <li 
              className={`${styles.navItem} ${styles.dropdown} ${activeDropdown === 'publications' ? styles.active : ''}`}
              onMouseLeave={handleDropdownMouseLeave}
              onMouseEnter={handleDropdownMouseEnter}
            >
              <div 
                className={`${styles.navLink} ${styles.dropdownToggle}`} 
                onClick={() => handleDropdownToggle('publications')}
              >
                Applications <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i>
              </div>
              <ul className={`${styles.dropdownMenu} ${activeDropdown === 'publications' ? styles.show : ''}`}>
                <li><Link to="/publications/about" className={styles.dropdownItem} onClick={handleLinkClick}>About</Link></li>
                <li><Link to="/publications/iou-book" className={styles.dropdownItem} onClick={handleLinkClick}>IOU Book Publication</Link></li>
                <li><Link to="/publications/booklets" className={styles.dropdownItem} onClick={handleLinkClick}>Booklets</Link></li>
                <li><Link to="/publications/prospectus" className={styles.dropdownItem} onClick={handleLinkClick}>Prospectus</Link></li>
                <li><Link to="/publications/insights" className={styles.dropdownItem} onClick={handleLinkClick}>Insights Magazine</Link></li>
                <li><Link to="/publications/journals" className={styles.dropdownItem} onClick={handleLinkClick}>Journals</Link></li>
                <li><Link to="/publications/news" className={styles.dropdownItem} onClick={handleLinkClick}>News Portal</Link></li>
                <li><Link to="/publications/conferences" className={styles.dropdownItem} onClick={handleLinkClick}>Conferences</Link></li>
              </ul>
            </li>
            <li className={styles.navItem}><Link to="/contact" className={styles.navLink}>Contact us</Link></li>
          </ul>
        </nav>
        
        <div className={styles.headerActions}>
          {isAuthenticated ? (
            <div 
              className={styles.userMenu} 
              onMouseLeave={handleUserDropdownMouseLeave}
              onMouseEnter={handleUserDropdownMouseEnter}
            >
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
                    <span className={styles.userRole}>{getRoleDisplayName(user?.role)}</span>
                  </div>
                </div>
                <div className={styles.userActions}>
                  {/* Dashboard Link - Role Based */}
                  {dashboardLink && (
                    <Link 
                      to={dashboardLink.path} 
                      className={styles.userAction} 
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <i className={dashboardLink.icon}></i>
                      {dashboardLink.label}
                    </Link>
                  )}
                  
                  <Link to="/profile" className={styles.userAction} onClick={() => setUserDropdownOpen(false)}>
                    <i className="fas fa-user"></i>
                    Profile
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