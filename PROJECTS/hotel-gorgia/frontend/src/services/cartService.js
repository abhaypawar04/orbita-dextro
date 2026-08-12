import api from "./api";

export const cartService = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data.data;
  },

  addToCart: async (foodId, quantity) => {
    const response = await api.post("/cart/items", { foodId, quantity });
    return response.data;
  },

  updateCartItem: async (foodId, quantity) => {
    const response = await api.put(`/cart/items/${foodId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (foodId) => {
    const response = await api.delete(`/cart/items/${foodId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete("/cart");
    return response.data;
  },

  applyCoupon: async (code) => {
    const response = await api.post("/cart/coupon", { code });
    return response.data.data;
  },

  getFoodDetails: async (foodId) => {
    const response = await api.get(`/foods/${foodId}`);
    return response.data.data;
  },
};
