import React from 'react';
import './Button.css';

export const Button = ({ className, children, ...props }) => (
  <button className={`button ${className}`} {...props}>
    {children}
  </button>
);