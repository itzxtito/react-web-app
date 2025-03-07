import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const BeverageCard = ({ beverage }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{beverage.name}</h3>
      <p>ABV: {beverage.abv}%</p>
      <p>Price: ${beverage.price}</p>
      <button
        onClick={() => dispatch(addToCart(beverage))}
        className="bg-green-500 text-white p-2 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BeverageCard;
