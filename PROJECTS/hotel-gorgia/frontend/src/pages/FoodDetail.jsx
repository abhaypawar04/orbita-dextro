import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { foodService } from "../services/foodService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  ClockIcon,
  UsersIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const FoodDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchFoodDetails();
  }, [id]);

  const fetchFoodDetails = async () => {
    try {
      setLoading(true);
      const data = await foodService.getById(id);
      setFood(data);
    } catch (error) {
      console.error("Error fetching food details:", error);
      toast.error("Failed to load food details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart(food.food_id, quantity);
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    setIsWishlist(!isWishlist);
    toast.success(isWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Food Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            The item you're looking for doesn't exist.
          </p>
          <Link to="/menu" className="btn-primary inline-block mt-4">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const price = food.discount_price || food.price;
  const originalPrice = food.discount_price ? food.price : null;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-96 md:h-full min-h-[400px]"
            >
              <img
                src={
                  imageError
                    ? "https://via.placeholder.com/600x400?text=No+Image"
                    : food.image ||
                      "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={food.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  {discountPercent}% OFF
                </div>
              )}
              {!food.is_available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold px-6 py-3 bg-red-500 rounded-lg text-xl">
                    Currently Unavailable
                  </span>
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 md:p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {food.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        food.is_veg
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {food.is_veg ? "Veg" : "Non-Veg"}
                    </span>
                    {food.Category && (
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        • {food.Category.name}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleWishlist}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  {isWishlist ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold text-gray-800 dark:text-white">
                    {food.average_rating || "0.0"}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  ({food.review_count || 0} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {food.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                {originalPrice ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary-600">
                      ${price}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      ${originalPrice}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary-600">
                    ${price}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!food.is_available}
                  className={`flex-1 btn-primary py-3 flex items-center justify-center gap-2 ${
                    !food.is_available ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Add to Cart
                </button>
                <Link
                  to="/menu"
                  className="flex-1 btn-outline text-center py-3"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
                {food.preparation_time && (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {food.preparation_time} mins
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Serves {food.serves || "1-2"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {food.is_available ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XMarkIcon className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {food.is_available ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {food.stock || 0} available
                  </span>
                </div>
              </div>

              {/* Ingredients */}
              {food.ingredients && food.ingredients.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {food.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        {food.Reviews && food.Reviews.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {food.Reviews.map((review) => (
                <div
                  key={review.review_id}
                  className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <span className="font-semibold text-primary-600">
                        {review.User?.name?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {review.User?.name || "Anonymous"}
                      </p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300 ml-13">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetail;
