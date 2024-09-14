import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import Restaurants from './pages/Restaurants';
<<<<<<< HEAD
import SignIn from './pages/SignIn'; // Adjust the path if needed
=======
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/cart" element={<Cart />} />
<<<<<<< HEAD
          <Route path="/signin" element={<SignIn />} /> {/* Use element instead of component */}
=======
>>>>>>> 81d6f676bbb29529aa213f5d67a9931bf509b3f6
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;