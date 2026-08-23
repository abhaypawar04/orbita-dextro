import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div
      className="
        relative
        flex
        min-h-screen
        flex-col
        overflow-x-hidden
        bg-gradient-to-br
        from-gray-100
        via-gray-50
        to-gray-200
        text-gray-900
      "
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          -left-32
          -top-32
          z-0
          h-96
          w-96
          rounded-full
          bg-white/80
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          -bottom-40
          -right-32
          z-0
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-gray-300/30
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-1/2
          top-1/2
          z-0
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/30
          blur-3xl
        "
      />

      {/* App */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
