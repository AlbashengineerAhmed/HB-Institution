import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import RoleSwitcher from '../../components/RoleSwitcher/RoleSwitcher';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('student');
  
  // Mock user data based on role
  const getUserData = (role) => {
    const baseData = {
      id: 1,
      role: role,
      profilePicture: '/images/default-avatar.jpg',
      fullName: role === 'student' ? 'Ahmed Mohammed' : role === 'instructor' ? 'Dr. Sarah Ahmed' : 'Admin User',
      email: role === 'student' ? 'ahmed.mohammed@email.com' : role === 'instructor' ? 'sarah.ahmed@hbi.edu' : 'admin@hbi.edu',
      phone: '+1-555-0123',
      gender: role === 'instructor' ? 'female' : 'male',
      country: 'Saudi Arabia',
      bio: role === 'student' ? 'Passionate about Islamic studies and seeking knowledge.' : 
           role === 'instructor' ? 'Experienced educator in Islamic Finance with 8 years of teaching experience.' :
           'System administrator managing the HB Institution platform.'
    };

    if (role === 'student') {
      return {
        ...baseData,
        enrolledCourses: [
          { id: 1, name: 'Advanced Islamic Studies', progress: 75, instructor: 'Dr. Ahmed Hassan' },
          { id: 2, name: 'Arabic Language Fundamentals', progress: 60, instructor: 'Prof. Fatima Al-Zahra' },
          { id: 3, name: 'Islamic Finance Principles', progress: 30, instructor: 'Dr. Sarah Ahmed' }
        ]
      };
    }

    if (role === 'instructor') {
      return {
        ...baseData,
        specialty: 'Islamic Finance',
        certifications: [
          { name: 'PhD in Islamic Finance', file: 'phd-certificate.pdf' },
          { name: 'Teaching Certificate', file: 'teaching-cert.pdf' },
          { name: 'Sharia Compliance Certification', file: 'sharia-cert.pdf' }
        ],
        experience: '8 years',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/sarah-ahmed',
          youtube: 'https://youtube.com/c/islamic-finance-studies'
        },
        teachingSubjects: ['Islamic Finance', 'Sharia Compliance', 'Islamic Banking'],
        ownCourses: [
          { id: 1, name: 'Islamic Finance Principles', students: 45, status: 'active' },
          { id: 2, name: 'Advanced Islamic Banking', students: 32, status: 'active' },
          { id: 3, name: 'Sharia Compliance in Business', students: 28, status: 'pending' }
        ]
      };
    }

    if (role === 'admin') {
      return {
        ...baseData,
        adminLevel: 'Super Admin',
        permissions: ['User Management', 'Course Management', 'System Settings', 'Reports'],
        lastLogin: '2024-01-21 10:30 AM'
      };
    }

    return baseData;
  };

  const [currentUser, setCurrentUser] = useState(getUserData('student'));

  const [formData, setFormData] = useState({
    fullName: currentUser.fullName,
    email: currentUser.email,
    phone: currentUser.phone || '',
    gender: currentUser.gender,
    country: currentUser.country,
    bio: currentUser.bio,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    // Instructor specific
    specialty: currentUser.specialty || '',
    experience: currentUser.experience || '',
    linkedin: currentUser.socialLinks?.linkedin || '',
    youtube: currentUser.socialLinks?.youtube || '',
    teachingSubjects: currentUser.teachingSubjects?.join(', ') || ''
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(currentUser.profilePicture);

  // Update user data when role changes
  useEffect(() => {
    const newUserData = getUserData(currentRole);
    setCurrentUser(newUserData);
    setFormData({
      fullName: newUserData.fullName,
      email: newUserData.email,
      phone: newUserData.phone || '',
      gender: newUserData.gender,
      country: newUserData.country,
      bio: newUserData.bio,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      specialty: newUserData.specialty || '',
      experience: newUserData.experience || '',
      linkedin: newUserData.socialLinks?.linkedin || '',
      youtube: newUserData.socialLinks?.youtube || '',
      teachingSubjects: newUserData.teachingSubjects?.join(', ') || ''
    });
    setProfileImage(newUserData.profilePicture);
    setActiveTab('basic');
    setIsEditing(false);
  }, [currentRole]);

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // In real app, this would make API call to update profile
  };

  const handleCancel = () => {
    setFormData({
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: currentUser.phone || '',
      gender: currentUser.gender,
      country: currentUser.country,
      bio: currentUser.bio,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      specialty: currentUser.specialty || '',
      experience: currentUser.experience || '',
      linkedin: currentUser.socialLinks?.linkedin || '',
      youtube: currentUser.socialLinks?.youtube || '',
      teachingSubjects: currentUser.teachingSubjects?.join(', ') || ''
    });
    setIsEditing(false);
    setProfileImage(currentUser.profilePicture);
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      student: 'Student',
      instructor: 'Instructor',
      admin: 'Administrator'
    };
    return roleNames[role] || role;
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      student: styles.roleStudent,
      instructor: styles.roleInstructor,
      admin: styles.roleAdmin
    };
    
    return (
      <span className={`${styles.roleBadge} ${roleClasses[role]}`}>
        {getRoleDisplayName(role)}
      </span>
    );
  };

  return (
    <div className={styles.profilePage}>
      {/* Role Switcher for Demo */}
      <RoleSwitcher currentRole={currentRole} onRoleChange={handleRoleChange} />
      
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileImageSection}>
            <div className={styles.profileImageContainer}>
              <img 
                src={profileImage} 
                alt="Profile" 
                className={styles.profileImage}
                onError={(e) => {
                  e.target.src = '/images/default-avatar.jpg';
                }}
              />
              {isEditing && (
                <label className={styles.imageUploadLabel}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={styles.imageUploadInput}
                  />
                  <span className={styles.imageUploadIcon}>📷</span>
                </label>
              )}
            </div>
          </div>
          
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>{currentUser.fullName}</h1>
            <p className={styles.profileEmail}>{currentUser.email}</p>
            {getRoleBadge(currentUser.role)}
          </div>
          
          <div className={styles.profileActions}>
            {!isEditing ? (
              <button 
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className={styles.editActions}>
                <button 
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  ✅ Save Changes
                </button>
                <button 
                  className={styles.cancelBtn}
                  onClick={handleCancel}
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'basic' ? styles.active : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            👤 Basic Info
          </button>
          
          {currentUser.role === 'student' && (
            <button
              className={`${styles.tabBtn} ${activeTab === 'courses' ? styles.active : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              📚 My Courses
            </button>
          )}
          
          {currentUser.role === 'instructor' && (
            <>
              <button
                className={`${styles.tabBtn} ${activeTab === 'professional' ? styles.active : ''}`}
                onClick={() => setActiveTab('professional')}
              >
                🎓 Professional Info
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'courses' ? styles.active : ''}`}
                onClick={() => setActiveTab('courses')}
              >
                📚 My Courses
              </button>
            </>
          )}
          
          {currentUser.role === 'admin' && (
            <button
              className={`${styles.tabBtn} ${activeTab === 'admin' ? styles.active : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              👑 Admin Settings
            </button>
          )}
          
          <button
            className={`${styles.tabBtn} ${activeTab === 'security' ? styles.active : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Security
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'basic' && (
            <div className={styles.basicInfoTab}>
              <h3 className={styles.tabTitle}>Basic Information</h3>
              <form className={styles.profileForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing || currentUser.role === 'admin'}
                      required
                    />
                    {currentUser.role === 'admin' && (
                      <small className={styles.formNote}>
                        Admin email cannot be changed directly
                      </small>
                    )}
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                      disabled={!isEditing}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    rows="4"
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </form>
            </div>
          )}

          {activeTab === 'professional' && currentUser.role === 'instructor' && (
            <div className={styles.professionalTab}>
              <h3 className={styles.tabTitle}>Professional Information</h3>
              <form className={styles.profileForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Specialty/Expertise</label>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Years of Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Teaching Subjects (comma separated)</label>
                  <input
                    type="text"
                    name="teachingSubjects"
                    value={formData.teachingSubjects}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    disabled={!isEditing}
                    placeholder="e.g., Islamic Theology, Quran Studies, Islamic History"
                  />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>LinkedIn Profile</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>YouTube Channel</label>
                    <input
                      type="url"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                      placeholder="https://youtube.com/c/your-channel"
                    />
                  </div>
                </div>
                
                <div className={styles.certificationsSection}>
                  <h4 className={styles.sectionTitle}>Certifications</h4>
                  <div className={styles.certificationsList}>
                    {currentUser.certifications?.map((cert, index) => (
                      <div key={index} className={styles.certificationItem}>
                        <span className={styles.certificationName}>{cert.name}</span>
                        <a href={`/files/${cert.file}`} className={styles.certificationLink}>
                          📄 View Certificate
                        </a>
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <button type="button" className={styles.addCertBtn}>
                      ➕ Add Certification
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className={styles.coursesTab}>
              <h3 className={styles.tabTitle}>
                {currentUser.role === 'student' ? 'Enrolled Courses' : 'My Courses'}
              </h3>
              
              {currentUser.role === 'student' && (
                <div className={styles.coursesList}>
                  {currentUser.enrolledCourses?.map((course) => (
                    <div key={course.id} className={styles.courseCard}>
                      <div className={styles.courseInfo}>
                        <h4 className={styles.courseName}>{course.name}</h4>
                        <p className={styles.courseInstructor}>Instructor: {course.instructor}</p>
                      </div>
                      <div className={styles.courseProgress}>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className={styles.progressText}>{course.progress}% Complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {currentUser.role === 'instructor' && (
                <div className={styles.coursesList}>
                  {currentUser.ownCourses?.map((course) => (
                    <div key={course.id} className={styles.courseCard}>
                      <div className={styles.courseInfo}>
                        <h4 className={styles.courseName}>{course.name}</h4>
                        <p className={styles.courseStudents}>{course.students} Students Enrolled</p>
                      </div>
                      <div className={styles.courseStatus}>
                        <span className={`${styles.statusBadge} ${styles[course.status]}`}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'admin' && currentUser.role === 'admin' && (
            <div className={styles.adminTab}>
              <h3 className={styles.tabTitle}>Admin Settings</h3>
              <div className={styles.adminInfo}>
                <div className={styles.infoCard}>
                  <h4 className={styles.infoTitle}>Role & Permissions</h4>
                  <p className={styles.infoText}>
                    <strong>Role:</strong> {currentUser.adminLevel || 'Administrator'}
                  </p>
                  <p className={styles.infoText}>
                    <strong>Permissions:</strong> {currentUser.permissions?.join(', ') || 'Full system access'}
                  </p>
                  <p className={styles.infoText}>
                    <strong>Last Login:</strong> {currentUser.lastLogin || 'Today'}
                  </p>
                  <p className={styles.infoNote}>
                    Role and permissions are managed by system administrators and cannot be modified here.
                  </p>
                </div>
                
                <div className={styles.infoCard}>
                  <h4 className={styles.infoTitle}>User Management</h4>
                  <p className={styles.infoText}>
                    Manage other users through the dedicated admin dashboard.
                  </p>
                  <button 
                    className={styles.adminBtn}
                    onClick={() => navigate('/admin')}
                  >
                    🔧 Go to Admin Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className={styles.securityTab}>
              <h3 className={styles.tabTitle}>Security Settings</h3>
              <form className={styles.profileForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    disabled={!isEditing}
                    placeholder="Enter current password to change"
                  />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                {currentUser.role === 'student' && (
                  <div className={styles.dangerZone}>
                    <h4 className={styles.dangerTitle}>Danger Zone</h4>
                    <p className={styles.dangerText}>
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button type="button" className={styles.deleteBtn}>
                      🗑️ Request Account Deletion
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;