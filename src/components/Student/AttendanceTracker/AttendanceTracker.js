import React, { useState, useEffect } from 'react';
import styles from './AttendanceTracker.module.css';

const AttendanceTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [attendanceData, setAttendanceData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [quizData, setQuizData] = useState([]);

  // Mock attendance data
  const mockAttendanceData = [
    {
      id: 1,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      sessionTitle: 'Introduction to Islamic Banking',
      date: '2024-01-15',
      time: '10:00 AM - 11:30 AM',
      status: 'present',
      duration: 90,
      sessionType: 'live',
      instructor: 'Dr. Sarah Ahmed'
    },
    {
      id: 2,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      sessionTitle: 'Sharia Compliance Fundamentals',
      date: '2024-01-17',
      time: '2:00 PM - 3:30 PM',
      status: 'present',
      duration: 90,
      sessionType: 'live',
      instructor: 'Dr. Sarah Ahmed'
    },
    {
      id: 3,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      sessionTitle: 'Risk Management in Islamic Finance',
      date: '2024-01-20',
      time: '10:00 AM - 11:30 AM',
      status: 'absent',
      duration: 0,
      sessionType: 'live',
      instructor: 'Dr. Sarah Ahmed'
    },
    {
      id: 4,
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      sessionTitle: 'Complex Financial Instruments',
      date: '2024-01-22',
      time: '3:00 PM - 4:30 PM',
      status: 'present',
      duration: 90,
      sessionType: 'live',
      instructor: 'Dr. Ahmed Hassan'
    }
  ];

  // Mock activities data
  const mockActivitiesData = [
    {
      id: 1,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      activityType: 'video_watched',
      activityTitle: 'Introduction to Sukuk',
      date: '2024-01-16',
      time: '09:30 AM',
      duration: 45,
      progress: 100,
      status: 'completed'
    },
    {
      id: 2,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      activityType: 'assignment_submitted',
      activityTitle: 'Islamic Banking Case Study',
      date: '2024-01-18',
      time: '11:45 AM',
      duration: 120,
      progress: 100,
      status: 'submitted'
    },
    {
      id: 3,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      activityType: 'reading_material',
      activityTitle: 'Sharia Principles in Modern Banking',
      date: '2024-01-19',
      time: '02:15 PM',
      duration: 30,
      progress: 75,
      status: 'in_progress'
    },
    {
      id: 4,
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      activityType: 'discussion_participated',
      activityTitle: 'Forum: Regulatory Challenges',
      date: '2024-01-21',
      time: '04:20 PM',
      duration: 25,
      progress: 100,
      status: 'participated'
    }
  ];

  // Mock quiz data
  const mockQuizData = [
    {
      id: 1,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      quizTitle: 'Module 1 Assessment',
      date: '2024-01-16',
      time: '03:00 PM',
      duration: 30,
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      status: 'completed',
      attempts: 1,
      maxAttempts: 2
    },
    {
      id: 2,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      quizTitle: 'Module 2 Assessment',
      date: '2024-01-19',
      time: '01:30 PM',
      duration: 45,
      score: 92,
      totalQuestions: 25,
      correctAnswers: 23,
      status: 'completed',
      attempts: 1,
      maxAttempts: 2
    },
    {
      id: 3,
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      quizTitle: 'Midterm Examination',
      date: '2024-01-23',
      time: '10:00 AM',
      duration: 0,
      score: 0,
      totalQuestions: 30,
      correctAnswers: 0,
      status: 'pending',
      attempts: 0,
      maxAttempts: 1
    }
  ];

  // Mock courses for filter
  const courses = [
    { id: 1, name: 'Islamic Finance Principles' },
    { id: 2, name: 'Advanced Islamic Banking' },
    { id: 3, name: 'Sharia Compliance in Business' }
  ];

  useEffect(() => {
    // Filter data based on selected course and date range
    const filterData = (data) => {
      let filtered = data;
      
      if (selectedCourse !== 'all') {
        filtered = filtered.filter(item => item.courseId === parseInt(selectedCourse));
      }
      
      // Add date range filtering logic here
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        default:
          filterDate.setFullYear(now.getFullYear() - 1);
      }
      
      filtered = filtered.filter(item => new Date(item.date) >= filterDate);
      
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    setAttendanceData(filterData(mockAttendanceData));
    setActivitiesData(filterData(mockActivitiesData));
    setQuizData(filterData(mockQuizData));
  }, [selectedCourse, dateRange]);

  const getAttendanceStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(item => item.status === 'present').length;
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent: total - present, attendanceRate };
  };

  const getActivityStats = () => {
    const total = activitiesData.length;
    const completed = activitiesData.filter(item => 
      item.status === 'completed' || item.status === 'submitted' || item.status === 'participated'
    ).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, pending: total - completed, completionRate };
  };

  const getQuizStats = () => {
    const completed = quizData.filter(item => item.status === 'completed');
    const averageScore = completed.length > 0 
      ? Math.round(completed.reduce((sum, quiz) => sum + quiz.score, 0) / completed.length)
      : 0;
    
    return {
      total: quizData.length,
      completed: completed.length,
      pending: quizData.filter(item => item.status === 'pending').length,
      averageScore
    };
  };

  const getStatusBadge = (status, type = 'attendance') => {
    const statusConfig = {
      attendance: {
        present: { class: styles.statusPresent, text: 'Present' },
        absent: { class: styles.statusAbsent, text: 'Absent' },
        late: { class: styles.statusLate, text: 'Late' }
      },
      activity: {
        completed: { class: styles.statusCompleted, text: 'Completed' },
        submitted: { class: styles.statusSubmitted, text: 'Submitted' },
        participated: { class: styles.statusParticipated, text: 'Participated' },
        in_progress: { class: styles.statusInProgress, text: 'In Progress' },
        pending: { class: styles.statusPending, text: 'Pending' }
      },
      quiz: {
        completed: { class: styles.statusCompleted, text: 'Completed' },
        pending: { class: styles.statusPending, text: 'Pending' },
        overdue: { class: styles.statusOverdue, text: 'Overdue' }
      }
    };

    const config = statusConfig[type][status] || { class: styles.statusDefault, text: status };
    return (
      <span className={`${styles.statusBadge} ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const getActivityIcon = (activityType) => {
    const icons = {
      video_watched: '🎥',
      assignment_submitted: '📝',
      reading_material: '📖',
      discussion_participated: '💬',
      quiz_completed: '📊',
      project_submitted: '🎯'
    };
    return icons[activityType] || '📋';
  };

  const attendanceStats = getAttendanceStats();
  const activityStats = getActivityStats();
  const quizStats = getQuizStats();

  return (
    <div className={styles.attendanceTracker}>
      {/* Header with Filters */}
      <div className={styles.trackerHeader}>
        <div className={styles.headerTitle}>
          <h2>📊 Attendance & Activities Tracker</h2>
          <p>Track your learning progress, attendance, and quiz performance</p>
        </div>
        
        <div className={styles.filters}>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statContent}>
            <h3>Attendance</h3>
            <div className={styles.statValue}>{attendanceStats.attendanceRate}%</div>
            <div className={styles.statDetails}>
              {attendanceStats.present}/{attendanceStats.total} sessions attended
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statContent}>
            <h3>Activities</h3>
            <div className={styles.statValue}>{activityStats.completionRate}%</div>
            <div className={styles.statDetails}>
              {activityStats.completed}/{activityStats.total} activities completed
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎯</div>
          <div className={styles.statContent}>
            <h3>Quiz Average</h3>
            <div className={styles.statValue}>{quizStats.averageScore}%</div>
            <div className={styles.statDetails}>
              {quizStats.completed}/{quizStats.total} quizzes completed
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for different tracking views */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>📅 Attendance</button>
          <button className={styles.tab}>🎯 Activities</button>
          <button className={styles.tab}>📊 Quizzes</button>
        </div>
      </div>

      {/* Attendance Records */}
      <div className={styles.recordsSection}>
        <h3 className={styles.sectionTitle}>Recent Attendance Records</h3>
        <div className={styles.recordsList}>
          {attendanceData.length > 0 ? (
            attendanceData.map(record => (
              <div key={record.id} className={styles.recordItem}>
                <div className={styles.recordHeader}>
                  <div className={styles.recordInfo}>
                    <h4 className={styles.recordTitle}>{record.sessionTitle}</h4>
                    <p className={styles.recordCourse}>{record.courseName}</p>
                  </div>
                  {getStatusBadge(record.status, 'attendance')}
                </div>
                
                <div className={styles.recordDetails}>
                  <div className={styles.recordMeta}>
                    <span className={styles.recordDate}>📅 {record.date}</span>
                    <span className={styles.recordTime}>🕐 {record.time}</span>
                    <span className={styles.recordInstructor}>👨‍🏫 {record.instructor}</span>
                  </div>
                  
                  {record.status === 'present' && (
                    <div className={styles.recordDuration}>
                      ⏱️ Duration: {record.duration} minutes
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📅</div>
              <h3>No attendance records found</h3>
              <p>Attendance records will appear here when you join live sessions.</p>
            </div>
          )}
        </div>
      </div>

      {/* Activities Records */}
      <div className={styles.recordsSection}>
        <h3 className={styles.sectionTitle}>Recent Learning Activities</h3>
        <div className={styles.recordsList}>
          {activitiesData.length > 0 ? (
            activitiesData.map(activity => (
              <div key={activity.id} className={styles.recordItem}>
                <div className={styles.recordHeader}>
                  <div className={styles.recordInfo}>
                    <div className={styles.activityHeader}>
                      <span className={styles.activityIcon}>
                        {getActivityIcon(activity.activityType)}
                      </span>
                      <h4 className={styles.recordTitle}>{activity.activityTitle}</h4>
                    </div>
                    <p className={styles.recordCourse}>{activity.courseName}</p>
                  </div>
                  {getStatusBadge(activity.status, 'activity')}
                </div>
                
                <div className={styles.recordDetails}>
                  <div className={styles.recordMeta}>
                    <span className={styles.recordDate}>📅 {activity.date}</span>
                    <span className={styles.recordTime}>🕐 {activity.time}</span>
                    <span className={styles.recordDuration}>⏱️ {activity.duration} min</span>
                  </div>
                  
                  {activity.progress < 100 && (
                    <div className={styles.progressBar}>
                      <div className={styles.progressLabel}>Progress: {activity.progress}%</div>
                      <div className={styles.progressTrack}>
                        <div 
                          className={styles.progressFill}
                          style={{ width: `${activity.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎯</div>
              <h3>No activities found</h3>
              <p>Your learning activities will be tracked here automatically.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Records */}
      <div className={styles.recordsSection}>
        <h3 className={styles.sectionTitle}>Quiz Results</h3>
        <div className={styles.recordsList}>
          {quizData.length > 0 ? (
            quizData.map(quiz => (
              <div key={quiz.id} className={styles.recordItem}>
                <div className={styles.recordHeader}>
                  <div className={styles.recordInfo}>
                    <h4 className={styles.recordTitle}>📊 {quiz.quizTitle}</h4>
                    <p className={styles.recordCourse}>{quiz.courseName}</p>
                  </div>
                  {getStatusBadge(quiz.status, 'quiz')}
                </div>
                
                <div className={styles.recordDetails}>
                  <div className={styles.recordMeta}>
                    <span className={styles.recordDate}>📅 {quiz.date}</span>
                    {quiz.status === 'completed' && (
                      <>
                        <span className={styles.recordTime}>🕐 {quiz.time}</span>
                        <span className={styles.recordDuration}>⏱️ {quiz.duration} min</span>
                      </>
                    )}
                  </div>
                  
                  {quiz.status === 'completed' && (
                    <div className={styles.quizResults}>
                      <div className={styles.quizScore}>
                        <span className={styles.scoreLabel}>Score:</span>
                        <span className={`${styles.scoreValue} ${
                          quiz.score >= 80 ? styles.scoreExcellent :
                          quiz.score >= 70 ? styles.scoreGood :
                          quiz.score >= 60 ? styles.scoreFair : styles.scorePoor
                        }`}>
                          {quiz.score}%
                        </span>
                      </div>
                      <div className={styles.quizDetails}>
                        <span>{quiz.correctAnswers}/{quiz.totalQuestions} correct</span>
                        <span>Attempt {quiz.attempts}/{quiz.maxAttempts}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📊</div>
              <h3>No quiz results found</h3>
              <p>Your quiz results and scores will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;