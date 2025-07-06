import React, { useState } from 'react';
import styles from './RoleSwitcher.module.css';

const RoleSwitcher = ({ currentRole, onRoleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { value: 'student', label: 'Student', icon: '🎓', color: '#4da6ff' },
    { value: 'instructor', label: 'Instructor', icon: '👨‍🏫', color: '#4da6ff' },
    { value: 'admin', label: 'Administrator', icon: '👑', color: '#fdc62c' }
  ];

  const currentRoleData = roles.find(role => role.value === currentRole);

  const handleRoleSelect = (roleValue) => {
    onRoleChange(roleValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.roleSwitcher}>
      <div className={styles.switcherLabel}>
        🔄 Demo Mode - Switch Role:
      </div>
      <div className={styles.dropdown}>
        <button 
          className={styles.dropdownToggle}
          onClick={() => setIsOpen(!isOpen)}
          style={{ borderColor: currentRoleData?.color }}
        >
          <span className={styles.roleIcon}>{currentRoleData?.icon}</span>
          <span className={styles.roleLabel}>{currentRoleData?.label}</span>
          <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>▼</span>
        </button>
        
        {isOpen && (
          <div className={styles.dropdownMenu}>
            {roles.map((role) => (
              <button
                key={role.value}
                className={`${styles.roleOption} ${currentRole === role.value ? styles.active : ''}`}
                onClick={() => handleRoleSelect(role.value)}
                style={{ 
                  backgroundColor: currentRole === role.value ? `${role.color}20` : 'transparent',
                  borderLeft: currentRole === role.value ? `3px solid ${role.color}` : '3px solid transparent'
                }}
              >
                <span className={styles.roleIcon}>{role.icon}</span>
                <span className={styles.roleLabel}>{role.label}</span>
                {currentRole === role.value && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSwitcher;