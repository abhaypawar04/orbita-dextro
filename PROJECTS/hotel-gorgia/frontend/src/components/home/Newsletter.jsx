import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success("Subscribed to newsletter successfully! 🎉");
    reset();
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 mb-8">
            Get the latest updates on new dishes, special offers, and exclusive
            deals delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.email && (
                <p className="text-sm text-red-200 mt-1 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-600"></div>
              ) : (
                <>
                  Subscribe
                  <PaperAirplaneIcon className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-white/60 text-sm mt-4">
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
