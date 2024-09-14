import { Clock, Star } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../ui/Button';

const RestaurantDetail = () => {
  const { id } = useParams();
  // In a real app, you would fetch the restaurant details based on the id
  const restaurant = {  
    id: 1,
    name: 'Tasty Bites',
    rating: 4.5,
    cuisines: ['Indian', 'Chinese'],
    deliveryTime: '30 min',
    price: '$$',
    image: '/images/CavernBarandKitchen.jpg',
    menu: [
      { id: 1, name: 'Butter Chicken', price: 12.99, description: 'Creamy tomato sauce with tender chicken pieces' },
      { id: 2, name: 'Vegetable Biryani', price: 10.99, description: 'Fragrant rice dish with mixed vegetables' },
      { id: 3, name: 'Paneer Tikka', price: 9.99, description: 'Grilled cottage cheese with spices' },
    ]
  };

  return (
    <div>
      <img src={restaurant.image} alt={restaurant.name} className="w-full h-64 object-cover mb-6" />
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2">{restaurant.name}</h2>
          <p className="text-gray-600 mb-2">{restaurant.cuisines.join(', ')}</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-green-600">
              <Star className="h-5 w-5 mr-1 fill-current" />
              {restaurant.rating}
            </span>
            <span className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-1" />
              {restaurant.deliveryTime}
            </span>
            <span className="text-gray-600">{restaurant.price}</span>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-4">Menu</h3>
      <div className="space-y-4">
        {restaurant.menu.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-semibold">${item.price.toFixed(2)}</p>
            </div>
            <Button>Add to Cart</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;