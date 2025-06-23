import React from 'react';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
  return (
    <a 
      href="https://wa.me/1234567890" 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="fab fa-whatsapp whatsapp-icon"></i>
    </a>
  );
};

export default WhatsAppFloat;