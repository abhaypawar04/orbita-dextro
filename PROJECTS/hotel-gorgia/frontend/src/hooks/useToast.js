import toast from "react-hot-toast";

export const useToast = () => {
  const showSuccess = (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      position: "top-right",
      ...options,
    });
  };

  const showError = (message, options = {}) => {
    return toast.error(message, {
      duration: 4000,
      position: "top-right",
      ...options,
    });
  };

  const showInfo = (message, options = {}) => {
    return toast(message, {
      duration: 3000,
      position: "top-right",
      icon: "ℹ️",
      ...options,
    });
  };

  const showLoading = (message, options = {}) => {
    return toast.loading(message, {
      position: "top-right",
      ...options,
    });
  };

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    loading: showLoading,
    dismiss: toast.dismiss,
    remove: toast.remove,
  };
};

export default useToast;
