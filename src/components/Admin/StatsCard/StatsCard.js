import React from 'react';
import styles from './StatsCard.module.css';

const StatsCard = ({ title, value, change, changeType, icon }) => {
  return (
    <div className={styles.statsCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          {icon}
        </div>
        <div className={`${styles.changeIndicator} ${styles[changeType]}`}>
          {change}
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.cardValue}>{value}</h3>
        <p className={styles.cardTitle}>{title}</p>
      </div>
      
      <div className={styles.cardFooter}>
        <span className={styles.footerText}>
          {changeType === 'positive' ? 'Increased' : 'Decreased'} from last month
        </span>
      </div>
    </div>
  );
};

export default StatsCard;