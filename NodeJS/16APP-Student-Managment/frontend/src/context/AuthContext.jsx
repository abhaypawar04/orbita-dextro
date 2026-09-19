import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);

          // Verify token validity
          const response = await authService.getCurrentUser();
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success("Login successful!");
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      toast.success(
        response.message || "Registration submitted! Please verify your OTP.",
      );
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      const response = await authService.verifyEmail(email, otp);
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success("Email verified successfully! Welcome!");
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
      throw err;
    }
  };

  const resendVerificationOtp = async (email) => {
    try {
      const response = await authService.resendVerificationOtp(email);
      toast.success(response.message || "OTP resent successfully");
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      toast.success(
        response.message || "If email exists, a reset OTP has been sent.",
      );
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
      throw err;
    }
  };

  const verifyResetOtp = async (email, otp) => {
    try {
      const response = await authService.verifyResetOtp(email, otp);
      toast.success(response.message || "OTP verified!");
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      throw err;
    }
  };

  const resetPassword = async (email, otp, newPassword, confirmNewPassword) => {
    try {
      const response = await authService.resetPassword(
        email,
        otp,
        newPassword,
        confirmNewPassword,
      );
      toast.success(
        response.message || "Password reset successful! Please login.",
      );
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
      throw err;
    }
  };

  const googleAuth = async (credential) => {
    try {
      const response = await authService.googleAuth(credential);
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success("Google Login successful!");
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Google Authentication failed");
      throw err;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    verifyEmail,
    resendVerificationOtp,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    googleAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
