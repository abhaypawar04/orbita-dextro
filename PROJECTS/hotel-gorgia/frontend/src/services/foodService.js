import api from "./api";

export const foodService = {
  getAll: async (params = {}) => {
    const response = await api.get("/foods", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/foods/${id}`);
    return response.data.data;
  },

  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data.data;
  },

  getFeatured: async () => {
    const response = await api.get("/foods/featured");
    return response.data.data;
  },

  getBestsellers: async () => {
    const response = await api.get("/foods/bestsellers");
    return response.data.data;
  },

  search: async (query) => {
    const response = await api.get("/foods/search", { params: { q: query } });
    return response.data.data;
  },

  getReviews: async (foodId) => {
    const response = await api.get(`/foods/${foodId}/reviews`);
    return response.data.data;
  },

  createReview: async (foodId, reviewData) => {
    const response = await api.post(`/reviews`, { foodId, ...reviewData });
    return response.data;
  },
};
