import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { orderService } from "../../services/orderService";
import {
  ShoppingBagIcon,
  UserIcon,
  HeartIcon,
  StarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    wishlistItems: 0,
    reviews: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const ordersResponse = await orderService.getUserOrders({ limit: 5 });
      setRecentOrders(ordersResponse.data.orders || []);
      setStats((prev) => ({
        ...prev,
        totalOrders: ordersResponse.data.pagination?.totalItems || 0,
      }));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBagIcon,
      color: "bg-blue-500",
      link: "/dashboard/orders",
    },
    {
      title: "Wishlist",
      value: stats.wishlistItems,
      icon: HeartIcon,
      color: "bg-red-500",
      link: "/dashboard/wishlist",
    },
    {
      title: "Reviews",
      value: stats.reviews,
      icon: StarIcon,
      color: "bg-yellow-500",
      link: "/dashboard/reviews",
    },
    {
      title: "Profile",
      value: "Settings",
      icon: Cog6ToothIcon,
      color: "bg-purple-500",
      link: "/dashboard/profile",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user?.name}!</h2>
            <p className="text-white/80">
              Here's what's happening with your orders
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={stat.link} className="block">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div
                  className={`p-3 rounded-lg ${stat.color} bg-opacity-20 inline-block`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${stat.color.replace("bg-", "text-")}`}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-3">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.title}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Orders
          </h3>
          <Link
            to="/dashboard/orders"
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            View All →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">📦</div>
            <p className="text-gray-600 dark:text-gray-300">No orders yet</p>
            <Link to="/menu" className="btn-primary inline-block mt-4">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.order_id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    #{order.order_number}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">
                    ${order.grand_total}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
