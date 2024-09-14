<<<<<<< HEAD
import React, { useState } from 'react';
import { ChevronDown, MapPin, ShoppingBag, User } from 'lucide-react';
=======
import { ChevronDown, MapPin, ShoppingBag, User } from 'lucide-react';
import React, { useState } from 'react';
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import './Layout.css';

const Layout = ({ children }) => {
<<<<<<< HEAD
  const [location, setLocation] = useState('Coimbatore');
  const [isHeroVisible, setHeroVisible] = useState(false); // State for showing hero section

  const toggleHero = () => {
    setHeroVisible(!isHeroVisible); // Toggle hero section visibility
  };
=======
  const [location, setLocation] = useState('New York');
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">Foodito</Link>
<<<<<<< HEAD
            <div className="location-selector" onClick={toggleHero}>
=======
            <div className="location-selector">
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
              <MapPin size={18} />
              <span>{location}</span>
              <ChevronDown size={18} />
            </div>
          </div>
          <nav className="nav">
            <Link to="/restaurants">Restaurants</Link>
            <a href="#">Offers</a>
            <a href="#">Help</a>
<<<<<<< HEAD
            <Link to="/signin" className="nav-link">
              <User className="icon" />
              Sign In
            </Link>
=======
            <a href="#" className="sign-in">
              <User className="icon" />
              Sign In
            </a>
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
            <Link to="/cart">
              <Button className="cart-button">
                <ShoppingBag className="icon" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
<<<<<<< HEAD

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
=======
      <main className="main-content">{children}</main>
      <footer className="footer">
        {/* Footer content (same as before) */}
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
      </footer>
    </div>
  );
};

<<<<<<< HEAD
export default Layout;
=======
export default Layout;
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
