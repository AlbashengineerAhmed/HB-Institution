// Role-based utility functions

export const ROLES = {
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student'
};

export const DASHBOARD_ROUTES = {
  [ROLES.ADMIN]: '/admin',
  [ROLES.INSTRUCTOR]: '/instructor-dashboard',
  [ROLES.STUDENT]: '/student-dashboard'
};

/**
 * Get the dashboard route for a specific role
 * @param {string} role - User role
 * @returns {string} Dashboard route path
 */
export const getDashboardRoute = (role) => {
  if (!role) return '/';
  return DASHBOARD_ROUTES[role.toLowerCase()] || '/';
};

/**
 * Get dashboard link information based on user role
 * @param {string} role - User role
 * @returns {object} Dashboard link object with label, path, and icon
 */
export const getDashboardLink = (role) => {
  if (!role) return null;
  
  const normalizedRole = role.toLowerCase();
  
  const dashboardLinks = {
    [ROLES.ADMIN]: {
      label: 'Admin Dashboard',
      path: '/admin',
      icon: 'fas fa-tachometer-alt'
    },
    [ROLES.INSTRUCTOR]: {
      label: 'Instructor Dashboard',
      path: '/instructor-dashboard',
      icon: 'fas fa-chalkboard-teacher'
    },
    [ROLES.STUDENT]: {
      label: 'Student Dashboard',
      path: '/student-dashboard',
      icon: 'fas fa-graduation-cap'
    }
  };
  
  return dashboardLinks[normalizedRole] || null;
};

/**
 * Check if user has permission for a specific role
 * @param {string} userRole - Current user role
 * @param {string|array} allowedRoles - Allowed role(s)
 * @returns {boolean} Whether user has permission
 */
export const hasPermission = (userRole, allowedRoles) => {
  if (!userRole) return false;
  
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.some(role => role.toLowerCase() === userRole.toLowerCase());
};

/**
 * Get user role display name
 * @param {string} role - User role
 * @returns {string} Formatted role name
 */
export const getRoleDisplayName = (role) => {
  if (!role) return 'User';
  
  const roleNames = {
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.INSTRUCTOR]: 'Instructor',
    [ROLES.STUDENT]: 'Student'
  };
  
  return roleNames[role.toLowerCase()] || role;
};