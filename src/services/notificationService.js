// import { io } from 'socket.io-client';
import { API_CONFIG } from '../config/api';
import { toast } from 'react-toastify';

// let socket;

/**
 * Initialize Socket.IO connection and set up event listeners
 * @param {string} token - Authentication token
 * @param {Function} onMeetingReminder - Callback for meeting reminders
 * @returns {Object} - Socket instance
 */
// export const initializeSocket = (token, onMeetingReminder) => {
//   if (!token) {
//     console.error('Cannot initialize socket: No authentication token provided');
//     return null;
//   }

//   // Close existing socket if any
//   if (socket) {
//     socket.disconnect();
//   }

//   // Extract base URL from API_CONFIG
//   const baseURL = API_CONFIG.baseURL || 'http://localhost:5000';
  
//   // Create new socket connection
//   socket = io(baseURL, {
//     auth: {
//       token
//     },
//     transports: ['websocket', 'polling'],
//     reconnection: true,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 1000
//   });

//   // Set up event listeners
//   socket.on('connect', () => {
//     console.log('Socket connected with ID:', socket.id);
//   });

//   socket.on('connect_error', (error) => {
//     console.error('Socket connection error:', error.message);
//     toast.error(`Connection error: ${error.message}`);
//   });

//   socket.on('authenticated', (data) => {
//     console.log('Authenticated as:', data.user.firstName);
//     socket.emit('join_notifications');
//   });

//   socket.on('meeting_reminder', (reminder) => {
//     console.log('Meeting reminder received:', reminder);
    
//     // Call the provided callback function
//     if (typeof onMeetingReminder === 'function') {
//       onMeetingReminder(reminder);
//     }
    
//     // Show browser notification if permission is granted
//     showBrowserNotification(reminder);
//   });

//   socket.on('disconnect', (reason) => {
//     console.log('Socket disconnected:', reason);
//   });

//   return socket;
// };

/**
 * Display browser notification for meeting reminder
 * @param {Object} reminder - Meeting reminder data
 */
export const showBrowserNotification = (reminder) => {
  if (!reminder) return;
  
  if (Notification.permission === 'granted') {
    new Notification(`Meeting: ${reminder.lessonTitle}`, {
      body: `Starts soon with ${reminder.instructorName}`,
      icon: '/images/logo-black.webp',
      requireInteraction: true
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showBrowserNotification(reminder);
      }
    });
  }
};

/**
 * Request browser notification permission
 * @returns {Promise} - Resolves with the permission result
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return 'not-supported';
  }
  
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }
  
  return Notification.permission;
};

/**
 * Disconnect socket connection
 */
// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     console.log('Socket disconnected manually');
//   }
// };

/**
 * Check if socket is connected
 * @returns {boolean} - True if socket is connected
 */
// export const isSocketConnected = () => {
//   return socket && socket.connected;
// };