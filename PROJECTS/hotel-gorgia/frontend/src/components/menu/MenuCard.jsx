import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  StarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MenuCard = ({ food }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isWishlist, setIsWishlist] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart(food.food_id);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    setIsWishlist(!isWishlist);
    toast.success(isWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const price = food.discount_price || food.price;
  const originalPrice = food.discount_price ? food.price : null;

  return (
    <Link to={`/menu/${food.food_id}`} className="block">
      <div className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              imageError
                ? "https://via.placeholder.com/400x300?text=No+Image"
                : food.image ||
                  "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />

          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            {isWishlist ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {food.discount_price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold animate-pulse">
              {Math.round(
                ((food.price - food.discount_price) / food.price) * 100,
              )}
              % OFF
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center text-white">
              <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
              <span className="ml-1 text-sm">
                {food.average_rating || "0.0"}
              </span>
              <span className="mx-1">•</span>
              <span className="text-sm">{food.review_count || 0} reviews</span>
            </div>
          </div>

          {!food.is_available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold px-4 py-2 bg-red-500 rounded-lg">
                Currently Unavailable
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">
              {food.name}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                food.is_veg
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {food.is_veg ? "Veg" : "Non-Veg"}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {food.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              {originalPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ${price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${originalPrice}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  ${price}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!food.is_available}
              className={`p-2 rounded-full transition-colors ${
                food.is_available
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
          </div>

          {food.Category && (
            <div className="mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {food.Category.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
