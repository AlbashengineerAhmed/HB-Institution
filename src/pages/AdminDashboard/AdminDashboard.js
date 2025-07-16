import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';
import DashboardOverview from '../../components/Admin/DashboardOverview/DashboardOverview';
import ManageCourses from '../../components/Admin/ManageCourses/ManageCourses';
import ManageCategories from '../../components/Admin/ManageCategories/ManageCategories';
import ManageUnits from '../../components/Admin/ManageUnits/ManageUnits';
import ManageInstructors from '../../components/Admin/ManageInstructors/ManageInstructors';
import ManageStudents from '../../components/Admin/ManageStudents/ManageStudents';
import ManageNews from '../../components/Admin/ManageNews/ManageNews';
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '🏠' },
    { id: 'courses', label: 'Manage Courses', icon: '📚' },
    { id: 'units', label: 'Manage Units', icon: '📝' },
    { id: 'categories', label: 'Manage Categories', icon: '📂' },
    { id: 'instructors', label: 'Manage Instructors', icon: '👨‍🏫' },
    { id: 'students', label: 'Manage Students', icon: '👨‍🎓' },
    { id: 'news', label: 'Manage News', icon: '📰' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'courses':
        return <ManageCourses />;
      case 'units':
        return <ManageUnits />;
      case 'categories':
        return <ManageCategories />;
      case 'instructors':
        return <ManageInstructors />;
      case 'students':
        return <ManageStudents />;
      case 'news':
        return <ManageNews />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className={styles.adminDashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Admin Panel</h2>
        </div>
        <nav className={styles.sidebarNav}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.sidebarItem} ${
                activeSection === item.id ? styles.active : ''
              }`}
              onClick={() => setActiveSection(item.id)}
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
          <h1 className={styles.pageTitle}>
            {sidebarItems.find(item => item.id === activeSection)?.label}
          </h1>
          <div className={styles.adminInfo}>
            <span className={styles.adminName}>Admin User</span>
            <div className={styles.adminAvatar}>A</div>
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