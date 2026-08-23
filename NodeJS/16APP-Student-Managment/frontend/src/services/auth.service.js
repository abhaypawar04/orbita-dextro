import apiClient from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";

export const authService = {
  register: async (userData) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.REGISTER,
      userData,
    );
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  getCurrentUser: async () => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  getToken: () => localStorage.getItem("token"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
