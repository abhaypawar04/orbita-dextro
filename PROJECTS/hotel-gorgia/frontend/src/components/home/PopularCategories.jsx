import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { foodService } from "../../services/foodService";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await foodService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const categoryIcons = {
    "South Indian": "🍛",
    Chinese: "🥢",
    "Fast Food": "🍔",
    Pizza: "🍕",
    Burgers: "🍔",
    "Ice Cream": "🍦",
    Drinks: "🥤",
    Desserts: "🍰",
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse p-6">
                <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mt-3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Popular Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Explore our delicious food categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category, index) => (
            <motion.div
              key={category.category_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Link to={`/menu?category=${category.category_id}`}>
                <div className="card p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-3">
                    {categoryIcons[category.name] || "🍽️"}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {category.description || "Delicious dishes"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
