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

  verifyEmail: async (email, otp) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      email,
      otp,
    });
    if (response.data?.data?.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  resendVerificationOtp: async (email) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.RESEND_VERIFICATION_OTP,
      { email },
    );
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    if (response.data?.data?.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email },
    );
    return response.data;
  },

  verifyResetOtp: async (email, otp) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.VERIFY_RESET_OTP,
      { email, otp },
    );
    return response.data;
  },

  resetPassword: async (email, otp, newPassword, confirmNewPassword) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      email,
      otp,
      newPassword,
      confirmNewPassword,
    });
    return response.data;
  },

  googleAuth: async (credential) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.GOOGLE, {
      credential,
    });
    if (response.data?.data?.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      // Continue client cleanup even if request fails
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
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
