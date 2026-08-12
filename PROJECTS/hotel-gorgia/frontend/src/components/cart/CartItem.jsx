import React from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { food, quantity } = item;
  const price = food?.discount_price || food?.price || 0;
  const totalPrice = price * quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
    >
      <img
        src={food?.image || "https://via.placeholder.com/80"}
        alt={food?.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">
              {food?.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ${price.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-primary-600">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(quantity - 1)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(quantity + 1)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          <button
            onClick={onRemove}
            className="ml-auto p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors text-red-500"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
