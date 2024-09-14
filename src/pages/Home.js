<<<<<<< HEAD
import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card'; // Ensure correct import path
import { Input } from '../ui/Input';

const Home = () => {
  // Define categories array
=======
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';

const Home = () => {
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
  const categories = [
    { name: 'Indian Sweets', image: 'indiansweets.png' },
    { name: 'Biryani', image: 'biryani.png' },
    { name: 'South Indian', image: 'southindian.jpg' },
    { name: 'Pizzas', image: 'pizza.png' },
    { name: 'Burgers', image: 'burgers.jpg' },
    { name: 'Shake', image: 'shakes.jpg' },
    { name: 'North Indian', image: 'northind.png' },
    { name: 'Ice-Cream', image: 'icecream.png' },
    { name: 'Cakes', image: 'cake.png' },
    { name: 'Chinese', image: 'chinese.jpg' },
    { name: 'Parotta', image: 'parota.png' },
    { name: 'Shawarma', image: 'shawarma.png' },
    { name: 'Pastry', image: 'pastry.png' },
    { name: 'Pav Bhaji', image: 'pavbhaji.png' },
    { name: 'Rolls', image: 'rolls.png' },
    { name: 'Pure Veg', image: 'pureveg.png' },
    { name: 'Noodles', image: 'noodles.png' },
    { name: 'Pasta', image: 'pasta.png' }
<<<<<<< HEAD

  ];

  return (
    <>
     

      {/* Food Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">What's on your mind?</h2>
        {/* Horizontal scrolling container */}
        <div className="card-container">
          {categories.map((category, index) => (
            <Card key={index} className="card">
              <CardContent className="card-content">
                <img
                  src={`/images/${category.image}`}
                  alt={category.name}
                  className="w-20 h-20 object-cover rounded-full mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/api/placeholder/80/80`;
                  }}
                />
                <p className="text-sm font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
=======
  ];

  const [startIndex, setStartIndex] = useState(0);
  const scrollRef = useRef(null);

  const nextCategories = () => {
    if (startIndex + 6 < categories.length) {
      setStartIndex(startIndex + 6);
    }
  };

  const prevCategories = () => {
    if (startIndex - 6 >= 0) {
      setStartIndex(startIndex - 6);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-16 -mx-4 mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Hungry? You're in the right place</h2>
          <p className="text-xl mb-8">Order food from the best restaurants in town</p>
          <div className="flex">
            <Input
              type="text"
              placeholder="Enter your delivery location"
              className="rounded-r-none w-96"
            />
            <Button className="bg-green-500 hover:bg-green-600 rounded-l-none">
              Find Food
            </Button>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section className="mb-12 relative">
        <h2 className="text-2xl font-semibold mb-6">What's on your mind?</h2>
        <div className="relative">
          <div ref={scrollRef} className="flex space-x-6 overflow-x-hidden">
            {categories.slice(startIndex, startIndex + 6).map((category, index) => (
              <Card key={index} className="flex-shrink-0 w-32 h-40 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-2 text-center">
                  <img 
                    src={`/images/${category.image}`} 
                    alt={category.name} 
                    className="w-20 h-20 object-cover rounded-full mb-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/api/placeholder/80/80`;
                    }}
                  />
                  <p className="text-sm font-medium">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {startIndex > 0 && (
            <Button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 shadow-lg"
              onClick={prevCategories}
            >
              <ChevronLeft size={24} />
            </Button>
          )}
          {startIndex + 6 < categories.length && (
            <Button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 shadow-lg"
              onClick={nextCategories}
            >
              <ChevronRight size={24} />
            </Button>
          )}
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
        </div>
      </section>
    </>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
