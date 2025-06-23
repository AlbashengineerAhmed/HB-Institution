import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = ({ isLoading }) => {
  return (
    <div className={`page-transition-loader ${isLoading ? 'visible' : ''}`}>
      <div className="page-loader">
        <div className="page-loader-inner"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;