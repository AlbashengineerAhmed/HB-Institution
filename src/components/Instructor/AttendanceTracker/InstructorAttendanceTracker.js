import React, { useState, useEffect } from 'react';
import styles from './InstructorAttendanceTracker.module.css';

const InstructorAttendanceTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [viewMode, setViewMode] = useState('overview'); // overview, attendance, activities, quizzes
  const [attendanceData, setAttendanceData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  // Mock courses taught by instructor
  const courses = [
    { id: 1, name: 'Islamic Finance Principles', students: 25, sessions: 12 },
    { id: 2, name: 'Advanced Islamic Banking', students: 18, sessions: 10 },
    { id: 3, name: 'Sharia Compliance in Business', students: 22, sessions: 8 }
  ];

  // Mock students data
  const mockStudentsData = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      enrollmentDate: '2024-01-10',
      attendanceRate: 92,
      activitiesCompleted: 15,
      totalActivities: 18,
      averageQuizScore: 88,
      lastActive: '2024-01-23'
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      email: 'fatima.zahra@email.com',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      enrollmentDate: '2024-01-10',
      attendanceRate: 85,
      activitiesCompleted: 14,
      totalActivities: 18,
      averageQuizScore: 92,
      lastActive: '2024-01-22'
    },
    {
      id: 3,
      name: 'Omar Abdullah',
      email: 'omar.abdullah@email.com',
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      enrollmentDate: '2024-01-12',
      attendanceRate: 78,
      activitiesCompleted: 10,
      totalActivities: 15,
      averageQuizScore: 76,
      lastActive: '2024-01-20'
    },
    {
      id: 4,
      name: 'Aisha Mohamed',
      email: 'aisha.mohamed@email.com',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      enrollmentDate: '2024-01-11',
      attendanceRate: 96,
      activitiesCompleted: 17,
      totalActivities: 18,
      averageQuizScore: 94,
      lastActive: '2024-01-23'
    }
  ];

  // Mock attendance data
  const mockAttendanceData = [
    {
      id: 1,
      studentId: 1,
      studentName: 'Ahmed Hassan',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      sessionTitle: 'Introduction to Islamic Banking',
      date: '2024-01-15',
      time: '10:00 AM - 11:30 AM',
      status: 'present',
      duration: 90,
      joinTime: '10:02 AM',
      leaveTime: '11:28 AM'
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Fatima Al-Zahra',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      sessionTitle: 'Introduction to Islamic Banking',
      date: '2024-01-15',
      time: '10:00 AM - 11:30 AM',
      status: 'present',
      duration: 85,
      joinTime: '10:05 AM',
      leaveTime: '11:30 AM'
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'Omar Abdullah',
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      sessionTitle: 'Complex Financial Instruments',
      date: '2024-01-22',
      time: '3:00 PM - 4:30 PM',
      status: 'late',
      duration: 75,
      joinTime: '3:15 PM',
      leaveTime: '4:30 PM'
    },
    {
      id: 4,
      studentId: 4,
      studentName: 'Aisha Mohamed',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      sessionTitle: 'Risk Management in Islamic Finance',
      date: '2024-01-20',
      time: '10:00 AM - 11:30 AM',
      status: 'absent',
      duration: 0,
      joinTime: null,
      leaveTime: null
    }
  ];

  // Mock activities data
  const mockActivitiesData = [
    {
      id: 1,
      studentId: 1,
      studentName: 'Ahmed Hassan',
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
      studentId: 2,
      studentName: 'Fatima Al-Zahra',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      activityType: 'assignment_submitted',
      activityTitle: 'Islamic Banking Case Study',
      date: '2024-01-18',
      time: '11:45 AM',
      duration: 120,
      progress: 100,
      status: 'submitted',
      score: 92
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'Omar Abdullah',
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      activityType: 'discussion_participated',
      activityTitle: 'Forum: Regulatory Challenges',
      date: '2024-01-21',
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
      studentId: 1,
      studentName: 'Ahmed Hassan',
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
      maxAttempts: 2,
      timeSpent: 28
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Fatima Al-Zahra',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      quizTitle: 'Module 1 Assessment',
      date: '2024-01-16',
      time: '02:30 PM',
      duration: 30,
      score: 92,
      totalQuestions: 20,
      correctAnswers: 18,
      status: 'completed',
      attempts: 1,
      maxAttempts: 2,
      timeSpent: 25
    },
    {
      id: 3,
      studentId: 4,
      studentName: 'Aisha Mohamed',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      quizTitle: 'Module 2 Assessment',
      date: '2024-01-19',
      time: '01:30 PM',
      duration: 45,
      score: 94,
      totalQuestions: 25,
      correctAnswers: 23,
      status: 'completed',
      attempts: 1,
      maxAttempts: 2,
      timeSpent: 42
    }
  ];

  useEffect(() => {
    // Filter data based on selected filters
    const filterData = (data) => {
      let filtered = data;
      
      if (selectedCourse !== 'all') {
        filtered = filtered.filter(item => item.courseId === parseInt(selectedCourse));
      }
      
      if (selectedStudent !== 'all') {
        filtered = filtered.filter(item => item.studentId === parseInt(selectedStudent));
      }
      
      // Add date range filtering logic
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

    const filterStudents = (students) => {
      if (selectedCourse !== 'all') {
        return students.filter(student => student.courseId === parseInt(selectedCourse));
      }
      return students;
    };

    setAttendanceData(filterData(mockAttendanceData));
    setActivitiesData(filterData(mockActivitiesData));
    setQuizData(filterData(mockQuizData));
    setStudentsData(filterStudents(mockStudentsData));
  }, [selectedCourse, selectedStudent, dateRange]);

  const getOverviewStats = () => {
    const totalStudents = studentsData.length;
    const avgAttendanceRate = totalStudents > 0 
      ? Math.round(studentsData.reduce((sum, student) => sum + student.attendanceRate, 0) / totalStudents)
      : 0;
    const avgQuizScore = studentsData.length > 0
      ? Math.round(studentsData.reduce((sum, student) => sum + student.averageQuizScore, 0) / studentsData.length)
      : 0;
    const totalActivitiesCompleted = studentsData.reduce((sum, student) => sum + student.activitiesCompleted, 0);
    
    return {
      totalStudents,
      avgAttendanceRate,
      avgQuizScore,
      totalActivitiesCompleted,
      recentSessions: attendanceData.length,
      activeStudents: studentsData.filter(s => new Date(s.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
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

  const getPerformanceColor = (score) => {
    if (score >= 90) return styles.performanceExcellent;
    if (score >= 80) return styles.performanceGood;
    if (score >= 70) return styles.performanceFair;
    return styles.performancePoor;
  };

  const overviewStats = getOverviewStats();

  // Get unique students for filter
  const allStudents = [...new Map(mockStudentsData.map(s => [s.id, s])).values()];
  const filteredStudentsForDropdown = selectedCourse !== 'all' 
    ? allStudents.filter(s => s.courseId === parseInt(selectedCourse))
    : allStudents;

  return (
    <div className={styles.instructorTracker}>
      {/* Header with Filters */}
      <div className={styles.trackerHeader}>
        <div className={styles.headerTitle}>
          <h2>👨‍🏫 Student Progress Tracker</h2>
          <p>Monitor student attendance, activities, and performance across your courses</p>
        </div>
        
        <div className={styles.filters}>
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedStudent('all'); // Reset student filter when course changes
            }}
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
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Students</option>
            {filteredStudentsForDropdown.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
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

      {/* Overview Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statContent}>
            <h3>Total Students</h3>
            <div className={styles.statValue}>{overviewStats.totalStudents}</div>
            <div className={styles.statDetails}>
              {overviewStats.activeStudents} active this week
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statContent}>
            <h3>Avg Attendance</h3>
            <div className={styles.statValue}>{overviewStats.avgAttendanceRate}%</div>
            <div className={styles.statDetails}>
              {overviewStats.recentSessions} recent sessions
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎯</div>
          <div className={styles.statContent}>
            <h3>Avg Quiz Score</h3>
            <div className={styles.statValue}>{overviewStats.avgQuizScore}%</div>
            <div className={styles.statDetails}>
              Across all assessments
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statContent}>
            <h3>Activities</h3>
            <div className={styles.statValue}>{overviewStats.totalActivitiesCompleted}</div>
            <div className={styles.statDetails}>
              Total completed
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${viewMode === 'overview' ? styles.active : ''}`}
            onClick={() => setViewMode('overview')}
          >
            📋 Overview
          </button>
          <button 
            className={`${styles.tab} ${viewMode === 'attendance' ? styles.active : ''}`}
            onClick={() => setViewMode('attendance')}
          >
            📅 Attendance
          </button>
          <button 
            className={`${styles.tab} ${viewMode === 'activities' ? styles.active : ''}`}
            onClick={() => setViewMode('activities')}
          >
            🎯 Activities
          </button>
          <button 
            className={`${styles.tab} ${viewMode === 'quizzes' ? styles.active : ''}`}
            onClick={() => setViewMode('quizzes')}
          >
            📊 Quizzes
          </button>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'overview' && (
        <div className={styles.overviewSection}>
          <h3 className={styles.sectionTitle}>Student Performance Overview</h3>
          <div className={styles.studentsGrid}>
            {studentsData.map(student => (
              <div key={student.id} className={styles.studentCard}>
                <div className={styles.studentHeader}>
                  <div className={styles.studentInfo}>
                    <h4 className={styles.studentName}>{student.name}</h4>
                    <p className={styles.studentCourse}>{student.courseName}</p>
                    <p className={styles.studentEmail}>{student.email}</p>
                  </div>
                  <div className={styles.studentAvatar}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                <div className={styles.studentStats}>
                  <div className={styles.studentStat}>
                    <span className={styles.statLabel}>Attendance</span>
                    <span className={`${styles.statValue} ${getPerformanceColor(student.attendanceRate)}`}>
                      {student.attendanceRate}%
                    </span>
                  </div>
                  
                  <div className={styles.studentStat}>
                    <span className={styles.statLabel}>Activities</span>
                    <span className={styles.statValue}>
                      {student.activitiesCompleted}/{student.totalActivities}
                    </span>
                  </div>
                  
                  <div className={styles.studentStat}>
                    <span className={styles.statLabel}>Quiz Avg</span>
                    <span className={`${styles.statValue} ${getPerformanceColor(student.averageQuizScore)}`}>
                      {student.averageQuizScore}%
                    </span>
                  </div>
                </div>
                
                <div className={styles.studentFooter}>
                  <span className={styles.lastActive}>Last active: {student.lastActive}</span>
                  <button className={styles.viewDetailsBtn}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'attendance' && (
        <div className={styles.recordsSection}>
          <h3 className={styles.sectionTitle}>Attendance Records</h3>
          <div className={styles.attendanceTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderCell}>Student</div>
              <div className={styles.tableHeaderCell}>Session</div>
              <div className={styles.tableHeaderCell}>Date & Time</div>
              <div className={styles.tableHeaderCell}>Status</div>
              <div className={styles.tableHeaderCell}>Duration</div>
              <div className={styles.tableHeaderCell}>Join/Leave</div>
            </div>
            
            {attendanceData.length > 0 ? (
              attendanceData.map(record => (
                <div key={record.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <div className={styles.studentInfo}>
                      <strong>{record.studentName}</strong>
                      <small>{record.courseName}</small>
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    {record.sessionTitle}
                  </div>
                  <div className={styles.tableCell}>
                    <div>{record.date}</div>
                    <small>{record.time}</small>
                  </div>
                  <div className={styles.tableCell}>
                    {getStatusBadge(record.status, 'attendance')}
                  </div>
                  <div className={styles.tableCell}>
                    {record.duration} min
                  </div>
                  <div className={styles.tableCell}>
                    {record.joinTime && record.leaveTime ? (
                      <div>
                        <div>In: {record.joinTime}</div>
                        <div>Out: {record.leaveTime}</div>
                      </div>
                    ) : (
                      <span className={styles.noData}>-</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📅</div>
                <h3>No attendance records found</h3>
                <p>Attendance records will appear here when students join sessions.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'activities' && (
        <div className={styles.recordsSection}>
          <h3 className={styles.sectionTitle}>Student Activities</h3>
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
                        <div>
                          <h4 className={styles.recordTitle}>{activity.activityTitle}</h4>
                          <p className={styles.recordStudent}>by {activity.studentName}</p>
                        </div>
                      </div>
                      <p className={styles.recordCourse}>{activity.courseName}</p>
                    </div>
                    <div className={styles.recordBadges}>
                      {getStatusBadge(activity.status, 'activity')}
                      {activity.score && (
                        <span className={`${styles.scoreBadge} ${getPerformanceColor(activity.score)}`}>
                          {activity.score}%
                        </span>
                      )}
                    </div>
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
                <p>Student activities will be tracked here automatically.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'quizzes' && (
        <div className={styles.recordsSection}>
          <h3 className={styles.sectionTitle}>Quiz Results</h3>
          <div className={styles.quizTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderCell}>Student</div>
              <div className={styles.tableHeaderCell}>Quiz</div>
              <div className={styles.tableHeaderCell}>Date</div>
              <div className={styles.tableHeaderCell}>Score</div>
              <div className={styles.tableHeaderCell}>Questions</div>
              <div className={styles.tableHeaderCell}>Time</div>
              <div className={styles.tableHeaderCell}>Attempts</div>
            </div>
            
            {quizData.length > 0 ? (
              quizData.map(quiz => (
                <div key={quiz.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <div className={styles.studentInfo}>
                      <strong>{quiz.studentName}</strong>
                      <small>{quiz.courseName}</small>
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    {quiz.quizTitle}
                  </div>
                  <div className={styles.tableCell}>
                    <div>{quiz.date}</div>
                    <small>{quiz.time}</small>
                  </div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.scoreValue} ${getPerformanceColor(quiz.score)}`}>
                      {quiz.score}%
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    {quiz.correctAnswers}/{quiz.totalQuestions}
                  </div>
                  <div className={styles.tableCell}>
                    {quiz.timeSpent}/{quiz.duration} min
                  </div>
                  <div className={styles.tableCell}>
                    {quiz.attempts}/{quiz.maxAttempts}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📊</div>
                <h3>No quiz results found</h3>
                <p>Quiz results and scores will appear here.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorAttendanceTracker;