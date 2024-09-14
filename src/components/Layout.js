import { ChevronDown, MapPin, ShoppingBag, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import './Layout.css';

const Layout = ({ children }) => {
  const [location, setLocation] = useState('New York');

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">Foodito</Link>
            <div className="location-selector">
              <MapPin size={18} />
              <span>{location}</span>
              <ChevronDown size={18} />
            </div>
          </div>
          <nav className="nav">
            <Link to="/restaurants">Restaurants</Link>
            <a href="#">Offers</a>
            <a href="#">Help</a>
            <a href="#" className="sign-in">
              <User className="icon" />
              Sign In
            </a>
            <Link to="/cart">
              <Button className="cart-button">
                <ShoppingBag className="icon" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        {/* Footer content (same as before) */}
      </footer>
    </div>
  );
};

export default Layout;