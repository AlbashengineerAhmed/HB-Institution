import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './DevNavigation.module.css';

const DevNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { path: '/profile', label: '👤 User Profile', description: 'Profile with role switcher' },
    { path: '/student-dashboard', label: '🎓 Student Dashboard', description: 'Student learning interface' },
    { path: '/instructor-dashboard', label: '👨‍🏫 Instructor Dashboard', description: 'Course management & students' },
    { path: '/admin', label: '👑 Admin Dashboard', description: 'System administration' },
    { path: '/courses', label: '📚 Browse Courses', description: 'Public course catalog' },
  ];

  return (
    <div className={styles.devNavigation}>
      <button 
        className={styles.toggleBtn}
        onClick={() => setIsOpen(!isOpen)}
        title="Developer Navigation"
      >
        🚀 Quick Nav
      </button>
      
      {isOpen && (
        <div className={styles.navMenu}>
          <div className={styles.navHeader}>
            <h3 className={styles.navTitle}>🔗 Quick Navigation</h3>
            <button 
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <div className={styles.navLinks}>
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={styles.navLink}
                onClick={() => setIsOpen(false)}
              >
                <div className={styles.linkContent}>
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkDescription}>{link.description}</span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className={styles.navFooter}>
            <p className={styles.footerText}>
              💡 <strong>Tip:</strong> Use the Profile page role switcher to test different user types!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevNavigation;