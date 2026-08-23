import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles = `
    relative isolate inline-flex items-center justify-center
    overflow-hidden
    font-medium
    rounded-2xl
    border
    backdrop-blur-xl
    backdrop-saturate-150
    transition-all duration-300 ease-out
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-white/70
    focus-visible:ring-offset-2
    focus-visible:ring-offset-gray-900
    active:scale-[0.97]
    disabled:pointer-events-none
  `;

  const variants = {
    primary: `
      text-white
      bg-blue-500/75
      border-white/25
      shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_30px_rgba(37,99,235,0.25)]
      hover:bg-blue-400/80
      hover:border-white/35
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_12px_35px_rgba(37,99,235,0.35)]
    `,

    secondary: `
      text-gray-900
      bg-white/60
      border-white/70
      shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_30px_rgba(0,0,0,0.08)]
      hover:bg-white/75
      hover:border-white
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_35px_rgba(0,0,0,0.12)]
    `,

    success: `
      text-white
      bg-emerald-500/75
      border-white/25
      shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_30px_rgba(16,185,129,0.25)]
      hover:bg-emerald-400/80
      hover:border-white/35
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_12px_35px_rgba(16,185,129,0.35)]
    `,

    danger: `
      text-white
      bg-red-500/75
      border-white/25
      shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_30px_rgba(239,68,68,0.25)]
      hover:bg-red-400/80
      hover:border-white/35
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_12px_35px_rgba(239,68,68,0.35)]
    `,

    warning: `
      text-white
      bg-amber-500/75
      border-white/25
      shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_30px_rgba(245,158,11,0.25)]
      hover:bg-amber-400/80
      hover:border-white/35
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_12px_35px_rgba(245,158,11,0.35)]
    `,

    outline: `
      text-white
      bg-white/10
      border-white/30
      shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_25px_rgba(0,0,0,0.08)]
      hover:bg-white/20
      hover:border-white/50
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_30px_rgba(0,0,0,0.12)]
    `,

    ghost: `
      text-gray-700
      bg-white/20
      border-transparent
      shadow-none
      hover:bg-white/40
      hover:border-white/30
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]
    `,
  };

  const sizes = {
    sm: "px-3.5 py-2 text-sm min-h-9",
    md: "px-5 py-2.5 text-base min-h-11",
    lg: "px-7 py-3.5 text-lg min-h-13",
    xl: "px-9 py-4 text-xl min-h-14",
  };

  const loadingStyles = loading ? "opacity-70 cursor-wait" : "";

  const disabledStyles = disabled ? "opacity-50" : "";

  const sizeStyles = sizes[size] || sizes.md;
  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`
        ${baseStyles}
        ${variantStyles}
        ${sizeStyles}
        ${loadingStyles}
        ${disabledStyles}
        ${className}
        group
      `}
      {...props}
    >
      {/* Glass highlight */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-1/2
          rounded-t-2xl
          bg-gradient-to-b
          from-white/25
          to-transparent
          opacity-70
        "
      />

      {/* Hover shine */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      {/* Content */}
      <span className="relative z-10 inline-flex items-center justify-center">
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />

              <path
                className="opacity-90"
                fill="currentColor"
                d="
                  M4 12a8 8 0 018-8V0C5.373 0
                  0 5.373 0 12h4zm2 5.291A7.962
                  7.962 0 014 12H0c0 3.042
                  1.135 5.824 3 7.938l3-2.647z
                "
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default Button;
