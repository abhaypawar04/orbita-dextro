import { useState, useEffect } from "react";
import { orderService } from "../services/orderService";
import toast from "react-hot-toast";

export const useOrders = (options = {}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const fetchOrders = async (params = {}) => {
    try {
      setLoading(true);
      const response = await orderService.getUserOrders({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        ...params,
      });
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await orderService.cancelOrder(orderId);
      toast.success("Order cancelled successfully");
      await fetchOrders();
      return { success: true };
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
      return { success: false };
    }
  };

  useEffect(() => {
    fetchOrders(options);
  }, [pagination.currentPage]);

  return {
    orders,
    loading,
    pagination,
    fetchOrders,
    cancelOrder,
    setPagination,
  };
};

export default useOrders;
