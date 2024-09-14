import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './LocationSelector.css';

const LocationSelector = ({ setLocation }) => {
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <section className="location-selector-hero bg-orange-500 text-white py-8 px-6">
      <h2 className="text-3xl font-bold mb-4">Hungry? You're in the right place</h2>
      <p className="text-lg mb-6">Order food from the best restaurants in town</p>
      <div className="location-input-container">
        <Input
          type="text"
          placeholder="Enter your delivery location"
          className="rounded-r-none w-full mb-4"
          onChange={handleLocationChange}
        />
        <Button className="bg-green-500 hover:bg-green-600 rounded">
          Find Food
        </Button>
      </div>
    </section>
  );
};

export default LocationSelector;
