import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

const RouteChangeTracker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Skip loading indicator for profile page to avoid persistent loading
    if (location.pathname === '/profile') {
      setIsLoading(false);
      return;
    }

    // Show loading indicator when route changes
    setIsLoading(true);
    
    // Hide loading indicator after a very short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Reduced to 200ms for faster transitions
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <LoadingIndicator isLoading={isLoading} />;
};

export default RouteChangeTracker;