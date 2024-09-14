<<<<<<< HEAD
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
=======
import { Clock, ShoppingBag, Star, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="flex justify-between items-center p-4 border-b">
    <div className="flex items-center">
      <h1 className="text-2xl font-bold text-red-500 mr-4">Foodito</h1>
      <select className="border rounded p-1">
        <option>New York</option>
      </select>
    </div>
    <nav className="flex items-center space-x-4">
      <Link to="/restaurants" className="text-gray-600">Restaurants</Link>
      <Link to="/offers" className="text-gray-600">Offers</Link>
      <Link to="/help" className="text-gray-600">Help</Link>
      <Link to="/signin" className="text-gray-600 flex items-center">
        <User size={18} className="mr-1" />
        Sign in
      </Link>
      <Link to="/cart" className="bg-red-500 text-white p-2 rounded">
        <ShoppingBag size={18} />
      </Link>
    </nav>
  </header>
);

const RestaurantCard = ({ restaurant }) => (
  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
    <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-purple-700">{restaurant.name}</h3>
        {restaurant.ad && <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">Ad</span>}
      </div>
      <div className="flex items-center text-sm mb-2">
        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
        <span className="font-semibold mr-2">{restaurant.rating}</span>
        <Clock className="h-4 w-4 mr-1" />
        <span className="text-gray-600">{restaurant.deliveryTime}</span>
      </div>
      <p className="text-sm text-gray-600 mb-1">{restaurant.cuisines.join(', ')}</p>
      <p className="text-sm text-gray-600">{restaurant.location}</p>
    </div>
  </div>
);

const Restaurants = () => {
  const restaurants = [
    { id: 1, name: 'Aswins Home Special', rating: 4.4, cuisines: ['South Indian'], deliveryTime: '20-25 mins', location: 'Salem', image: '/images/aswins-home-special.jpg', ad: true },
    { id: 2, name: 'Sweet Truth - Cake and Desserts', rating: 4.5, cuisines: ['Snacks', 'Bakery', 'Desserts', 'Beverages'], deliveryTime: '20-25 mins', location: 'Suramangalam', image: '/images/sweet-truth.jpg', offer: 'ITEMS AT ₹79' },
    { id: 3, name: 'Le Patisse', rating: 4.5, cuisines: ['Bakery', 'Sweets'], deliveryTime: '45-50 mins', location: 'Narasothipatti', image: '/images/le-patisse.jpg', offer: '₹125 OFF ABOVE ₹249', ad: true },
    { id: 4, name: 'Henry & Wolsey', rating: 4.6, cuisines: ['Desserts', 'Burgers', 'Ice Cream', 'Pizzas'], deliveryTime: '15-20 mins', location: 'Shevapet', image: '/images/henry-wolsey.jpg' },
    // ... add more restaurants as needed
  ];
 
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Restaurants to explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </main>
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
    </div>
  );
};

<<<<<<< HEAD
export default Restaurants;
=======
export default Restaurants;
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
