import React from 'react';
import './LoadingSpinner.css';

export function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner-ring"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
} 