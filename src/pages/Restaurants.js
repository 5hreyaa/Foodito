import React from 'react';
import { Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './restaurants.css'; // Ensure the CSS file path is correct

const Restaurants = () => {
  const restaurants = [
    { id: 1, name: 'Cavern Bar and Kitchen', rating: 4.5, cuisines: ['Indian', 'Chinese'], deliveryTime: '30 min', price: '$$', image: '/images/CavernBarandKitchen.jpg' },
    { id: 2, name: 'Bird on Tree', rating: 4.2, cuisines: ['Italian', 'Pizza'], deliveryTime: '25 min', price: '$', image: '/images/BirdonTree.jpeg' },
    { id: 3, name: 'Covai Anganan Biriyani House', rating: 4.0, cuisines: ['American', 'Burgers'], deliveryTime: '35 min', price: '$$', image: '/images/Covai Anganan Biriyani House.avif' },
    { id: 4, name: 'KFC', rating: 4.7, cuisines: ['Japanese', 'Sushi'], deliveryTime: '40 min', price: '$$$', image: '/images/KFC.jpg' },
    { id: 5, name: 'Sree Annapoorna', rating: 4.3, cuisines: ['Mexican', 'Tacos'], deliveryTime: '20 min', price: '$', image: '/images/Sree Annapoorna.jpg' },
    { id: 6, name: 'The Great 80s Kitchen', rating: 4.4, cuisines: ['Italian', 'Pasta'], deliveryTime: '35 min', price: '$$', image: '/images/TheGreat80sKitchen.jpg' },
  ];

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
