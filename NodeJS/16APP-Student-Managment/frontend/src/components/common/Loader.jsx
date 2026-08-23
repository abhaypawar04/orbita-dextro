import React from "react";

const Loader = ({
  size = "md",
  variant = "primary",
  fullScreen = false,
  className = "",
  text = "",
}) => {
  const sizes = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-16 w-16 border-4",
    xl: "h-24 w-24 border-4",
  };

  const variants = {
    primary: "border-primary-600 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
    success: "border-green-600 border-t-transparent",
    danger: "border-red-600 border-t-transparent",
  };

  const sizeStyles = sizes[size] || sizes.md;
  const variantStyles = variants[variant] || variants.primary;

  const loaderContent = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`
          animate-spin rounded-full
          ${sizeStyles}
          ${variantStyles}
        `}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p
          className={`mt-3 text-sm font-medium ${
            variant === "white" ? "text-white" : "text-gray-600"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

// Spinner component for buttons and inline loading
export const Spinner = ({
  size = "sm",
  variant = "primary",
  className = "",
}) => {
  const sizes = {
    xs: "h-3 w-3 border-2",
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-3",
    lg: "h-8 w-8 border-3",
  };

  const variants = {
    primary: "border-primary-600 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
  };

  return (
    <div
      className={`
        animate-spin rounded-full
        ${sizes[size] || sizes.sm}
        ${variants[variant] || variants.primary}
        ${className}
      `}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Skeleton loader for cards and lists
export const Skeleton = ({ variant = "text", className = "" }) => {
  const variants = {
    text: "h-4 rounded bg-gray-200 animate-pulse",
    title: "h-6 rounded bg-gray-200 animate-pulse",
    circle: "rounded-full bg-gray-200 animate-pulse",
    card: "rounded-xl bg-gray-200 animate-pulse",
    button: "rounded-lg bg-gray-200 animate-pulse",
  };

  return <div className={`${variants[variant]} ${className}`} />;
};

// Card skeleton for loading states
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton variant="circle" className="w-16 h-16" />
              <div className="space-y-2">
                <Skeleton variant="title" className="w-32" />
                <Skeleton variant="text" className="w-24" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Skeleton variant="button" className="w-8 h-8" />
              <Skeleton variant="button" className="w-8 h-8" />
              <Skeleton variant="button" className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Skeleton variant="text" className="h-10" />
            <Skeleton variant="text" className="h-10" />
            <Skeleton variant="text" className="h-10" />
            <Skeleton variant="text" className="h-10" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <Skeleton variant="text" className="w-24" />
            <Skeleton variant="text" className="w-20" />
          </div>
        </div>
      ))}
    </>
  );
};

// Table skeleton for loading states
export const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <Skeleton variant="title" className="w-48" />
          <Skeleton variant="button" className="w-32 h-10" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <Skeleton variant="text" className="w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="border-t border-gray-100">
                {Array.from({ length: columns }).map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <Skeleton variant="text" className="w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Loader;
