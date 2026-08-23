import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder = "",
      value,
      onChange,
      onBlur,
      error,
      touched,
      required = false,
      disabled = false,
      className = "",
      labelClassName = "",
      inputClassName = "",
      icon,
      iconPosition = "left",
      helperText = "",
      ...props
    },
    ref,
  ) => {
    const baseInputStyles =
      "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";

    const errorStyles =
      error && touched
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 hover:border-gray-400";

    const disabledStyles = disabled
      ? "bg-gray-100 cursor-not-allowed opacity-60"
      : "bg-white";

    const iconPadding = icon
      ? iconPosition === "left"
        ? "pl-11"
        : "pr-11"
      : "";

    const inputStyles = `${baseInputStyles} ${errorStyles} ${disabledStyles} ${iconPadding} ${inputClassName}`;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className={`block text-sm font-medium text-gray-700 mb-1.5 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {typeof icon === "string" ? (
                <span className="text-gray-400">{icon}</span>
              ) : (
                icon
              )}
            </div>
          )}

          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            className={inputStyles}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {typeof icon === "string" ? (
                <span className="text-gray-400">{icon}</span>
              ) : (
                icon
              )}
            </div>
          )}
        </div>

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}

        {error && touched && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
