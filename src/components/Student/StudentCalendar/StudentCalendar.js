import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './StudentCalendar.module.css';

const localizer = momentLocalizer(moment);

const StudentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get authorization token from localStorage (using authToken key like other components)
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authorization token found. Please login again.');
      }

      const response = await axios.get(
        'https://hb-institution.vercel.app/api/v1/lesson/calendar/',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.calendarEvents) {
        const formattedEvents = response.data.calendarEvents.map((event, index) => {
          // Parse the time range
          const [startTime, endTime] = event.time.split(' - ');
          
          // Create start and end datetime objects
          const startDateTime = moment(`${event.date} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate();
          const endDateTime = moment(`${event.date} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate();

          return {
            id: index,
            title: event.course,
            start: startDateTime,
            end: endDateTime,
            resource: {
              course: event.course,
              day: event.day,
              time: event.time,
              timezone: event.timezone,
              date: event.date
            }
          };
        });

        setEvents(formattedEvents);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Error fetching calendar events:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch calendar events');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEvent = (event) => {
    alert(`Course: ${event.title}\nDate: ${moment(event.start).format('MMMM Do, YYYY')}\nTime: ${event.resource.time}\nTimezone: ${event.resource.timezone}`);
  };

  const handleSelectSlot = (slotInfo) => {
    console.log('Selected slot:', slotInfo);
  };

  // Navigation handlers
  const handleNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: 'var(--primary-color)',
      borderRadius: '4px',
      opacity: 0.9,
      color: '#1f2937',
      border: 'none',
      display: 'block',
      fontWeight: '500'
    };

    return {
      style
    };
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>🔄</div>
        <p>Loading calendar events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>❌</div>
        <h3>Error Loading Calendar</h3>
        <p>{error}</p>
        <button 
          className={styles.retryBtn}
          onClick={fetchCalendarEvents}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <h2>📅 My Class Schedule</h2>
        <p>View your upcoming lessons and course schedule</p>
        <div className={styles.calendarStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{events.length}</span>
            <span className={styles.statLabel}>Total Events</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {new Set(events.map(e => e.resource.course)).size}
            </span>
            <span className={styles.statLabel}>Courses</span>
          </div>
        </div>
      </div>

      <div className={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          date={currentDate}
          view={currentView}
          selectable
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day', 'agenda']}
          popup
          showMultiDayTimes
          step={60}
          showAllEvents
          className={styles.calendar}
          messages={{
            next: "Next",
            previous: "Previous", 
            today: "Today",
            month: "Month",
            week: "Week", 
            day: "Day",
            agenda: "Agenda",
            date: "Date",
            time: "Time",
            event: "Event",
            noEventsInRange: "No events in this range",
            showMore: total => `+${total} more`
          }}
        />
      </div>

      {events.length === 0 && (
        <div className={styles.noEventsContainer}>
          <div className={styles.noEventsIcon}>📅</div>
          <h3>No Events Scheduled</h3>
          <p>You don't have any lessons scheduled at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default StudentCalendar;