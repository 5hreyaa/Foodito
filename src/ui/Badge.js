// src/ui/Badge.js
import React from 'react';


export const Badge = ({ className, children, ...props }) => (
  <span className={`badge ${className}`} {...props}>
    {children}
  </span>
);
