import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePassword, updateProfile, clearLoading, fetchUserProfile } from '../../store/slices/authSlice';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  
  // Clear any persistent loading state on component mount
  useEffect(() => {
    dispatch(clearLoading());
  }, [dispatch]);
  
  // Only use data from backend - no hardcoded fallbacks
  const currentUser = {
    id: user?.id || user?._id,
    role: user?.role,
    profilePicture: user?.avatar || user?.profilePicture || user?.image,
    firstName: user?.firstName,
    lastName: user?.lastName,
    fullName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber || user?.phone,
    gender: user?.gender,
    country: user?.country,
    bio: user?.bio,
    // Only show fields that exist in backend
    specialty: user?.specialty,
    experience: user?.experience,
    socialLinks: user?.socialLinks,
    teachingSubjects: user?.teachingSubjects,
    certifications: user?.certifications,
    adminLevel: user?.adminLevel,
    permissions: user?.permissions,
    lastLogin: user?.lastLogin
  };

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    phoneNumber: currentUser.phoneNumber || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        phoneNumber: currentUser.phoneNumber || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setProfileImage(currentUser.profilePicture);
    }
  }, [user]);

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
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    try {
      // Create FormData for profile update
      const profileFormData = new FormData();
      
      // Add text fields only if they have values from backend
      if (formData.firstName) {
        profileFormData.append('firstName', formData.firstName);
      }
      if (formData.phoneNumber) {
        profileFormData.append('phoneNumber', formData.phoneNumber);
      }
      
      // Add image if selected
      if (selectedImageFile) {
        profileFormData.append('image', selectedImageFile);
      }

      // Only send profile update if there's data to update
      if (profileFormData.has('firstName') || profileFormData.has('phoneNumber') || profileFormData.has('image')) {
        await dispatch(updateProfile(profileFormData)).unwrap();
        
        // Fetch updated user profile to ensure we have the latest data including avatar
        await dispatch(fetchUserProfile()).unwrap();
      }

      setIsEditing(false);
      setSelectedImageFile(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword || !formData.newPassword) {
      alert('Please fill in both current and new password');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      await dispatch(updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })).unwrap();

      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      phoneNumber: currentUser.phoneNumber || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditing(false);
    setProfileImage(currentUser.profilePicture);
    setSelectedImageFile(null);
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
    if (!role) return null;
    
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

  // Don't render if no user data
  if (!user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.loadingMessage}>
            Please log in to view your profile.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileImageSection}>
            <div className={styles.profileImageContainer}>
              <img 
                src={profileImage || '/images/default-avatar.jpg'} 
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
            <h1 className={styles.profileName}>
              {currentUser.fullName || 'User'}
            </h1>
            {currentUser.email && (
              <p className={styles.profileEmail}>{currentUser.email}</p>
            )}
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
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Saving...' : '✅ Save Changes'}
                </button>
                <button 
                  className={styles.cancelBtn}
                  onClick={handleCancel}
                  disabled={isLoading}
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
              <form className={styles.profileForm} onSubmit={handleSaveProfile}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                      placeholder={!currentUser.firstName ? "Not provided" : ""}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                      placeholder={!currentUser.lastName ? "Not provided" : ""}
                    />
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <input
                      type="email"
                      value={currentUser.email || 'Not provided'}
                      className={styles.formInput}
                      disabled={true}
                    />
                    <small className={styles.formNote}>
                      Email address cannot be changed
                    </small>
                  </div>
                                    <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={!isEditing}
                      placeholder={!currentUser.phoneNumber ? "Not provided" : ""}
                    />
                  </div>
                  
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Role</label>
                    <input
                      type="text"
                      value={getRoleDisplayName(currentUser.role) || 'Not specified'}
                      className={styles.formInput}
                      disabled={true}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className={styles.securityTab}>
              <h3 className={styles.tabTitle}>Security Settings</h3>
              <form className={styles.profileForm} onSubmit={handleUpdatePassword}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Enter current password"
                    required
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
                      placeholder="Enter new password"
                      required
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
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="submit" 
                    className={styles.updatePasswordBtn}
                    disabled={isLoading}
                  >
                    {isLoading ? '⏳ Updating...' : '🔒 Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;