import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './StudentCalendar.module.css';

const localizer = momentLocalizer(moment);

// Custom Event Components for better mobile display
const MobileMonthEvent = ({ event }) => (
  <div className={styles.mobileMonthEvent}>
    <span className={styles.eventDot}>•</span>
    <span className={styles.eventText}>{event.title}</span>
  </div>
);

const MobileWeekEvent = ({ event }) => (
  <div className={styles.mobileWeekEvent}>
    <div className={styles.mobileEventTime}>
      {moment(event.start).format('HH:mm')}
    </div>
    <div className={styles.mobileEventTitle}>{event.title}</div>
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

// Custom Toolbar for better mobile experience
const CustomToolbar = ({ label, onNavigate, onView, view, views, isMobile }) => {
  return (
    <div className={styles.customToolbar}>
      <div className={styles.toolbarTop}>
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
        {!isMobile && (
          <button 
            className={styles.todayBtn} 
            onClick={() => onNavigate('TODAY')}
          >
            Today
          </button>
        )}
      </div>
      
      <div className={styles.bottomRow}>
        {isMobile && (
          <button 
            className={styles.todayBtnMobile} 
            onClick={() => onNavigate('TODAY')}
          >
            Today
          </button>
        )}
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
  const [currentView, setCurrentView] = useState(() => {
    // Smart default based on screen size
    return window.innerWidth <= 768 ? 'agenda' : 'month';
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    fetchCalendarEvents();
    
    // Suppress ResizeObserver errors
    const resizeObserverErrorHandler = (e) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || 
          e.message === 'ResizeObserver loop limit exceeded') {
        e.stopImmediatePropagation();
        return false;
      }
    };
    
    window.addEventListener('error', resizeObserverErrorHandler);
    
    // Handle window resize for responsive behavior with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        
        // Switch to agenda view on mobile for better UX
        if (mobile && currentView === 'month') {
          setCurrentView('agenda');
        } else if (!mobile && currentView === 'agenda') {
          setCurrentView('month');
        }
      }, 100); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('error', resizeObserverErrorHandler);
      clearTimeout(resizeTimeout);
    };
  }, [currentView]);

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

  // Helper function to get current week's events
  const getCurrentWeekEvents = () => {
    const startOfWeek = moment(currentDate).startOf('week');
    const endOfWeek = moment(currentDate).endOf('week');
    
    return events.filter(event => {
      const eventDate = moment(event.start);
      return eventDate.isBetween(startOfWeek, endOfWeek, 'day', '[]');
    });
  };

  // Helper function to get events grouped by day for the current week
  const getWeeklyEventsByDay = () => {
    const weekEvents = getCurrentWeekEvents();
    const groupedEvents = {};
    
    // Initialize all days of the week
    for (let i = 0; i < 7; i++) {
      const day = moment(currentDate).startOf('week').add(i, 'days');
      const dayKey = day.format('YYYY-MM-DD');
      groupedEvents[dayKey] = {
        date: day.toDate(),
        dayName: day.format('dddd'),
        dayShort: day.format('ddd'),
        dayNumber: day.format('D'),
        isToday: day.isSame(moment(), 'day'),
        events: []
      };
    }
    
    // Group events by day
    weekEvents.forEach(event => {
      const eventDay = moment(event.start).format('YYYY-MM-DD');
      if (groupedEvents[eventDay]) {
        groupedEvents[eventDay].events.push(event);
      }
    });
    
    return groupedEvents;
  };

  // Helper function to get events for current view period
  const getCurrentPeriodEvents = () => {
    if (currentView === 'week') {
      return getCurrentWeekEvents();
    } else if (currentView === 'month') {
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

  // Custom components for different views
  const components = {
    toolbar: (props) => <CustomToolbar {...props} isMobile={isMobile} />,
    event: ({ event }) => {
      if (isMobile) {
        if (currentView === 'month') return <MobileMonthEvent event={event} />;
        if (currentView === 'week') return <MobileWeekEvent event={event} />;
        if (currentView === 'day') return <MobileDayEvent event={event} />;
      }
      return <span>{event.title}</span>;
    },
    month: {
      dateHeader: ({ date, label }) => (
        <div className={styles.customDateHeader}>
          <span className={styles.dateNumber}>{label}</span>
        </div>
      )
    },
    week: {
      header: ({ date, label }) => {
        const dateStr = moment(date).format('YYYY-MM-DD');
        const weekEvents = getCurrentWeekEvents();
        const hasEvents = weekEvents.some(event => 
          moment(event.start).format('YYYY-MM-DD') === dateStr
        );
        
        // Always render header but style differently for empty days
        return (
          <div className={`${styles.customWeekHeader} ${!hasEvents ? styles.emptyDayHeader : ''}`}>
            <div className={styles.weekDay}>{moment(date).format('ddd')}</div>
            <div className={styles.weekDate}>{moment(date).format('D')}</div>
            {!hasEvents && <div className={styles.noEventsIndicator}>•</div>}
          </div>
        );
      }
    },
    day: {
      header: ({ date, label }) => (
        <div className={styles.customDayHeader}>
          <div className={styles.dayName}>{moment(date).format('dddd')}</div>
          <div className={styles.dayDate}>{moment(date).format('MMMM D, YYYY')}</div>
        </div>
      )
    }
  };

  // Custom formats for better mobile display
  const formats = {
    monthHeaderFormat: (date) => moment(date).format('MMMM YYYY'),
    dayHeaderFormat: (date) => moment(date).format('dddd, MMMM D'),
    dayRangeHeaderFormat: ({ start, end }) => 
      `${moment(start).format('MMM D')} - ${moment(end).format('MMM D, YYYY')}`,
    agendaDateFormat: (date) => moment(date).format('ddd, MMM D'),
    agendaTimeFormat: (date) => moment(date).format('h:mm A'),
    agendaTimeRangeFormat: ({ start, end }) => 
      `${moment(start).format('h:mm A')} - ${moment(end).format('h:mm A')}`,
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

      {!isMobile && (
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
              week: "Week", 
              day: "Day",
              agenda: "Agenda",
              date: "Date",
              time: "Time",
              event: "Event",
              noEventsInRange: "No events in this range",
              showMore: total => `+${total} more`,
              allDay: "All Day",
              work_week: "Work Week"
            }}
          />
        </div>
      )}

      {isMobile && (
        <div className={styles.mobileNavigation}>
          <div className={styles.mobileToolbar}>
            <div className={styles.mobileNavRow}>
              <button 
                className={styles.mobileNavBtn} 
                onClick={() => handleNavigate('PREV')}
              >
                ‹ Previous
              </button>
              <span className={styles.mobileNavLabel}>
                {currentView === 'month' && moment(currentDate).format('MMMM YYYY')}
                {currentView === 'week' && `${moment(currentDate).startOf('week').format('MMM D')} - ${moment(currentDate).endOf('week').format('MMM D, YYYY')}`}
                {currentView === 'day' && moment(currentDate).format('dddd, MMM D, YYYY')}
                {currentView === 'agenda' && 'All Events'}
              </span>
              <button 
                className={styles.mobileNavBtn} 
                onClick={() => handleNavigate('NEXT')}
              >
                Next ›
              </button>
            </div>
            
            <div className={styles.mobileViewRow}>
              <button 
                className={styles.mobileTodayBtn} 
                onClick={() => handleNavigate('TODAY')}
              >
                Today
              </button>
              <div className={styles.mobileViewSelector}>
                {['month', 'week', 'day', 'agenda'].map(viewName => (
                  <button
                    key={viewName}
                    className={`${styles.mobileViewBtn} ${currentView === viewName ? styles.active : ''}`}
                    onClick={() => handleViewChange(viewName)}
                  >
                    {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Section Under Calendar */}
      {events.length > 0 && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsHeader}>
            <h3>
              {currentView === 'week' && '📅 This Week\'s Classes'}
              {currentView === 'month' && '📅 This Month\'s Classes'}
              {currentView === 'day' && '📅 Today\'s Classes'}
              {currentView === 'agenda' && '📅 Upcoming Classes'}
            </h3>
            <p>
              {currentView === 'week' && `Week of ${moment(currentDate).startOf('week').format('MMM D')} - ${moment(currentDate).endOf('week').format('MMM D, YYYY')}`}
              {currentView === 'month' && moment(currentDate).format('MMMM YYYY')}
              {currentView === 'day' && moment(currentDate).format('dddd, MMMM D, YYYY')}
              {currentView === 'agenda' && 'All scheduled classes'}
            </p>
          </div>

          {currentView === 'week' && (
            <div className={styles.weeklyDetails}>
              {Object.entries(getWeeklyEventsByDay())
                .filter(([_, dayData]) => dayData.events.length > 0) // Only show days with events
                .map(([dayKey, dayData]) => (
                <div 
                  key={dayKey} 
                  className={`${styles.dayCard} ${dayData.isToday ? styles.todayCard : ''}`}
                >
                  <div className={styles.dayHeader}>
                    <div className={styles.dayInfo}>
                      <span className={styles.dayName}>{dayData.dayName}</span>
                      <span className={styles.dayNumber}>{dayData.dayNumber}</span>
                    </div>
                    {dayData.isToday && <span className={styles.todayIndicator}>Today</span>}
                  </div>
                  
                  <div className={styles.dayEvents}>
                    {dayData.events
                      .sort((a, b) => moment(a.start).diff(moment(b.start)))
                      .map((event, index) => (
                      <div 
                        key={index} 
                        className={styles.eventCard}
                        onClick={() => openEventModal(event)}
                      >
                        <div className={styles.eventTime}>
                          {moment(event.start).format('h:mm A')}
                        </div>
                        <div className={styles.eventInfo}>
                          <div className={styles.eventTitle}>{event.title}</div>
                          <div className={styles.eventMeta}>
                            <span className={styles.eventDuration}>⏱️ {moment(event.end).diff(moment(event.start), 'minutes')}min</span>
                            <span className={styles.eventTimezone}>🌍 {event.resource.timezone}</span>
                          </div>
                        </div>
                        <div className={styles.eventStatus}>
                          {dayData.isToday && <span className={styles.statusToday}>🔥</span>}
                          {!dayData.isToday && moment(event.start).isAfter(moment()) && <span className={styles.statusUpcoming}>⏰</span>}
                          {moment(event.start).isBefore(moment()) && <span className={styles.statusPast}>✅</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {(currentView === 'month' || currentView === 'day' || currentView === 'agenda') && (
            <div className={styles.listDetails}>
              {getCurrentPeriodEvents()
                .sort((a, b) => moment(a.start).diff(moment(b.start)))
                .map((event, index) => (
                <div 
                  key={index} 
                  className={styles.listEventCard}
                  onClick={() => openEventModal(event)}
                >
                  <div className={styles.listEventDate}>
                    <div className={styles.listEventDay}>{moment(event.start).format('ddd')}</div>
                    <div className={styles.listEventNumber}>{moment(event.start).format('D')}</div>
                    <div className={styles.listEventMonth}>{moment(event.start).format('MMM')}</div>
                  </div>
                  
                  <div className={styles.listEventInfo}>
                    <div className={styles.listEventTitle}>{event.title}</div>
                    <div className={styles.listEventTime}>
                      🕐 {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                    </div>
                    <div className={styles.listEventMeta}>
                      <span className={styles.listEventDuration}>⏱️ {moment(event.end).diff(moment(event.start), 'minutes')}min</span>
                      <span className={styles.listEventTimezone}>🌍 {event.resource.timezone}</span>
                    </div>
                  </div>
                  
                  <div className={styles.listEventStatus}>
                    {moment(event.start).isSame(moment(), 'day') && (
                      <div className={styles.listStatusBadge + ' ' + styles.listToday}>
                        🔥 Today
                      </div>
                    )}
                    {moment(event.start).isAfter(moment()) && !moment(event.start).isSame(moment(), 'day') && (
                      <div className={styles.listStatusBadge + ' ' + styles.listUpcoming}>
                        ⏰ Upcoming
                      </div>
                    )}
                    {moment(event.start).isBefore(moment()) && (
                      <div className={styles.listStatusBadge + ' ' + styles.listPast}>
                        ✅ Completed
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {getCurrentPeriodEvents().length === 0 && (
                <div className={styles.noEventsInPeriod}>
                  <div className={styles.noEventsIcon}>📅</div>
                  <h4>No Classes Scheduled</h4>
                  <p>
                    {currentView === 'month' && 'No classes scheduled for this month.'}
                    {currentView === 'day' && 'No classes scheduled for this day.'}
                    {currentView === 'agenda' && 'No classes scheduled.'}
                  </p>
                </div>
              )}
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
                
                <div className={styles.eventStatus}>
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