import React from 'react';
import styles from './LoadingIndicator.module.css';

const LoadingIndicator = ({ isLoading }) => {
  return (
    <div className={`${styles.pageTransitionLoader} ${isLoading ? styles.visible : ''}`}>
      <div className={styles.pageLoader}>
        <div className={styles.pageLoaderInner}></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;