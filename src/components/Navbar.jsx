import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">🍺 The Beer App</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
