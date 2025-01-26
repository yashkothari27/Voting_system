import React, { useEffect } from 'react';
import './Toast.css';

export function Toast({ message, type = 'info', onClose, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        {type === 'success' && <span className="toast-icon">✓</span>}
        {type === 'error' && <span className="toast-icon">✕</span>}
        {type === 'warning' && <span className="toast-icon">⚠</span>}
        {type === 'info' && <span className="toast-icon">ℹ</span>}
        <p>{message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
} 