import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const { subtotal, total, itemCount, clearCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Order Summary
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Items ({itemCount})
          </span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Delivery Fee</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">GST (5%)</span>
          <span className="font-medium">${(subtotal * 0.05).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
          <span>Total</span>
          <span className="text-primary-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          to="/checkout"
          className="w-full btn-primary py-3 text-center block"
        >
          Proceed to Checkout
        </Link>
        <Link to="/menu" className="w-full btn-outline text-center block">
          Continue Shopping
        </Link>
        {itemCount > 0 && (
          <button
            onClick={clearCart}
            className="w-full text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
