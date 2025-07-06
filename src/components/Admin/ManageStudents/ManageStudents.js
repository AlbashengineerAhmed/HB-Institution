import React, { useState } from 'react';
import styles from './ManageStudents.module.css';

const ManageStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  // Static student data
  const studentsData = [
    {
      id: 1,
      name: 'Ali Mohammed',
      email: 'ali.mohammed@email.com',
      phone: '+1-555-0201',
      enrolledCourses: ['Advanced Islamic Studies', 'Arabic Language Fundamentals'],
      totalCourses: 2,
      completedCourses: 1,
      status: 'active',
      joinDate: '2023-09-15',
      lastActivity: '2024-01-20',
      progress: 75
    },
    {
      id: 2,
      name: 'Fatima Hassan',
      email: 'fatima.hassan@email.com',
      phone: '+1-555-0202',
      enrolledCourses: ['Quran Recitation Basics', 'Hadith Studies'],
      totalCourses: 2,
      completedCourses: 2,
      status: 'active',
      joinDate: '2023-08-20',
      lastActivity: '2024-01-19',
      progress: 100
    },
    {
      id: 3,
      name: 'Omar Abdullah',
      email: 'omar.abdullah@email.com',
      phone: '+1-555-0203',
      enrolledCourses: ['Islamic Finance Principles'],
      totalCourses: 1,
      completedCourses: 0,
      status: 'active',
      joinDate: '2024-01-10',
      lastActivity: '2024-01-18',
      progress: 25
    },
    {
      id: 4,
      name: 'Aisha Rahman',
      email: 'aisha.rahman@email.com',
      phone: '+1-555-0204',
      enrolledCourses: ['Arabic Language Fundamentals', 'Islamic History and Civilization'],
      totalCourses: 2,
      completedCourses: 1,
      status: 'suspended',
      joinDate: '2023-10-05',
      lastActivity: '2024-01-15',
      progress: 60
    },
    {
      id: 5,
      name: 'Yusuf Ahmed',
      email: 'yusuf.ahmed@email.com',
      phone: '+1-555-0205',
      enrolledCourses: ['Quran Recitation Basics', 'Advanced Islamic Studies', 'Hadith Studies'],
      totalCourses: 3,
      completedCourses: 1,
      status: 'active',
      joinDate: '2023-07-12',
      lastActivity: '2024-01-21',
      progress: 85
    },
    {
      id: 6,
      name: 'Maryam Ali',
      email: 'maryam.ali@email.com',
      phone: '+1-555-0206',
      enrolledCourses: ['Islamic Finance Principles'],
      totalCourses: 1,
      completedCourses: 0,
      status: 'banned',
      joinDate: '2023-11-20',
      lastActivity: '2024-01-10',
      progress: 15
    }
  ];

  // Course enrollment statistics
  const enrollmentStats = [
    { course: 'Advanced Islamic Studies', students: 45, completion: 78 },
    { course: 'Quran Recitation Basics', students: 78, completion: 85 },
    { course: 'Arabic Language Fundamentals', students: 62, completion: 72 },
    { course: 'Islamic History and Civilization', students: 34, completion: 65 },
    { course: 'Hadith Studies', students: 56, completion: 80 },
    { course: 'Islamic Finance Principles', students: 29, completion: 55 }
  ];

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || 
                         student.enrolledCourses.some(course => course.includes(courseFilter));
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleStatusChange = (studentId, newStatus) => {
    console.log(`Student ${studentId} status changed to ${newStatus}`);
  };

  const handleDeleteStudent = (studentId) => {
    console.log(`Student ${studentId} deleted`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: styles.statusActive,
      suspended: styles.statusSuspended,
      banned: styles.statusBanned
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4da6ff';
    if (progress >= 60) return '#fdc62c';
    if (progress >= 40) return '#feda6a';
    return '#ff4c4c';
  };

  return (
    <div className={styles.manageStudents}>
      {/* Enrollment Statistics */}
      <div className={styles.statsSection}>
        <h3 className={styles.statsTitle}>Course Enrollment Statistics</h3>
        <div className={styles.statsGrid}>
          {enrollmentStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <h4 className={styles.statCourse}>{stat.course}</h4>
              <div className={styles.statNumbers}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{stat.students}</span>
                  <span className={styles.statLabel}>Students</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{stat.completion}%</span>
                  <span className={styles.statLabel}>Completion</span>
                </div>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${stat.completion}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Header with filters */}
      <div className={styles.studentHeader}>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filtersSection}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
          
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Courses</option>
            <option value="Advanced Islamic Studies">Advanced Islamic Studies</option>
            <option value="Quran Recitation">Quran Recitation</option>
            <option value="Arabic Language">Arabic Language</option>
            <option value="Islamic History">Islamic History</option>
            <option value="Hadith Studies">Hadith Studies</option>
            <option value="Islamic Finance">Islamic Finance</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className={styles.tableContainer}>
        <table className={styles.studentsTable}>
          <thead>
            <tr>
              <th>Student Info</th>
              <th>Enrolled Courses</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Last Activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className={styles.studentRow}>
                <td className={styles.studentInfo}>
                  <div className={styles.studentDetails}>
                    <div className={styles.studentAvatar}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={styles.studentData}>
                      <h4 className={styles.studentName}>{student.name}</h4>
                      <p className={styles.studentEmail}>{student.email}</p>
                      <p className={styles.studentPhone}>{student.phone}</p>
                      <p className={styles.joinDate}>Joined: {new Date(student.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className={styles.coursesCell}>
                  <div className={styles.coursesList}>
                    {student.enrolledCourses.map((course, index) => (
                      <span key={index} className={styles.courseTag}>
                        {course}
                      </span>
                    ))}
                  </div>
                  <div className={styles.coursesStats}>
                    <span className={styles.coursesCount}>
                      {student.completedCourses}/{student.totalCourses} completed
                    </span>
                  </div>
                </td>
                <td className={styles.progressCell}>
                  <div className={styles.progressContainer}>
                    <div className={styles.progressCircle}>
                      <svg className={styles.progressSvg} viewBox="0 0 36 36">
                        <path
                          className={styles.progressBg}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={styles.progressBar}
                          strokeDasharray={`${student.progress}, 100`}
                          style={{ stroke: getProgressColor(student.progress) }}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className={styles.progressText}>{student.progress}%</div>
                    </div>
                  </div>
                </td>
                <td className={styles.statusCell}>
                  {getStatusBadge(student.status)}
                </td>
                <td className={styles.activityCell}>
                  <span className={styles.lastActivity}>
                    {new Date(student.lastActivity).toLocaleDateString()}
                  </span>
                </td>
                <td className={styles.actionsCell}>
                  <div className={styles.actionButtons}>
                    {student.status === 'active' && (
                      <button
                        className={`${styles.actionBtn} ${styles.suspendBtn}`}
                        onClick={() => handleStatusChange(student.id, 'suspended')}
                      >
                        ⏸ Suspend
                      </button>
                    )}
                    
                    {student.status === 'suspended' && (
                      <button
                        className={`${styles.actionBtn} ${styles.activateBtn}`}
                        onClick={() => handleStatusChange(student.id, 'active')}
                      >
                        ▶ Activate
                      </button>
                    )}
                    
                    {student.status !== 'banned' && (
                      <button
                        className={`${styles.actionBtn} ${styles.banBtn}`}
                        onClick={() => handleStatusChange(student.id, 'banned')}
                      >
                        🚫 Ban
                      </button>
                    )}
                    
                    <button
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      onClick={() => console.log(`View student ${student.id}`)}
                    >
                      👁 View
                    </button>
                    
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div className={styles.emptyState}>
          <p>No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;