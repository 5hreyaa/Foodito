import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './restaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError('Could not fetch restaurant details. Please try again later.');
      }
    };
    fetchRestaurantDetails();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!restaurant) return <p>Loading...</p>;

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const CartControls = ({ item }) => {
    const quantity = getItemQuantity(item.id);

    if (quantity === 0) {
      return (
        <button 
          className="add-button" 
          onClick={() => addToCart(item)}
        >
          ADD
        </button>
      );
    }

    return (
      <div className="quantity-controls">
        <button 
          className="quantity-button"
          onClick={() => removeFromCart(item.id)}
        >
          −
        </button>
        <span className="quantity-display">{quantity}</span>
        <button 
          className="quantity-button"
          onClick={() => addToCart(item)}
        >
          +
        </button>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="restaurant-detail-container">
        {/* Restaurant Header Section */}
        <div className="restaurant-header">
          <div className="restaurant-info">
            <div className="restaurant-main-info">
              <h2 className="restaurant-name">{restaurant.name}</h2>
              <div className="restaurant-basic-details">
                <p className="cuisine-text">{restaurant.cuisines.join(', ')}</p>
                <p className="area-text">{restaurant.area}</p>
              </div>
              <div className="restaurant-metrics">
                <div className="metric">
                  <span className="metric-value">{restaurant.deliveryTime}</span>
                  <span className="metric-label">mins</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{restaurant.rating}</span>
                  <span className="metric-label">rating</span>
                </div>
              </div>
            </div>
          </div>
          <div className="restaurant-image-container">
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
          </div>
        </div>

        <hr className="separator" />

        {/* Menu Section */}
        <div className="menu-section">
          <h3>Menu ({restaurant.menu.length})</h3>
          <ul className="menu-list">
            {restaurant.menu.map((item) => (
              <li key={item.id} className="menu-item">
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.price}</p>
                  <p className="item-description">{item.description}</p>
                </div>
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <CartControls item={item} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;