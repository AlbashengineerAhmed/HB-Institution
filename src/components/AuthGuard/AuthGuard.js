import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Higher-order component that wraps elements requiring authentication
 * Prevents actions and shows login prompt for unauthenticated users
 */
const AuthGuard = ({ 
  children, 
  fallback = null, 
  showLoginPrompt = true,
  redirectToLogin = true,
  message = "Please login to access this feature"
}) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleUnauthenticatedAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (showLoginPrompt) {
      toast.error(message);
    }
    
    if (redirectToLogin) {
      navigate('/login');
    }
  };

  if (!isAuthenticated) {
    if (fallback) {
      return fallback;
    }
    
    // Wrap children with click handler to prevent actions
    return (
      <div onClick={handleUnauthenticatedAction} style={{ cursor: 'pointer' }}>
        {children}
      </div>
    );
  }

  return children;
};

/**
 * Hook to check authentication and handle unauthenticated actions
 */
export const useAuthGuard = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const requireAuth = (callback, message = "Please login to access this feature") => {
    if (!isAuthenticated) {
      toast.error(message);
      navigate('/login');
      return false;
    }
    
    if (callback) {
      callback();
    }
    return true;
  };

  return { isAuthenticated, requireAuth };
};

export default AuthGuard;