import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonDetails, clearLessonDetails } from '../../../store/slices/studentDashboardSlice';
import styles from './LessonDetails.module.css';

const LessonDetails = ({ lessonId, courseId, unitId, onBack }) => {
  const dispatch = useDispatch();
  const { 
    selectedLessonDetails, 
    isLoadingLessonDetails, 
    lessonDetailsError
  } = useSelector((state) => state.studentDashboard);

  useEffect(() => {
    if (lessonId) {
      dispatch(getLessonDetails({ lessonId }));
    }
    
    // Cleanup when component unmounts
    return () => {
      dispatch(clearLessonDetails());
    };
  }, [dispatch, lessonId]);

  const handleBackClick = () => {
    dispatch(clearLessonDetails());
    onBack();
  };

  if (isLoadingLessonDetails) {
    return (
      <div className={styles.lessonDetails}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={handleBackClick}>
            ← Back
          </button>
          <h1>Loading Lesson...</h1>
        </div>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>🔄</div>
          <p>Loading lesson details...</p>
        </div>
      </div>
    );
  }

  if (lessonDetailsError) {
    return (
      <div className={styles.lessonDetails}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={handleBackClick}>
            ← Back
          </button>
          <h1>Error Loading Lesson</h1>
        </div>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>❌</div>
          <h3>Failed to Load Lesson</h3>
          <p>{lessonDetailsError}</p>
          <button 
            className={styles.retryBtn}
            onClick={() => dispatch(getLessonDetails({ lessonId }))}
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  if (!selectedLessonDetails) {
    return (
      <div className={styles.lessonDetails}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={handleBackClick}>
            ← Back
          </button>
          <h1>Lesson Not Found</h1>
        </div>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>❓</div>
          <h3>Lesson Not Found</h3>
          <p>The requested lesson could not be found.</p>
        </div>
      </div>
    );
  }

  const lesson = selectedLessonDetails.data || selectedLessonDetails;

  return (
    <div className={styles.lessonDetails}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBackClick}>
          ← Back
        </button>
        <div className={styles.headerContent}>
          <h1 className={styles.lessonTitle}>{lesson.title}</h1>
          <div className={styles.lessonMeta}>
            <span className={styles.lessonOrder}>Lesson {lesson.order}</span>
            <span className={styles.lessonStatus}>
              {lesson.islocked ? '🔒 Locked' : '🔓 Unlocked'}
            </span>
            <span className={styles.completionStatus}>
              {lesson.completed ? '✅ Completed' : '⭕ Not Completed'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.lessonInfo}>
          {lesson.description && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Description</h3>
              <p className={styles.description}>{lesson.description}</p>
            </div>
          )}

          {lesson.duration && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Duration</h3>
              <p className={styles.duration}>⏱️ {lesson.duration}</p>
            </div>
          )}

          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Learning Objectives</h3>
              <ul className={styles.objectives}>
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className={styles.objective}>
                    🎯 {objective}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.content && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Content</h3>
              <div className={styles.lessonContent}>
                {typeof lesson.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                ) : (
                  <pre className={styles.contentText}>{JSON.stringify(lesson.content, null, 2)}</pre>
                )}
              </div>
            </div>
          )}

          {lesson.resources && lesson.resources.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Resources</h3>
              <div className={styles.resources}>
                {lesson.resources.map((resource, index) => (
                  <div key={index} className={styles.resource}>
                    <span className={styles.resourceIcon}>📎</span>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.resourceLink}
                    >
                      {resource.title || resource.name || resource.url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.videoUrl && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Video</h3>
              <div className={styles.videoContainer}>
                <video 
                  controls 
                  className={styles.video}
                  src={lesson.videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          {lesson.attachments && lesson.attachments.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Attachments</h3>
              <div className={styles.attachments}>
                {lesson.attachments.map((attachment, index) => (
                  <div key={index} className={styles.attachment}>
                    <span className={styles.attachmentIcon}>📄</span>
                    <a 
                      href={attachment.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.attachmentLink}
                    >
                      {attachment.name || `Attachment ${index + 1}`}
                    </a>
                    {attachment.size && (
                      <span className={styles.attachmentSize}>({attachment.size})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.progressCard}>
            <h4 className={styles.progressTitle}>Progress</h4>
            <div className={styles.progressInfo}>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Status:</span>
                <span className={`${styles.progressValue} ${lesson.completed ? styles.completed : styles.pending}`}>
                  {lesson.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Access:</span>
                <span className={`${styles.progressValue} ${lesson.islocked ? styles.locked : styles.unlocked}`}>
                  {lesson.islocked ? 'Locked' : 'Unlocked'}
                </span>
              </div>
            </div>
          </div>

          {lesson.prerequisites && lesson.prerequisites.length > 0 && (
            <div className={styles.prerequisitesCard}>
              <h4 className={styles.cardTitle}>Prerequisites</h4>
              <ul className={styles.prerequisites}>
                {lesson.prerequisites.map((prereq, index) => (
                  <li key={index} className={styles.prerequisite}>
                    📋 {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.tags && lesson.tags.length > 0 && (
            <div className={styles.tagsCard}>
              <h4 className={styles.cardTitle}>Tags</h4>
              <div className={styles.tags}>
                {lesson.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;