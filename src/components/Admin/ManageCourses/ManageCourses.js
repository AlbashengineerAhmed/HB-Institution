import React, { useState } from 'react';
import styles from './ManageCourses.module.css';

const ManageCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Static course data
  const coursesData = [
    {
      id: 1,
      name: 'Advanced Islamic Studies',
      instructor: 'Dr. Ahmed Hassan',
      students: 45,
      rating: 4.8,
      status: 'pending',
      category: 'Islamic Studies',
      createdAt: '2024-01-15',
      description: 'Comprehensive course covering advanced topics in Islamic theology and jurisprudence.'
    },
    {
      id: 2,
      name: 'Quran Recitation Basics',
      instructor: 'Sheikh Omar Ali',
      students: 78,
      rating: 4.9,
      status: 'approved',
      category: 'Quran Studies',
      createdAt: '2024-01-10',
      description: 'Learn proper Quran recitation with Tajweed rules and pronunciation.'
    },
    {
      id: 3,
      name: 'Arabic Language Fundamentals',
      instructor: 'Prof. Fatima Al-Zahra',
      students: 62,
      rating: 4.7,
      status: 'approved',
      category: 'Language',
      createdAt: '2024-01-08',
      description: 'Master the basics of Arabic language including grammar and vocabulary.'
    },
    {
      id: 4,
      name: 'Islamic History and Civilization',
      instructor: 'Dr. Muhammad Yusuf',
      students: 34,
      rating: 4.6,
      status: 'rejected',
      category: 'History',
      createdAt: '2024-01-12',
      description: 'Explore the rich history and contributions of Islamic civilization.'
    },
    {
      id: 5,
      name: 'Hadith Studies',
      instructor: 'Sheikh Abdullah Rahman',
      students: 56,
      rating: 4.8,
      status: 'approved',
      category: 'Islamic Studies',
      createdAt: '2024-01-05',
      description: 'Study authentic Hadith collections and their interpretations.'
    },
    {
      id: 6,
      name: 'Islamic Finance Principles',
      instructor: 'Dr. Sarah Ahmed',
      students: 29,
      rating: 4.5,
      status: 'pending',
      category: 'Finance',
      createdAt: '2024-01-18',
      description: 'Understanding Sharia-compliant financial principles and practices.'
    }
  ];

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusChange = (courseId, newStatus) => {
    console.log(`Course ${courseId} status changed to ${newStatus}`);
    // In a real app, this would update the backend
  };

  const handleDeleteCourse = (courseId) => {
    console.log(`Course ${courseId} deleted`);
    // In a real app, this would delete from backend
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: styles.statusPending,
      approved: styles.statusApproved,
      rejected: styles.statusRejected
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className={styles.manageCourses}>
      {/* Header with filters */}
      <div className={styles.courseHeader}>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search courses or instructors..."
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Categories</option>
            <option value="Islamic Studies">Islamic Studies</option>
            <option value="Quran Studies">Quran Studies</option>
            <option value="Language">Language</option>
            <option value="History">History</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className={styles.tableContainer}>
        <table className={styles.coursesTable}>
          <thead>
            <tr>
              <th>Course Details</th>
              <th>Instructor</th>
              <th>Students</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id} className={styles.courseRow}>
                <td className={styles.courseDetails}>
                  <div className={styles.courseInfo}>
                    <h4 className={styles.courseName}>{course.name}</h4>
                    <p className={styles.courseDescription}>{course.description}</p>
                    <span className={styles.courseCategory}>{course.category}</span>
                  </div>
                </td>
                <td className={styles.instructorCell}>
                  <div className={styles.instructorInfo}>
                    <div className={styles.instructorAvatar}>
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={styles.instructorName}>{course.instructor}</span>
                  </div>
                </td>
                <td className={styles.studentsCell}>
                  <span className={styles.studentsCount}>{course.students}</span>
                </td>
                <td className={styles.ratingCell}>
                  <div className={styles.rating}>
                    <span className={styles.ratingValue}>⭐ {course.rating}</span>
                  </div>
                </td>
                <td className={styles.statusCell}>
                  {getStatusBadge(course.status)}
                </td>
                <td className={styles.actionsCell}>
                  <div className={styles.actionButtons}>
                    {course.status === 'pending' && (
                      <>
                        <button
                          className={`${styles.actionBtn} ${styles.approveBtn}`}
                          onClick={() => handleStatusChange(course.id, 'approved')}
                        >
                          ✓ Approve
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.rejectBtn}`}
                          onClick={() => handleStatusChange(course.id, 'rejected')}
                        >
                          ✗ Reject
                        </button>
                      </>
                    )}
                    <button
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      onClick={() => console.log(`View course ${course.id}`)}
                    >
                      👁 View
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleDeleteCourse(course.id)}
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

      {filteredCourses.length === 0 && (
        <div className={styles.emptyState}>
          <p>No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;