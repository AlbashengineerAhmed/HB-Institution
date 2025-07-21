import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './StudentCalendar.module.css';

const localizer = momentLocalizer(moment);

// Custom Event Components for mobile display
const MobileMonthEvent = ({ event }) => (
  <div className={styles.mobileMonthEvent}>
    <span className={styles.eventDot}>•</span>
    <span className={styles.eventText}>{event.title}</span>
  </div>
);

const MobileDayEvent = ({ event }) => (
  <div className={styles.mobileDayEvent}>
    <div className={styles.mobileDayEventTime}>
      {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
    </div>
    <div className={styles.mobileDayEventContent}>
      <div className={styles.mobileDayEventTitle}>{event.title}</div>
      <div className={styles.mobileDayEventDetails}>
        {event.resource?.timezone}
      </div>
    </div>
  </div>
);

// Custom Toolbar with Today button positioned for responsive design
const CustomToolbar = ({ label, onNavigate, onView, view, views }) => {
  return (
    <div className={styles.customToolbar}>
      <div className={styles.navigationRow}>
        <button 
          className={styles.navBtn} 
          onClick={() => onNavigate('PREV')}
        >
          ‹
        </button>
        <span className={styles.toolbarLabel}>{label}</span>
        <button 
          className={styles.navBtn} 
          onClick={() => onNavigate('NEXT')}
        >
          ›
        </button>
      </div>
      
      <div className={styles.bottomRow}>
        <button 
          className={styles.todayBtn} 
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </button>
        <div className={styles.viewSelector}>
          {views.map(viewName => (
            <button
              key={viewName}
              className={`${styles.viewBtn} ${view === viewName ? styles.active : ''}`}
              onClick={() => onView(viewName)}
            >
              {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    fetchCalendarEvents();
    
    // Handle window resize for responsive behavior
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      setError(null);

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
          const [startTime, endTime] = event.time.split(' - ');
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

  // Navigation handlers
  const handleNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
  }, []);

  // Helper function to check if a date has events
  const hasEventsOnDate = (date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    return events.some(event => moment(event.start).format('YYYY-MM-DD') === dateStr);
  };

  // Get events for current view period
  const getCurrentPeriodEvents = () => {
    if (currentView === 'month') {
      const startOfMonth = moment(currentDate).startOf('month');
      const endOfMonth = moment(currentDate).endOf('month');
      return events.filter(event => {
        const eventDate = moment(event.start);
        return eventDate.isBetween(startOfMonth, endOfMonth, 'day', '[]');
      });
    } else if (currentView === 'day') {
      const startOfDay = moment(currentDate).startOf('day');
      const endOfDay = moment(currentDate).endOf('day');
      return events.filter(event => {
        const eventDate = moment(event.start);
        return eventDate.isBetween(startOfDay, endOfDay, 'minute', '[]');
      });
    }
    return events;
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: 'var(--primary-color)',
      borderRadius: '4px',
      opacity: 0.9,
      color: '#1f2937',
      border: 'none',
      display: 'block',
      fontWeight: '500'
    }
  });

  // Custom components for different views
  const components = {
    toolbar: (props) => <CustomToolbar {...props} />,
    event: ({ event }) => {
      if (isMobile) {
        if (currentView === 'month') return <MobileMonthEvent event={event} />;
        if (currentView === 'day') return <MobileDayEvent event={event} />;
      }
      return <span>{event.title}</span>;
    },
    month: {
      dateHeader: ({ date, label }) => {
        const hasEvents = hasEventsOnDate(date);
        const isToday = moment(date).isSame(moment(), 'day');
        
        return (
          <div className={styles.customDateHeader}>
            <div className={`${styles.dateContainer} ${hasEvents ? styles.hasEvents : ''} ${isToday ? styles.isToday : ''}`}>
              <span className={styles.dateNumber}>{label}</span>
            </div>
          </div>
        );
      }
    },
    day: {
      header: ({ date }) => (
        <div className={styles.customDayHeader}>
          <div className={styles.dayName}>{moment(date).format('dddd')}</div>
          <div className={styles.dayDate}>{moment(date).format('MMMM D, YYYY')}</div>
        </div>
      )
    }
  };

  // Custom formats
  const formats = {
    monthHeaderFormat: (date) => moment(date).format('MMMM YYYY'),
    dayHeaderFormat: (date) => moment(date).format('dddd, MMMM D'),
    timeGutterFormat: (date) => moment(date).format('h A'),
    eventTimeRangeFormat: ({ start, end }) => 
      `${moment(start).format('h:mm A')} - ${moment(end).format('h:mm A')}`
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
          style={{ height: isMobile ? 500 : 600 }}
          onSelectEvent={openEventModal}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          date={currentDate}
          view={currentView}
          selectable
          eventPropGetter={eventStyleGetter}
          views={['month', 'day']}
          components={components}
          formats={formats}
          popup={false}
          showMultiDayTimes
          step={60}
          showAllEvents
          className={styles.calendar}
          dayLayoutAlgorithm="no-overlap"
          messages={{
            next: "Next",
            previous: "Previous", 
            today: "Today",
            month: "Month",
            day: "Day",
            date: "Date",
            time: "Time",
            event: "Event",
            noEventsInRange: "No events in this range",
            showMore: total => `+${total} more`,
            allDay: "All Day"
          }}
        />
      </div>

      {/* Event Details Cards Section */}
      {events.length > 0 && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsHeader}>
            <h3>
              {currentView === 'month' && '📅 This Month\'s Classes'}
              {currentView === 'day' && '📅 Today\'s Classes'}
            </h3>
            <p>
              {currentView === 'month' && moment(currentDate).format('MMMM YYYY')}
              {currentView === 'day' && moment(currentDate).format('dddd, MMMM D, YYYY')}
            </p>
          </div>

          <div className={styles.eventCardsGrid}>
            {getCurrentPeriodEvents()
              .sort((a, b) => moment(a.start).diff(moment(b.start)))
              .map((event, index) => (
              <div 
                key={index} 
                className={styles.eventCard}
                onClick={() => openEventModal(event)}
              >
                <div className={styles.eventCardHeader}>
                  <div className={styles.eventDate}>
                    <div className={styles.eventDay}>{moment(event.start).format('ddd')}</div>
                    <div className={styles.eventNumber}>{moment(event.start).format('D')}</div>
                    <div className={styles.eventMonth}>{moment(event.start).format('MMM')}</div>
                  </div>
                  <div className={styles.eventStatus}>
                    {moment(event.start).isSame(moment(), 'day') && (
                      <span className={styles.statusBadge + ' ' + styles.today}>
                        🔥 Today
                      </span>
                    )}
                    {moment(event.start).isAfter(moment()) && !moment(event.start).isSame(moment(), 'day') && (
                      <span className={styles.statusBadge + ' ' + styles.upcoming}>
                        ⏰ Upcoming
                      </span>
                    )}
                    {moment(event.start).isBefore(moment()) && (
                      <span className={styles.statusBadge + ' ' + styles.past}>
                        ✅ Completed
                      </span>
                    )}
                  </div>
                </div>
                
                <div className={styles.eventCardBody}>
                  <h4 className={styles.eventTitle}>{event.title}</h4>
                  <div className={styles.eventTime}>
                    🕐 {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                  </div>
                  <div className={styles.eventMeta}>
                    <span className={styles.eventDuration}>
                      ⏱️ {moment(event.end).diff(moment(event.start), 'minutes')} minutes
                    </span>
                    <span className={styles.eventTimezone}>
                      🌍 {event.resource.timezone}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {getCurrentPeriodEvents().length === 0 && (
            <div className={styles.noEventsInPeriod}>
              <div className={styles.noEventsIcon}>📅</div>
              <h4>No Classes Scheduled</h4>
              <p>
                {currentView === 'month' && 'No classes scheduled for this month.'}
                {currentView === 'day' && 'No classes scheduled for this day.'}
              </p>
            </div>
          )}
        </div>
      )}

      {events.length === 0 && (
        <div className={styles.noEventsContainer}>
          <div className={styles.noEventsIcon}>📅</div>
          <h3>No Events Scheduled</h3>
          <p>You don't have any lessons scheduled at the moment.</p>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className={styles.modalOverlay} onClick={closeEventModal}>
          <div className={styles.eventModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📚 Course Details</h3>
              <button className={styles.closeBtn} onClick={closeEventModal}>
                ✕
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.courseInfo}>
                <div className={styles.courseTitle}>
                  <span className={styles.courseIcon}>🎓</span>
                  <h4>{selectedEvent.resource.course}</h4>
                </div>
                
                <div className={styles.eventDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>📅</span>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Date</span>
                      <span className={styles.detailValue}>{moment(selectedEvent.start).format('MMMM Do, YYYY')}</span>
                    </div>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>🕐</span>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Time</span>
                      <span className={styles.detailValue}>{selectedEvent.resource.time}</span>
                    </div>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>⏱️</span>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Duration</span>
                      <span className={styles.detailValue}>{moment(selectedEvent.end).diff(moment(selectedEvent.start), 'minutes')} minutes</span>
                    </div>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>🌍</span>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Timezone</span>
                      <span className={styles.detailValue}>{selectedEvent.resource.timezone}</span>
                    </div>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>📆</span>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Day of Week</span>
                      <span className={styles.detailValue}>{moment(selectedEvent.start).format('dddd')}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.eventStatusModal}>
                  {moment(selectedEvent.start).isSame(moment(), 'day') && (
                    <div className={styles.statusBadge + ' ' + styles.today}>
                      🔥 Today's Class
                    </div>
                  )}
                  {moment(selectedEvent.start).isAfter(moment()) && !moment(selectedEvent.start).isSame(moment(), 'day') && (
                    <div className={styles.statusBadge + ' ' + styles.upcoming}>
                      ⏰ Upcoming
                    </div>
                  )}
                  {moment(selectedEvent.start).isBefore(moment()) && (
                    <div className={styles.statusBadge + ' ' + styles.past}>
                      ✅ Completed
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button className={styles.closeModalBtn} onClick={closeEventModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCalendar;