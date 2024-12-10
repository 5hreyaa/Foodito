import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/Card'; // Ensure Card and CardContent are correctly imported
import { Clock, Star } from 'lucide-react'; // Import necessary icons for display
import { Link } from 'react-router-dom'; // Import Link for navigation

const Home = () => {
  const [restaurants, setRestaurants] = useState([]); // State to store restaurants
  const [selectedCuisine, setSelectedCuisine] = useState(null); // State to store selected cuisine
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(''); // State for error handling

  // Fetch restaurant data from the API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/restaurants'); // Adjust this URL to your API
        const data = await response.json();
        
        setRestaurants(data); // Set the fetched restaurants in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError('Failed to load restaurants'); // Handle error state
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []); // Run only once when the component mounts

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
    { name: 'Pasta', image: 'pasta.png' },
  ];

  // Filter restaurants based on selected cuisine
  const filteredRestaurants = selectedCuisine
    ? restaurants.filter(restaurant => 
        restaurant.cuisines.some(cuisine => 
          cuisine.toLowerCase().includes(selectedCuisine.toLowerCase().trim())
        )
      )
    : [];

  // Handle cuisine selection with toggle
  const handleCuisineClick = (categoryName) => {
    if (selectedCuisine === categoryName) {
      setSelectedCuisine(null); // Deselect if the same cuisine is clicked
    } else {
      setSelectedCuisine(categoryName); // Select the clicked cuisine
    }
  };

  // Check loading state
  if (loading) {
    return <p>Loading restaurants...</p>; // Show loading text while fetching
  }

  // Check for errors
  if (error) {
    return <p>{error}</p>; // Show error message if there is an error
  }

  return (
    <>
      {/* Food Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">What's on your mind?</h2>
        <div className="card-container">
          {categories.map((category, index) => (
            <Card
              key={index}
              className={`card ${selectedCuisine === category.name ? 'selected' : ''}`} // Add class when selected
              onClick={() => handleCuisineClick(category.name)} // Toggle the selected cuisine
            >
              <CardContent className="card-content">
                <img
                  src={`/images/${category.image}`} // Ensure correct path
                  alt={category.name}
                  className="w-20 h-20 object-cover mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/api/placeholder/80/80'; // Placeholder in case of an error
                  }}
                />
                <p className="text-sm font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Restaurant List Section */}
      {selectedCuisine && (
        <div className="restaurants">
          <h2 className="header-text">Restaurants serving {selectedCuisine}</h2>
          <div className="restaurant-grid">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <Link
                  to={`/restaurant/${restaurant.id}`}
                  key={restaurant.id}
                  className="restaurant-card-link"
                >
                  <div className="restaurant-card">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="restaurant-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/api/placeholder/320/240';
                      }}
                    />
                    <div className="restaurant-details">
                      <h3 className="restaurant-name">{restaurant.name}</h3>
                      <p className="restaurant-cuisines">
                        {restaurant.cuisines.join(', ')}
                      </p>
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
              ))
            ) : (
              <p className="no-results">No restaurants found for this cuisine.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
