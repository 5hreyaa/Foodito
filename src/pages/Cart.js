import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, total, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  // Fixed charges
  const deliveryFee = 20;
  const restaurantCharges = 10;
  const gstRate = 0.18;

  // States for address handling
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New address form state
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });

  // Calculate total amounts
  const gstAmount = total * gstRate;
  const finalTotal = total + deliveryFee + restaurantCharges + gstAmount;

  // Fetch saved addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        setError('Please login to continue');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        if (response.data && response.data.addresses) {
          setSavedAddresses(response.data.addresses);
          if (response.data.addresses.length > 0) {
            setSelectedAddress(response.data.addresses[0]);
          }
        }
        setError('');
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setError('');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleNewAddressSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      setError('Please login to continue');
      return;
    }

    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
      setError('All address fields are required');
      return;
    }

    // Validate postal code (6 digits)
    if (!/^\d{6}$/.test(newAddress.postalCode)) {
      setError('Please enter a valid 6-digit postal code');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/address', {
        userId,
        address: newAddress
      });

      if (response.status === 200) {
        const updatedAddresses = [...savedAddresses, newAddress];
        setSavedAddresses(updatedAddresses);
        setSelectedAddress(newAddress);
        setShowNewAddressForm(false);
        setNewAddress({ street: '', city: '', state: '', postalCode: '' });
        setError('');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setError('Failed to save address. Please try again.');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }

    // Save checkout information
    localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    localStorage.setItem('orderAmount', finalTotal.toFixed(2));
    
    navigate('/payment-method');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <div className="quantity-controls">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                  <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="address-section">
              <h3>Delivery Address</h3>
              
              {savedAddresses.length > 0 && (
                <div className="saved-addresses">
                  {savedAddresses.map((address, index) => (
                    <div 
                      key={index}
                      className={`address-card ${selectedAddress === address ? 'selected' : ''}`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <p className="street">{address.street}</p>
                      <p className="city-state">{address.city}, {address.state}</p>
                      <p className="postal-code">{address.postalCode}</p>
                    </div>
                  ))}
                </div>
              )}

              <button 
                className="add-address-button"
                onClick={() => setShowNewAddressForm(true)}
              >
                + Add New Address
              </button>

              {showNewAddressForm && (
                <form onSubmit={handleNewAddressSubmit} className="new-address-form">
                  <div className="form-group">
                    <input
                      type="text"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      placeholder="Street Address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      placeholder="State"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                      placeholder="Postal Code"
                      pattern="\d{6}"
                      title="Please enter a valid 6-digit postal code"
                      required
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="save-button">Save Address</button>
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => {
                        setShowNewAddressForm(false);
                        setError('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="bill-details">
              <h3>Bill Details</h3>
              <div className="bill-item">
                <span>Item Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="bill-item">
                <span>Delivery Fee:</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="bill-item">
                <span>Restaurant Charges:</span>
                <span>₹{restaurantCharges.toFixed(2)}</span>
              </div>
              <div className="bill-item">
                <span>GST (18%):</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="bill-total">
                <h3>Total Amount:</h3>
                <p>₹{finalTotal.toFixed(2)}</p>
              </div>
            </div>

            <button 
              className="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Pay ₹{finalTotal.toFixed(2)}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;