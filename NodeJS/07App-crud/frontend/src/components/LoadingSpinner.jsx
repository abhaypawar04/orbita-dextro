const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/80 px-6 py-4 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black dark:border-gray-600 dark:border-t-white"></div>
        <span className="text-sm font-medium tracking-wide text-gray-700 dark:text-gray-200">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
