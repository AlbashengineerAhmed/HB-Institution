import React, { useState } from 'react';
import { sendNote } from '../../services/noteService';
import styles from './SendNote.module.css';

const SendNote = ({ onClose, onSuccess }) => {
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!note.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await sendNote(note.trim());
      setNote('');
      if (onSuccess) {
        onSuccess();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to send note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setNote('');
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.sendNoteContainer}>
      <div className={styles.sendNoteHeader}>
        <h3>📝 Send Note to Admin</h3>
        <p>Send a message or feedback to the administration team</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.sendNoteForm}>
        <div className={styles.formGroup}>
          <label htmlFor="note" className={styles.label}>
            Your Message
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type your message here..."
            className={styles.textarea}
            rows={6}
            required
            disabled={isLoading}
          />
          <div className={styles.charCount}>
            {note.length} characters
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelBtn}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={isLoading || !note.trim()}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Sending...
              </>
            ) : (
              <>
                📤 Send Note
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendNote;