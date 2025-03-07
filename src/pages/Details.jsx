import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Details = () => {
  const { id } = useParams();
  const beverage = useSelector((state) =>
    state.beverages.list.find((item) => item.id.toString() === id)
  );

  if (!beverage) return <p className="text-center">Beverage not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{beverage.name}</h2>
      <p>ABV: {beverage.abv}%</p>
      <p>Price: ${beverage.price}</p>
      <p>Description: {beverage.description || 'No description available'}</p>
    </div>
  );
};

export default Details;
