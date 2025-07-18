import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

const RouteChangeTracker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading indicator when route changes
    setIsLoading(true);
    
    // Hide loading indicator after a shorter delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced from 800ms to 500ms
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <LoadingIndicator isLoading={isLoading} />;
};

export default RouteChangeTracker;