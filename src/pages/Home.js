import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card'; // Ensure correct import path
import { Input } from '../ui/Input';

const Home = () => {
  // Define categories array
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
        </div>
      </section>
    </>
  );
};

export default Home;
