import React, { useState } from 'react';
import { ChevronDown, MapPin, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import './Layout.css';

const Layout = ({ children }) => {
  const [location, setLocation] = useState('Coimbatore');
  const [isHeroVisible, setHeroVisible] = useState(false); // State for showing hero section

  const toggleHero = () => {
    setHeroVisible(!isHeroVisible); // Toggle hero section visibility
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">Foodito</Link>
            <div className="location-selector" onClick={toggleHero}>
              <MapPin size={18} />
              <span>{location}</span>
              <ChevronDown size={18} />
            </div>
          </div>
          <nav className="nav">
            <Link to="/restaurants">Restaurants</Link>
            <a href="#">Offers</a>
            <a href="#">Help</a>
            <Link to="/signin" className="nav-link">
              <User className="icon" />
              Sign In
            </Link>
            <Link to="/cart">
              <Button className="cart-button">
                <ShoppingBag className="icon" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className={`location-selector-hero ${isHeroVisible ? 'visible' : ''}`}>
        <h2>Hungry? You're in the right place</h2>
        <p>Order food from the best restaurants in town</p>
        <div className="location-input-container">
          <input
            type="text"
            placeholder="Enter your delivery location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button onClick={() => setHeroVisible(false)}>Find Food</Button>
        </div>
      </div>

      <main className="main-content">{children}</main>

      <footer className="footer">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Layout;
