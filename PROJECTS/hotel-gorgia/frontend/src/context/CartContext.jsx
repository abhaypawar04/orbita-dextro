import React, { createContext, useState, useContext, useEffect } from "react";
import { cartService } from "../services/cartService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      // Load cart from localStorage for guest
      const savedCart = localStorage.getItem("guestCart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const items = await cartService.getCart();
      setCartItems(items);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (foodId, quantity = 1) => {
    try {
      if (isAuthenticated) {
        await cartService.addToCart(foodId, quantity);
        await loadCart();
      } else {
        // Guest cart - store in localStorage
        const existingItem = cartItems.find((item) => item.food_id === foodId);
        let updatedCart;
        if (existingItem) {
          updatedCart = cartItems.map((item) =>
            item.food_id === foodId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        } else {
          // Fetch food details for guest
          const food = await cartService.getFoodDetails(foodId);
          updatedCart = [
            ...cartItems,
            {
              food_id: foodId,
              quantity,
              food: food,
            },
          ];
        }
        setCartItems(updatedCart);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      }
      toast.success("Added to cart 🛒");
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Add to cart error:", error);
    }
  };

  const updateQuantity = async (foodId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(foodId);
        return;
      }

      if (isAuthenticated) {
        await cartService.updateCartItem(foodId, quantity);
        await loadCart();
      } else {
        const updatedCart = cartItems.map((item) =>
          item.food_id === foodId ? { ...item, quantity } : item,
        );
        setCartItems(updatedCart);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      toast.error("Failed to update cart");
      console.error("Update cart error:", error);
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      if (isAuthenticated) {
        await cartService.removeFromCart(foodId);
        await loadCart();
      } else {
        const updatedCart = cartItems.filter((item) => item.food_id !== foodId);
        setCartItems(updatedCart);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      }
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove from cart");
      console.error("Remove from cart error:", error);
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartService.clearCart();
        setCartItems([]);
      } else {
        setCartItems([]);
        localStorage.removeItem("guestCart");
      }
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Clear cart error:", error);
    }
  };

  const applyCoupon = async (code) => {
    try {
      const result = await cartService.applyCoupon(code);
      setCoupon(result);
      toast.success("Coupon applied successfully 🎉");
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon");
      return { success: false };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    toast.success("Coupon removed");
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.food?.price || 0) * item.quantity,
    0,
  );
  const discount = coupon
    ? coupon.discount_type === "percentage"
      ? (subtotal * coupon.discount_value) / 100
      : coupon.discount_value
    : 0;
  const total = subtotal - discount;

  const value = {
    cartItems,
    loading,
    subtotal,
    discount,
    total,
    coupon,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
