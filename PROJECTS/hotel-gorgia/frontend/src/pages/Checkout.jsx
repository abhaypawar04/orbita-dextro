import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import toast from "react-hot-toast";
import {
  CreditCardIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      delivery_address: user?.address || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const orderData = {
        delivery_address: data.delivery_address,
        delivery_instructions: data.delivery_instructions,
        special_instructions: data.special_instructions,
        payment_method: paymentMethod,
        order_type: data.order_type || "delivery",
      };

      const response = await orderService.createOrder(orderData);
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/order-confirmation", { state: { order: response.data } });
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: "cash", name: "Cash on Delivery", icon: BanknotesIcon },
    { id: "card", name: "Credit/Debit Card", icon: CreditCardIcon },
    { id: "upi", name: "UPI", icon: DevicePhoneMobileIcon },
  ];

  return (
    <div className="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="input-primary"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email",
                        },
                      })}
                      className="input-primary"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9+\-\s()]{10,20}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className="input-primary"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Order Type
                    </label>
                    <select
                      {...register("order_type")}
                      className="input-primary"
                    >
                      <option value="delivery">Delivery</option>
                      <option value="takeaway">Takeaway</option>
                      <option value="dine_in">Dine In</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Delivery Address
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address *
                  </label>
                  <textarea
                    {...register("delivery_address", {
                      required: "Delivery address is required",
                    })}
                    rows="3"
                    className="input-primary"
                    placeholder="Enter your full delivery address"
                  />
                  {errors.delivery_address && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.delivery_address.message}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Delivery Instructions
                  </label>
                  <input
                    type="text"
                    {...register("delivery_instructions")}
                    className="input-primary"
                    placeholder="Any special delivery instructions"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === method.id
                            ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary-300"
                        }`}
                      >
                        <Icon
                          className={`h-8 w-8 mx-auto ${
                            paymentMethod === method.id
                              ? "text-primary-600"
                              : "text-gray-400"
                          }`}
                        />
                        <p
                          className={`text-sm mt-2 text-center ${
                            paymentMethod === method.id
                              ? "text-primary-600 font-medium"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {method.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Special Instructions
                </h2>
                <textarea
                  {...register("special_instructions")}
                  rows="3"
                  className="input-primary"
                  placeholder="Any special requests or instructions for your order"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Placing Order...
                  </div>
                ) : (
                  `Place Order - $${total.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.food_id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.quantity}x {item.food?.name}
                    </span>
                    <span className="font-medium">
                      $
                      {(
                        (item.food?.discount_price || item.food?.price || 0) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Subtotal
                  </span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Delivery Fee
                  </span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
