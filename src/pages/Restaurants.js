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
    </div>
  );
};

export default Restaurants;