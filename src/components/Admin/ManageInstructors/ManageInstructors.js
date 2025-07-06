import React, { useState } from 'react';
import styles from './ManageInstructors.module.css';

const ManageInstructors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Static instructor data
  const instructorsData = [
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      email: 'ahmed.hassan@hbi.edu',
      specialization: 'Islamic Studies',
      courses: 3,
      students: 145,
      rating: 4.8,
      status: 'active',
      role: 'instructor',
      joinDate: '2023-08-15',
      phone: '+1-555-0123',
      qualifications: 'PhD in Islamic Studies, Al-Azhar University'
    },
    {
      id: 2,
      name: 'Sheikh Omar Ali',
      email: 'omar.ali@hbi.edu',
      specialization: 'Quran Studies',
      courses: 2,
      students: 98,
      rating: 4.9,
      status: 'active',
      role: 'instructor',
      joinDate: '2023-09-01',
      phone: '+1-555-0124',
      qualifications: 'Master in Quranic Sciences, Islamic University of Medina'
    },
    {
      id: 3,
      name: 'Prof. Fatima Al-Zahra',
      email: 'fatima.alzahra@hbi.edu',
      specialization: 'Arabic Language',
      courses: 4,
      students: 187,
      rating: 4.7,
      status: 'active',
      role: 'admin',
      joinDate: '2023-07-20',
      phone: '+1-555-0125',
      qualifications: 'PhD in Arabic Literature, Cairo University'
    },
    {
      id: 4,
      name: 'Dr. Muhammad Yusuf',
      email: 'muhammad.yusuf@hbi.edu',
      specialization: 'Islamic History',
      courses: 1,
      students: 34,
      rating: 4.6,
      status: 'pending',
      role: 'instructor',
      joinDate: '2024-01-10',
      phone: '+1-555-0126',
      qualifications: 'PhD in Islamic History, University of Damascus'
    },
    {
      id: 5,
      name: 'Sheikh Abdullah Rahman',
      email: 'abdullah.rahman@hbi.edu',
      specialization: 'Hadith Studies',
      courses: 2,
      students: 76,
      rating: 4.8,
      status: 'active',
      role: 'instructor',
      joinDate: '2023-10-05',
      phone: '+1-555-0127',
      qualifications: 'Master in Hadith Sciences, Islamic University of Medina'
    },
    {
      id: 6,
      name: 'Dr. Sarah Ahmed',
      email: 'sarah.ahmed@hbi.edu',
      specialization: 'Islamic Finance',
      courses: 1,
      students: 29,
      rating: 4.5,
      status: 'blocked',
      role: 'instructor',
      joinDate: '2023-11-12',
      phone: '+1-555-0128',
      qualifications: 'PhD in Islamic Finance, International Islamic University'
    }
  ];

  const filteredInstructors = instructorsData.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || instructor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (instructorId, newStatus) => {
    console.log(`Instructor ${instructorId} status changed to ${newStatus}`);
  };

  const handleRoleChange = (instructorId, newRole) => {
    console.log(`Instructor ${instructorId} role changed to ${newRole}`);
  };

  const handleDeleteInstructor = (instructorId) => {
    console.log(`Instructor ${instructorId} deleted`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: styles.statusActive,
      pending: styles.statusPending,
      blocked: styles.statusBlocked
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      instructor: styles.roleInstructor,
      admin: styles.roleAdmin
    };
    
    return (
      <span className={`${styles.roleBadge} ${roleClasses[role]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className={styles.manageInstructors}>
      {/* Header with filters */}
      <div className={styles.instructorHeader}>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search instructors..."
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
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
          
          <button className={styles.addInstructorBtn}>
            ➕ Add Instructor
          </button>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className={styles.instructorsGrid}>
        {filteredInstructors.map((instructor) => (
          <div key={instructor.id} className={styles.instructorCard}>
            <div className={styles.cardHeader}>
              <div className={styles.instructorAvatar}>
                {instructor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={styles.instructorBasicInfo}>
                <h3 className={styles.instructorName}>{instructor.name}</h3>
                <p className={styles.instructorEmail}>{instructor.email}</p>
                <p className={styles.instructorSpecialization}>{instructor.specialization}</p>
              </div>
              <div className={styles.cardBadges}>
                {getStatusBadge(instructor.status)}
                {getRoleBadge(instructor.role)}
              </div>
            </div>

            <div className={styles.cardStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{instructor.courses}</span>
                <span className={styles.statLabel}>Courses</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{instructor.students}</span>
                <span className={styles.statLabel}>Students</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>⭐ {instructor.rating}</span>
                <span className={styles.statLabel}>Rating</span>
              </div>
            </div>

            <div className={styles.cardDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Phone:</span>
                <span className={styles.detailValue}>{instructor.phone}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Joined:</span>
                <span className={styles.detailValue}>{new Date(instructor.joinDate).toLocaleDateString()}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Qualifications:</span>
                <span className={styles.detailValue}>{instructor.qualifications}</span>
              </div>
            </div>

            <div className={styles.cardActions}>
              {instructor.status === 'pending' && (
                <button
                  className={`${styles.actionBtn} ${styles.approveBtn}`}
                  onClick={() => handleStatusChange(instructor.id, 'active')}
                >
                  ✓ Approve
                </button>
              )}
              
              {instructor.status === 'active' && instructor.role === 'instructor' && (
                <button
                  className={`${styles.actionBtn} ${styles.promoteBtn}`}
                  onClick={() => handleRoleChange(instructor.id, 'admin')}
                >
                  ⬆ Promote to Admin
                </button>
              )}
              
              {instructor.status === 'active' && (
                <button
                  className={`${styles.actionBtn} ${styles.blockBtn}`}
                  onClick={() => handleStatusChange(instructor.id, 'blocked')}
                >
                  🚫 Block
                </button>
              )}
              
              {instructor.status === 'blocked' && (
                <button
                  className={`${styles.actionBtn} ${styles.unblockBtn}`}
                  onClick={() => handleStatusChange(instructor.id, 'active')}
                >
                  ✓ Unblock
                </button>
              )}
              
              <button
                className={`${styles.actionBtn} ${styles.viewBtn}`}
                onClick={() => console.log(`View instructor ${instructor.id}`)}
              >
                👁 View Details
              </button>
              
              <button
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={() => handleDeleteInstructor(instructor.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInstructors.length === 0 && (
        <div className={styles.emptyState}>
          <p>No instructors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ManageInstructors;