import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './AdminDashboard.module.css';
import DashboardOverview from '../../components/Admin/DashboardOverview/DashboardOverview';
import ManageCourses from '../../components/Admin/ManageCourses/ManageCourses';
import ManageCategories from '../../components/Admin/ManageCategories/ManageCategories';
import ManageUnits from '../../components/Admin/ManageUnits/ManageUnits';
import ManageLessons from '../../components/Admin/ManageLessons/ManageLessons';
import ManageInstructors from '../../components/Admin/ManageInstructors/ManageInstructors';
import ManageStudents from '../../components/Admin/ManageStudents/ManageStudents';
import ManageNews from '../../components/Admin/ManageNews/ManageNews';
import ManageGroups from '../../components/Admin/ManageGroups/ManageGroups';
import ManageContactMessages from '../../components/Admin/ManageContactMessages/ManageContactMessages';
import ManageNotes from '../../components/Admin/ManageNotes/ManageNotes';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user data from auth state (same as other dashboards)
  const { user } = useSelector((state) => state.auth);

  // Admin data with fallback
  const adminData = user ? {
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Admin',
    email: user.email || 'admin@hbi.edu',
    firstName: user.firstName || 'Admin',
    lastName: user.lastName || '',
    role: user.role,
  } : {
    name: 'Admin User',
    email: 'admin@hbi.edu',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  };

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '🏠' },
    { id: 'courses', label: 'Manage Courses', icon: '📚' },
    { id: 'groups', label: 'Manage Groups', icon: '👥' },
    { id: 'units', label: 'Manage Units', icon: '📝' },
    { id: 'lessons', label: 'Manage Lessons', icon: '📖' },
    { id: 'categories', label: 'Manage Categories', icon: '📂' },
    { id: 'instructors', label: 'Manage Instructors', icon: '👨‍🏫' },
    { id: 'students', label: 'Manage Students', icon: '👨‍🎓' },
    { id: 'news', label: 'Manage News', icon: '📰' },
    { id: 'notes', label: 'Manage Notes', icon: '📝' },
    { id: 'contact-messages', label: 'Contact Messages', icon: '📧' }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside or selecting item
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle section change and close mobile menu
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    closeMobileMenu();
  };

  // Listen for navigation events from dashboard overview
  useEffect(() => {
    const handleNavigation = (event) => {
      setActiveSection(event.detail);
      closeMobileMenu();
    };

    window.addEventListener('navigateToSection', handleNavigation);

    return () => {
      window.removeEventListener('navigateToSection', handleNavigation);
    };
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'courses':
        return <ManageCourses />;
      case 'groups':
        return <ManageGroups />;
      case 'units':
        return <ManageUnits />;
      case 'lessons':
        return <ManageLessons />;
      case 'categories':
        return <ManageCategories />;
      case 'instructors':
        return <ManageInstructors />;
      case 'students':
        return <ManageStudents />;
      case 'news':
        return <ManageNews />;
      case 'notes':
        return <ManageNotes />;
      case 'contact-messages':
        return <ManageContactMessages />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className={styles.adminDashboard}>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMobileMenu}></div>
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.adminInfo}>
            <div className={styles.adminAvatar}>
              {adminData.firstName?.charAt(0) || adminData.email?.charAt(0) || 'A'}
            </div>
            <div className={styles.adminDetails}>
              <h3 className={styles.adminName}>{adminData.name}</h3>
              <p className={styles.adminTitle}>Administrator</p>
              <p className={styles.adminEmail}>{adminData.email}</p>
            </div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.sidebarItem} ${
                activeSection === item.id ? styles.active : ''
              }`}
              onClick={() => handleSectionChange(item.id)}
            >
              <span className={styles.sidebarIcon}>{item.icon}</span>
              <span className={styles.sidebarLabel}>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.mobileMenuToggle}
              onClick={toggleMobileMenu}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
            <h1 className={styles.pageTitle}>
              {sidebarItems.find(item => item.id === activeSection)?.label}
            </h1>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.adminInfoHeader}>
              <span className={styles.adminNameHeader}>{adminData.name}</span>
              <div className={styles.adminAvatarHeader}>
                {adminData.firstName?.charAt(0) || adminData.email?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>
        
        <div className={styles.contentArea}>
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;