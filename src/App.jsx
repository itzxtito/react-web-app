import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Cart from './components/Cart';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeWithCart />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const HomeWithCart = () => {
  return (
    <>
      <Home />
      <Cart />
    </>
  );
};

export default App;
