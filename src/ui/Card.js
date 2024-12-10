// src/ui/Card.js
import React from 'react';
import './Card.css';

export const Card = ({ className, children, ...props }) => (
  <div className={`card ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={`card-content ${className}`} {...props}>
    {children}
  </div>
);

// Define CardHeader component
export const CardHeader = ({ className, children, ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);
