import React from 'react';
import './ErrorMessage.css';

export function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
} 