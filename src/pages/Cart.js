import React from 'react';
import { Button } from '../ui/Button';
import './Cart.css';

const Cart = () => {
  // Dummy cart items
  const cartItems = [
    { id: 1, name: 'Butter Chicken', price: 12.99, quantity: 1 },
    { id: 2, name: 'Vegetable Biryani', price: 10.99, quantity: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total:</h3>
            <p>${total.toFixed(2)}</p>
          </div>
          <Button className="checkout-button">Proceed to Checkout</Button>
        </>
      )}
    </div>
  );
};

export default Cart;