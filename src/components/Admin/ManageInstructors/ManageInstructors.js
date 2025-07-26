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
import { setInstructorAvailability, getAllInstructors } from '../../../services/instructorService';
import styles from './ManageInstructors.module.css';

const ManageInstructors = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [availabilityInstructor, setAvailabilityInstructor] = useState(null);
  const [availabilityData, setAvailabilityData] = useState({
    sunday: { enabled: false, from: 9, to: 17 },
    monday: { enabled: false, from: 9, to: 17 },
    tuesday: { enabled: false, from: 9, to: 17 },
    wednesday: { enabled: false, from: 9, to: 17 },
    thursday: { enabled: false, from: 9, to: 17 },
    friday: { enabled: false, from: 9, to: 17 },
    saturday: { enabled: false, from: 9, to: 17 }
  });
  const [isSettingAvailability, setIsSettingAvailability] = useState(false);
  const [showInstructorCalendar, setShowInstructorCalendar] = useState(false);
  const [calendarInstructor, setCalendarInstructor] = useState(null);

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

  const handleSetAvailability = async (instructor) => {
    setAvailabilityInstructor(instructor);
    
    // Load existing availability data
    try {
      const response = await getAllInstructors();
      const instructorData = response.data?.find(inst => inst._id === instructor.id);
      
      if (instructorData?.availableTime) {
        const newAvailabilityData = {
          sunday: { enabled: false, from: 9, to: 17 },
          monday: { enabled: false, from: 9, to: 17 },
          tuesday: { enabled: false, from: 9, to: 17 },
          wednesday: { enabled: false, from: 9, to: 17 },
          thursday: { enabled: false, from: 9, to: 17 },
          friday: { enabled: false, from: 9, to: 17 },
          saturday: { enabled: false, from: 9, to: 17 }
        };
        
        // Populate existing availability
        Object.entries(instructorData.availableTime).forEach(([day, timeData]) => {
          if (newAvailabilityData[day.toLowerCase()]) {
            newAvailabilityData[day.toLowerCase()] = {
              enabled: true,
              from: timeData.from,
              to: timeData.to
            };
          }
        });
        
        setAvailabilityData(newAvailabilityData);
      } else {
        // Reset to default if no existing data
        setAvailabilityData({
          sunday: { enabled: false, from: 9, to: 17 },
          monday: { enabled: false, from: 9, to: 17 },
          tuesday: { enabled: false, from: 9, to: 17 },
          wednesday: { enabled: false, from: 9, to: 17 },
          thursday: { enabled: false, from: 9, to: 17 },
          friday: { enabled: false, from: 9, to: 17 },
          saturday: { enabled: false, from: 9, to: 17 }
        });
      }
    } catch (error) {
      console.error('Error loading instructor availability:', error);
      // Reset to default on error
      setAvailabilityData({
        sunday: { enabled: false, from: 9, to: 17 },
        monday: { enabled: false, from: 9, to: 17 },
        tuesday: { enabled: false, from: 9, to: 17 },
        wednesday: { enabled: false, from: 9, to: 17 },
        thursday: { enabled: false, from: 9, to: 17 },
        friday: { enabled: false, from: 9, to: 17 },
        saturday: { enabled: false, from: 9, to: 17 }
      });
    }
    
    setShowAvailabilityModal(true);
  };

  const handleCloseAvailability = () => {
    setShowAvailabilityModal(false);
    setAvailabilityInstructor(null);
    setAvailabilityData({
      sunday: { enabled: false, from: 9, to: 17 },
      monday: { enabled: false, from: 9, to: 17 },
      tuesday: { enabled: false, from: 9, to: 17 },
      wednesday: { enabled: false, from: 9, to: 17 },
      thursday: { enabled: false, from: 9, to: 17 },
      friday: { enabled: false, from: 9, to: 17 },
      saturday: { enabled: false, from: 9, to: 17 }
    });
  };

  const handleAvailabilitySubmit = async () => {
    if (!availabilityInstructor) return;

    try {
      setIsSettingAvailability(true);
      
      // Build availableTime object from enabled days
      const availableTime = {};
      let hasEnabledDays = false;
      
      Object.entries(availabilityData).forEach(([day, dayData]) => {
        if (dayData.enabled) {
          // Validate time range
          if (dayData.from >= dayData.to) {
            throw new Error(`Invalid time range for ${day}: 'from' time must be less than 'to' time`);
          }
          
          availableTime[day] = {
            from: dayData.from,
            to: dayData.to
          };
          hasEnabledDays = true;
        }
      });
      
      if (!hasEnabledDays) {
        throw new Error('Please select at least one day with availability');
      }
      
      console.log('Submitting availability:', availableTime);
      
      await setInstructorAvailability(
        availabilityInstructor.id,
        availableTime
      );
      
      // Refresh the instructors list to show updated availability
      dispatch(fetchInstructors());
      
      handleCloseAvailability();
    } catch (error) {
      console.error('Error setting availability:', error);
      // The error will be shown via toast from the service
    } finally {
      setIsSettingAvailability(false);
    }
  };

  // Helper function to update day availability
  const updateDayAvailability = (day, field, value) => {
    setAvailabilityData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleShowInstructorCalendar = async (instructor) => {
    try {
      const response = await getAllInstructors();
      const instructorData = response.data?.find(inst => inst._id === instructor.id);
      setCalendarInstructor({
        ...instructor,
        availableTime: instructorData?.availableTime || {}
      });
      setShowInstructorCalendar(true);
    } catch (error) {
      console.error('Error fetching instructor calendar data:', error);
    }
  };

  const handleCloseInstructorCalendar = () => {
    setShowInstructorCalendar(false);
    setCalendarInstructor(null);
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
                <button
                  className={`${styles.btn} ${styles.availabilityBtn}`}
                  onClick={() => handleSetAvailability(instructor)}
                  title={`Set availability for ${instructor.name}`}
                >
                  📅 Set Availability
                </button>
                <button
                  className={`${styles.btn} ${styles.calendarBtn}`}
                  onClick={() => handleShowInstructorCalendar(instructor)}
                  title={`View ${instructor.name}'s availability calendar`}
                >
                  📆 View Calendar
                </button>
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

      {/* Set Availability Modal */}
      {showAvailabilityModal && availabilityInstructor && (
        <div className={styles.modalOverlay} onClick={handleCloseAvailability}>
          <div className={styles.availabilityModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Set Weekly Availability for {availabilityInstructor.name}</h3>
              <button className={styles.closeBtn} onClick={handleCloseAvailability}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.availabilityForm}>
                <p className={styles.formDescription}>
                  Select the days and time ranges when this instructor is available. 
                  You can set multiple days at once.
                </p>
                
                <div className={styles.daysGrid}>
                  {Object.entries(availabilityData).map(([day, dayData]) => (
                    <div key={day} className={styles.dayCard}>
                      <div className={styles.dayHeader}>
                        <label className={styles.dayCheckbox}>
                          <input
                            type="checkbox"
                            checked={dayData.enabled}
                            onChange={(e) => updateDayAvailability(day, 'enabled', e.target.checked)}
                          />
                          <span className={styles.dayName}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </span>
                        </label>
                      </div>
                      
                      {dayData.enabled && (
                        <div className={styles.timeInputs}>
                          <div className={styles.timeGroup}>
                            <label>From:</label>
                            <input
                              type="number"
                              min="0"
                              max="23"
                              value={dayData.from}
                              onChange={(e) => updateDayAvailability(day, 'from', parseInt(e.target.value))}
                              className={styles.timeInput}
                            />
                            <span>:00</span>
                          </div>
                          
                          <div className={styles.timeGroup}>
                            <label>To:</label>
                            <input
                              type="number"
                              min="0"
                              max="23"
                              value={dayData.to}
                              onChange={(e) => updateDayAvailability(day, 'to', parseInt(e.target.value))}
                              className={styles.timeInput}
                            />
                            <span>:00</span>
                          </div>
                          
                          <div className={styles.timePreview}>
                            {dayData.from}:00 - {dayData.to}:00
                            {dayData.from >= dayData.to && (
                              <span className={styles.timeError}>⚠️ Invalid range</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className={styles.availabilitySummary}>
                  <h4>Summary:</h4>
                  {Object.entries(availabilityData).filter(([_, dayData]) => dayData.enabled).length === 0 ? (
                    <p className={styles.noSelection}>No days selected</p>
                  ) : (
                    <div className={styles.selectedDays}>
                      {Object.entries(availabilityData)
                        .filter(([_, dayData]) => dayData.enabled)
                        .map(([day, dayData]) => (
                          <div key={day} className={styles.summaryDay}>
                            <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> 
                            {dayData.from}:00 - {dayData.to}:00
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={handleCloseAvailability}
              >
                Cancel
              </button>
              <button
                className={`${styles.btn} ${styles.saveBtn}`}
                onClick={handleAvailabilitySubmit}
                disabled={isSettingAvailability || Object.entries(availabilityData).filter(([_, dayData]) => dayData.enabled).length === 0}
              >
                {isSettingAvailability ? '⏳ Saving...' : '💾 Save Availability'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Instructor Calendar Modal */}
      {showInstructorCalendar && calendarInstructor && (
        <div className={styles.modalOverlay} onClick={handleCloseInstructorCalendar}>
          <div className={styles.calendarModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📅 {calendarInstructor.name}'s Availability Calendar</h3>
              <button className={styles.closeBtn} onClick={handleCloseInstructorCalendar}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.instructorCalendarContainer}>
                <div className={styles.calendarHeader}>
                  <div className={styles.instructorInfo}>
                    <div className={styles.instructorAvatar}>
                      {calendarInstructor.avatar && calendarInstructor.avatar !== 'default-avatar.jpg' ? (
                        <img src={calendarInstructor.avatar} alt={calendarInstructor.name} />
                      ) : (
                        <div className={styles.avatarText}>
                          {calendarInstructor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div className={styles.instructorDetails}>
                      <h4>{calendarInstructor.name}</h4>
                      <p>{calendarInstructor.email}</p>
                      <p>{calendarInstructor.specialization}</p>
                    </div>
                  </div>
                  <div className={styles.calendarStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>
                        {Object.keys(calendarInstructor.availableTime || {}).length}
                      </span>
                      <span className={styles.statLabel}>Available Days</span>
                    </div>
                  </div>
                </div>

                <div className={styles.weeklyCalendar}>
                  <h4>📅 Weekly Availability Schedule</h4>
                  <div className={styles.calendarGrid}>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                      const dayKey = day.toLowerCase();
                      const dayData = calendarInstructor.availableTime?.[dayKey];
                      const isAvailable = dayData && dayData.from !== undefined && dayData.to !== undefined;
                      
                      return (
                        <div key={day} className={`${styles.calendarDay} ${isAvailable ? styles.availableDay : styles.unavailableDay}`}>
                          <div className={styles.dayHeader}>
                            <span className={styles.dayName}>{day}</span>
                            <span className={styles.dayStatus}>
                              {isAvailable ? '✅' : '❌'}
                            </span>
                          </div>
                          <div className={styles.dayContent}>
                            {isAvailable ? (
                              <div className={styles.timeSlot}>
                                <div className={styles.timeRange}>
                                  🕐 {dayData.from}:00 - {dayData.to}:00
                                </div>
                                <div className={styles.duration}>
                                  ⏱️ {dayData.to - dayData.from} hours
                                </div>
                              </div>
                            ) : (
                              <div className={styles.noTimeSlot}>
                                <span>Not Available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {Object.keys(calendarInstructor.availableTime || {}).length === 0 && (
                  <div className={styles.noAvailabilityMessage}>
                    <div className={styles.noAvailabilityIcon}>📅</div>
                    <h4>No Availability Set</h4>
                    <p>This instructor hasn't set their availability schedule yet.</p>
                    <button
                      className={`${styles.btn} ${styles.setAvailabilityBtn}`}
                      onClick={() => {
                        handleCloseInstructorCalendar();
                        handleSetAvailability(calendarInstructor);
                      }}
                    >
                      📅 Set Availability
                    </button>
                  </div>
                )}

                {Object.keys(calendarInstructor.availableTime || {}).length > 0 && (
                  <div className={styles.availabilitySummarySection}>
                    <h4>📊 Availability Summary</h4>
                    <div className={styles.summaryStats}>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Total Available Days:</span>
                        <span className={styles.summaryValue}>
                          {Object.keys(calendarInstructor.availableTime || {}).length} days
                        </span>
                      </div>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Total Weekly Hours:</span>
                        <span className={styles.summaryValue}>
                          {Object.values(calendarInstructor.availableTime || {}).reduce((total, day) => {
                            return total + (day.to - day.from);
                          }, 0)} hours
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.editAvailabilityBtn}`}
                onClick={() => {
                  handleCloseInstructorCalendar();
                  handleSetAvailability(calendarInstructor);
                }}
              >
                ✏️ Edit Availability
              </button>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={handleCloseInstructorCalendar}
              >
                Close
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