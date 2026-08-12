import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ClipLoader color="#0ea5e9" size={50} />
      <p className="mt-4 text-gray-600 dark:text-gray-300 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
