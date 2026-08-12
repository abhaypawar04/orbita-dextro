import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { StarIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const FeaturedFood = ({ foods, loading }) => {
  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Featured Dishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Featured Dishes
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Our most popular and highly recommended dishes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.map((food, index) => (
            <motion.div
              key={food.food_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card group"
            >
              <Link to={`/menu/${food.food_id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={food.image || "https://via.placeholder.com/300x200"}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  {food.discount_price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                      SALE
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center text-white">
                      <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="ml-1 text-sm">
                        {food.average_rating || "0.0"}
                      </span>
                      <span className="mx-1">•</span>
                      <span className="text-sm">
                        {food.review_count || 0} reviews
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {food.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {food.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      {food.discount_price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            ${food.discount_price}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${food.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                          ${food.price}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        food.is_veg
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {food.is_veg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/menu" className="btn-primary">
            View All Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFood;
