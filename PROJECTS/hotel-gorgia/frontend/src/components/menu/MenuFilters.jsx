import React, { useState, useEffect } from "react";
import { foodService } from "../../services/foodService";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const MenuFilters = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await foodService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const vegOptions = [
    { value: "", label: "All" },
    { value: "true", label: "Veg" },
    { value: "false", label: "Non-Veg" },
  ];

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rating" },
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
  ];

  const ratingOptions = [
    { value: "", label: "All Ratings" },
    { value: "4", label: "4★ & Above" },
    { value: "3", label: "3★ & Above" },
    { value: "2", label: "2★ & Above" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className={`space-y-4 ${isExpanded ? "block" : "hidden md:block"}`}>
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={filters.category || ""}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="input-primary"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Veg/Non-Veg Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dietary Preference
          </label>
          <select
            value={filters.isVeg || ""}
            onChange={(e) => onFilterChange("isVeg", e.target.value)}
            className="input-primary"
          >
            {vegOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rating
          </label>
          <select
            value={filters.rating || ""}
            onChange={(e) => onFilterChange("rating", e.target.value)}
            className="input-primary"
          >
            {ratingOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <select
            value={filters.sort || ""}
            onChange={(e) => onFilterChange("sort", e.target.value)}
            className="input-primary"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => onFilterChange("minPrice", e.target.value)}
              className="input-primary flex-1"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
              className="input-primary flex-1"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            onFilterChange("category", "");
            onFilterChange("isVeg", "");
            onFilterChange("rating", "");
            onFilterChange("sort", "");
            onFilterChange("minPrice", "");
            onFilterChange("maxPrice", "");
          }}
          className="w-full text-sm text-primary-600 hover:text-primary-700 py-2"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default MenuFilters;
