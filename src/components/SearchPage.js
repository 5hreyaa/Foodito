import React, { useEffect, useState } from 'react';
import { Clock, Star } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialQuery) {
      fetchSearchResults(initialQuery);
    } else {
      setLoading(false);
    }
  }, [initialQuery]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      console.log('Search Results:', response.data);
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to load search results');
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search?query=${searchTerm}`;
  };

  if (loading) {
    return <p>Loading search results...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="search-page">
      <h1>Search Restaurants or Foods</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for restaurants or food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {searchResults.length > 0 ? (
        <div className="restaurant-grid">
          {searchResults.map((result) => (
            <Link to={`/restaurant/${result.id}`} key={result.id} className="restaurant-card-link">
              <div className="restaurant-card">
                <img src={result.image} alt={result.name} className="restaurant-image" />
                <div className="restaurant-details">
                  <h3 className="restaurant-name">{result.name}</h3>
                  <p className="restaurant-cuisines">{result.cuisines.join(', ')}</p>
                  <div className="restaurant-info">
                    <span className="restaurant-rating">
                      <Star className="icon" />
                      {result.rating}
                    </span>
                    <span className="restaurant-time">
                      <Clock className="icon" />
                      {result.deliveryTime}
                    </span>
                    <span className="restaurant-price">{result.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
