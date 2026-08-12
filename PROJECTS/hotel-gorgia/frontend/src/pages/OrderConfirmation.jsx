import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Order Not Found
          </h2>
          <Link to="/" className="btn-primary inline-block mt-4">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
          Order Placed Successfully! 🎉
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Thank you for your order. We'll notify you when it's ready.
        </p>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Order Number
          </p>
          <p className="text-2xl font-bold text-primary-600">
            #{order.order_number}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Amount
            </p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              ${order.grand_total}
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Payment Method
            </p>
            <p className="text-xl font-bold text-gray-800 dark:text-white capitalize">
              {order.payment_method}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Delivery Address
          </p>
          <p className="text-gray-800 dark:text-white mt-1">
            {order.delivery_address}
          </p>
        </div>

        {order.OrderItems && (
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
              Order Items
            </h3>
            <div className="space-y-2">
              {order.OrderItems.map((item) => (
                <div
                  key={item.order_item_id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.quantity}x {item.Food?.name}
                  </span>
                  <span className="font-medium">${item.total_price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard/orders" className="btn-primary">
            View My Orders
          </Link>
          <Link to="/menu" className="btn-outline">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
