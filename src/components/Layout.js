import { ChevronDown, ShoppingBag, User } from 'lucide-react';
import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import AboutPage from './AboutPage';
import HelpPage from '../pages/HelpPage'; 
import './Layout.css';
import SearchPage from './SearchPage'; 

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    navigate('/search');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo-container">
              <img src="/images/logo.png" alt="Foodito Logo" className="logo-image" />
              <span className="logo-text">Foodito</span>
            </Link>
          </div>
          <nav className="nav">
            <a href="#" onClick={handleSearchToggle}>Search</a>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/about">About</Link>
            <a href="#" onClick={handleHelpClick}>Help</a>
            <Link to="/signin">
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

      <main className="main-content">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/*" element={children} />
        </Routes>
      </main>
    </div>
  );
};

export default Layout;
