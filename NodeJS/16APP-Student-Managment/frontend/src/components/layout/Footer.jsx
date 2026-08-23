import React from "react";

const Footer = () => {
  return (
    <footer
      className="
        relative
        border-t
        border-white/70
        bg-white/45
        backdrop-blur-2xl
        backdrop-saturate-150
      "
    >
      {/* Soft glass highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-white
        "
      />

      <div className="container mx-auto px-4 py-5">
        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-4
            md:flex-row
          "
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-white/80
                bg-white/70
                text-gray-800
                shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.06)]
              "
            >
              <span className="text-sm font-semibold">S</span>
            </div>

            <span className="text-sm font-medium text-gray-700">
              Student Management System
            </span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
