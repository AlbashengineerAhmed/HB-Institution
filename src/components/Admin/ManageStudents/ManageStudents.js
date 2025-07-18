import React, { useState } from 'react';
import styles from './ManageStudents.module.css';

const ManageStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Static student data with simplified structure
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
      progress: 75,
      avatar: null,
      address: '123 Main St, City, State',
      dateOfBirth: '1995-03-15',
      emergencyContact: '+1-555-0301'
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
      progress: 100,
      avatar: null,
      address: '456 Oak Ave, City, State',
      dateOfBirth: '1992-07-22',
      emergencyContact: '+1-555-0302'
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
      progress: 25,
      avatar: null,
      address: '789 Pine St, City, State',
      dateOfBirth: '1998-11-08',
      emergencyContact: '+1-555-0303'
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
      progress: 60,
      avatar: null,
      address: '321 Elm St, City, State',
      dateOfBirth: '1994-05-12',
      emergencyContact: '+1-555-0304'
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
      progress: 85,
      avatar: null,
      address: '654 Maple Dr, City, State',
      dateOfBirth: '1996-09-30',
      emergencyContact: '+1-555-0305'
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
      progress: 15,
      avatar: null,
      address: '987 Cedar Ln, City, State',
      dateOfBirth: '1997-12-03',
      emergencyContact: '+1-555-0306'
    },
    {
      id: 7,
      name: 'Hassan Ibrahim',
      email: 'hassan.ibrahim@email.com',
      phone: '+1-555-0207',
      enrolledCourses: ['Advanced Islamic Studies', 'Islamic History and Civilization'],
      totalCourses: 2,
      completedCourses: 1,
      status: 'active',
      joinDate: '2023-06-18',
      lastActivity: '2024-01-22',
      progress: 90,
      avatar: null,
      address: '147 Birch St, City, State',
      dateOfBirth: '1993-04-25',
      emergencyContact: '+1-555-0307'
    },
    {
      id: 8,
      name: 'Khadija Malik',
      email: 'khadija.malik@email.com',
      phone: '+1-555-0208',
      enrolledCourses: ['Quran Recitation Basics'],
      totalCourses: 1,
      completedCourses: 1,
      status: 'active',
      joinDate: '2023-12-01',
      lastActivity: '2024-01-23',
      progress: 100,
      avatar: null,
      address: '258 Willow Ave, City, State',
      dateOfBirth: '1999-01-17',
      emergencyContact: '+1-555-0308'
    }
  ];

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (studentId, newStatus) => {
    console.log(`Student ${studentId} status changed to ${newStatus}`);
    // In a real app, this would update the backend
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      console.log('Deleting student:', studentToDelete.name);
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedStudent(null);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: styles.statusActive,
      suspended: styles.statusSuspended,
      banned: styles.statusBanned
    };
    
    const statusIcons = {
      active: '✅',
      suspended: '⏸️',
      banned: '🚫'
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {statusIcons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLastActivityText = (lastActivity) => {
    const date = new Date(lastActivity);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(lastActivity);
  };

  return (
    <div className={styles.manageStudents}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Manage Students</h1>
          <p className={styles.subtitle}>Total: {studentsData.length} students</p>
        </div>
        
        <div className={styles.headerActions}>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          
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
        </div>
      </div>

      {/* Status Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryNumber}>
            {studentsData.filter(s => s.status === 'active').length}
          </div>
          <div className={styles.summaryLabel}>Active</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryNumber}>
            {studentsData.filter(s => s.status === 'suspended').length}
          </div>
          <div className={styles.summaryLabel}>Suspended</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryNumber}>
            {studentsData.filter(s => s.status === 'banned').length}
          </div>
          <div className={styles.summaryLabel}>Banned</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryNumber}>{studentsData.length}</div>
          <div className={styles.summaryLabel}>Total</div>
        </div>
      </div>

      {/* Students Grid */}
      <div className={styles.grid}>
        {filteredStudents.map((student) => (
          <div key={student.id} className={`${styles.card} ${student.status === 'banned' ? styles.bannedCard : student.status === 'suspended' ? styles.suspendedCard : ''}`}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} />
                ) : (
                  <div className={styles.avatarText}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{student.name}</h3>
                <p className={styles.email}>{student.email}</p>
                <p className={styles.phone}>{student.phone}</p>
              </div>
              <div className={styles.badges}>
                {getStatusBadge(student.status)}
              </div>
            </div>

            {/* Card Details */}
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Joined:</span>
                <span className={styles.detailValue}>{formatDate(student.joinDate)}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Last Activity:</span>
                <span className={styles.detailValue}>{getLastActivityText(student.lastActivity)}</span>
              </div>
            </div>

            {/* Card Actions - Simplified */}
            <div className={styles.actions}>
              {student.status !== 'banned' && (
                <button
                  className={`${styles.btn} ${styles.banBtn}`}
                  onClick={() => handleStatusChange(student.id, 'banned')}
                >
                  🚫 Ban
                </button>
              )}
              
              <button
                className={`${styles.btn} ${styles.viewBtn}`}
                onClick={() => handleViewDetails(student)}
              >
                👁️ View Details
              </button>
              
              <button
                className={`${styles.btn} ${styles.deleteBtn}`}
                onClick={() => handleDeleteClick(student)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>👨‍🎓</div>
          <h3>No Students Found</h3>
          <p>
            {searchTerm || statusFilter !== 'all' 
              ? 'No students match your current filters.'
              : 'No students have been registered yet.'
            }
          </p>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className={styles.modalOverlay} onClick={handleCloseDetails}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Student Details</h3>
              <button className={styles.closeBtn} onClick={handleCloseDetails}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                <div className={styles.modalSection}>
                  <h4>Personal Information</h4>
                  <div className={styles.modalRow}>
                    <span>Full Name:</span>
                    <span>{selectedStudent.name}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Email:</span>
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Phone:</span>
                    <span>{selectedStudent.phone}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Date of Birth:</span>
                    <span>{formatDate(selectedStudent.dateOfBirth)}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Address:</span>
                    <span>{selectedStudent.address}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Emergency Contact:</span>
                    <span>{selectedStudent.emergencyContact}</span>
                  </div>
                </div>

                <div className={styles.modalSection}>
                  <h4>Academic Information</h4>
                  <div className={styles.modalRow}>
                    <span>Enrolled Courses:</span>
                    <span>{selectedStudent.enrolledCourses.join(', ')}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Total Courses:</span>
                    <span>{selectedStudent.totalCourses}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Completed Courses:</span>
                    <span>{selectedStudent.completedCourses}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Overall Progress:</span>
                    <span>{selectedStudent.progress}%</span>
                  </div>
                </div>

                <div className={styles.modalSection}>
                  <h4>Account Information</h4>
                  <div className={styles.modalRow}>
                    <span>Status:</span>
                    <span>{getStatusBadge(selectedStudent.status)}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Join Date:</span>
                    <span>{formatDate(selectedStudent.joinDate)}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Last Activity:</span>
                    <span>{getLastActivityText(selectedStudent.lastActivity)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={handleCancelDelete}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Confirm Delete</h3>
              <button className={styles.closeBtn} onClick={handleCancelDelete}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <p>Are you sure you want to delete student <strong>{studentToDelete?.name}</strong>?</p>
              <p className={styles.warning}>This action cannot be undone and will remove all student progress and enrollment data.</p>
            </div>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className={`${styles.btn} ${styles.deleteBtn}`}
                onClick={handleConfirmDelete}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;