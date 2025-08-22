import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, markAllAsRead, clearAllNotifications } from '../../../store/slices/notificationSlice';
import styles from './NotificationBell.module.css';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle notification panel
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      // Mark all as read when opening
      dispatch(markAllAsRead());
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'meeting_reminder':
        return '🔔';
      case 'message':
        return '✉️';
      case 'alert':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return 'ℹ️';
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    dispatch(markAsRead(notification.id));
    
    // Handle meeting reminders
    if (notification.type === 'meeting_reminder' && notification.data?.joinUrl) {
      window.open(notification.data.joinUrl, '_blank');
    }
  };

  return (
    <div className={styles.notificationContainer} ref={notificationRef}>
      <button 
        className={styles.bellButton} 
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <span className={styles.bellIcon}>🔔</span>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.notificationPanel}>
          <div className={styles.notificationHeader}>
            <h3>Notifications</h3>
            <div className={styles.notificationActions}>
              <button 
                onClick={() => dispatch(markAllAsRead())}
                className={styles.actionButton}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
              <button 
                onClick={() => dispatch(clearAllNotifications())}
                className={styles.actionButton}
                disabled={notifications.length === 0}
              >
                Clear all
              </button>
            </div>
          </div>

          <div className={styles.notificationList}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className={styles.notificationContent}>
                    <h4 className={styles.notificationTitle}>{notification.title}</h4>
                    <p className={styles.notificationMessage}>{notification.message}</p>
                    <span className={styles.notificationTime}>
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;