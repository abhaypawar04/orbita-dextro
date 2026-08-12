import React from "react";
import { motion } from "framer-motion";
import MenuCard from "./MenuCard";

const MenuGrid = ({ foods, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
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
    );
  }

  if (foods.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No Items Found
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {foods.map((food, index) => (
        <motion.div
          key={food.food_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <MenuCard food={food} />
        </motion.div>
      ))}
    </div>
  );
};

export default MenuGrid;
