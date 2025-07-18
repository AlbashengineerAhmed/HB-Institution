import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './DashboardOverview.module.css';
import StatsCard from '../StatsCard/StatsCard';
import ActivityChart from '../ActivityChart/ActivityChart';
import { fetchCourses } from '../../../store/slices/courseSlice';
import { fetchInstructors } from '../../../store/slices/instructorManagementSlice';
import { fetchNews } from '../../../store/slices/newsSlice';

const DashboardOverview = () => {
  const dispatch = useDispatch();

  // Get data from Redux store
  const { courses, isLoading: coursesLoading } = useSelector((state) => state.courses);
  const { instructors, isLoading: instructorsLoading } = useSelector((state) => state.instructorManagement);
  const { news, isLoading: newsLoading } = useSelector((state) => state.news);
  const { groups } = useSelector((state) => state.groups);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchInstructors());
    dispatch(fetchNews());
  }, [dispatch]);

  // Helper function to calculate time ago
  const getTimeAgo = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  }, []);

  // Helper function to parse time ago for sorting
  const parseTimeAgo = useCallback((timeString) => {
    const now = new Date();
    const match = timeString.match(/(\d+)\s+(minutes?|hours?|days?)\s+ago/);
    if (!match) return now;

    const value = parseInt(match[1]);
    const unit = match[2];

    if (unit.startsWith('minute')) {
      return new Date(now - value * 60 * 1000);
    } else if (unit.startsWith('hour')) {
      return new Date(now - value * 60 * 60 * 1000);
    } else if (unit.startsWith('day')) {
      return new Date(now - value * 24 * 60 * 60 * 1000);
    }
    return now;
  }, []);

  // Calculate dynamic stats from real data
  const statsData = useMemo(() => {
    // Calculate active instructors (confirmed and not blocked)
    const activeInstructors = instructors.filter(instructor => 
      instructor.confirmed && !instructor.isBlocked
    ).length;

    // Calculate pending instructors (not confirmed)
    const pendingInstructors = instructors.filter(instructor => 
      !instructor.confirmed
    ).length;

    // Calculate blocked instructors
    const blockedInstructors = instructors.filter(instructor => 
      instructor.isBlocked
    ).length;

    // Calculate recent news (last 30 days)
    const recentNews = news.filter(newsItem => {
      const newsDate = new Date(newsItem.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return newsDate >= thirtyDaysAgo;
    }).length;

    return [
      {
        title: 'Total Courses',
        value: courses.length.toString(),
        change: courses.length > 0 ? '+' + Math.round((courses.length / 10) * 100) / 100 + '%' : '0%',
        changeType: 'positive',
        icon: '📚',
        subtitle: 'Published courses'
      },
      {
        title: 'Active Instructors',
        value: activeInstructors.toString(),
        change: pendingInstructors > 0 ? `+${pendingInstructors} pending` : 'All approved',
        changeType: pendingInstructors > 0 ? 'warning' : 'positive',
        icon: '👨‍🏫',
        subtitle: `${blockedInstructors} blocked`
      },
      {
        title: 'Total Groups',
        value: groups.length.toString(),
        change: groups.length > 0 ? 'Active' : 'No groups',
        changeType: groups.length > 0 ? 'positive' : 'neutral',
        icon: '👥',
        subtitle: 'Learning groups'
      },
      {
        title: 'Recent News',
        value: recentNews.toString(),
        change: `${news.length} total`,
        changeType: recentNews > 0 ? 'positive' : 'neutral',
        icon: '📰',
        subtitle: 'Last 30 days'
      }
    ];
  }, [courses, instructors, groups, news]);

  // Generate recent activities from real data
  const recentActivities = useMemo(() => {
    const activities = [];

    // Add recent courses
    const recentCourses = courses
      .filter(course => course.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 2);

    recentCourses.forEach((course, index) => {
      const timeAgo = getTimeAgo(course.createdAt);
      activities.push({
        id: `course-${course._id || index}`,
        type: 'course',
        message: `New course "${course.title}" was created`,
        time: timeAgo,
        status: 'approved'
      });
    });

    // Add recent instructors
    const recentInstructors = instructors
      .filter(instructor => instructor.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 2);

    recentInstructors.forEach((instructor, index) => {
      const timeAgo = getTimeAgo(instructor.createdAt);
      const name = `${instructor.firstName || ''} ${instructor.lastName || ''}`.trim() || instructor.email;
      activities.push({
        id: `instructor-${instructor._id || index}`,
        type: 'instructor',
        message: `Instructor ${name} registered`,
        time: timeAgo,
        status: instructor.confirmed ? 'approved' : 'pending'
      });
    });

    // Add recent news
    const recentNewsItems = news
      .filter(newsItem => newsItem.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 2);

    recentNewsItems.forEach((newsItem, index) => {
      const timeAgo = getTimeAgo(newsItem.createdAt);
      activities.push({
        id: `news-${newsItem._id || index}`,
        type: 'news',
        message: `News article "${newsItem.title}" was published`,
        time: timeAgo,
        status: 'published'
      });
    });

    // Sort all activities by most recent and limit to 5
    return activities
      .sort((a, b) => {
        // Convert time strings back to dates for proper sorting
        const timeA = parseTimeAgo(a.time);
        const timeB = parseTimeAgo(b.time);
        return timeB - timeA;
      })
      .slice(0, 5);
  }, [courses, instructors, news, getTimeAgo, parseTimeAgo]);

  // Show loading state
  if (coursesLoading || instructorsLoading || newsLoading) {
    return (
      <div className={styles.dashboardOverview}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

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
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    {activity.type === 'course' && '📚'}
                    {activity.type === 'instructor' && '👨‍🏫'}
                    {activity.type === 'news' && '📰'}
                    {activity.type === 'group' && '👥'}
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityMessage}>{activity.message}</p>
                    <span className={styles.activityTime}>{activity.time}</span>
                  </div>
                  <span className={`${styles.activityStatus} ${styles[activity.status]}`}>
                    {activity.status}
                  </span>
                </div>
              ))
            ) : (
              <div className={styles.noActivities}>
                <p>No recent activities found</p>
                <span>Activities will appear here as you manage courses, instructors, and news</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
        <div className={styles.quickActionsGrid}>
          <button 
            className={styles.quickActionBtn}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToSection', { detail: 'courses' }))}
          >
            <span className={styles.quickActionIcon}>➕</span>
            <span>Manage Courses</span>
          </button>
          <button 
            className={styles.quickActionBtn}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToSection', { detail: 'instructors' }))}
          >
            <span className={styles.quickActionIcon}>👤</span>
            <span>Manage Instructors</span>
          </button>
          <button 
            className={styles.quickActionBtn}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToSection', { detail: 'news' }))}
          >
            <span className={styles.quickActionIcon}>📰</span>
            <span>Manage News</span>
          </button>
          <button 
            className={styles.quickActionBtn}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToSection', { detail: 'groups' }))}
          >
            <span className={styles.quickActionIcon}>👥</span>
            <span>Manage Groups</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;