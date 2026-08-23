import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Toast types
export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Individual Toast Component
const ToastItem = ({
  id,
  message,
  type = ToastType.INFO,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose(id);
    }, 300);
  };

  if (!isVisible) return null;

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const typeStyles = {
    success: "bg-green-50 border-green-500 text-green-800",
    error: "bg-red-50 border-red-500 text-red-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
    info: "bg-blue-50 border-blue-500 text-blue-800",
  };

  const iconColors = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}
        mb-3 last:mb-0
      `}
    >
      <div
        className={`
        flex items-start p-4 border-l-4 rounded-lg shadow-lg
        ${typeStyles[type]}
      `}
      >
        <div className={`flex-shrink-0 ${iconColors[type]}`}>{icons[type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Toast Container
export const ToastContainer = ({ position = "top-right", children }) => {
  const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  return (
    <div className={`fixed z-50 w-96 max-w-full ${positionStyles[position]}`}>
      {children}
    </div>
  );
};

// Toast Manager
export class ToastManager {
  constructor() {
    this.toasts = [];
    this.listeners = [];
    this.id = 0;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify(message, type = ToastType.INFO, duration = 3000) {
    const id = ++this.id;
    const toast = { id, message, type, duration };
    this.toasts.push(toast);
    this.emitChange();

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration + 300);
    }

    return id;
  }

  remove(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.emitChange();
  }

  clear() {
    this.toasts = [];
    this.emitChange();
  }

  emitChange() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }

  success(message, duration = 3000) {
    return this.notify(message, ToastType.SUCCESS, duration);
  }

  error(message, duration = 4000) {
    return this.notify(message, ToastType.ERROR, duration);
  }

  warning(message, duration = 3000) {
    return this.notify(message, ToastType.WARNING, duration);
  }

  info(message, duration = 3000) {
    return this.notify(message, ToastType.INFO, duration);
  }
}

// Toast Provider Component
export const ToastProvider = ({ children, position = "top-right" }) => {
  const [toasts, setToasts] = useState([]);
  const [toastManager] = useState(() => new ToastManager());

  useEffect(() => {
    const unsubscribe = toastManager.subscribe((newToasts) => {
      setToasts([...newToasts]);
    });
    return () => unsubscribe();
  }, [toastManager]);

  return (
    <>
      {children}
      {createPortal(
        <ToastContainer position={position}>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => toastManager.remove(toast.id)}
            />
          ))}
        </ToastContainer>,
        document.body,
      )}
    </>
  );
};

// Hook to use toast
export const useToast = () => {
  const [manager] = useState(() => new ToastManager());

  return {
    show: (message, type, duration) => manager.notify(message, type, duration),
    success: (message, duration) => manager.success(message, duration),
    error: (message, duration) => manager.error(message, duration),
    warning: (message, duration) => manager.warning(message, duration),
    info: (message, duration) => manager.info(message, duration),
    clear: () => manager.clear(),
    remove: (id) => manager.remove(id),
  };
};

// Standalone toast function for simple use
let defaultToastManager = null;

export const toast = {
  init: (manager) => {
    defaultToastManager = manager;
  },
  show: (message, type = ToastType.INFO, duration = 3000) => {
    if (defaultToastManager) {
      return defaultToastManager.notify(message, type, duration);
    }
    console.warn(
      "Toast not initialized. Please wrap your app with ToastProvider",
    );
  },
  success: (message, duration = 3000) => {
    if (defaultToastManager) {
      return defaultToastManager.success(message, duration);
    }
    console.warn(
      "Toast not initialized. Please wrap your app with ToastProvider",
    );
  },
  error: (message, duration = 4000) => {
    if (defaultToastManager) {
      return defaultToastManager.error(message, duration);
    }
    console.warn(
      "Toast not initialized. Please wrap your app with ToastProvider",
    );
  },
  warning: (message, duration = 3000) => {
    if (defaultToastManager) {
      return defaultToastManager.warning(message, duration);
    }
    console.warn(
      "Toast not initialized. Please wrap your app with ToastProvider",
    );
  },
  info: (message, duration = 3000) => {
    if (defaultToastManager) {
      return defaultToastManager.info(message, duration);
    }
    console.warn(
      "Toast not initialized. Please wrap your app with ToastProvider",
    );
  },
  clear: () => {
    if (defaultToastManager) {
      defaultToastManager.clear();
    }
  },
};

export default ToastProvider;
