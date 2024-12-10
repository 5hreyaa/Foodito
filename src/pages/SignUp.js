import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Validation rules using regex
  const validations = {
    username: {
      pattern: /^[a-zA-Z0-9_]{3,20}$/,
      message: 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores'
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    phoneNumber: {
      pattern: /^[6-9]\d{9}$/,
      message: 'Phone number must be 10 digits and start with 6-9'
    },
    password: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      message: 'Password must be at least 8 characters long and contain letters and numbers'
    },
    postalCode: {
      pattern: /^[1-9][0-9]{5}$/,
      message: 'Please enter a valid 6-digit postal code'
    }
  };

  const validateField = (name, value) => {
    if (!value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (validations[name]?.pattern && !validations[name].pattern.test(value)) {
      return validations[name].message;
    }

    // Additional validations for text fields
    if (['street', 'city', 'state'].includes(name)) {
      if (value.length < 2) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 2 characters long`;
      }
      if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} contains invalid characters`;
      }
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      setSubmitError('Please fix the errors in the form');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode
        }
      });

      if (response.status === 201) {
        console.log('Sign up successful:', response.data);
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setSubmitError(error.response?.data?.message || 'Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      {submitError && <div className="error-message">{submitError}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Username"
              className={`auth-input ${errors.username ? 'error' : ''}`}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className={`auth-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Phone Number (10 digits)"
              className={`auth-input ${errors.phoneNumber ? 'error' : ''}`}
            />
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className={`auth-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Address Information</h3>
          <div className="input-group">
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Street Address"
              className={`auth-input ${errors.street ? 'error' : ''}`}
            />
            {errors.street && <span className="error-text">{errors.street}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="City"
              className={`auth-input ${errors.city ? 'error' : ''}`}
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="State"
              className={`auth-input ${errors.state ? 'error' : ''}`}
            />
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Postal Code (6 digits)"
              className={`auth-input ${errors.postalCode ? 'error' : ''}`}
            />
            {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
          </div>
        </div>

        <button type="submit" className="auth-button">Sign Up</button>
      </form>

      <p className="auth-footer">
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
};

export default SignUp;