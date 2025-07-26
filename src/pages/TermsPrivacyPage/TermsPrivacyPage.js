import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TermsPrivacyPage.module.css';

const TermsPrivacyPage = () => {
  const [activeSection, setActiveSection] = useState('privacy');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'privacy', title: 'Privacy Policy', icon: '🔒' },
    { id: 'terms', title: 'Terms & Conditions', icon: '📋' },
    { id: 'cookies', title: 'Cookie Policy', icon: '🍪' },
    { id: 'honor', title: 'Student Honor Code', icon: '🎓' },
    { id: 'leadership', title: 'Leadership & Advisory Board', icon: '👥' },
    { id: 'faq', title: 'FAQ', icon: '❓' },
    { id: 'mission', title: 'Mission & Vision', icon: '🎯' }
  ];

  const renderPrivacyPolicy = () => (
    <div className={styles.sectionContent}>
      <h1>Privacy Policy</h1>
      <p className={styles.effectiveDate}><strong>Effective Date:</strong> 01/01/2025</p>
      
      <p>Welcome to <strong>HB Institution</strong> ("we," "our," or "us"). We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and protect your data when you access our website and use our educational services.</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information when you use our services:</p>
      
      <h3>a. Personal Identification Information</h3>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Nationality</li>
        <li>Date of birth (optional)</li>
      </ul>

      <h3>b. Academic & Enrollment Data</h3>
      <ul>
        <li>Courses enrolled</li>
        <li>Assignments and submissions</li>
        <li>Exam attempts and results</li>
        <li>Attendance and progress tracking</li>
        <li>Certificates issued</li>
      </ul>

      <h3>c. Technical & System Information</h3>
      <ul>
        <li>IP address</li>
        <li>Browser type and device</li>
        <li>Operating system</li>
        <li>Access time and activity logs (e.g., course visits, duration)</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Register and manage your student account</li>
        <li>Provide access to our educational courses and materials</li>
        <li>Track academic performance (e.g., exams, assignments)</li>
        <li>Communicate important updates and reminders</li>
        <li>Improve our content and platform</li>
        <li>Ensure the safety, integrity, and functionality of the system</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>We <strong>do not sell or rent</strong> your information to anyone. We only share data in limited, necessary cases:</p>
      <ul>
        <li>With authorized HB Institution staff and instructors</li>
        <li>With certification partners (if applicable, for issuing credentials)</li>
        <li>When legally required to comply with applicable laws or authorities</li>
      </ul>

      <h2>4. No Financial Data Collected</h2>
      <p>HB Institution is a <strong>free educational platform</strong>. We do <strong>not</strong> collect, process, or store any payment or billing information.</p>

      <h2>5. Data Security</h2>
      <p>We use secure systems and protocols to protect your data, including:</p>
      <ul>
        <li>Encrypted servers</li>
        <li>Limited access controls</li>
        <li>Activity monitoring</li>
        <li>Regular data backups</li>
      </ul>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction or deletion of your information</li>
        <li>Withdraw from our platform at any time</li>
        <li>Contact us regarding any data concerns</li>
      </ul>
      <p>To exercise your rights, please email us at:<br />
      📧 <strong>support@hbinstitution.com</strong></p>

      <h2>7. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.</p>

      <h2>8. Contact Us</h2>
      <p>If you have any questions or concerns regarding this Privacy Policy or your data:</p>
      <p>📧 <strong>Email:</strong> support@hbinstitution.com<br />
      🌐 <strong>Website:</strong> https://hbinstitution.com</p>
    </div>
  );

  const renderTermsConditions = () => (
    <div className={styles.sectionContent}>
      <h1>Terms & Conditions</h1>
      <p className={styles.effectiveDate}><strong>Effective Date:</strong> 01/01/2025</p>
      
      <p>Please read these Terms and Conditions ("Terms") carefully before using the HB Institution platform ("we", "our", or "us"). By accessing or using our website and services, you agree to be bound by these Terms.</p>
      <p>If you do not agree with any part of these Terms, please do not use our services.</p>

      <h2>1. Eligibility</h2>
      <p>You must be at least 13 years old to use our services. By registering, you confirm that you meet this age requirement.</p>

      <h2>2. Use of Services</h2>
      <p>HB Institution provides free access to educational courses, assessments, and certification services. By using our platform, you agree to:</p>
      <ul>
        <li>Provide accurate and truthful information when registering</li>
        <li>Use the platform only for lawful and educational purposes</li>
        <li>Respect academic integrity (e.g., do not cheat on exams or plagiarize assignments)</li>
        <li>Not share your account credentials with others</li>
      </ul>

      <h2>3. Account Responsibility</h2>
      <p>You are responsible for maintaining the confidentiality of your login credentials. If you suspect unauthorized use of your account, please contact us immediately at <strong>support@hbinstitution.com</strong>.</p>

      <h2>4. Intellectual Property</h2>
      <p>All content provided on HB Institution, including course materials, videos, graphics, logos, and written content, is the intellectual property of HB Institution or its content providers. You may not reproduce, distribute, or publicly display any content without our prior written consent.</p>

      <h2>5. Privacy</h2>
      <p>Our use of your personal data is governed by our <strong>Privacy Policy</strong>. By using our services, you consent to the collection and use of your data in accordance with that policy.</p>

      <h2>6. Code of Conduct</h2>
      <p>You agree to use HB Institution respectfully. You must not:</p>
      <ul>
        <li>Harass, abuse, or harm other users</li>
        <li>Attempt to access restricted areas or data</li>
        <li>Upload malware, spam, or any harmful code</li>
        <li>Misuse or manipulate exam systems</li>
      </ul>
      <p>We reserve the right to suspend or terminate accounts that violate this code.</p>

      <h2>7. Disclaimers</h2>
      <ul>
        <li>HB Institution provides educational content "as is" without warranties of any kind.</li>
        <li>We do not guarantee any specific academic or career outcomes.</li>
        <li>We may modify, suspend, or remove any part of the platform at any time without prior notice.</li>
      </ul>

      <h2>8. Limitation of Liability</h2>
      <p>HB Institution shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including loss of data or academic opportunities.</p>

      <h2>9. Changes to Terms</h2>
      <p>We may update these Terms from time to time. All changes will be posted on this page with an updated effective date. Continued use of the platform means you accept the new Terms.</p>

      <h2>10. Governing Law</h2>
      <p>These Terms shall be governed by the laws of the jurisdiction where HB Institution is legally registered.</p>

      <h2>11. Contact Us</h2>
      <p>If you have questions or concerns about these Terms, please contact:</p>
      <p>📧 <strong>support@hbinstitution.com</strong><br />
      🌐 <strong>Website:</strong> https://hbinstitution.com</p>
    </div>
  );

  const renderCookiePolicy = () => (
    <div className={styles.sectionContent}>
      <h1>Cookie Policy</h1>
      <p className={styles.effectiveDate}><strong>Effective Date:</strong> 01/01/2025</p>
      
      <p>HB Institution ("we", "our", or "us") uses cookies to improve your experience on our website. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.</p>

      <h2>1. What Are Cookies?</h2>
      <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember your actions and preferences over time.</p>

      <h2>2. Why We Use Cookies</h2>
      <p>We use cookies for the following reasons:</p>
      <ul>
        <li>To enable essential website functions</li>
        <li>To remember your login and session preferences</li>
        <li>To analyze website traffic and performance</li>
        <li>To improve user experience and course recommendations</li>
      </ul>

      <h2>3. Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for basic site functionality (e.g., login, navigation)</li>
        <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the site (e.g., which pages are most visited)</li>
        <li><strong>Functional Cookies:</strong> Remember your preferences such as language or device type</li>
      </ul>

      <h2>4. Managing Cookies</h2>
      <p>You can control or delete cookies at any time through your browser settings. Please note that disabling certain cookies may affect site functionality.</p>

      <h2>5. Third-Party Cookies</h2>
      <p>We may use third-party tools (like Google Analytics) that place cookies on your device for analytics and performance insights.</p>

      <h2>6. Updates to This Policy</h2>
      <p>We may revise this Cookie Policy occasionally. All changes will be posted here with the updated effective date.</p>

      <p><strong>Questions?</strong><br />
      📧 Contact us at: <strong>support@hbinstitution.com</strong></p>
    </div>
  );

  const renderHonorCode = () => (
    <div className={styles.sectionContent}>
      <h1>Student Honor Code</h1>
      <p className={styles.effectiveDate}><strong>Effective Date:</strong> 01/01/2025</p>
      
      <p>At HB Institution, we believe in honesty, responsibility, and academic integrity. This <strong>Student Honor Code</strong> outlines the expected ethical standards for all students.</p>

      <h2>1. Academic Integrity</h2>
      <p>As a student, you agree to:</p>
      <ul>
        <li>Submit your own original work</li>
        <li>Avoid plagiarism, copying, or using AI tools to cheat</li>
        <li>Not share exam answers or assignment solutions with others</li>
        <li>Take assessments honestly and independently unless group work is allowed</li>
      </ul>

      <h2>2. Respect for Others</h2>
      <p>You agree to:</p>
      <ul>
        <li>Respect instructors, staff, and fellow students</li>
        <li>Avoid offensive language, discrimination, or harassment</li>
        <li>Use the platform in a way that promotes a positive learning environment</li>
      </ul>

      <h2>3. Platform Use</h2>
      <p>You must:</p>
      <ul>
        <li>Not create multiple fake accounts</li>
        <li>Not try to access restricted data or areas</li>
        <li>Not attempt to hack or disrupt the system</li>
        <li>Report any suspicious activity or abuse</li>
      </ul>

      <h2>4. Consequences of Violating the Code</h2>
      <p>Violations of the Honor Code may result in:</p>
      <ul>
        <li>Warnings or course removal</li>
        <li>Suspension or permanent ban from the platform</li>
        <li>Revocation of certificates or academic achievements</li>
      </ul>

      <h2>5. Commitment</h2>
      <p>By using HB Institution, you agree to follow this Honor Code and uphold the values of trust, honesty, and academic fairness.</p>

      <p>If you have any concerns or need help: 📧 <strong>Email us at:</strong> support@hbinstitution.com</p>
    </div>
  );

  const renderLeadership = () => (
    <div className={styles.sectionContent}>
      <h1>Leadership & Advisory Board</h1>
      
      <p>At <strong>HB Institution</strong>, we are honored to be led by a team of respected scholars, educators, and advisors who bring integrity, deep Islamic knowledge, and academic expertise to every aspect of our mission. Together, they guide our vision to deliver high-quality, tuition-free education to learners around the world.</p>

      <div className={styles.leadershipSection}>
        <h2>🟫 Founder & Chairman</h2>
        <div className={styles.leaderCard}>
          <h3>Hamed Minhaj</h3>
          <h4>Founder & Chairman</h4>
          <p>A visionary education leader and humanitarian with a strong foundation in academic strategy, institutional development, and outreach. Hamed Minhaj founded HB Institution to offer a platform where education is accessible, spiritually guided, and completely free of charge.</p>
        </div>
      </div>

      <div className={styles.leadershipSection}>
        <h2>🟫 Advisory Board</h2>
        
        <div className={styles.leaderCard}>
          <h3>Sheikh Muhammad Hassan</h3>
          <p>A leading authority in hadith and Islamic jurisprudence, respected for his depth of knowledge and decades of service in dawah and Islamic reform across the Muslim world.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Sheikh Muhammad Hussein Yacoub</h3>
          <p>Known globally for his contributions in spiritual development and purification of the soul, Sheikh Yacoub's lectures and books have benefited millions.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Sheikh Mustafa Al-Adawi</h3>
          <p>A distinguished scholar in tafsir, hadith, and Islamic rulings, widely followed for his clarity, authenticity, and practical teachings.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Sheikh Wahid Abdussalam Bali <em>(May Allah have mercy on him)</em></h3>
          <p>A pioneer in Islamic ruqyah and author of foundational works on spiritual protection. His legacy continues to guide those seeking healing and protection through the Qur'an.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Sheikh Ayman Suwayd</h3>
          <p>Renowned expert in the ten Qira'at and Quranic sciences. Sheikh Suwayd is globally recognized for his precise tajweed instruction and scholarly contributions.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Dr. Muhammed Saeed Rahwan</h3>
          <p>Senior advisor in Islamic education and curriculum development, with over 20 years of experience helping institutions combine traditional learning with modern educational design.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Dr. Muhammad Fawzy Abdel-Hay</h3>
          <p>Advisor in Quranic studies and comparative religion, with a strong focus on academic integrity, structure, and research leadership.</p>
        </div>
      </div>

      <div className={styles.leadershipSection}>
        <h2>🟫 Academic Department Heads</h2>
        
        <div className={styles.leaderCard}>
          <h3>Sheikh Hassan Yehya Mohammed Al Hallway</h3>
          <h4>Head of Islamic Faculty</h4>
          <p>Leads our Islamic Studies department with depth in fiqh and shariah, ensuring that our curriculum reflects classical knowledge and authentic understanding.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Sheikh Mohamed Alewife Abdouelhassan Mohamed</h3>
          <h4>Head of Quranic Recitation</h4>
          <p>Certified in all ten Qira'at, he teaches the art of Quranic recitation with sanad and precision, fostering love for the Qur'an among students worldwide.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Sheikh Ashraf Jumaa</h3>
          <h4>Head of All Ten Qira'at</h4>
          <p>A highly qualified reciter and scholar, Sheikh Ashraf is responsible for the advanced teaching of the ten Qira'at, supporting students seeking ijazah and mastery.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Mr. Lotfi Mili</h3>
          <h4>Head of Business Administration Studies</h4>
          <p>With over <strong>28 years of experience</strong>, Mr. Lotfi brings leadership in both corporate and academic sectors, integrating ethical business knowledge with global best practices.</p>
        </div>

        <div className={styles.leaderCard}>
          <h3>Mr. Eslam Mohammed Yahya</h3>
          <h4>Head of Teacher Coordination</h4>
          <p>Manages the structure and flow between instructors and departments. With a passion for quality delivery, he ensures teacher performance, scheduling, and support meet our academic goals.</p>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className={styles.sectionContent}>
      <h1>Frequently Asked Questions (FAQ)</h1>
      
      <p>Welcome to HB Institution. Below are answers to some of the most common questions students and visitors ask.</p>

      <div className={styles.faqItem}>
        <h3>1. Is HB Institution really free?</h3>
        <p>Yes. All our courses, materials, and exams are <strong>100% free</strong>. There are no registration fees, subscription costs, or hidden charges.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>2. What kind of courses do you offer?</h3>
        <p>We offer a wide range of academic and Islamic courses, including:</p>
        <ul>
          <li>Islamic Studies (Aqeedah, Fiqh, Seerah, etc.)</li>
          <li>Quranic Recitation and Memorization</li>
          <li>Business Administration</li>
          <li>Psychology</li>
          <li>IT and Computer Studies</li>
          <li>Education & Teaching Methodology</li>
        </ul>
      </div>

      <div className={styles.faqItem}>
        <h3>3. Who can join HB Institution?</h3>
        <p>Anyone from anywhere in the world can join. There are no age, background, or educational restrictions. All you need is a sincere desire to learn.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>4. How do I register?</h3>
        <p>Click the <strong>"Register"</strong> or <strong>"Sign Up"</strong> button on our homepage. Fill in your details, and you'll receive instant access to your student dashboard.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>5. Do I receive a certificate after completing a course?</h3>
        <p>Yes. Once you complete the required lessons and pass the final assessments, you will receive an official <strong>digital certificate</strong> from HB Institution.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>6. Are the instructors qualified?</h3>
        <p>Yes. Our instructors include certified scholars, professionals, and academic experts, many of whom hold advanced degrees or ijazahs in their fields.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>7. Is the platform available in multiple languages?</h3>
        <p>Yes. We currently offer courses in <strong>English, Arabic, Russian, French, and Portuguese</strong>. More languages will be added in the future, inshaAllah.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>8. Can I study at my own pace?</h3>
        <p>Yes. All of our programs are <strong>self-paced</strong>, allowing you to study anytime, from anywhere, based on your own schedule.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>9. How can I get help if I face an issue?</h3>
        <p>You can reach our support team by emailing <strong>support@hbinstitution.com</strong>. We aim to respond within 24–48 hours.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>10. Are your certificates officially recognized?</h3>
        <p>Our certificates are not government-accredited, but they are <strong>respected within many Islamic institutions, educational settings, and community learning programs</strong>.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>11. Can I volunteer or teach with HB Institution?</h3>
        <p>Yes. If you're a qualified teacher or want to volunteer, please contact us at <strong>support@hbinstitution.com</strong> with your resume and area of expertise.</p>
      </div>

      <div className={styles.faqItem}>
        <h3>12. Is there a mobile app?</h3>
        <p>Currently, we do not have a mobile app. However, the entire platform is <strong>mobile-friendly</strong> and works smoothly on any smartphone browser.</p>
      </div>
    </div>
  );

  const renderMissionVision = () => (
    <div className={styles.sectionContent}>
      <h1>Mission & Vision</h1>
      
      <div className={styles.missionVisionCard}>
        <h2>🔹 Mission</h2>
        <p>At <strong>HB Institution</strong>, our mission is to make <strong>high-quality Islamic and academic education freely accessible to every soul</strong> no matter their background, location, or circumstance.</p>
        <p>We are here to teach with sincerity, lead with purpose, and serve with integrity empowering individuals to grow in knowledge, faith, and contribution.</p>
      </div>

      <div className={styles.missionVisionCard}>
        <h2>🔹 Vision</h2>
        <p>We envision a world where <strong>authentic knowledge is no longer a privilege, but a right.</strong></p>
        <p>A world where young minds are nurtured, hearts are enlightened, and a new generation rises equipped with faith, wisdom, and the courage to lead.</p>
        <p>Our vision is to build a <strong>global legacy</strong> of learners and leaders who carry light wherever they go.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'privacy':
        return renderPrivacyPolicy();
      case 'terms':
        return renderTermsConditions();
      case 'cookies':
        return renderCookiePolicy();
      case 'honor':
        return renderHonorCode();
      case 'leadership':
        return renderLeadership();
      case 'faq':
        return renderFAQ();
      case 'mission':
        return renderMissionVision();
      default:
        return renderPrivacyPolicy();
    }
  };

  return (
    <div className={styles.termsPrivacyPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Legal & Information Center</h1>
          <p>Everything you need to know about HB Institution's policies, leadership, and mission</p>
          <Link to="/auth/register" className={styles.backToRegister}>
            ← Back to Registration
          </Link>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div className={styles.navigation}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className={styles.navIcon}>{section.icon}</span>
                  <span className={styles.navTitle}>{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.mainContent}>
            {renderContent()}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <p>📧 <strong>Contact:</strong> support@hbinstitution.com</p>
            <p>🌐 <strong>Website:</strong> https://hbinstitution.com</p>
            <p className={styles.lastUpdated}>Last updated: January 1, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPrivacyPage;