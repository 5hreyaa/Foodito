import React, { useEffect, useState } from 'react';
import { Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './restaurants.css'; // Ensure the CSS file path is correct

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurants');
        console.log('API Response:', response.data); // Debugging to ensure data is fetched
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError('Failed to load restaurants');
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <p>Loading restaurants...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (restaurants.length === 0) {
    return <p>No restaurants available</p>;
  }

  return (
    <div className="restaurants">
      <h2 className="header-text">Restaurants Near You</h2>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="restaurant-card-link">
            <div className="restaurant-card">
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
              <div className="restaurant-details">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-cuisines">{restaurant.cuisines.join(', ')}</p>
                <div className="restaurant-info">
                  <span className="restaurant-rating">
                    <Star className="icon" />
                    {restaurant.rating}
                  </span>
                  <span className="restaurant-time">
                    <Clock className="icon" />
                    {restaurant.deliveryTime}
                  </span>
                  <span className="restaurant-price">{restaurant.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
