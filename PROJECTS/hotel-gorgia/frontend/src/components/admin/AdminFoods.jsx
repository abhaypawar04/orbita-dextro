import React, { useState, useEffect } from "react";
import { foodService } from "../../services/foodService";
import { adminService } from "../../services/adminService";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AdminFoods = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    is_veg: true,
    is_available: true,
    stock: "",
    discount_price: "",
  });

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, [pagination.currentPage, search]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await foodService.getAll({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: search || undefined,
      });
      setFoods(response.data.foods);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await foodService.getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFood) {
        await adminService.updateFood(editingFood.food_id, formData);
        toast.success("Food updated successfully");
      } else {
        await adminService.createFood(formData);
        toast.success("Food created successfully");
      }
      setIsModalOpen(false);
      fetchFoods();
      resetForm();
    } catch (error) {
      console.error("Error saving food:", error);
      toast.error("Failed to save food");
    }
  };

  const handleDelete = async (foodId) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      try {
        await adminService.deleteFood(foodId);
        toast.success("Food deleted successfully");
        fetchFoods();
      } catch (error) {
        console.error("Error deleting food:", error);
        toast.error("Failed to delete food");
      }
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description || "",
      price: food.price,
      category_id: food.category_id || "",
      is_veg: food.is_veg,
      is_available: food.is_available,
      stock: food.stock || "",
      discount_price: food.discount_price || "",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category_id: "",
      is_veg: true,
      is_available: true,
      stock: "",
      discount_price: "",
    });
    setEditingFood(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Food Items
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your menu items
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2 mt-4 md:mt-0"
        >
          <PlusIcon className="h-5 w-5" />
          Add Food Item
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search foods..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
            }}
            className="input-primary pl-10"
          />
        </div>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {foods.map((food) => (
          <motion.div
            key={food.food_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={
                  food.image ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => handleEdit(food)}
                  className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-lg hover:bg-white transition-colors"
                >
                  <PencilIcon className="h-4 w-4 text-blue-500" />
                </button>
                <button
                  onClick={() => handleDelete(food.food_id)}
                  className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-lg hover:bg-white transition-colors"
                >
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </button>
              </div>
              {food.discount_price && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  SALE
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {food.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                {food.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  {food.discount_price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary-600">
                        ${food.discount_price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${food.price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-primary-600">
                      ${food.price}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      food.is_veg
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {food.is_veg ? "Veg" : "Non-Veg"}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      food.is_available
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {food.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500">
                <span>Stock: {food.stock || 0}</span>
                <span>⭐ {food.average_rating || "0.0"}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
          to{" "}
          {Math.min(
            pagination.currentPage * pagination.itemsPerPage,
            pagination.totalItems,
          )}{" "}
          of {pagination.totalItems} items
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
              }))
            }
            disabled={pagination.currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
              }))
            }
            disabled={pagination.currentPage === pagination.totalPages}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {editingFood ? "Edit Food Item" : "Add New Food Item"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Food Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="input-primary"
                    placeholder="Enter food name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="input-primary"
                    rows="3"
                    placeholder="Enter description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      className="input-primary"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Discount Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.discount_price}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discount_price: e.target.value,
                        }))
                      }
                      className="input-primary"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category_id}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category_id: e.target.value,
                        }))
                      }
                      className="input-primary"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.category_id} value={cat.category_id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          stock: e.target.value,
                        }))
                      }
                      className="input-primary"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_veg}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          is_veg: e.target.checked,
                        }))
                      }
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Veg
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_available}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          is_available: e.target.checked,
                        }))
                      }
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Available
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingFood ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFoods;
