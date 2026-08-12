import React, { useState, useEffect } from "react";
import { orderService } from "../../services/orderService";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage, filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
      };
      if (filter !== "all") {
        params.status = filter;
      }
      const response = await orderService.getUserOrders(params);
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await orderService.cancelOrder(orderId);
        toast.success("Order cancelled successfully");
        fetchOrders();
      } catch (error) {
        console.error("Error cancelling order:", error);
        toast.error("Failed to cancel order");
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      preparing: "bg-blue-100 text-blue-800",
      ready: "bg-purple-100 text-purple-800",
      confirmed: "bg-indigo-100 text-indigo-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Order History
        </h2>
        <div className="mt-4 md:mt-0">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
            }}
            className="input-primary w-40"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No Orders Found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You haven't placed any orders yet.
          </p>
          <a href="/menu" className="btn-primary inline-block">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-800 dark:text-white">
                      #{order.order_number}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {new Date(order.created_at).toLocaleDateString()} at{" "}
                    {new Date(order.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Total
                    </p>
                    <p className="text-xl font-bold text-primary-600">
                      ${order.grand_total}
                    </p>
                  </div>
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancelOrder(order.order_id)}
                      className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Order Items
                    </h4>
                    <div className="space-y-1">
                      {order.OrderItems?.map((item) => (
                        <div
                          key={item.order_item_id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600 dark:text-gray-300">
                            {item.quantity}x {item.Food?.name}
                          </span>
                          <span className="font-medium">
                            ${item.total_price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Delivery Address
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {order.delivery_address}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Payment: {order.payment_method}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Tracking */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 text-sm">
                  <div
                    className={`flex items-center gap-1 ${
                      [
                        "pending",
                        "confirmed",
                        "preparing",
                        "ready",
                        "delivered",
                      ].includes(order.status)
                        ? "text-primary-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        [
                          "pending",
                          "confirmed",
                          "preparing",
                          "ready",
                          "delivered",
                        ].includes(order.status)
                          ? "bg-primary-600"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span>Order Placed</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      ["confirmed", "preparing", "ready", "delivered"].includes(
                        order.status,
                      )
                        ? "text-primary-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        [
                          "confirmed",
                          "preparing",
                          "ready",
                          "delivered",
                        ].includes(order.status)
                          ? "bg-primary-600"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span>Confirmed</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      ["preparing", "ready", "delivered"].includes(order.status)
                        ? "text-primary-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        ["preparing", "ready", "delivered"].includes(
                          order.status,
                        )
                          ? "bg-primary-600"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span>Preparing</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      ["ready", "delivered"].includes(order.status)
                        ? "text-primary-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        ["ready", "delivered"].includes(order.status)
                          ? "bg-primary-600"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span>Ready</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      order.status === "delivered"
                        ? "text-primary-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        order.status === "delivered"
                          ? "bg-primary-600"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Showing{" "}
              {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.itemsPerPage,
                pagination.totalItems,
              )}{" "}
              of {pagination.totalItems} orders
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: prev.currentPage - 1,
                  }))
                }
                disabled={pagination.currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: prev.currentPage + 1,
                  }))
                }
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
