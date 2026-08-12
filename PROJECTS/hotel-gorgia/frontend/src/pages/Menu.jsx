import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import MenuGrid from "../components/menu/MenuGrid";
import MenuFilters from "../components/menu/MenuFilters";
import MenuSearch from "../components/menu/MenuSearch";
import MenuPagination from "../components/menu/MenuPagination";
import { foodService } from "../services/foodService";

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    isVeg: "",
    rating: "",
    sort: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchFoods();
  }, [filters, pagination.currentPage]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        ...filters,
      };
      // Remove empty filters
      Object.keys(params).forEach((key) => {
        if (
          params[key] === "" ||
          params[key] === null ||
          params[key] === undefined
        ) {
          delete params[key];
        }
      });

      const response = await foodService.getAll(params);
      setFoods(response.data.foods);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));

    // Update URL params
    if (value) {
      setSearchParams((prev) => {
        prev.set(key, value);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete(key);
        return prev;
      });
    }
  };

  const handleSearch = (query) => {
    handleFilterChange("search", query);
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Our Menu
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Discover our delicious selection of dishes
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <MenuSearch onSearch={handleSearch} initialValue={filters.search} />
        </motion.div>

        {/* Filters and Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <MenuFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {pagination.totalItems} items found
              </p>
            </div>
            <MenuGrid foods={foods} loading={loading} />
            <MenuPagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
