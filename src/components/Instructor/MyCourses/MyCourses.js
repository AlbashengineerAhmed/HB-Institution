import React, { useState } from 'react';
import { formatPrice } from '../../../utils/priceUtils';
import styles from './MyCourses.module.css';

const MyCourses = ({ onNewCourse, onEditCourse, onManageCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  // Mock instructor groups data (matches the API structure)
  const mockGroups = [
    {
      _id: "6878f563c737c6b7c5828a55",
      code: "ENG101-G",
      level: "Beginner",
      maxStudents: 30,
      currentStudents: 15,
      schedule: [
        {
          dayOfWeek: "Monday",
          startTime: "10:00",
          endTime: "12:00",
          timezone: "Africa/Cairo",
          _id: "6878f563c737c6b7c5828a56"
        },
        {
          dayOfWeek: "Wednesday",
          startTime: "10:00",
          endTime: "12:00",
          timezone: "Africa/Cairo",
          _id: "6878f563c737c6b7c5828a57"
        }
      ],
      course: {
        _id: "686a9cb325eb80d09a137780",
        title: "The Pillars of Iman",
        duration: "6 weeks",
        price: 0,
        image: "https://res.cloudinary.com/dic1zpt8v/image/upload/v1751817395/HB-Institution/Course/The%20Pillars%20of%20Iman/s3u75hjobjxhy3ilt8sy.jpg"
      }
    },
    {
      _id: "6878f570c737c6b7c5828a5b",
      code: "JS101-A",
      level: "Intermediate",
      maxStudents: 25,
      currentStudents: 20,
      schedule: [
        {
          dayOfWeek: "Tuesday",
          startTime: "14:00",
          endTime: "16:00",
          timezone: "Africa/Cairo",
          _id: "6878f570c737c6b7c5828a5c"
        },
        {
          dayOfWeek: "Thursday",
          startTime: "14:00",
          endTime: "16:00",
          timezone: "Africa/Cairo",
          _id: "6878f570c737c6b7c5828a5d"
        }
      ],
      course: {
        _id: "686aa649d6a57f9089ba423f",
        title: "JavaScript Basics",
        duration: "8 weeks",
        price: 150,
        image: "https://res.cloudinary.com/dic1zpt8v/image/upload/v1751819849/HB-Institution/Course/JavaScript%20Basics/lnwigobpsvmihhfx1oa8.jpg"
      }
    },
    {
      _id: "6878f580c737c6b7c5828a6c",
      code: "ADV101-B",
      level: "Advanced",
      maxStudents: 20,
      currentStudents: 8,
      schedule: [
        {
          dayOfWeek: "Saturday",
          startTime: "09:00",
          endTime: "11:00",
          timezone: "Africa/Cairo",
          _id: "6878f580c737c6b7c5828a6d"
        }
      ],
      course: {
        _id: "686aa650d6a57f9089ba424a",
        title: "Advanced Islamic Studies",
        duration: "12 weeks",
        price: 200,
        image: "/images/islamic-studies.jpg"
      }
    }
  ];

  const filteredGroups = mockGroups.filter(group => {
    const course = group.course;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || group.level.toLowerCase() === levelFilter.toLowerCase();
    
    return matchesSearch && matchesLevel;
  });

  const getLevelBadge = (level) => {
    const levelClasses = {
      beginner: styles.levelBeginner,
      intermediate: styles.levelIntermediate,
      advanced: styles.levelAdvanced
    };
    
    return (
      <span className={`${styles.levelBadge} ${levelClasses[level.toLowerCase()]}`}>
        {level}
      </span>
    );
  };

  const formatSchedule = (schedule) => {
    if (!schedule || schedule.length === 0) return 'No schedule';
    
    return schedule.map(s => 
      `${s.dayOfWeek} ${s.startTime}-${s.endTime}`
    ).join(', ');
  };

  const getProgressColor = (currentStudents, maxStudents) => {
    const percentage = (currentStudents / maxStudents) * 100;
    if (percentage >= 80) return '#4da6ff';
    if (percentage >= 60) return '#fdc62c';
    if (percentage >= 40) return '#feda6a';
    return '#ff4c4c';
  };

  return (
    <div className={styles.myCourses}>
      {/* Header with filters */}
      <div className={styles.coursesHeader}>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filtersSection}>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className={styles.coursesGrid}>
        {filteredGroups.map((group) => (
          <div key={group._id} className={styles.courseCard}>
            <div className={styles.courseImage}>
              <img 
                src={group.course.image} 
                alt={group.course.title}
                onError={(e) => {
                  e.target.src = '/images/default-course.jpg';
                }}
              />
              <div className={styles.courseOverlay}>
                {getLevelBadge(group.level)}
                <span className={styles.groupCode}>Code: {group.code}</span>
              </div>
            </div>
            
            <div className={styles.courseContent}>
              <div className={styles.courseHeader}>
                <h3 className={styles.courseTitle}>{group.course.title}</h3>
                <span className={styles.courseCategory}>Group: {group.code}</span>
              </div>
              
              <div className={styles.courseStats}>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>👥</span>
                  <span className={styles.statText}>{group.currentStudents}/{group.maxStudents} Students</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>⏱️</span>
                  <span className={styles.statText}>{group.course.duration}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>💰</span>
                  <span className={styles.statText}>{formatPrice(group.course.price)}</span>
                </div>
              </div>

              <div className={styles.scheduleSection}>
                <h4 className={styles.scheduleTitle}>Schedule</h4>
                <div className={styles.scheduleText}>
                  📅 {formatSchedule(group.schedule)}
                </div>
              </div>

              <div className={styles.enrollmentProgress}>
                <div className={styles.progressHeader}>
                  <h4 className={styles.progressTitle}>Enrollment</h4>
                  <span className={styles.progressPercentage}>
                    {Math.round((group.currentStudents / group.maxStudents) * 100)}%
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${(group.currentStudents / group.maxStudents) * 100}%`,
                      backgroundColor: getProgressColor(group.currentStudents, group.maxStudents)
                    }}
                  ></div>
                </div>
                <div className={styles.enrollmentText}>
                  {group.currentStudents} of {group.maxStudents} students enrolled
                </div>
              </div>
            </div>
            
            <div className={styles.courseActions}>
              <button
                className={`${styles.actionBtn} ${styles.manageBtn}`}
                onClick={() => onManageCourse(group)}
              >
                ⚙️ Manage Course
              </button>
              
              <button
                className={`${styles.actionBtn} ${styles.editBtn}`}
                onClick={() => onEditCourse(group)}
              >
                ✏️ Edit Group
              </button>
              
              <button
                className={`${styles.actionBtn} ${styles.studentsBtn}`}
                onClick={() => console.log(`View students for group ${group._id}`)}
              >
                👥 View Students
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h3 className={styles.emptyTitle}>No courses found</h3>
          <p className={styles.emptyText}>
            {searchTerm || levelFilter !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'You have no assigned courses yet.'
            }
          </p>
          {!searchTerm && levelFilter === 'all' && (
            <button 
              className={styles.createFirstCourseBtn}
              onClick={onNewCourse}
            >
              ➕ Create New Course
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;