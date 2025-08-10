import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonAttendance } from '../../../store/slices/instructorDashboardSlice';
import styles from './AttendanceDetails.module.css';

const AttendanceDetails = ({ lessonId, onClose }) => {
  const dispatch = useDispatch();
  const { 
    lessonAttendance, 
    isLoadingAttendance, 
    attendanceError 
  } = useSelector((state) => state.instructorDashboard);

  useEffect(() => {
    if (lessonId) {
      dispatch(fetchLessonAttendance({ lessonId }));
    }
  }, [dispatch, lessonId]);

  if (isLoadingAttendance) {
    return (
      <div className="container" style={{ padding: '1rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-color)', opacity: 0.8 }}>Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (attendanceError) {
    return (
      <div className="container" style={{ padding: '1rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="div-title" style={{ marginBottom: '0.75rem', color: 'var(--error-color)', fontSize: '1.2rem' }}>Failed to load</h3>
        <p style={{ color: 'var(--error-color)', opacity: 0.9, padding: '0.5rem 0' }}>{attendanceError}</p>
      </div>
    );
  }

  if (!lessonAttendance || !lessonAttendance.data) {
    return (
      <div className="container" style={{ padding: '1rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ padding: '1.5rem 0', textAlign: 'center', color: 'var(--text-color)', opacity: 0.8 }}>No attendance data available</p>
      </div>
    );
  }

  const { lesson, meeting, summary, attendance } = lessonAttendance.data;

  return (
    <div className="container" style={{ padding: '1.25rem', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)', border: '1px solid rgba(253, 198, 44, 0.2)' }}>
      {/* Header */}
      <div className="div-header" style={{ marginBottom: '1rem', borderBottom: '2px solid rgba(253, 198, 44, 0.2)', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="div-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>Attendance: {lesson?.title || 'Lesson'}</h2>
        {onClose && (
          <button className="btn btn-secondary" onClick={onClose} aria-label="Close attendance details" style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>
            Close
          </button>
        )}
      </div>
      
      {/* Meeting Info */}
      {meeting && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 className="div-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span> Meeting Information
          </h3>
          <div style={{ background: 'rgba(253, 198, 44, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(253, 198, 44, 0.2)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <span style={{ fontWeight: 600, opacity: 0.8 }}>Group:</span> 
                <span>{meeting.group || 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontWeight: 600, opacity: 0.8 }}>Instructor:</span> 
                <span>{meeting.instructor || 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontWeight: 600, opacity: 0.8 }}>Duration:</span> 
                <span>{meeting.duration ? `${meeting.duration} minutes` : 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontWeight: 600, opacity: 0.8 }}>Status:</span> 
                <span style={{ 
                  color: meeting.status === 'active' ? 'green' : 'var(--text-color)',
                  fontWeight: meeting.status === 'active' ? 600 : 400
                }}>
                  {meeting.status || 'N/A'}
                </span>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div>
                <span style={{ fontWeight: 600, opacity: 0.8 }}>Scheduled Start:</span> 
                <span>{meeting.scheduledStartTime ? new Date(meeting.scheduledStartTime).toLocaleString() : 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontWeight: 600, opacity: 0.8 }}>Actual Start:</span> 
                <span>{meeting.actualStartTime ? new Date(meeting.actualStartTime).toLocaleString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Summary */}
      {summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 className="div-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📊</span> Attendance Summary
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(253, 198, 44, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(253, 198, 44, 0.3)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-color)', fontSize: '1.05rem' }}>Total</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{summary.total || 0}</div>
            </div>
            <div style={{ background: 'rgba(75, 192, 192, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(75, 192, 192, 0.3)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#2a9d8f', fontSize: '1.05rem' }}>Present</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2a9d8f' }}>{summary.present || 0}</div>
            </div>
            <div style={{ background: 'rgba(255, 159, 64, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 159, 64, 0.3)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#f4a261', fontSize: '1.05rem' }}>Late</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f4a261' }}>{summary.late || 0}</div>
            </div>
            <div style={{ background: 'rgba(255, 99, 132, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 99, 132, 0.3)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#e76f51', fontSize: '1.05rem' }}>Absent</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e76f51' }}>{summary.absent || 0}</div>
            </div>
            <div style={{ background: 'rgba(153, 102, 255, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(153, 102, 255, 0.3)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#8338ec', fontSize: '1.05rem' }}>Left Early</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#8338ec' }}>{summary.leftEarly || 0}</div>
            </div>
          </div>
          <div style={{ marginTop: '1rem', background: 'rgba(253, 198, 44, 0.15)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(253, 198, 44, 0.3)', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary-color)', fontSize: '1.05rem' }}>Attendance Rate</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{summary.attendanceRate || 0}%</div>
          </div>
        </div>
      )}

      {/* Attendance List */}
      {attendance && attendance.length > 0 ? (
        <div style={{ marginBottom: '1rem' }}>
          <h3 className="div-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>👥</span> Student Attendance
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(253, 198, 44, 0.2)', borderBottom: '2px solid rgba(253, 198, 44, 0.5)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Student</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Join Time</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Leave Time</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => {
                  const getStatusStyle = (status) => {
                    switch(status) {
                      case 'present': return { color: '#2a9d8f', background: 'rgba(75, 192, 192, 0.15)' };
                      case 'late': return { color: '#f4a261', background: 'rgba(255, 159, 64, 0.15)' };
                      case 'absent': return { color: '#e76f51', background: 'rgba(255, 99, 132, 0.15)' };
                      case 'leftEarly': return { color: '#8338ec', background: 'rgba(153, 102, 255, 0.15)' };
                      default: return { color: 'var(--text-color)', background: 'transparent' };
                    }
                  };
                  
                  const statusStyle = getStatusStyle(record.status);
                  
                  return (
                    <tr key={record._id || index} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ 
                            width: '30px', 
                            height: '30px', 
                            borderRadius: '50%', 
                            background: 'var(--primary-color)', 
                            color: 'white', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: '0.8rem'
                          }}>
                            {record.student?.name?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{record.student?.name || 'Unknown Student'}</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{record.student?.email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px', 
                          fontWeight: 600,
                          ...statusStyle
                        }}>
                          {record.status?.charAt(0).toUpperCase() + record.status?.slice(1) || 'Unknown'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        {record.joinTime ? new Date(record.joinTime).toLocaleTimeString() : '—'}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        {record.leaveTime ? new Date(record.leaveTime).toLocaleTimeString() : '—'}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        {record.duration ? `${Math.floor(record.duration / 60)}m ${record.duration % 60}s` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(253, 198, 44, 0.1)', borderRadius: '8px', marginBottom: '1rem' }}>
          <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>No attendance records available for this lesson</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;