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