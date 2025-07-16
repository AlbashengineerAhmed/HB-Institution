import React, { useState, useEffect, useCallback } from 'react';
import styles from './RealTimeDashboard.module.css';

const RealTimeDashboard = ({ userType = 'student' }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [liveActivities, setLiveActivities] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState('offline');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate WebSocket connection
  useEffect(() => {
    // Simulate connection establishment
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
      addNotification('Connected to real-time tracking', 'success');
    }, 1000);

    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      simulateRealTimeUpdate();
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    // Simulate periodic activity updates
    const activityInterval = setInterval(() => {
      simulateActivityUpdate();
    }, 10000); // New activity every 10 seconds

    return () => {
      clearTimeout(connectTimer);
      clearInterval(updateInterval);
      clearInterval(activityInterval);
    };
  }, []);

  // Mock data for live session
  const mockCurrentSession = {
    id: 1,
    title: 'Islamic Finance Principles - Live Lecture',
    instructor: 'Dr. Sarah Ahmed',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    duration: 90,
    participants: 23,
    maxParticipants: 30,
    status: 'live',
    courseId: 1,
    courseName: 'Islamic Finance Principles'
  };

  const addNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Keep only 5 notifications
  }, []);

  const simulateRealTimeUpdate = useCallback(() => {
    // Simulate random online users update
    const mockUsers = [
      { id: 1, name: 'Ahmed Hassan', status: 'active', lastSeen: 'now' },
      { id: 2, name: 'Fatima Al-Zahra', status: 'active', lastSeen: 'now' },
      { id: 3, name: 'Omar Abdullah', status: 'idle', lastSeen: '2 min ago' },
      { id: 4, name: 'Aisha Mohamed', status: 'active', lastSeen: 'now' },
      { id: 5, name: 'Hassan Ali', status: 'away', lastSeen: '5 min ago' }
    ];

    // Randomly update user statuses
    const updatedUsers = mockUsers.map(user => ({
      ...user,
      status: Math.random() > 0.7 ? 'idle' : user.status,
      lastSeen: user.status === 'active' ? 'now' : user.lastSeen
    }));

    setOnlineUsers(updatedUsers);

    // Simulate attendance status changes
    if (Math.random() > 0.8) {
      const statuses = ['present', 'away', 'active'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      if (newStatus !== attendanceStatus) {
        setAttendanceStatus(newStatus);
        addNotification(`Attendance status changed to ${newStatus}`, 'info');
      }
    }

    // Simulate session updates
    if (Math.random() > 0.9 && !currentSession) {
      setCurrentSession(mockCurrentSession);
      addNotification('Live session started', 'success');
    }
  }, [attendanceStatus, currentSession, addNotification]);

  const simulateActivityUpdate = useCallback(() => {
    const activities = [
      'New quiz available: Module 2 Assessment',
      'Assignment submitted by student',
      'Discussion forum updated',
      'New video lecture uploaded',
      'Student joined live session',
      'Quiz completed by student',
      'New announcement posted'
    ];

    const newActivity = {
      id: Date.now(),
      message: activities[Math.floor(Math.random() * activities.length)],
      timestamp: new Date(),
      type: 'activity',
      user: userType === 'instructor' ? 'Student' : 'System'
    };

    setLiveActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 activities
    addNotification(newActivity.message, 'activity');
  }, [userType, addNotification]);

  const joinSession = () => {
    if (!currentSession) {
      setCurrentSession(mockCurrentSession);
      setAttendanceStatus('present');
      addNotification('Joined live session successfully', 'success');
    }
  };

  const leaveSession = () => {
    if (currentSession) {
      setCurrentSession(null);
      setAttendanceStatus('offline');
      addNotification('Left live session', 'info');
    }
  };

  const markAttendance = () => {
    setAttendanceStatus('present');
    addNotification('Attendance marked automatically', 'success');
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: '🟢',
      idle: '🟡',
      away: '🔴',
      offline: '⚫',
      present: '✅',
      absent: '❌'
    };
    return icons[status] || '⚫';
  };

  const getNotificationIcon = (type) => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      activity: '🎯'
    };
    return icons[type] || 'ℹ️';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={styles.realTimeDashboard}>
      {/* Header with Connection Status */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerTitle}>
          <h2>🔴 Real-Time Dashboard</h2>
          <p>Live tracking of attendance and activities</p>
        </div>
        
        <div className={styles.connectionStatus}>
          <div className={`${styles.statusIndicator} ${isConnected ? styles.connected : styles.disconnected}`}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>
              {isConnected ? 'Connected' : 'Connecting...'}
            </span>
          </div>
          <div className={styles.lastUpdate}>
            Last update: {formatTime(lastUpdate)}
          </div>
        </div>
      </div>

      {/* Live Session Card */}
      {currentSession && (
        <div className={styles.liveSessionCard}>
          <div className={styles.sessionHeader}>
            <div className={styles.sessionInfo}>
              <h3 className={styles.sessionTitle}>
                🔴 {currentSession.title}
              </h3>
              <p className={styles.sessionInstructor}>👨‍🏫 {currentSession.instructor}</p>
              <p className={styles.sessionTime}>
                🕐 {currentSession.startTime} - {currentSession.endTime}
              </p>
            </div>
            
            <div className={styles.sessionStats}>
              <div className={styles.sessionStat}>
                <span className={styles.statValue}>{currentSession.participants}</span>
                <span className={styles.statLabel}>Participants</span>
              </div>
              <div className={styles.sessionStat}>
                <span className={styles.statValue}>{currentSession.duration}m</span>
                <span className={styles.statLabel}>Duration</span>
              </div>
            </div>
          </div>
          
          <div className={styles.sessionActions}>
            <div className={styles.attendanceStatus}>
              {getStatusIcon(attendanceStatus)} Status: 
              <span className={`${styles.statusText} ${styles[attendanceStatus]}`}>
                {attendanceStatus.charAt(0).toUpperCase() + attendanceStatus.slice(1)}
              </span>
            </div>
            
            <div className={styles.sessionButtons}>
              {userType === 'student' && (
                <>
                  {!currentSession && (
                    <button className={styles.joinBtn} onClick={joinSession}>
                      📹 Join Session
                    </button>
                  )}
                  {currentSession && (
                    <button className={styles.leaveBtn} onClick={leaveSession}>
                      🚪 Leave Session
                    </button>
                  )}
                  <button className={styles.markAttendanceBtn} onClick={markAttendance}>
                    ✅ Mark Attendance
                  </button>
                </>
              )}
              
              {userType === 'instructor' && (
                <>
                  <button className={styles.viewParticipantsBtn}>
                    👥 View Participants
                  </button>
                  <button className={styles.endSessionBtn} onClick={leaveSession}>
                    ⏹️ End Session
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className={styles.dashboardGrid}>
        {/* Live Activities Feed */}
        <div className={styles.activitiesPanel}>
          <div className={styles.panelHeader}>
            <h3>🎯 Live Activities</h3>
            <span className={styles.activityCount}>{liveActivities.length} recent</span>
          </div>
          
          <div className={styles.activitiesList}>
            {liveActivities.length > 0 ? (
              liveActivities.map(activity => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>🎯</div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityMessage}>{activity.message}</p>
                    <div className={styles.activityMeta}>
                      <span className={styles.activityUser}>{activity.user}</span>
                      <span className={styles.activityTime}>
                        {formatTime(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🎯</div>
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </div>

        {/* Online Users */}
        <div className={styles.usersPanel}>
          <div className={styles.panelHeader}>
            <h3>👥 Online Users</h3>
            <span className={styles.userCount}>
              {onlineUsers.filter(u => u.status === 'active').length} active
            </span>
          </div>
          
          <div className={styles.usersList}>
            {onlineUsers.length > 0 ? (
              onlineUsers.map(user => (
                <div key={user.id} className={styles.userItem}>
                  <div className={styles.userAvatar}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>{user.name}</p>
                    <div className={styles.userStatus}>
                      {getStatusIcon(user.status)}
                      <span className={styles.userLastSeen}>{user.lastSeen}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>👥</div>
                <p>No users online</p>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className={styles.notificationsPanel}>
          <div className={styles.panelHeader}>
            <h3>🔔 Live Notifications</h3>
            <span className={styles.notificationCount}>{notifications.length}</span>
          </div>
          
          <div className={styles.notificationsList}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div key={notification.id} className={`${styles.notificationItem} ${styles[notification.type]}`}>
                  <div className={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className={styles.notificationContent}>
                    <p className={styles.notificationMessage}>{notification.message}</p>
                    <span className={styles.notificationTime}>{notification.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🔔</div>
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.statsPanel}>
          <div className={styles.panelHeader}>
            <h3>📊 Quick Stats</h3>
          </div>
          
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <div className={styles.quickStatIcon}>👥</div>
              <div className={styles.quickStatContent}>
                <span className={styles.quickStatValue}>{onlineUsers.length}</span>
                <span className={styles.quickStatLabel}>Online</span>
              </div>
            </div>
            
            <div className={styles.quickStat}>
              <div className={styles.quickStatIcon}>🎯</div>
              <div className={styles.quickStatContent}>
                <span className={styles.quickStatValue}>{liveActivities.length}</span>
                <span className={styles.quickStatLabel}>Activities</span>
              </div>
            </div>
            
            <div className={styles.quickStat}>
              <div className={styles.quickStatIcon}>🔔</div>
              <div className={styles.quickStatContent}>
                <span className={styles.quickStatValue}>{notifications.length}</span>
                <span className={styles.quickStatLabel}>Alerts</span>
              </div>
            </div>
            
            {currentSession && (
              <div className={styles.quickStat}>
                <div className={styles.quickStatIcon}>🔴</div>
                <div className={styles.quickStatContent}>
                  <span className={styles.quickStatValue}>{currentSession.participants}</span>
                  <span className={styles.quickStatLabel}>In Session</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auto-refresh indicator */}
      <div className={styles.autoRefresh}>
        <div className={styles.refreshIcon}>🔄</div>
        <span>Auto-refreshing every 5 seconds</span>
      </div>
    </div>
  );
};

export default RealTimeDashboard;