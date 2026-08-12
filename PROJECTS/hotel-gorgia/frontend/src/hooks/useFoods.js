import { useState, useEffect } from "react";
import { foodService } from "../services/foodService";
import toast from "react-hot-toast";

export const useFoods = (initialFilters = {}) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [filters, setFilters] = useState(initialFilters);

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
      toast.error("Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const goToPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  useEffect(() => {
    fetchFoods();
  }, [pagination.currentPage, filters]);

  return {
    foods,
    loading,
    pagination,
    filters,
    updateFilters,
    goToPage,
    refetch: fetchFoods,
  };
};

export default useFoods;
