import React from 'react';
import { useSelector } from 'react-redux';
import styles from './StepIndicator.module.css';

const StepIndicator = () => {
  const { currentStep } = useSelector((state) => state.enrollment);

  const steps = [
    { number: 1, title: 'Course' },
    { number: 2, title: 'Level' },
    { number: 3, title: 'Instructor' },
    { number: 4, title: 'Schedule' },
    { number: 5, title: 'Confirm' },
  ];

  return (
    <div className={styles.stepIndicator}>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div 
              className={`${styles.step} ${
                currentStep === step.number ? styles.active : ''
              } ${currentStep > step.number ? styles.completed : ''}`}
            >
              <div className={styles.stepNumber}>
                {currentStep > step.number ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className={styles.stepTitle}>{step.title}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`${styles.connector} ${
                  currentStep > step.number ? styles.connectorCompleted : ''
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;