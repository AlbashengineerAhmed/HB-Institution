import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { requestNotificationPermission } from '../services/notificationService';
// import { initializeSocket, disconnectSocket } from '../services/notificationService';
import { toast } from 'react-toastify';

// Create context
const NotificationContext = createContext();

/**
 * Provider component for notification context
 * Manages notification state and socket connection
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [meetingReminders, setMeetingReminders] = useState([]);
  const [notificationPermission, setNotificationPermission] = useState('default');
  // const [socket, setSocket] = useState(null);

  // Handle meeting reminder notifications
  const handleMeetingReminder = useCallback((reminder) => {
    // Add to meeting reminders list
    setMeetingReminders(prev => [reminder, ...prev]);
    
    // Add to general notifications
    const notification = {
      id: Date.now(),
      type: 'meeting_reminder',
      title: `Meeting: ${reminder.lessonTitle}`,
      message: `Starts soon with ${reminder.instructorName}`,
      data: reminder,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [notification, ...prev]);
    
    // Show toast notification
    toast.info(
      <div>
        <strong>{notification.title}</strong>
        <p>{notification.message}</p>
        <button 
          onClick={() => window.open(reminder.joinURL, '_blank')}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '5px'
          }}
        >
          Join Meeting
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
      }
    );
  }, []);

  // Initialize socket connection
  // const initializeSocketConnection = useCallback(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) return;

  //   const socketInstance = initializeSocket(token, handleMeetingReminder);
  //   setSocket(socketInstance);
  // }, [handleMeetingReminder]);

  // Request notification permission
  const askNotificationPermission = useCallback(async () => {
    const permission = await requestNotificationPermission();
    setNotificationPermission(permission);
    return permission;
  }, []);

  // Mark notification as read
  const markNotificationAsRead = useCallback((notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Initialize socket when auth token changes
  useEffect(() => {
    // initializeSocketConnection();
    
    // Request notification permission
    askNotificationPermission();

    // Cleanup on unmount
    // return () => {
    //   disconnectSocket();
    // };
  }, [askNotificationPermission]);

  // Context value
  const value = {
    notifications,
    meetingReminders,
    notificationPermission,
    // socket,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    askNotificationPermission,
    unreadCount: notifications.filter(n => !n.read).length
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Custom hook to use notification context
 * @returns {Object} Notification context
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;