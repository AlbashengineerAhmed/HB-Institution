import React from 'react';
import styles from './CommunityPage.module.css';

const CommunityPage = () => {
  return (
    <div className={styles.communityPage}>
      {/* Community Banner Section */}
      <section className={styles.communityBanner}>
        <div className={container}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Our Community</h1>
            <p className={styles.bannerDescription}>
              At HB Institution, we believe in the power of community. Together, we create an environment where learning, growth, and meaningful connections flourish.
            </p>
          </div>
        </div>
      </section>

      {/* Student Life Section */}
      <section className={styles.studentLifeSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Student Life</h2>
          </div>
          <div className={styles.studentLifeContent}>
            <div className={styles.studentLifeImage}>
              <img src="/images/student-life.jpg" alt="Student Life" />
            </div>
            <div className={styles.studentLifeText}>
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
      <section className={styles.clubsSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Student Clubs</h2>
          </div>
          <div className={styles.clubsGrid}>
            <div className={styles.clubCard}>
              <div className={styles.clubIcon}>🎭</div>
              <h3 className={styles.clubTitle}>Arts & Culture Club</h3>
              <p className={styles.clubDescription}>Explore various art forms and cultural expressions through workshops, exhibitions, and performances.</p>
            </div>
            <div className={styles.clubCard}>
              <div className={styles.clubIcon}>🔬</div>
              <h3 className={styles.clubTitle}>Science & Innovation Club</h3>
              <p className={styles.clubDescription}>Engage in scientific experiments, research projects, and innovation challenges.</p>
            </div>
            <div className={styles.clubCard}>
              <div className={styles.clubIcon}>📚</div>
              <h3 className={styles.clubTitle}>Literary Society</h3>
              <p className={styles.clubDescription}>Cultivate a love for literature through book discussions, creative writing sessions, and poetry readings.</p>
            </div>
            <div className={styles.clubCard}>
              <div className={styles.clubIcon}>⚽</div>
              <h3 className={styles.clubTitle}>Sports Club</h3>
              <p className={styles.clubDescription}>Participate in various sports activities, tournaments, and fitness programs.</p>
            </div>
            <div className={styles.clubCard}>
              <div className={styles.clubIcon}>🌱</div>
              <h3 className={styles.clubTitle}>Environmental Club</h3>
              <p className={styles.clubDescription}>Work on sustainability projects, awareness campaigns, and conservation efforts.</p>
            </div>
            <div className={styles.clubCard}>
              <div className={styles.clubIcon}>🎤</div>
              <h3 className={styles.clubTitle}>Debate & Public Speaking</h3>
              <p className={styles.clubDescription}>Develop communication skills through debates, speeches, and Model UN conferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar Section */}
      <section className={styles.eventsSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
          </div>
          <div className={styles.eventsList}>
            <div className={styles.eventCard}>
              <div className={styles.eventDate}>
                <span className={styles.eventMonth}>SEP</span>
                <span className={styles.eventDay}>15</span>
              </div>
              <div className={styles.eventDetails}>
                <h3 className={styles.eventTitle}>Annual Science Fair</h3>
                <p className={styles.eventDescription}>Showcase of student research projects and scientific innovations.</p>
                <div className={styles.eventMeta}>
                  <span className={styles.eventTime}><i className="fas fa-Clock"></i> 10:00 AM - 4:00 PM</span>
                  <span className={styles.eventLocation}><i className="fas fa-MapMarkerAlt"></i> Main Campus</span>
                </div>
              </div>
            </div>
            <div className={styles.eventCard}>
              <div className={styles.eventDate}>
                <span className={styles.eventMonth}>OCT</span>
                <span className={styles.eventDay}>05</span>
              </div>
              <div className={styles.eventDetails}>
                <h3 className={styles.eventTitle}>Cultural Festival</h3>
                <p className={styles.eventDescription}>Celebration of diverse cultures through music, dance, food, and art.</p>
                <div className={styles.eventMeta}>
                  <span className={styles.eventTime}><i className="fas fa-Clock"></i> 12:00 PM - 8:00 PM</span>
                  <span className={styles.eventLocation}><i className="fas fa-MapMarkerAlt"></i> Campus Grounds</span>
                </div>
              </div>
            </div>
            <div className={styles.eventCard}>
              <div className={styles.eventDate}>
                <span className={styles.eventMonth}>NOV</span>
                <span className={styles.eventDay}>20</span>
              </div>
              <div className={styles.eventDetails}>
                <h3 className={styles.eventTitle}>Alumni Networking Event</h3>
                <p className={styles.eventDescription}>Connect with alumni and explore career opportunities.</p>
                <div className={styles.eventMeta}>
                  <span className={styles.eventTime}><i className="fas fa-Clock"></i> 6:00 PM - 9:00 PM</span>
                  <span className={styles.eventLocation}><i className="fas fa-MapMarkerAlt"></i> Conference Hall</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.eventsCta}>
            <button className={styles.btnViewAll}>View All Events</button>
          </div>
        </div>
      </section>

      {/* Alumni Network Section */}
      <section className={styles.alumniSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Alumni Network</h2>
          </div>
          <div className={styles.alumniContent}>
            <div className={styles.alumniText}>
              <p>
                Our alumni are our pride and ambassadors. The HB Institution Alumni Network connects graduates across generations, creating opportunities for mentorship, professional development, and lifelong learning.
              </p>
              <p>
                Through regular reunions, networking events, and collaborative projects, our alumni continue to contribute to the institution's growth while advancing in their respective fields.
              </p>
              <div className={styles.alumniCta}>
                <button className={styles.btnJoinAlumni}>Join Alumni Network</button>
              </div>
            </div>
            <div className={styles.alumniImage}>
              <img src="/images/alumni.jpg" alt="Alumni Network" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Outreach Section */}
      <section className={styles.outreachSection}>
        <div className={container}>
          <div className="section-header">
            <h2 className="section-title">Community Outreach</h2>
          </div>
          <div className={styles.outreachContent}>
            <div className={styles.outreachImage}>
              <img src="/images/outreach.jpg" alt="Community Outreach" />
            </div>
            <div className={styles.outreachText}>
              <p>
                At HB Institution, we believe in giving back to society. Our community outreach programs engage students, faculty, and staff in meaningful service activities that address social challenges and promote positive change.
              </p>
              <p>
                From educational initiatives in underserved areas to environmental conservation projects, our outreach efforts reflect our commitment to social responsibility and community development.
              </p>
              <div className={styles.outreachInitiatives}>
                <div className={styles.initiativeItem}>
                  <i className="fas fa-BookReader styles.initiativeIcon"></i>
                  <span className={styles.initiativeText}>Literacy Programs</span>
                </div>
                <div className={styles.initiativeItem}>
                  <i className="fas fa-HandsHelping styles.initiativeIcon"></i>
                  <span className={styles.initiativeText}>Community Service</span>
                </div>
                <div className={styles.initiativeItem}>
                  <i className="fas fa-Seedling styles.initiativeIcon"></i>
                  <span className={styles.initiativeText}>Environmental Projects</span>
                </div>
                <div className={styles.initiativeItem}>
                  <i className="fas fa-Heartbeat styles.initiativeIcon"></i>
                  <span className={styles.initiativeText}>Health Awareness</span>
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