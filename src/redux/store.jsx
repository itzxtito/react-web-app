import { configureStore } from '@reduxjs/toolkit';
import beverageReducer from './beverageSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    beverages: beverageReducer,
    cart: cartReducer,
  },
});

export default store;
