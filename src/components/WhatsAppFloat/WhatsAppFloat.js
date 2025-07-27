import React from 'react';
import styles from './WhatsAppFloat.module.css';

const WhatsAppFloat = () => {
  return (
    <a 
      href="https://wa.me/01155624668" 
      className={styles.whatsappFloat} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <i className={`fab fa-whatsapp ${styles.whatsappIcon}`}></i>
    </a>
  );
};

export default WhatsAppFloat;