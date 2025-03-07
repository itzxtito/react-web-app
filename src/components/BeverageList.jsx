import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeverages } from '../redux/beverageSlice';
import BeverageCard from './BeverageCard';

const BeverageList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.beverages);

  useEffect(() => {
    dispatch(fetchBeverages()); // Fetch data when component mounts
  }, [dispatch]);

  console.log('list:', list);
  console.log('Type of list:', typeof list);

  if (status === 'loading') return <p className="text-center">Loading beverages...</p>;
  if (status === 'failed') return <p className="text-center text-red-500">Error: {error}</p>;

  const beverageArray = Array.isArray(list) ? list : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {beverageArray.length > 0 ? (
        beverageArray.map((beverage) => (
          <BeverageCard key={beverage.id} beverage={beverage} />
        ))
      ) : (
        <p className="text-center">No beverages available</p>
      )}
    </div>
  );
};

export default BeverageList;