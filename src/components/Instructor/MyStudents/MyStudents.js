import React, { useState } from 'react';
import styles from './MyStudents.module.css';

const MyStudents = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [messageData, setMessageData] = useState({
    subject: '',
    message: '',
    recipients: 'selected' // 'selected', 'course', 'all'
  });

  // Mock instructor's courses
  const instructorCourses = [
    { id: 1, title: 'Islamic Finance Principles', students: 45 },
    { id: 2, title: 'Advanced Islamic Banking', students: 32 },
    { id: 3, title: 'Sharia Compliance in Business', students: 28 }
  ];

  // Mock students data
  const studentsData = [
    {
      id: 1,
      name: 'Ahmed Mohammed',
      email: 'ahmed.mohammed@email.com',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      enrollmentDate: '2023-09-15',
      progress: 75,
      lastActivity: '2024-01-20',
      status: 'active',
      completedModules: 3,
      totalModules: 4,
      grade: 'A',
      country: 'Saudi Arabia'
    },
    {
      id: 2,
      name: 'Fatima Hassan',
      email: 'fatima.hassan@email.com',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      enrollmentDate: '2023-09-20',
      progress: 90,
      lastActivity: '2024-01-21',
      status: 'active',
      completedModules: 4,
      totalModules: 4,
      grade: 'A+',
      country: 'Egypt'
    },
    {
      id: 3,
      name: 'Omar Abdullah',
      email: 'omar.abdullah@email.com',
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      enrollmentDate: '2023-10-01',
      progress: 45,
      lastActivity: '2024-01-18',
      status: 'active',
      completedModules: 1,
      totalModules: 3,
      grade: 'B+',
      country: 'UAE'
    },
    {
      id: 4,
      name: 'Aisha Rahman',
      email: 'aisha.rahman@email.com',
      courseId: 1,
      courseName: 'Islamic Finance Principles',
      enrollmentDate: '2023-09-25',
      progress: 60,
      lastActivity: '2024-01-15',
      status: 'inactive',
      completedModules: 2,
      totalModules: 4,
      grade: 'B',
      country: 'Pakistan'
    },
    {
      id: 5,
      name: 'Yusuf Ahmed',
      email: 'yusuf.ahmed@email.com',
      courseId: 2,
      courseName: 'Advanced Islamic Banking',
      enrollmentDate: '2023-10-05',
      progress: 85,
      lastActivity: '2024-01-19',
      status: 'active',
      completedModules: 2,
      totalModules: 3,
      grade: 'A',
      country: 'Malaysia'
    },
    {
      id: 6,
      name: 'Maryam Ali',
      email: 'maryam.ali@email.com',
      courseId: 3,
      courseName: 'Sharia Compliance in Business',
      enrollmentDate: '2024-01-10',
      progress: 25,
      lastActivity: '2024-01-20',
      status: 'active',
      completedModules: 1,
      totalModules: 3,
      grade: 'B+',
      country: 'Jordan'
    }
  ];

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.courseId.toString() === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const handleSendMessage = () => {
    if (selectedStudents.length === 0 && messageData.recipients === 'selected') {
      alert('Please select at least one student to send a message.');
      return;
    }
    setShowMessageModal(true);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log('Sending message:', messageData);
    console.log('Recipients:', selectedStudents);
    setShowMessageModal(false);
    setMessageData({ subject: '', message: '', recipients: 'selected' });
    setSelectedStudents([]);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: styles.statusActive,
      inactive: styles.statusInactive,
      completed: styles.statusCompleted
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getGradeBadge = (grade) => {
    const gradeClasses = {
      'A+': styles.gradeAPlus,
      'A': styles.gradeA,
      'B+': styles.gradeBPlus,
      'B': styles.gradeB,
      'C+': styles.gradeCPlus,
      'C': styles.gradeC
    };
    
    return (
      <span className={`${styles.gradeBadge} ${gradeClasses[grade]}`}>
        {grade}
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
    <div className={styles.myStudents}>
      {/* Header with filters and actions */}
      <div className={styles.studentsHeader}>
        <div className={styles.filtersSection}>
          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className={styles.courseSelect}
          >
            <option value="all">All Courses ({studentsData.length} students)</option>
            {instructorCourses.map(course => (
              <option key={course.id} value={course.id.toString()}>
                {course.title} ({studentsData.filter(s => s.courseId === course.id).length} students)
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.actionsSection}>
          <button 
            className={styles.messageBtn}
            onClick={handleSendMessage}
            disabled={selectedStudents.length === 0}
          >
            💬 Send Message ({selectedStudents.length})
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className={styles.tableContainer}>
        <table className={styles.studentsTable}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                  onChange={handleSelectAll}
                  className={styles.selectAllCheckbox}
                />
              </th>
              <th>Student</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Last Activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className={styles.studentRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelect(student.id)}
                    className={styles.studentCheckbox}
                  />
                </td>
                <td className={styles.studentInfo}>
                  <div className={styles.studentDetails}>
                    <div className={styles.studentAvatar}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={styles.studentData}>
                      <h4 className={styles.studentName}>{student.name}</h4>
                      <p className={styles.studentEmail}>{student.email}</p>
                      <p className={styles.studentCountry}>📍 {student.country}</p>
                    </div>
                  </div>
                </td>
                <td className={styles.courseInfo}>
                  <span className={styles.courseName}>{student.courseName}</span>
                  <span className={styles.enrollmentDate}>
                    Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                  </span>
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
                    <div className={styles.modulesProgress}>
                      {student.completedModules}/{student.totalModules} modules
                    </div>
                  </div>
                </td>
                <td className={styles.gradeCell}>
                  {getGradeBadge(student.grade)}
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
                    <button
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      onClick={() => console.log(`View student ${student.id}`)}
                    >
                      👁️
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.messageBtn}`}
                      onClick={() => {
                        setSelectedStudents([student.id]);
                        setShowMessageModal(true);
                      }}
                    >
                      💬
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
          <div className={styles.emptyIcon}>👥</div>
          <h3 className={styles.emptyTitle}>No students found</h3>
          <p className={styles.emptyText}>
            {searchTerm || selectedCourse !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'Students will appear here once they enroll in your courses.'
            }
          </p>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.messageModal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Send Message to Students</h3>
              <button 
                className={styles.closeBtn}
                onClick={() => setShowMessageModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleMessageSubmit} className={styles.messageForm}>
              <div className={styles.recipientsInfo}>
                <p>
                  <strong>Recipients:</strong> {selectedStudents.length} student(s) selected
                </p>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subject *</label>
                <input
                  type="text"
                  value={messageData.subject}
                  onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
                  className={styles.formInput}
                  placeholder="Enter message subject"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Message *</label>
                <textarea
                  value={messageData.message}
                  onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                  className={styles.formTextarea}
                  rows="6"
                  placeholder="Type your message here..."
                  required
                />
              </div>
              
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowMessageModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.sendBtn}
                >
                  📤 Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStudents;