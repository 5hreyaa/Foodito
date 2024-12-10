// App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import Restaurants from './pages/Restaurants';
import SignIn from './pages/SignIn'; 
import SignUp from './pages/SignUp';
import SearchPage from './components/SearchPage';
import HelpPage from './pages/HelpPage'; 
import PaymentMethod from './pages/PaymentMethod';
import PaymentDetails from './pages/PaymentDetails';
import DeliveryAssignment from './pages/DeliveryAssignment';


function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<SignIn />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/delivery-assignment" element={<DeliveryAssignment />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
