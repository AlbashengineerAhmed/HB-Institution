import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserHistory } from '../../../services/userLogsService';
import { toast } from 'react-toastify';
import styles from './UserLogs.module.css';

const UserLogs = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserHistory = async (userId) => {
    try {
      setHistoryLoading(true);
      const response = await getUserHistory(userId);
      setUserHistory(response.data || []);
    } catch (error) {
      console.error('Error fetching user history:', error);
      toast.error('Failed to fetch user history');
      setUserHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchUserHistory(user._id);
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setUserHistory([]);
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return '👑';
      case 'instructor':
        return '👨‍🏫';
      case 'student':
        return '👨‍🎓';
      default:
        return '👤';
    }
  };

  const getRoleClass = (role) => {
    switch (role) {
      case 'admin':
        return styles.roleAdmin;
      case 'instructor':
        return styles.roleInstructor;
      case 'student':
        return styles.roleStudent;
      default:
        return styles.roleDefault;
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'ENROLL_COURSE':
        return '📚';
      case 'LOGIN':
        return '🔐';
      case 'LOGOUT':
        return '🚪';
      case 'COMPLETE_LESSON':
        return '✅';
      case 'START_LESSON':
        return '▶️';
      default:
        return '📝';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className={styles.userLogs}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userLogs}>
      {!selectedUser ? (
        // Users List View
        <div className={styles.usersSection}>
          <div className={styles.header}>
            <h2>👥 User Logs History</h2>
            <p>Select a user to view their activity history</p>
          </div>

          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <i className="fas fa-search"></i>
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={styles.roleFilter}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className={styles.usersGrid}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={styles.userCard}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className={styles.userAvatar}>
                    {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <div className={styles.userInfo}>
                    <h3 className={styles.userName}>
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className={styles.userEmail}>{user.email}</p>
                    <div className={`${styles.userRole} ${getRoleClass(user.role)}`}>
                      <span className={styles.roleIcon}>{getRoleIcon(user.role)}</span>
                      <span className={styles.roleText}>{user.role}</span>
                    </div>
                    {user.specialization && user.specialization.length > 0 && (
                      <div className={styles.specialization}>
                        <small>{user.specialization.join(', ')}</small>
                      </div>
                    )}
                  </div>
                  <div className={styles.viewHistoryIcon}>
                    <i className="fas fa-history"></i>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noUsers}>
                <i className="fas fa-users"></i>
                <h3>No users found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // User History View
        <div className={styles.historySection}>
          <div className={styles.historyHeader}>
            <button
              onClick={handleBackToUsers}
              className={styles.backButton}
            >
              <i className="fas fa-arrow-left"></i>
              Back to Users
            </button>
            
            <div className={styles.selectedUserInfo}>
              <div className={styles.userAvatar}>
                {selectedUser.firstName?.charAt(0) || selectedUser.email?.charAt(0) || 'U'}
              </div>
              <div className={styles.userDetails}>
                <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
                <p>{selectedUser.email}</p>
                <div className={`${styles.userRole} ${getRoleClass(selectedUser.role)}`}>
                  <span className={styles.roleIcon}>{getRoleIcon(selectedUser.role)}</span>
                  <span className={styles.roleText}>{selectedUser.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.historyContent}>
            <h3>📋 Activity History ({userHistory.length} activities)</h3>
            
            {historyLoading ? (
              <div className={styles.historyLoading}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading user history...</p>
              </div>
            ) : userHistory.length > 0 ? (
              <div className={styles.historyList}>
                {userHistory.map((activity) => (
                  <div key={activity.id} className={styles.historyItem}>
                    <div className={styles.activityIcon}>
                      {getActionIcon(activity.action)}
                    </div>
                    <div className={styles.activityContent}>
                      <div className={styles.activityHeader}>
                        <h4 className={styles.activityAction}>
                          {activity.action.replace(/_/g, ' ')}
                        </h4>
                        <span className={styles.activityDate}>
                          {formatDate(activity.createdAt)}
                        </span>
                      </div>
                      
                      {activity.metadata && (
                        <div className={styles.activityMetadata}>
                          {activity.metadata.Course && (
                            <div className={styles.metadataItem}>
                              <strong>Course:</strong> {activity.metadata.Course}
                            </div>
                          )}
                          {activity.metadata.Instructor && (
                            <div className={styles.metadataItem}>
                              <strong>Instructor:</strong> {activity.metadata.Instructor}
                            </div>
                          )}
                          {activity.metadata.GroupCode && (
                            <div className={styles.metadataItem}>
                              <strong>Group:</strong> {activity.metadata.GroupCode}
                            </div>
                          )}
                          {activity.metadata.GroupName && (
                            <div className={styles.metadataItem}>
                              <strong>Group:</strong> {activity.metadata.GroupName}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noHistory}>
                <i className="fas fa-history"></i>
                <h3>No activity history</h3>
                <p>This user has no recorded activities yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLogs;