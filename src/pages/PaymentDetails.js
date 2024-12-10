import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentDetails.css';

const PaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentOption } = location.state || {};
  const amount = location.state?.amount || localStorage.getItem('orderAmount') || '0';

  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    if (!paymentOption || !amount || amount === '0') {
      navigate('/payment-method');
    }
  }, [paymentOption, amount, navigate]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    setError('');
  };

  const validateCard = () => {
    if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }

    const [month, year] = cardDetails.expiryDate.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    if (!month || !year || expiry < new Date()) {
      setError('Please enter a valid expiry date');
      return false;
    }

    if (cardDetails.cvv.length < 3) {
      setError('Please enter a valid CVV');
      return false;
    }

    return true;
  };

  const validateUPI = () => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{2,}$/;
    if (!upiRegex.test(upiId)) {
      setError('Please enter a valid UPI ID');
      return false;
    }
    return true;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (paymentOption === 'Credit Card' || paymentOption === 'Debit Card') {
      if (!validateCard()) return;
    } else if (paymentOption === 'UPI') {
      if (!validateUPI()) return;
    }

    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentProcessed(true);
      setTimeout(() => {
        navigate('/delivery-assignment', { 
          state: { 
            paymentOption,
            amount
          }
        });
      }, 1500);
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!paymentOption) {
    return null;
  }

  return (
    <div className="payment-details-container">
      <div className="payment-details-card">
        <h2>Payment Details</h2>
        
        <div className="payment-info">
          <div className="payment-method-selected">
            <span>Payment Method:</span>
            <strong>{paymentOption}</strong>
          </div>
          
          <div className="amount-display">
            <span>Amount to be paid:</span>
            <strong>₹{amount}</strong>
          </div>
        </div>

        {!paymentProcessed ? (
          <form onSubmit={handlePaymentSubmit} className="payment-form">
            {(paymentOption === 'Credit Card' || paymentOption === 'Debit Card') && (
              <div className="card-details">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      placeholder="***"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentOption === 'UPI' && (
              <div className="upi-details">
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      setError('');
                    }}
                    placeholder="username@upi"
                    required
                  />
                </div>
              </div>
            )}

            {paymentOption === 'Cash on Delivery' && (
              <div className="cod-details">
                <div className="cod-info">
                  <p>Please keep the following amount ready at the time of delivery:</p>
                  <strong className="cod-amount">₹{amount}</strong>
                  <ul className="cod-instructions">
                    <li>Cash and UPI payments accepted</li>
                    <li>Please keep exact change if possible</li>
                    <li>Our delivery partner will provide a payment receipt</li>
                  </ul>
                </div>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className={`pay-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading 
                ? 'Processing...' 
                : paymentOption === 'Cash on Delivery'
                  ? 'Confirm Order'
                  : `Pay ₹${amount}`}
            </button>
          </form>
        ) : (
          <div className="payment-success">
            <div className="success-icon">✓</div>
            <h3>Payment Successful!</h3>
            <p>Redirecting to order tracking...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;