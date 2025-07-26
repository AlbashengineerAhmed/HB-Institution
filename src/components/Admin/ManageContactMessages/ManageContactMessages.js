import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './ManageContactMessages.module.css';
import { getContactMessages, deleteContactMessage, deleteAllContactMessages } from '../../../services/contactService';

const ManageContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await getContactMessages();
      setMessages(response.data || response || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteContactMessage(messageId);
      setMessages(messages.filter(msg => msg._id !== messageId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleDeleteAllMessages = async () => {
    try {
      await deleteAllContactMessages();
      setMessages([]);
      setShowDeleteAllConfirm(false);
    } catch (error) {
      console.error('Error deleting all messages:', error);
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Sort messages by newest first (default behavior)
  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading contact messages...</p>
      </div>
    );
  }

  return (
    <div className={styles.manageContactMessages}>
      <div className={styles.header}>
        <h2>Contact Messages</h2>
        <p>Manage and respond to contact form submissions</p>
      </div>

      <div className={styles.controls}>
        {messages.length > 0 && (
          <button 
            onClick={() => setShowDeleteAllConfirm(true)}
            className={styles.deleteAllBtn}
            title="Delete all messages"
          >
            <i className="fas fa-trash-alt"></i>
            Delete All
          </button>
        )}
        <button 
          onClick={fetchMessages}
          className={styles.refreshBtn}
          title="Refresh messages"
        >
          <i className="fas fa-sync-alt"></i>
          Refresh
        </button>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <i className="fas fa-envelope"></i>
          <div>
            <h3>{messages.length}</h3>
            <p>Total Messages</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <i className="fas fa-clock"></i>
          <div>
            <h3>{messages.filter(msg => {
              const messageDate = new Date(msg.createdAt);
              const today = new Date();
              return messageDate.toDateString() === today.toDateString();
            }).length}</h3>
            <p>Today</p>
          </div>
        </div>
      </div>

      {sortedMessages.length === 0 ? (
        <div className={styles.emptyState}>
          <i className="fas fa-inbox"></i>
          <h3>No Messages Found</h3>
          <p>No contact messages have been received yet.</p>
        </div>
      ) : (
        <div className={styles.messagesGrid}>
          {sortedMessages.map((message) => (
            <div key={message._id} className={styles.messageCard}>
              <div className={styles.messageHeader}>
                <div className={styles.senderInfo}>
                  <h4>{message.fullName}</h4>
                  <p className={styles.messageDate}>
                    {formatDate(message.createdAt)}
                  </p>
                </div>
                <div className={styles.messageActions}>
                  <button
                    onClick={() => handleViewMessage(message)}
                    className={styles.viewBtn}
                    title="View message"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(message._id)}
                    className={styles.deleteBtn}
                    title="Delete message"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className={styles.messageContent}>
                <h5 className={styles.messageSubject}>{message.subject}</h5>
                <p className={styles.messagePreview}>
                  {message.message?.substring(0, 150)}
                  {message.message?.length > 150 ? '...' : ''}
                </p>
                {message.phoneNumber && (
                  <p className={styles.phoneNumber}>
                    <i className="fas fa-phone"></i>
                    {message.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Message Modal */}
      {showModal && selectedMessage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Contact Message Details</h3>
              <button onClick={closeModal} className={styles.closeBtn}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.messageDetails}>
                <div className={styles.detailRow}>
                  <strong>From:</strong>
                  <span>{selectedMessage.fullName}</span>
                </div>
                <div className={styles.detailRow}>
                  <strong>Phone:</strong>
                  <span>{selectedMessage.phoneNumber || 'Not provided'}</span>
                </div>
                <div className={styles.detailRow}>
                  <strong>Subject:</strong>
                  <span>{selectedMessage.subject}</span>
                </div>
                <div className={styles.detailRow}>
                  <strong>Date:</strong>
                  <span>{formatDate(selectedMessage.createdAt)}</span>
                </div>
              </div>

              <div className={styles.messageBody}>
                <strong>Message:</strong>
                <div className={styles.messageText}>
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={() => setDeleteConfirm(selectedMessage._id)}
                className={styles.deleteModalBtn}
              >
                <i className="fas fa-trash"></i>
                Delete Message
              </button>
              <button onClick={closeModal} className={styles.closeModalBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <div className={styles.confirmHeader}>
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Confirm Delete</h3>
            </div>
            <p>Are you sure you want to delete this contact message? This action cannot be undone.</p>
            <div className={styles.confirmActions}>
              <button
                onClick={() => handleDeleteMessage(deleteConfirm)}
                className={styles.confirmDeleteBtn}
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {showDeleteAllConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <div className={styles.confirmHeader}>
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Confirm Delete All</h3>
            </div>
            <p>Are you sure you want to delete ALL contact messages? This will permanently remove all {messages.length} messages and cannot be undone.</p>
            <div className={styles.confirmActions}>
              <button
                onClick={handleDeleteAllMessages}
                className={styles.confirmDeleteBtn}
              >
                Delete All
              </button>
              <button
                onClick={() => setShowDeleteAllConfirm(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContactMessages;