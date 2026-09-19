import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const VerifyEmail = () => {
  const { verifyEmail, resendVerificationOtp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Cooldown countdown
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      setCanResend(false);
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const digits = pastedData.split("");
    setOtp(digits);
    const lastInput = document.getElementById(`otp-input-5`);
    if (lastInput) lastInput.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits of the OTP.");
      return;
    }

    if (!email) {
      setError("Please provide your email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await verifyEmail(email, otpString);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP verification attempt.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || !email) return;
    setResending(true);
    setError("");
    try {
      await resendVerificationOtp(email);
      setCooldown(60);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="page-wrapper flex items-center justify-center px-4 py-12">
      <div aria-hidden="true" className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gray-300/30 blur-3xl" />

      <div className="glass-card-lg w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
        <div aria-hidden="true" className="glass-reflection-lg" />

        <div className="relative p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/80 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_25px_rgba(0,0,0,0.06)]">
              <svg className="h-7 w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Verify Email</h2>
            <p className="mt-2 text-sm text-gray-500">
              We've sent a 6-digit verification code to <br />
              <strong className="text-gray-800">{email || "your email"}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!location.state?.email && (
              <div>
                <label htmlFor="verify-email-input" className="form-label mb-2">Email Address</label>
                <input
                  id="verify-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter registered email"
                  className="form-input-lg w-full mb-4"
                  required
                />
              </div>
            )}

            <div>
              <label className="form-label mb-3 block text-center">Enter 6-Digit OTP</label>
              <div className="flex justify-between gap-2" onPaste={handlePaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="h-12 w-12 text-center text-xl font-bold rounded-xl border border-gray-300 bg-white/70 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  />
                ))}
              </div>
              {error && <p className="form-error-msg mt-3 text-center">{error}</p>}
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full !rounded-2xl">
              Verify OTP & Activate
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Didn't receive the code?{" "}
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="font-semibold text-primary-600 hover:text-primary-700 underline disabled:opacity-50"
                >
                  {resending ? "Resending..." : "Resend OTP"}
                </button>
              ) : (
                <span className="text-gray-400">
                  Resend in <strong>{cooldown}s</strong>
                </span>
              )}
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Back to{" "}
            <Link to="/login" className="font-medium text-gray-900 hover:text-primary-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
