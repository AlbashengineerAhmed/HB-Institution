import React from 'react';
import styles from './DashboardOverview.module.css';
import StatsCard from '../StatsCard/StatsCard';
import ActivityChart from '../ActivityChart/ActivityChart';

const DashboardOverview = () => {
  const statsData = [
    {
      title: 'Total Courses',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: '📚'
    },
    {
      title: 'Total Instructors',
      value: '48',
      change: '+5%',
      changeType: 'positive',
      icon: '👨‍🏫'
    },
    {
      title: 'Total Students',
      value: '2,847',
      change: '+18%',
      changeType: 'positive',
      icon: '👨‍🎓'
    },
    {
      title: 'Contact Requests',
      value: '23',
      change: '-8%',
      changeType: 'negative',
      icon: '📧'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'course',
      message: 'New course "Advanced Islamic Studies" submitted for approval',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'instructor',
      message: 'Instructor Ahmed Hassan registered',
      time: '4 hours ago',
      status: 'new'
    },
    {
      id: 3,
      type: 'student',
      message: '15 new student enrollments today',
      time: '6 hours ago',
      status: 'info'
    },
    {
      id: 4,
      type: 'course',
      message: 'Course "Quran Recitation" approved and published',
      time: '1 day ago',
      status: 'approved'
    },
    {
      id: 5,
      type: 'contact',
      message: 'New contact request from Sarah Ahmed',
      time: '1 day ago',
      status: 'pending'
    }
  ];

  return (
    <div className={styles.dashboardOverview}>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Activities */}
      <div className={styles.chartsSection}>
        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Activity Overview</h3>
            <select className={styles.chartFilter}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
            </select>
          </div>
          <ActivityChart />
        </div>

        <div className={styles.activitiesContainer}>
          <div className={styles.activitiesHeader}>
            <h3 className={styles.activitiesTitle}>Recent Activities</h3>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  {activity.type === 'course' && '📚'}
                  {activity.type === 'instructor' && '👨‍🏫'}
                  {activity.type === 'student' && '👨‍🎓'}
                  {activity.type === 'contact' && '📧'}
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityMessage}>{activity.message}</p>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
                <span className={`${styles.activityStatus} ${styles[activity.status]}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
        <div className={styles.quickActionsGrid}>
          <button className={styles.quickActionBtn}>
            <span className={styles.quickActionIcon}>➕</span>
            <span>Add New Course</span>
          </button>
          <button className={styles.quickActionBtn}>
            <span className={styles.quickActionIcon}>👤</span>
            <span>Add Instructor</span>
          </button>
          <button className={styles.quickActionBtn}>
            <span className={styles.quickActionIcon}>📰</span>
            <span>Create News</span>
          </button>
          <button className={styles.quickActionBtn}>
            <span className={styles.quickActionIcon}>📊</span>
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;