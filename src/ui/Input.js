import React from 'react';
import './Input.css';

export const Input = ({ className, ...props }) => (
  <input className={`input ${className}`} {...props} />
);