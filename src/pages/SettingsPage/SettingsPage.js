import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    marketingEmails: false,
    weeklyDigest: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showProgress: true,
    allowMessages: true,
    
    // Appearance Settings
    theme: 'dark',
    language: 'en',
    timezone: 'Africa/Cairo',
    
    // Learning Preferences
    autoplay: true,
    subtitles: true,
    playbackSpeed: '1x',
    downloadQuality: 'high'
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: 'fas fa-user' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'privacy', label: 'Privacy', icon: 'fas fa-shield-alt' },
    { id: 'appearance', label: 'Appearance', icon: 'fas fa-palette' },
    { id: 'learning', label: 'Learning', icon: 'fas fa-graduation-cap' }
  ];

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = async (section) => {
    try {
      // Here you would make API calls to save settings
      toast.success(`${section} settings saved successfully!`);
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const handlePasswordChange = async () => {
    if (settings.newPassword !== settings.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (settings.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      // API call to change password
      toast.success('Password changed successfully!');
      setSettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const renderAccountSettings = () => (
    <div className={styles.settingsSection}>
      <h3>Account Settings</h3>
      
      <div className={styles.settingGroup}>
        <label>Email Address</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={styles.input}
        />
        <button 
          onClick={() => handleSaveSettings('Email')}
          className={styles.saveButton}
        >
          Update Email
        </button>
      </div>

      <div className={styles.settingGroup}>
        <h4>Change Password</h4>
        <div className={styles.passwordFields}>
          <input
            type="password"
            placeholder="Current Password"
            value={settings.currentPassword}
            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="New Password"
            value={settings.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={settings.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={styles.input}
          />
        </div>
        <button 
          onClick={handlePasswordChange}
          className={styles.saveButton}
          disabled={!settings.currentPassword || !settings.newPassword || !settings.confirmPassword}
        >
          Change Password
        </button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className={styles.settingsSection}>
      <h3>Notification Preferences</h3>
      
      <div className={styles.toggleGroup}>
        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Email Notifications</span>
          </label>
          <p className={styles.toggleDescription}>Receive notifications via email</p>
        </div>

        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Push Notifications</span>
          </label>
          <p className={styles.toggleDescription}>Receive browser push notifications</p>
        </div>

        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.courseUpdates}
              onChange={(e) => handleInputChange('courseUpdates', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Course Updates</span>
          </label>
          <p className={styles.toggleDescription}>Get notified about course announcements</p>
        </div>

        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.marketingEmails}
              onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Marketing Emails</span>
          </label>
          <p className={styles.toggleDescription}>Receive promotional content and offers</p>
        </div>

        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.weeklyDigest}
              onChange={(e) => handleInputChange('weeklyDigest', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Weekly Digest</span>
          </label>
          <p className={styles.toggleDescription}>Weekly summary of your learning progress</p>
        </div>
      </div>

      <button 
        onClick={() => handleSaveSettings('Notification')}
        className={styles.saveButton}
      >
        Save Notification Settings
      </button>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className={styles.settingsSection}>
      <h3>Privacy Settings</h3>
      
      <div className={styles.settingGroup}>
        <label>Profile Visibility</label>
        <select
          value={settings.profileVisibility}
          onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
          className={styles.select}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friends">Friends Only</option>
        </select>
      </div>

      <div className={styles.toggleGroup}>
        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.showEmail}
              onChange={(e) => handleInputChange('showEmail', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Show Email on Profile</span>
          </label>
        </div>

        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.showProgress}
              onChange={(e) => handleInputChange('showProgress', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Show Learning Progress</span>
          </label>
        </div>

        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.allowMessages}
              onChange={(e) => handleInputChange('allowMessages', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Allow Messages from Other Users</span>
          </label>
        </div>
      </div>

      <button 
        onClick={() => handleSaveSettings('Privacy')}
        className={styles.saveButton}
      >
        Save Privacy Settings
      </button>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className={styles.settingsSection}>
      <h3>Appearance & Language</h3>
      
      <div className={styles.settingGroup}>
        <label>Theme</label>
        <select
          value={settings.theme}
          onChange={(e) => handleInputChange('theme', e.target.value)}
          className={styles.select}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="auto">Auto (System)</option>
        </select>
      </div>

      <div className={styles.settingGroup}>
        <label>Language</label>
        <select
          value={settings.language}
          onChange={(e) => handleInputChange('language', e.target.value)}
          className={styles.select}
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
        </select>
      </div>

      <div className={styles.settingGroup}>
        <label>Timezone</label>
        <select
          value={settings.timezone}
          onChange={(e) => handleInputChange('timezone', e.target.value)}
          className={styles.select}
        >
          <option value="Africa/Cairo">Cairo (GMT+2)</option>
          <option value="America/New_York">New York (GMT-5)</option>
          <option value="Europe/London">London (GMT+0)</option>
          <option value="Asia/Dubai">Dubai (GMT+4)</option>
          <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
        </select>
      </div>

      <button 
        onClick={() => handleSaveSettings('Appearance')}
        className={styles.saveButton}
      >
        Save Appearance Settings
      </button>
    </div>
  );

  const renderLearningSettings = () => (
    <div className={styles.settingsSection}>
      <h3>Learning Preferences</h3>
      
      <div className={styles.settingGroup}>
        <label>Default Playback Speed</label>
        <select
          value={settings.playbackSpeed}
          onChange={(e) => handleInputChange('playbackSpeed', e.target.value)}
          className={styles.select}
        >
          <option value="0.5x">0.5x</option>
          <option value="0.75x">0.75x</option>
          <option value="1x">1x (Normal)</option>
          <option value="1.25x">1.25x</option>
          <option value="1.5x">1.5x</option>
          <option value="2x">2x</option>
        </select>
      </div>

      <div className={styles.settingGroup}>
        <label>Download Quality</label>
        <select
          value={settings.downloadQuality}
          onChange={(e) => handleInputChange('downloadQuality', e.target.value)}
          className={styles.select}
        >
          <option value="low">Low (360p)</option>
          <option value="medium">Medium (720p)</option>
          <option value="high">High (1080p)</option>
        </select>
      </div>

      <div className={styles.toggleGroup}>
        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.autoplay}
              onChange={(e) => handleInputChange('autoplay', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Autoplay Next Lesson</span>
          </label>
        </div>

        <div className={styles.toggleItem}>
          <label>
            <input
              type="checkbox"
              checked={settings.subtitles}
              onChange={(e) => handleInputChange('subtitles', e.target.checked)}
            />
            <span className={styles.toggleLabel}>Show Subtitles by Default</span>
          </label>
        </div>
      </div>

      <button 
        onClick={() => handleSaveSettings('Learning')}
        className={styles.saveButton}
      >
        Save Learning Settings
      </button>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'learning':
        return renderLearningSettings();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <div className={styles.settingsPage}>
      <div className="container">
        <div className={styles.settingsContainer}>
          <div className={styles.settingsHeader}>
            <h1>Settings</h1>
            <p>Manage your account preferences and settings</p>
          </div>

          <div className={styles.settingsContent}>
            <div className={styles.settingsSidebar}>
              <nav className={styles.settingsNav}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <i className={tab.icon}></i>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className={styles.settingsMain}>
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;