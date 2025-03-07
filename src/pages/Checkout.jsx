import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="checkout-box"> {/* Only keeping the checkout box */}
      <h2 className="text-2xl font-bold">Checkout</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="p-2 border-b flex justify-between items-center">
                <span>
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-red-500 text-white px-2 mx-1 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="bg-green-500 text-white px-2 mx-1 rounded"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-4">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-gray-500 text-white p-2 mt-4 rounded"
          >
            Clear Cart
          </button>
          <button
            onClick={() => {
              dispatch(clearCart());
              alert('Checkout complete! (This is a simulation)');
            }}
            className="bg-green-500 text-white p-2 mt-4 rounded ml-2"
          >
            Complete Purchase
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
