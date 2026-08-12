import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const CouponInput = () => {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    await applyCoupon(code);
    setLoading(false);
  };

  if (coupon) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-green-800 dark:text-green-400">
              Coupon Applied: {coupon.code}
            </span>
            <p className="text-xs text-green-600 dark:text-green-300">
              {coupon.discount_type === "percentage"
                ? `${coupon.discount_value}% off`
                : `$${coupon.discount_value} off`}
            </p>
          </div>
          <button
            onClick={removeCoupon}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        className="input-primary flex-1"
      />
      <button
        onClick={handleApply}
        disabled={loading}
        className="btn-secondary px-6 disabled:opacity-50"
      >
        {loading ? "Applying..." : "Apply"}
      </button>
    </div>
  );
};

export default CouponInput;
