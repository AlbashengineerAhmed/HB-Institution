import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { initializeSocket, disconnectSocket, showBrowserNotification } from '../../services/notificationService';

/**
 * Initial state for the notification slice
 */
const initialState = {
  notifications: [],
  unreadCount: 0,
  permissionGranted: false,
  socket: null,
};

/**
 * Notification slice for managing real-time notifications
 */
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    /**
     * Initialize socket connection
     */
    initSocket: (state, action) => {
      // The actual socket connection is handled in the thunk
      state.socket = {}; // Placeholder to indicate socket is connected
    },
    
    /**
     * Disconnect socket
     */
    disconnectSocket: (state) => {
      state.socket = null;
    },
    
    /**
     * Set notification permission status
     */
    setPermissionStatus: (state, action) => {
      state.permissionGranted = action.payload;
    },
    
    /**
     * Add a new notification
     */
    addNotification: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
    
    /**
     * Mark a notification as read
     */
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      );
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
    
    /**
     * Mark all notifications as read
     */
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map(notification => ({ 
        ...notification, 
        read: true 
      }));
      state.unreadCount = 0;
    },
    
    /**
     * Clear a specific notification
     */
    clearNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationId
      );
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
    
    /**
     * Clear all notifications
     */
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

// Export actions
export const { 
  initSocket,
  disconnectSocket: disconnectSocketAction,
  setPermissionStatus,
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotification,
  clearAllNotifications
} = notificationSlice.actions;

/**
 * Thunk to initialize socket connection
 */
export const initializeSocketConnection = () => (dispatch) => {
  const token = localStorage.getItem('authToken');
  if (!token) return;
  
  const socket = initializeSocket(token);
  
  // Set up meeting reminder listener
  socket.on('meeting_reminder', (meetingData) => {
    // Create notification object
    const notification = {
      id: Date.now().toString(),
      type: 'meeting_reminder',
      title: meetingData.title || 'Meeting Reminder',
      message: meetingData.message || 'You have an upcoming meeting',
      timestamp: new Date(),
      read: false,
      data: meetingData
    };
    
    // Add to Redux store
    dispatch(addNotification(notification));
    
    // Show toast notification
    toast.info(
      <div>
        <strong>{notification.title}</strong>
        <p>{notification.message}</p>
        {meetingData.joinUrl && (
          <button 
            onClick={() => window.open(meetingData.joinUrl, '_blank')}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Join Meeting
          </button>
        )}
      </div>,
      {
        autoClose: 8000,
        closeButton: true
      }
    );
    
    // Show browser notification
    showBrowserNotification(meetingData);
  });
  
  dispatch(initSocket());
  
  return socket;
};

/**
 * Thunk to disconnect socket
 */
export const disconnectSocketThunk = () => (dispatch) => {
  disconnectSocket();
  dispatch(disconnectSocketAction());
};

/**
 * Thunk to request notification permission
 */
export const requestNotificationPermission = () => async (dispatch) => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    const granted = permission === 'granted';
    dispatch(setPermissionStatus(granted));
    return granted;
  }
  return false;
};

export default notificationSlice.reducer;