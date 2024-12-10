import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentMethod.css';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = localStorage.getItem('orderAmount') || '0';

  const handlePaymentOption = (option) => {
    if (!amount || amount === '0') {
      alert('Invalid order amount. Please try again.');
      navigate('/cart');
      return;
    }

    navigate('/payment-details', { 
      state: { 
        paymentOption: option,
        amount: amount
      } 
    });
  };

  return (
    <div className="payment-method-container">
      <div className="payment-method-card">
        <h2>Select Payment Method</h2>
        
        <div className="amount-display">
          <span>Amount to be paid:</span>
          <strong>₹{amount}</strong>
        </div>

        <div className="payment-options">
          <button 
            className="payment-button"
            onClick={() => handlePaymentOption('Credit Card')}
          >
            <span className="button-icon">💳</span>
            <div className="button-content">
              <span>Credit Card</span>
              <small>Visa, MasterCard, RuPay</small>
            </div>
          </button>

          <button 
            className="payment-button"
            onClick={() => handlePaymentOption('Debit Card')}
          >
            <span className="button-icon">💳</span>
            <div className="button-content">
              <span>Debit Card</span>
              <small>Visa, MasterCard, RuPay</small>
            </div>
          </button>

          <button 
            className="payment-button"
            onClick={() => handlePaymentOption('Cash on Delivery')}
          >
            <span className="button-icon">💵</span>
            <div className="button-content">
              <span>Cash on Delivery</span>
              <small>Pay when you receive</small>
            </div>
          </button>

          <button 
            className="payment-button"
            onClick={() => handlePaymentOption('UPI')}
          >
            <span className="button-icon">📱</span>
            <div className="button-content">
              <span>UPI</span>
              <small>Google Pay, PhonePe, BHIM</small>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;