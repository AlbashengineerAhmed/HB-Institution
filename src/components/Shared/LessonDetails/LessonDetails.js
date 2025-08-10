import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonDetails, clearLessonDetails } from '../../../store/slices/lessonSlice';

// LessonDetails uses global styles (src/styles/global.css)
// Enhanced styling with improved spacing and visual hierarchy

const LessonDetails = ({ lessonId, groupId, onClose, userRole = 'student' }) => {
  const dispatch = useDispatch();
  const { lessonDetails, isLoading, error } = useSelector((state) => state.lessons);

  useEffect(() => {
    if (lessonId && groupId) {
      dispatch(fetchLessonDetails({ lessonId, groupId }));
    }
    return () => {
      dispatch(clearLessonDetails());
    };
  }, [dispatch, lessonId, groupId]);

  const lesson = lessonDetails?.lesson;
  const meeting = lessonDetails?.meeting;

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    if (meeting?.meetingUrl) {
      window.open(meeting.meetingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownloadResource = () => {
    if (lesson?.resources?.url) {
      window.open(lesson.resources.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '1rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-color)', opacity: 0.8 }}>Loading lesson details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '1rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="div-title" style={{ marginBottom: '0.75rem', color: 'var(--error-color)', fontSize: '1.2rem' }}>Failed to load</h3>
        <p style={{ color: 'var(--error-color)', opacity: 0.9, padding: '0.5rem 0' }}>{error}</p>
      </div>
    );
  }

  if (!lessonDetails || !lesson) {
    return (
      <div className="container" style={{ padding: '1rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ padding: '1.5rem 0', textAlign: 'center', color: 'var(--text-color)', opacity: 0.8 }}>No lesson details available</p>
      </div>
    );
  }

  const unitTitle = lesson.unitId?.title || 'N/A';
  const courseTitle = lesson.unitId?.courseId?.title || 'N/A';

  return (
    <div className="container" style={{ padding: '1.25rem', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)', border: '1px solid rgba(253, 198, 44, 0.2)' }}>
      {/* Header */}
      <div className="div-header" style={{ marginBottom: '1rem', borderBottom: '2px solid rgba(253, 198, 44, 0.2)', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="div-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>{lesson.title || 'Lesson'}</h2>
        {onClose && (
          <button className="btn btn-secondary" onClick={onClose} aria-label="Close lesson details" style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>
            Close
          </button>
        )}
      </div>
      
      {/* Meeting information is displayed below */}

      {/* Meta */}
      <div style={{ marginBottom: '1.25rem', color: 'var(--text-color)', fontSize: '0.95rem', background: 'rgba(253, 198, 44, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(253, 198, 44, 0.2)' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, opacity: 0.8 }}>Unit:</span> 
            <span>{unitTitle}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, opacity: 0.8 }}>Course:</span> 
            <span>{courseTitle}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      {lesson.description ? (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 className="div-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📝</span> Description
          </h3>
          <div style={{ color: 'var(--text-color)', fontSize: '0.95rem', lineHeight: '1.6', background: 'rgba(57, 63, 77, 0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(57, 63, 77, 0.3)' }}>
            {lesson.description}
          </div>
        </div>
      ) : null}

      {/* Meeting */}
      {meeting ? (
        <div style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
          <h3 className="div-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary-color)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🎯</span> Meeting
          </h3>
          <div style={{ background: 'var(--secondary-color)', border: '2px solid rgba(253, 198, 44, 0.5)', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(253, 198, 44, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(253, 198, 44, 0.3)' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-color)', fontSize: '1.05rem' }}>Duration</div>
                <div style={{ fontSize: '1.1rem' }}>{meeting.duration ? `${meeting.duration} minutes` : '—'}</div>
              </div>
              <div style={{ background: 'rgba(253, 198, 44, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(253, 198, 44, 0.3)' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-color)', fontSize: '1.05rem' }}>Group</div>
                <div style={{ fontSize: '1.1rem' }}>{meeting.group || '—'}</div>
              </div>
              <div style={{ background: 'rgba(253, 198, 44, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(253, 198, 44, 0.3)' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-color)', fontSize: '1.05rem' }}>Instructor</div>
                <div style={{ fontSize: '1.1rem' }}>{meeting.instructor || '—'}</div>
              </div>
            </div>
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(253, 198, 44, 0.3)', paddingTop: '1.25rem' }}>
              <a 
                href={meeting.meetingUrl || '#'}
                className="btn btn-primary"
                onClick={handleJoinMeeting}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  padding: '1rem 2.5rem', 
                  fontWeight: 700, 
                  fontSize: '1.1rem', 
                  borderRadius: '8px',
                  background: 'var(--primary-color)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  opacity: 1
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>🎥</span>
                {userRole === 'instructor' ? 'Start/Join Meeting' : 'Join Meeting'}
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {/* Resources */}
      {lesson.resources ? (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 className="div-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📚</span> Resources
          </h3>
          <div style={{ background: 'var(--secondary-color)', border: '1px solid rgba(253, 198, 44, 0.3)', borderRadius: '10px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', background: 'rgba(253, 198, 44, 0.2)', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', color: 'var(--primary-color)' }}>
                {lesson.resources.type === 'pdf' ? '📄' : '📁'}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem', color: 'var(--text-color)' }}>{lesson.resources.filename || lesson.resources.public_id || 'Resource'}</div>
                <div style={{ opacity: 0.9, fontSize: '0.85rem', background: 'rgba(253, 198, 44, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block' }}>Type: {(lesson.resources.type || 'file').toUpperCase()}</div>
              </div>
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={handleDownloadResource} 
              disabled={!lesson.resources.url}
              style={{ padding: '0.6rem 1.25rem', fontWeight: 600, fontSize: '0.9rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ fontSize: '1rem' }}>⬇️</span> Download
            </button>
          </div>
        </div>
      ) : null}

      {/* Content */}
      {lesson.content ? (
        <div style={{ marginBottom: '1rem' }}>
          <h3 className="div-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📋</span> Content
          </h3>
          <div 
            style={{ 
              background: 'var(--secondary-color)', 
              border: '1px solid rgba(253, 198, 44, 0.3)', 
              borderRadius: '10px', 
              padding: '1.25rem', 
              fontSize: '0.95rem',
              lineHeight: '1.6',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              color: 'var(--text-color)'
            }}
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LessonDetails;