import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/outline";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                4.8/5 (2,000+ reviews)
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-primary-600 dark:text-primary-400">
                Delicious
              </span>
              <span className="text-gray-800 dark:text-white">
                {" "}
                Food Delivered
              </span>
              <span className="text-secondary-600 dark:text-secondary-400">
                {" "}
                to Your Door
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the finest cuisine from top restaurants in your area.
              Order now and enjoy a delightful dining experience at home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                Order Now
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-outline text-lg px-8 py-4">
                Learn More
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  500+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Restaurants
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  10k+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Orders Delivered
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  4.8
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Average Rating
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
                alt="Delicious food"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Floating cards */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-sm font-semibold">🍕 Italian Pizza</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    ⭐ 4.9 (120 reviews)
                  </p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-sm font-semibold">🍣 Sushi Deluxe</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    ⭐ 4.8 (85 reviews)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
