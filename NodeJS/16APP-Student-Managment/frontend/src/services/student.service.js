import apiClient from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";

export const studentService = {
  create: async (studentData) => {
    const formData = new FormData();
    Object.keys(studentData).forEach((key) => {
      if (key === "address") {
        Object.keys(studentData.address).forEach((subKey) => {
          formData.append(`address[${subKey}]`, studentData.address[subKey]);
        });
      } else if (key === "profilePicture") {
        if (studentData.profilePicture) {
          formData.append("profilePicture", studentData.profilePicture);
        }
      } else {
        formData.append(key, studentData[key]);
      }
    });

    const response = await apiClient.post(
      API_ENDPOINTS.STUDENTS.BASE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.STUDENTS.BASE, {
      params,
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(
      `${API_ENDPOINTS.STUDENTS.BASE}/${id}`,
    );
    return response.data;
  },

  update: async (id, studentData) => {
    const formData = new FormData();
    Object.keys(studentData).forEach((key) => {
      if (key === "address") {
        Object.keys(studentData.address).forEach((subKey) => {
          formData.append(`address[${subKey}]`, studentData.address[subKey]);
        });
      } else if (key === "profilePicture") {
        if (studentData.profilePicture) {
          formData.append("profilePicture", studentData.profilePicture);
        }
      } else {
        formData.append(key, studentData[key]);
      }
    });

    const response = await apiClient.put(
      `${API_ENDPOINTS.STUDENTS.BASE}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(
      `${API_ENDPOINTS.STUDENTS.BASE}/${id}`,
    );
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get(API_ENDPOINTS.STUDENTS.STATS);
    return response.data;
  },
};
