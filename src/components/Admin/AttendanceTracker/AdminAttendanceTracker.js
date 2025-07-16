import React, { useState, useEffect } from 'react';
import styles from './AdminAttendanceTracker.module.css';

const AdminAttendanceTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedInstructor, setSelectedInstructor] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [liveSessionsData, setLiveSessionsData] = useState([]);

  // Mock data for admin overview
  const mockCourses = [
    { id: 1, name: 'Islamic Finance Principles', instructor: 'Dr. Sarah Ahmed', students: 45 },
    { id: 2, name: 'Advanced Islamic Banking', instructor: 'Dr. Ahmed Hassan', students: 32 },
    { id: 3, name: 'Sharia Compliance in Business', instructor: 'Prof. Fatima Al-Zahra', students: 28 },
    { id: 4, name: 'Islamic Investment Strategies', instructor: 'Dr. Omar Abdullah', students: 38 }
  ];

  const mockInstructors = [
    { id: 1, name: 'Dr. Sarah Ahmed', courses: 2, totalStudents: 77 },
    { id: 2, name: 'Dr. Ahmed Hassan', courses: 1, totalStudents: 32 },
    { id: 3, name: 'Prof. Fatima Al-Zahra', courses: 1, totalStudents: 28 },
    { id: 4, name: 'Dr. Omar Abdullah', courses: 1, totalStudents: 38 }
  ];

  // Mock attendance data with more comprehensive information
  const mockAttendanceData = [
    {
      id: 1,
      studentId: 101,
      studentName: 'Ahmed Mohammed',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      instructorName: 'Dr. Sarah Ahmed',
      sessionTitle: 'Introduction to Islamic Banking',
      date: '2024-01-15',
      time: '10:00 AM - 11:30 AM',
      status: 'present',
      duration: 90,
      joinTime: '10:02 AM',
      leaveTime: '11:28 AM',
      sessionType: 'live',
      location: 'Virtual Room 1'
    },
    {
      id: 2,
      studentId: 102,
      studentName: 'Fatima Al-Zahra',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      instructorName: 'Dr. Sarah Ahmed',
      sessionTitle: 'Introduction to Islamic Banking',
      date: '2024-01-15',
      time: '10:00 AM - 11:30 AM',
      status: 'late',
      duration: 75,
      joinTime: '10:15 AM',
      leaveTime: '11:30 AM',
      sessionType: 'live',
      location: 'Virtual Room 1'
    },
    {
      id: 3,
      studentId: 103,
      studentName: 'Omar Abdullah',
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      instructorName: 'Dr. Ahmed Hassan',
      sessionTitle: 'Complex Financial Instruments',
      date: '2024-01-16',
      time: '2:00 PM - 3:30 PM',
      status: 'absent',
      duration: 0,
      joinTime: null,
      leaveTime: null,
      sessionType: 'live',
      location: 'Virtual Room 2'
    }
  ];

  // Mock activities data
  const mockActivitiesData = [
    {
      id: 1,
      studentId: 101,
      studentName: 'Ahmed Mohammed',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      activityType: 'video_watched',
      activityTitle: 'Introduction to Sukuk',
      date: '2024-01-16',
      time: '09:30 AM',
      duration: 45,
      progress: 100,
      status: 'completed',
      score: null
    },
    {
      id: 2,
      studentId: 102,
      studentName: 'Fatima Al-Zahra',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      activityType: 'assignment_submitted',
      activityTitle: 'Islamic Banking Case Study',
      date: '2024-01-17',
      time: '11:45 AM',
      duration: 120,
      progress: 100,
      status: 'submitted',
      score: 85
    },
    {
      id: 3,
      studentId: 103,
      studentName: 'Omar Abdullah',
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      activityType: 'discussion_participated',
      activityTitle: 'Forum: Regulatory Challenges',
      date: '2024-01-17',
      time: '04:20 PM',
      duration: 25,
      progress: 100,
      status: 'participated',
      score: null
    }
  ];

  // Mock quiz data
  const mockQuizData = [
    {
      id: 1,
      studentId: 101,
      studentName: 'Ahmed Mohammed',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      quizTitle: 'Module 1 Assessment',
      date: '2024-01-18',
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
      studentId: 102,
      studentName: 'Fatima Al-Zahra',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      quizTitle: 'Module 1 Assessment',
      date: '2024-01-18',
      time: '04:30 PM',
      duration: 35,
      score: 92,
      totalQuestions: 20,
      correctAnswers: 18,
      status: 'completed',
      attempts: 1,
      maxAttempts: 2
    }
  ];

  // Mock live sessions data
  const mockLiveSessionsData = [
    {
      id: 1,
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      instructorName: 'Dr. Sarah Ahmed',
      sessionTitle: 'Risk Management in Islamic Finance',
      scheduledDate: '2024-01-20',
      scheduledTime: '10:00 AM - 11:30 AM',
      status: 'scheduled',
      maxParticipants: 50,
      registeredParticipants: 42,
      actualParticipants: 0,
      location: 'Virtual Room 1'
    },
    {
      id: 2,
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      instructorName: 'Dr. Ahmed Hassan',
      sessionTitle: 'Sukuk Market Analysis',
      scheduledDate: '2024-01-19',
      scheduledTime: '2:00 PM - 3:30 PM',
      status: 'live',
      maxParticipants: 40,
      registeredParticipants: 32,
      actualParticipants: 28,
      location: 'Virtual Room 2'
    }
  ];

  useEffect(() => {
    // Filter data based on selected filters
    const filterData = (data) => {
      let filtered = data;
      
      if (selectedCourse !== 'all') {
        filtered = filtered.filter(item => item.courseId === parseInt(selectedCourse));
      }
      
      if (selectedInstructor !== 'all') {
        filtered = filtered.filter(item => 
          item.instructorName === mockInstructors.find(inst => inst.id === parseInt(selectedInstructor))?.name
        );
      }
      
      if (searchTerm) {
        filtered = filtered.filter(item => 
          item.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.activityTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.quizTitle?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    setAttendanceData(filterData(mockAttendanceData));
    setActivitiesData(filterData(mockActivitiesData));
    setQuizData(filterData(mockQuizData));
    setLiveSessionsData(mockLiveSessionsData);
  }, [selectedCourse, selectedInstructor, searchTerm, dateRange]);

  const getOverviewStats = () => {
    const totalStudents = mockCourses.reduce((sum, course) => sum + course.students, 0);
    const totalSessions = attendanceData.length;
    const presentCount = attendanceData.filter(item => item.status === 'present').length;
    const attendanceRate = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;
    
    const completedActivities = activitiesData.filter(item => 
      item.status === 'completed' || item.status === 'submitted' || item.status === 'participated'
    ).length;
    const activityCompletionRate = activitiesData.length > 0 ? 
      Math.round((completedActivities / activitiesData.length) * 100) : 0;
    
    const completedQuizzes = quizData.filter(item => item.status === 'completed');
    const averageQuizScore = completedQuizzes.length > 0 ? 
      Math.round(completedQuizzes.reduce((sum, quiz) => sum + quiz.score, 0) / completedQuizzes.length) : 0;

    return {
      totalStudents,
      totalCourses: mockCourses.length,
      totalInstructors: mockInstructors.length,
      attendanceRate,
      activityCompletionRate,
      averageQuizScore,
      liveSessions: liveSessionsData.filter(session => session.status === 'live').length
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
      },
      session: {
        live: { class: styles.statusLive, text: 'Live' },
        scheduled: { class: styles.statusScheduled, text: 'Scheduled' },
        completed: { class: styles.statusCompleted, text: 'Completed' },
        cancelled: { class: styles.statusCancelled, text: 'Cancelled' }
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

  const exportData = (type) => {
    console.log(`Exporting ${type} data...`);
    // In real app, this would generate and download CSV/Excel file
  };

  const sendNotification = (studentId, message) => {
    console.log(`Sending notification to student ${studentId}: ${message}`);
    // In real app, this would send actual notification
  };

  const stats = getOverviewStats();

  const renderOverview = () => (
    <div className={styles.overviewSection}>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statContent}>
            <h3>Total Students</h3>
            <div className={styles.statValue}>{stats.totalStudents}</div>
            <div className={styles.statChange}>+5 this week</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statContent}>
            <h3>Active Courses</h3>
            <div className={styles.statValue}>{stats.totalCourses}</div>
            <div className={styles.statChange}>All running</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👨‍🏫</div>
          <div className={styles.statContent}>
            <h3>Instructors</h3>
            <div className={styles.statValue}>{stats.totalInstructors}</div>
            <div className={styles.statChange}>All active</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statContent}>
            <h3>Attendance Rate</h3>
            <div className={styles.statValue}>{stats.attendanceRate}%</div>
            <div className={styles.statChange}>+2% from last week</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎯</div>
          <div className={styles.statContent}>
            <h3>Activity Completion</h3>
            <div className={styles.statValue}>{stats.activityCompletionRate}%</div>
            <div className={styles.statChange}>+5% from last week</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📈</div>
          <div className={styles.statContent}>
            <h3>Avg Quiz Score</h3>
            <div className={styles.statValue}>{stats.averageQuizScore}%</div>
            <div className={styles.statChange}>+3% from last week</div>
          </div>
        </div>
      </div>

      {/* Live Sessions */}
      <div className={styles.liveSessionsSection}>
        <h3 className={styles.sectionTitle}>Live Sessions</h3>
        <div className={styles.liveSessionsList}>
          {liveSessionsData.map(session => (
            <div key={session.id} className={styles.liveSessionCard}>
              <div className={styles.sessionHeader}>
                <div className={styles.sessionInfo}>
                  <h4 className={styles.sessionTitle}>{session.sessionTitle}</h4>
                  <p className={styles.sessionCourse}>{session.courseName}</p>
                  <p className={styles.sessionInstructor}>👨‍🏫 {session.instructorName}</p>
                </div>
                {getStatusBadge(session.status, 'session')}
              </div>
              
              <div className={styles.sessionDetails}>
                <div className={styles.sessionMeta}>
                  <span>📅 {session.scheduledDate}</span>
                  <span>🕐 {session.scheduledTime}</span>
                  <span>📍 {session.location}</span>
                </div>
                
                <div className={styles.participantStats}>
                  <span>👥 {session.actualParticipants || session.registeredParticipants}/{session.maxParticipants} participants</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAttendanceTab = () => (
    <div className={styles.attendanceSection}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Attendance Records</h3>
        <button 
          className={styles.exportBtn}
          onClick={() => exportData('attendance')}
        >
          📊 Export Data
        </button>
      </div>
      
      <div className={styles.recordsList}>
        {attendanceData.map(record => (
          <div key={record.id} className={styles.recordCard}>
            <div className={styles.recordHeader}>
              <div className={styles.studentInfo}>
                <h4 className={styles.studentName}>{record.studentName}</h4>
                <p className={styles.recordCourse}>{record.courseName}</p>
                <p className={styles.recordSession}>{record.sessionTitle}</p>
              </div>
              {getStatusBadge(record.status, 'attendance')}
            </div>
            
            <div className={styles.recordDetails}>
              <div className={styles.recordMeta}>
                <span>📅 {record.date}</span>
                <span>🕐 {record.time}</span>
                <span>👨‍🏫 {record.instructorName}</span>
                <span>📍 {record.location}</span>
              </div>
              
              {record.status === 'present' && (
                <div className={styles.attendanceDetails}>
                  <span>⏰ Joined: {record.joinTime}</span>
                  <span>🚪 Left: {record.leaveTime}</span>
                  <span>⏱️ Duration: {record.duration} min</span>
                </div>
              )}
              
              {record.status === 'late' && (
                <div className={styles.attendanceDetails}>
                  <span>⏰ Joined: {record.joinTime} (Late)</span>
                  <span>🚪 Left: {record.leaveTime}</span>
                  <span>⏱️ Duration: {record.duration} min</span>
                </div>
              )}
            </div>
            
            <div className={styles.recordActions}>
              <button 
                className={styles.actionBtn}
                onClick={() => sendNotification(record.studentId, 'Attendance reminder')}
              >
                📧 Send Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivitiesTab = () => (
    <div className={styles.activitiesSection}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Learning Activities</h3>
        <button 
          className={styles.exportBtn}
          onClick={() => exportData('activities')}
        >
          📊 Export Data
        </button>
      </div>
      
      <div className={styles.recordsList}>
        {activitiesData.map(activity => (
          <div key={activity.id} className={styles.recordCard}>
            <div className={styles.recordHeader}>
              <div className={styles.studentInfo}>
                <div className={styles.activityHeader}>
                  <span className={styles.activityIcon}>
                    {getActivityIcon(activity.activityType)}
                  </span>
                  <h4 className={styles.studentName}>{activity.studentName}</h4>
                </div>
                <p className={styles.recordCourse}>{activity.courseName}</p>
                <p className={styles.activityTitle}>{activity.activityTitle}</p>
              </div>
              {getStatusBadge(activity.status, 'activity')}
            </div>
            
            <div className={styles.recordDetails}>
              <div className={styles.recordMeta}>
                <span>📅 {activity.date}</span>
                <span>🕐 {activity.time}</span>
                <span>⏱️ {activity.duration} min</span>
                {activity.score && <span>📊 Score: {activity.score}%</span>}
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
        ))}
      </div>
    </div>
  );

  const renderQuizzesTab = () => (
    <div className={styles.quizzesSection}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Quiz Results</h3>
        <button 
          className={styles.exportBtn}
          onClick={() => exportData('quizzes')}
        >
          📊 Export Data
        </button>
      </div>
      
      <div className={styles.recordsList}>
        {quizData.map(quiz => (
          <div key={quiz.id} className={styles.recordCard}>
            <div className={styles.recordHeader}>
              <div className={styles.studentInfo}>
                <h4 className={styles.studentName}>{quiz.studentName}</h4>
                <p className={styles.recordCourse}>{quiz.courseName}</p>
                <p className={styles.quizTitle}>📊 {quiz.quizTitle}</p>
              </div>
              {getStatusBadge(quiz.status, 'quiz')}
            </div>
            
            <div className={styles.recordDetails}>
              <div className={styles.recordMeta}>
                <span>📅 {quiz.date}</span>
                <span>🕐 {quiz.time}</span>
                <span>⏱️ {quiz.duration} min</span>
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
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.adminAttendanceTracker}>
      {/* Header */}
      <div className={styles.trackerHeader}>
        <div className={styles.headerTitle}>
          <h2>🎯 Admin Attendance & Activities Control Center</h2>
          <p>Monitor and manage all student attendance, activities, and performance across the institution</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Courses</option>
            {mockCourses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Instructor:</label>
          <select
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Instructors</option>
            {mockInstructors.map(instructor => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Date Range:</label>
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
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Search:</label>
          <input
            type="text"
            placeholder="Search students, courses, activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'attendance' ? styles.active : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            📅 Attendance
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'activities' ? styles.active : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            🎯 Activities
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'quizzes' ? styles.active : ''}`}
            onClick={() => setActiveTab('quizzes')}
          >
            📊 Quizzes
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'attendance' && renderAttendanceTab()}
        {activeTab === 'activities' && renderActivitiesTab()}
        {activeTab === 'quizzes' && renderQuizzesTab()}
      </div>
    </div>
  );
};

export default AdminAttendanceTracker;