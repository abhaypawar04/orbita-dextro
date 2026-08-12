export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "FoodHub",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
};

export const ROUTES = {
  HOME: "/",
  MENU: "/menu",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  READY: "ready",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.CONFIRMED]: "Confirmed",
  [ORDER_STATUS.PREPARING]: "Preparing",
  [ORDER_STATUS.READY]: "Ready",
  [ORDER_STATUS.DELIVERED]: "Delivered",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
};

export const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
  UPI: "upi",
  ONLINE: "online",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const USER_ROLES = {
  GUEST: "guest",
  CUSTOMER: "customer",
  ADMIN: "admin",
};

export const CURRENCY = {
  SYMBOL: "$",
  CODE: "USD",
  LOCALE: "en-US",
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
};

export const STORAGE_KEYS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  THEME: "theme",
  GUEST_CART: "guestCart",
  USER: "user",
};

export const ERROR_MESSAGES = {
  NETWORK: "Network error. Please check your connection.",
  UNAUTHORIZED: "Please login to continue.",
  FORBIDDEN: "You do not have permission to access this resource.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER: "Something went wrong. Please try again later.",
};

export const FOOD_CATEGORIES = {
  ALL: "all",
  VEG: "veg",
  NON_VEG: "non-veg",
  DRINKS: "drinks",
  DESSERTS: "desserts",
  SNACKS: "snacks",
  MAIN_COURSE: "main-course",
};
