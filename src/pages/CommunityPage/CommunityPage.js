import React from 'react';
import './CommunityPage.css';

const CommunityPage = () => {
  return (
    <div className="community-page">
      {/* Community Banner Section */}
      <section className="community-banner">
        <div className="container">
          <div className="banner-content">
            <h1 className="banner-title">Our Community</h1>
            <p className="banner-description">
              At HB Institution, we believe in the power of community. Together, we create an environment where learning, growth, and meaningful connections flourish.
            </p>
          </div>
        </div>
      </section>

      {/* Student Life Section */}
      <section className="student-life-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Life</h2>
          </div>
          <div className="student-life-content">
            <div className="student-life-image">
              <img src="/images/student-life.jpg" alt="Student Life" />
            </div>
            <div className="student-life-text">
              <p>
                Student life at HB Institution is vibrant and enriching. We foster an environment where students can explore their interests, develop leadership skills, and build lifelong friendships.
              </p>
              <p>
                Our campus buzzes with activities ranging from academic clubs to cultural events, sports competitions to spiritual gatherings. We believe that learning extends beyond the classroom, and our diverse community activities reflect this philosophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Clubs Section */}
      <section className="clubs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Clubs</h2>
          </div>
          <div className="clubs-grid">
            <div className="club-card">
              <div className="club-icon">🎭</div>
              <h3 className="club-title">Arts & Culture Club</h3>
              <p className="club-description">Explore various art forms and cultural expressions through workshops, exhibitions, and performances.</p>
            </div>
            <div className="club-card">
              <div className="club-icon">🔬</div>
              <h3 className="club-title">Science & Innovation Club</h3>
              <p className="club-description">Engage in scientific experiments, research projects, and innovation challenges.</p>
            </div>
            <div className="club-card">
              <div className="club-icon">📚</div>
              <h3 className="club-title">Literary Society</h3>
              <p className="club-description">Cultivate a love for literature through book discussions, creative writing sessions, and poetry readings.</p>
            </div>
            <div className="club-card">
              <div className="club-icon">⚽</div>
              <h3 className="club-title">Sports Club</h3>
              <p className="club-description">Participate in various sports activities, tournaments, and fitness programs.</p>
            </div>
            <div className="club-card">
              <div className="club-icon">🌱</div>
              <h3 className="club-title">Environmental Club</h3>
              <p className="club-description">Work on sustainability projects, awareness campaigns, and conservation efforts.</p>
            </div>
            <div className="club-card">
              <div className="club-icon">🎤</div>
              <h3 className="club-title">Debate & Public Speaking</h3>
              <p className="club-description">Develop communication skills through debates, speeches, and Model UN conferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar Section */}
      <section className="events-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
          </div>
          <div className="events-list">
            <div className="event-card">
              <div className="event-date">
                <span className="event-month">SEP</span>
                <span className="event-day">15</span>
              </div>
              <div className="event-details">
                <h3 className="event-title">Annual Science Fair</h3>
                <p className="event-description">Showcase of student research projects and scientific innovations.</p>
                <div className="event-meta">
                  <span className="event-time"><i className="fas fa-clock"></i> 10:00 AM - 4:00 PM</span>
                  <span className="event-location"><i className="fas fa-map-marker-alt"></i> Main Campus</span>
                </div>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="event-month">OCT</span>
                <span className="event-day">05</span>
              </div>
              <div className="event-details">
                <h3 className="event-title">Cultural Festival</h3>
                <p className="event-description">Celebration of diverse cultures through music, dance, food, and art.</p>
                <div className="event-meta">
                  <span className="event-time"><i className="fas fa-clock"></i> 12:00 PM - 8:00 PM</span>
                  <span className="event-location"><i className="fas fa-map-marker-alt"></i> Campus Grounds</span>
                </div>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="event-month">NOV</span>
                <span className="event-day">20</span>
              </div>
              <div className="event-details">
                <h3 className="event-title">Alumni Networking Event</h3>
                <p className="event-description">Connect with alumni and explore career opportunities.</p>
                <div className="event-meta">
                  <span className="event-time"><i className="fas fa-clock"></i> 6:00 PM - 9:00 PM</span>
                  <span className="event-location"><i className="fas fa-map-marker-alt"></i> Conference Hall</span>
                </div>
              </div>
            </div>
          </div>
          <div className="events-cta">
            <button className="btn-view-all">View All Events</button>
          </div>
        </div>
      </section>

      {/* Alumni Network Section */}
      <section className="alumni-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Alumni Network</h2>
          </div>
          <div className="alumni-content">
            <div className="alumni-text">
              <p>
                Our alumni are our pride and ambassadors. The HB Institution Alumni Network connects graduates across generations, creating opportunities for mentorship, professional development, and lifelong learning.
              </p>
              <p>
                Through regular reunions, networking events, and collaborative projects, our alumni continue to contribute to the institution's growth while advancing in their respective fields.
              </p>
              <div className="alumni-cta">
                <button className="btn-join-alumni">Join Alumni Network</button>
              </div>
            </div>
            <div className="alumni-image">
              <img src="/images/alumni.jpg" alt="Alumni Network" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Outreach Section */}
      <section className="outreach-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Community Outreach</h2>
          </div>
          <div className="outreach-content">
            <div className="outreach-image">
              <img src="/images/outreach.jpg" alt="Community Outreach" />
            </div>
            <div className="outreach-text">
              <p>
                At HB Institution, we believe in giving back to society. Our community outreach programs engage students, faculty, and staff in meaningful service activities that address social challenges and promote positive change.
              </p>
              <p>
                From educational initiatives in underserved areas to environmental conservation projects, our outreach efforts reflect our commitment to social responsibility and community development.
              </p>
              <div className="outreach-initiatives">
                <div className="initiative-item">
                  <i className="fas fa-book-reader initiative-icon"></i>
                  <span className="initiative-text">Literacy Programs</span>
                </div>
                <div className="initiative-item">
                  <i className="fas fa-hands-helping initiative-icon"></i>
                  <span className="initiative-text">Community Service</span>
                </div>
                <div className="initiative-item">
                  <i className="fas fa-seedling initiative-icon"></i>
                  <span className="initiative-text">Environmental Projects</span>
                </div>
                <div className="initiative-item">
                  <i className="fas fa-heartbeat initiative-icon"></i>
                  <span className="initiative-text">Health Awareness</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;