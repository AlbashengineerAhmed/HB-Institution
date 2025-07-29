import React, { useState, useEffect } from 'react';
import { getAllNotes, deleteNote } from '../../../services/noteService';
import styles from './ManageNotes.module.css';

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllNotes();
      setNotes(response.data || []);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      setError('Failed to load notes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      setDeletingNoteId(noteId);
      await deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    } finally {
      setDeletingNoteId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'student':
        return '👨‍🎓';
      case 'instructor':
        return '👨‍🏫';
      case 'admin':
        return '👨‍💼';
      default:
        return '👤';
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case 'student':
        return styles.roleStudent;
      case 'instructor':
        return styles.roleInstructor;
      case 'admin':
        return styles.roleAdmin;
      default:
        return styles.roleDefault;
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || note.role.toLowerCase() === filterRole;
    return matchesSearch && matchesRole;
  });

  const roleStats = {
    all: notes.length,
    student: notes.filter(n => n.role.toLowerCase() === 'student').length,
    instructor: notes.filter(n => n.role.toLowerCase() === 'instructor').length,
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <h3>Loading Notes</h3>
        <p>Please wait while we fetch the notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Error Loading Notes</h3>
        <p>{error}</p>
        <button onClick={fetchNotes} className={styles.retryBtn}>
          <span>🔄</span>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}>📝</span>
              Notes Management
            </h1>
            <p className={styles.subtitle}>
              Manage and review notes from students and instructors
            </p>
          </div>
          
          <div className={styles.headerActions}>
            <button onClick={fetchNotes} className={styles.refreshBtn}>
              <span>🔄</span>
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{notes.length}</div>
              <div className={styles.statLabel}>Total Notes</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👨‍🎓</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{roleStats.student}</div>
              <div className={styles.statLabel}>From Students</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👨‍🏫</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{roleStats.instructor}</div>
              <div className={styles.statLabel}>From Instructors</div>
            </div>
          </div>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <h3>No Notes Yet</h3>
          <p>No notes have been sent by students or instructors yet.</p>
        </div>
      ) : (
        <>
          {/* Filters and Search */}
          <div className={styles.filtersSection}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search notes, names, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterTabs}>
              {[
                { key: 'all', label: 'All Notes', count: roleStats.all },
                { key: 'student', label: 'Students', count: roleStats.student },
                { key: 'instructor', label: 'Instructors', count: roleStats.instructor },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilterRole(tab.key)}
                  className={`${styles.filterTab} ${filterRole === tab.key ? styles.active : ''}`}
                >
                  {tab.label}
                  <span className={styles.tabCount}>{tab.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes List - Full Width */}
          <div className={styles.notesList}>
            {filteredNotes.map((note) => (
              <div key={note.id} className={styles.noteCard}>
                <div className={styles.noteHeader}>
                  <div className={styles.senderInfo}>
                    <div className={styles.avatar}>
                      {getRoleIcon(note.role)}
                    </div>
                    <div className={styles.senderDetails}>
                      <h4 className={styles.senderName}>{note.name}</h4>
                      <p className={styles.senderEmail}>{note.email}</p>
                      <span className={`${styles.roleBadge} ${getRoleBadgeClass(note.role)}`}>
                        {note.role}
                      </span>
                    </div>
                  </div>
                  <div className={styles.noteTime}>
                    {getTimeAgo(note.createdAt)}
                  </div>
                </div>

                <div className={styles.noteContent}>
                  <p className={styles.noteText}>
                    {note.note.length > 200 
                      ? `${note.note.substring(0, 200)}...` 
                      : note.note
                    }
                  </p>
                </div>

                <div className={styles.noteActions}>
                  <button
                    onClick={() => setSelectedNote(note)}
                    className={styles.viewBtn}
                  >
                    <span>👁️</span>
                    View Full Note
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className={styles.deleteBtn}
                    disabled={deletingNoteId === note.id}
                  >
                    {deletingNoteId === note.id ? (
                      <>
                        <span className={styles.spinner}></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <span>🗑️</span>
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>No Notes Found</h3>
              <p>No notes match your current search and filter criteria.</p>
            </div>
          )}
        </>
      )}

      {/* Note Details Modal */}
      {selectedNote && (
        <div className={styles.modal} onClick={() => setSelectedNote(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📝 Note Details</h3>
              <button
                onClick={() => setSelectedNote(null)}
                className={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.senderSection}>
                <div className={styles.senderAvatar}>
                  {getRoleIcon(selectedNote.role)}
                </div>
                <div className={styles.senderInfo}>
                  <h4>{selectedNote.name}</h4>
                  <p>{selectedNote.email}</p>
                  <span className={`${styles.roleBadge} ${getRoleBadgeClass(selectedNote.role)}`}>
                    {selectedNote.role}
                  </span>
                </div>
              </div>

              <div className={styles.noteMetadata}>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>📅 Sent:</span>
                  <span className={styles.metadataValue}>
                    {formatDate(selectedNote.createdAt)}
                  </span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>🆔 Note ID:</span>
                  <span className={styles.metadataValue}>{selectedNote.id}</span>
                </div>
              </div>

              <div className={styles.messageSection}>
                <h4>📝 Message</h4>
                <div className={styles.messageContent}>
                  {selectedNote.note}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={() => setSelectedNote(null)}
                className={styles.cancelBtn}
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDeleteNote(selectedNote.id);
                  setSelectedNote(null);
                }}
                className={styles.deleteModalBtn}
                disabled={deletingNoteId === selectedNote.id}
              >
                {deletingNoteId === selectedNote.id ? (
                  <>
                    <span className={styles.spinner}></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <span>🗑️</span>
                    Delete Note
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotes;