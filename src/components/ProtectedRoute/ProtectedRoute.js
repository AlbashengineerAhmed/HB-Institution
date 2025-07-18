import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // If authentication is not required, render children
  if (!requireAuth) {
    return children;
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user role is allowed
  if (allowedRoles.length > 0 && user?.role) {
    const userRole = user.role.toLowerCase();
    const hasPermission = allowedRoles.some(role => role.toLowerCase() === userRole);
    
    if (!hasPermission) {
      toast.error('You do not have permission to access this page');
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;