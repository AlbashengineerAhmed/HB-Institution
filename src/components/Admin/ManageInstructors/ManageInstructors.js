import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchInstructors,
  toggleInstructorBlock,
  setSearchTerm,
  setStatusFilter,
  clearError,
  toggleInstructorBlockOptimistic
} from '../../../store/slices/instructorManagementSlice';
import styles from './ManageInstructors.module.css';

const ManageInstructors = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const { 
    instructors,
    isLoading,
    isUpdating,
    isDeleting,
    error,
    updateError,
    deleteError,
    searchTerm,
    statusFilter
  } = useSelector((state) => state.instructorManagement);

  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

  // Transform API data to match component expectations
  const transformedInstructors = instructors.map(instructor => {
    // CORRECT LOGIC: 
    // isBlocked = true means instructor is BLOCKED
    // isBlocked = false means instructor is ACTIVE (not blocked)
    const status = instructor.isBlocked === true ? 'blocked' : 'active';
    
    console.log(`DEBUG - Instructor: ${instructor.firstName} ${instructor.lastName}, isBlocked: ${instructor.isBlocked}, status: ${status}`);

    return {
      id: instructor._id,
      name: `${instructor.firstName} ${instructor.lastName}`,
      email: instructor.email,
      specialization: instructor.specialization?.join(', ') || 'Not specified',
      status: status,
      role: instructor.role,
      joinDate: instructor.createdAt,
      lastLogin: instructor.lastLogin,
      phone: instructor.phone || 'Not provided',
      qualifications: instructor.qualifications || 'Not provided',
      avatar: instructor.avatar,
      confirmed: instructor.confirmed,
      isActive: instructor.isActive,
      isBlocked: instructor.isBlocked,
      firstName: instructor.firstName,
      lastName: instructor.lastName
    };
  });

  const filteredInstructors = transformedInstructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || instructor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSearchChange = (value) => {
    dispatch(setSearchTerm(value));
  };

  const handleStatusFilterChange = (value) => {
    dispatch(setStatusFilter(value));
  };

  const handleToggleBlock = (instructor) => {
    console.log('=== TOGGLE BLOCK DEBUG ===');
    console.log('Instructor name:', instructor.name);
    console.log('Current instructor.isBlocked:', instructor.isBlocked);
    console.log('Current instructor.status:', instructor.status);
    
    if (instructor.isBlocked === true) {
      console.log('Action: UNBLOCK (will set isBlocked to false)');
    } else {
      console.log('Action: BLOCK (will set isBlocked to true)');
    }
    
    // Optimistic update
    dispatch(toggleInstructorBlockOptimistic({ 
      instructorId: instructor.id, 
      isBlocked: instructor.isBlocked 
    }));
    
    // API call
    dispatch(toggleInstructorBlock({ 
      instructorId: instructor.id, 
      isBlocked: instructor.isBlocked 
    }));
  };

  const handleDeleteClick = (instructor) => {
    setInstructorToDelete(instructor);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (instructorToDelete) {
      console.log('Deleting instructor:', instructorToDelete.name);
      setShowDeleteModal(false);
      setInstructorToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setInstructorToDelete(null);
  };

  const handleViewDetails = (instructor) => {
    setSelectedInstructor(instructor);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedInstructor(null);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: styles.statusActive,
      blocked: styles.statusBlocked
    };
    
    const statusIcons = {
      active: '✅',
      blocked: '🚫'
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {statusIcons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      instructor: styles.roleInstructor,
      admin: styles.roleAdmin
    };
    
    const roleIcons = {
      instructor: '����‍🏫',
      admin: '👑'
    };
    
    return (
      <span className={`${styles.roleBadge} ${roleClasses[role]}`}>
        {roleIcons[role]} {role.charAt(0).toUpperCase() + role.slice(1)}
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

  const getLastLoginText = (lastLogin) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(lastLogin);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>🔄</div>
        <p>Loading instructors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>❌</div>
        <h3>Error Loading Instructors</h3>
        <p>{error}</p>
        <button 
          className={styles.retryBtn}
          onClick={() => dispatch(fetchInstructors())}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.manageInstructors}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Manage Instructors</h1>
          <p className={styles.subtitle}>Total: {instructors.length} instructors</p>
        </div>
        
        <div className={styles.headerActions}>
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="active">Active (Not Blocked)</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Status Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryNumber}>
            {transformedInstructors.filter(i => i.status === 'active').length}
          </div>
          <div className={styles.summaryLabel}>Active</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryNumber}>
            {transformedInstructors.filter(i => i.status === 'blocked').length}
          </div>
          <div className={styles.summaryLabel}>Blocked</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryNumber}>{instructors.length}</div>
          <div className={styles.summaryLabel}>Total</div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className={styles.grid}>
        {filteredInstructors.map((instructor) => (
          <div key={instructor.id} className={`${styles.card} ${instructor.status === 'blocked' ? styles.blockedCard : ''}`}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                {instructor.avatar && instructor.avatar !== 'default-avatar.jpg' ? (
                  <img src={instructor.avatar} alt={instructor.name} />
                ) : (
                  <div className={styles.avatarText}>
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{instructor.name}</h3>
                <p className={styles.email}>{instructor.email}</p>
                <p className={styles.specialization}>{instructor.specialization}</p>
              </div>
              <div className={styles.badges}>
                {getStatusBadge(instructor.status)}
                {getRoleBadge(instructor.role)}
              </div>
            </div>

            {/* Card Details */}
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Joined:</span>
                <span className={styles.detailValue}>{formatDate(instructor.joinDate)}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Last Login:</span>
                <span className={styles.detailValue}>{getLastLoginText(instructor.lastLogin)}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>isBlocked:</span>
                <span className={styles.detailValue}>{instructor.isBlocked ? 'true' : 'false'}</span>
              </div>
            </div>

            {/* Card Actions */}
            <div className={styles.actions}>
              {/* 
                BUTTON LOGIC:
                - If instructor.status === 'active' (isBlocked = false), show BLOCK button
                - If instructor.status === 'blocked' (isBlocked = true), show UNBLOCK button
              */}
              {instructor.status === 'active' ? (
                <button
                  className={`${styles.btn} ${styles.blockBtn}`}
                  onClick={() => handleToggleBlock(instructor)}
                  disabled={isUpdating}
                  title={`Block ${instructor.name} (currently active)`}
                >
                  {isUpdating ? '⏳ Blocking...' : '🚫 Block'}
                </button>
              ) : (
                <button
                  className={`${styles.btn} ${styles.unblockBtn}`}
                  onClick={() => handleToggleBlock(instructor)}
                  disabled={isUpdating}
                  title={`Unblock ${instructor.name} (currently blocked)`}
                >
                  {isUpdating ? '⏳ Unblocking...' : '✅ Unblock'}
                </button>
              )}
              
              <button
                className={`${styles.btn} ${styles.viewBtn}`}
                onClick={() => handleViewDetails(instructor)}
              >
                👁 View Details
              </button>

              <button
                className={`${styles.btn} ${styles.deleteBtn}`}
                onClick={() => handleDeleteClick(instructor)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInstructors.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>👨‍🏫</div>
          <h3>No Instructors Found</h3>
          <p>
            {searchTerm || statusFilter !== 'all' 
              ? 'No instructors match your current filters.'
              : 'No instructors have been registered yet.'
            }
          </p>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedInstructor && (
        <div className={styles.modalOverlay} onClick={handleCloseDetails}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Instructor Details</h3>
              <button className={styles.closeBtn} onClick={handleCloseDetails}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                <div className={styles.modalSection}>
                  <h4>Personal Information</h4>
                  <div className={styles.modalRow}>
                    <span>Full Name:</span>
                    <span>{selectedInstructor.name}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Email:</span>
                    <span>{selectedInstructor.email}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Phone:</span>
                    <span>{selectedInstructor.phone}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Role:</span>
                    <span>{selectedInstructor.role}</span>
                  </div>
                </div>

                <div className={styles.modalSection}>
                  <h4>Professional Information</h4>
                  <div className={styles.modalRow}>
                    <span>Specialization:</span>
                    <span>{selectedInstructor.specialization}</span>
                  </div>
                </div>

                <div className={styles.modalSection}>
                  <h4>Account Information</h4>
                  <div className={styles.modalRow}>
                    <span>Status:</span>
                    <span>{getStatusBadge(selectedInstructor.status)}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Is Blocked:</span>
                    <span>{selectedInstructor.isBlocked ? 'Yes (true)' : 'No (false)'}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Join Date:</span>
                    <span>{formatDate(selectedInstructor.joinDate)}</span>
                  </div>
                  <div className={styles.modalRow}>
                    <span>Last Login:</span>
                    <span>{getLastLoginText(selectedInstructor.lastLogin)}</span>
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
              <p>Are you sure you want to delete instructor <strong>{instructorToDelete?.name}</strong>?</p>
              <p className={styles.warning}>This action cannot be undone.</p>
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
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {(updateError || deleteError) && (
        <div className={styles.errorToast}>
          <span>{updateError || deleteError}</span>
          <button onClick={() => dispatch(clearError())}>✕</button>
        </div>
      )}
    </div>
  );
};

export default ManageInstructors;