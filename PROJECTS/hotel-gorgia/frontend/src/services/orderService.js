import api from "./api";

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getUserOrders: async (params = {}) => {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
  },

  getOrderStatus: async (orderId) => {
    const response = await api.get(`/orders/${orderId}/status`);
    return response.data;
  },
};
