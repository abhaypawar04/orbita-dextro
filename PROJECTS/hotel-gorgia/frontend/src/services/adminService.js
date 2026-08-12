import api from "./api";

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get("/admin/dashboard/stats");
    return response.data;
  },

  getRevenueChart: async (period = "monthly") => {
    const response = await api.get("/admin/dashboard/revenue", {
      params: { period },
    });
    return response.data;
  },

  getRecentOrders: async () => {
    const response = await api.get("/admin/dashboard/recent-orders");
    return response.data;
  },

  getAllOrders: async (params = {}) => {
    const response = await api.get("/orders/admin/all", { params });
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  getAllUsers: async (params = {}) => {
    const response = await api.get("/admin/users", { params });
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },
};
