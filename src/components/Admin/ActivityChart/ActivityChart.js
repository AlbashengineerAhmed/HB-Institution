import React from 'react';
import styles from './ActivityChart.module.css';

const ActivityChart = () => {
  // Static data for the chart
  const chartData = [
    { day: 'Mon', registrations: 12, courses: 3 },
    { day: 'Tue', registrations: 19, courses: 5 },
    { day: 'Wed', registrations: 8, courses: 2 },
    { day: 'Thu', registrations: 25, courses: 7 },
    { day: 'Fri', registrations: 15, courses: 4 },
    { day: 'Sat', registrations: 22, courses: 6 },
    { day: 'Sun', registrations: 18, courses: 3 }
  ];

  const maxValue = Math.max(...chartData.map(d => Math.max(d.registrations, d.courses)));

  return (
    <div className={styles.activityChart}>
      <div className={styles.chartLegend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.registrations}`}></div>
          <span>Student Registrations</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.courses}`}></div>
          <span>New Courses</span>
        </div>
      </div>
      
      <div className={styles.chartContainer}>
        <div className={styles.yAxis}>
          {[maxValue, Math.floor(maxValue * 0.75), Math.floor(maxValue * 0.5), Math.floor(maxValue * 0.25), 0].map((value, index) => (
            <div key={index} className={styles.yAxisLabel}>{value}</div>
          ))}
        </div>
        
        <div className={styles.chartArea}>
          <div className={styles.gridLines}>
            {[0, 1, 2, 3, 4].map((_, index) => (
              <div key={index} className={styles.gridLine}></div>
            ))}
          </div>
          
          <div className={styles.barsContainer}>
            {chartData.map((data, index) => (
              <div key={index} className={styles.barGroup}>
                <div className={styles.bars}>
                  <div 
                    className={`${styles.bar} ${styles.registrationsBar}`}
                    style={{ height: `${(data.registrations / maxValue) * 100}%` }}
                    title={`${data.registrations} registrations`}
                  ></div>
                  <div 
                    className={`${styles.bar} ${styles.coursesBar}`}
                    style={{ height: `${(data.courses / maxValue) * 100}%` }}
                    title={`${data.courses} courses`}
                  ></div>
                </div>
                <div className={styles.xAxisLabel}>{data.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;