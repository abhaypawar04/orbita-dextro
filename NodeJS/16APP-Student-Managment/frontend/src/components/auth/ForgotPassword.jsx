import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const ForgotPassword = () => {
  const { forgotPassword, verifyResetOtp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 2 && cooldown > 0) {
      setCanResend(false);
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else if (step === 2) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, cooldown]);

  // Step 1: Submit Email
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await forgotPassword(email);
      setStep(2);
      setCooldown(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset OTP.");
    } finally {
      setLoading(false);
    }
  };

  // OTP Inputs logic
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      const nextInput = document.getElementById(`reset-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`reset-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await verifyResetOtp(email, otpString);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || !email) return;
    setResending(true);
    setError("");
    try {
      await forgotPassword(email);
      setCooldown(60);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await resetPassword(email, otp.join(""), newPassword, confirmPassword);
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper flex items-center justify-center px-4 py-12">
      <div aria-hidden="true" className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gray-300/30 blur-3xl" />

      <div className="glass-card-lg w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
        <div aria-hidden="true" className="glass-reflection-lg" />

        <div className="relative p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/80 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_25px_rgba(0,0,0,0.06)]">
              <svg className="h-7 w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Enter Reset OTP"}
              {step === 3 && "Set New Password"}
              {step === 4 && "Password Reset Complete"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {step === 1 && "Enter your email to receive a password reset OTP"}
              {step === 2 && `We've sent a 6-digit OTP to ${email}`}
              {step === 3 && "Create a new strong password for your account"}
              {step === 4 && "Your password has been reset successfully!"}
            </p>
          </div>

          {/* STEP 1: Email Form */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div>
                <label htmlFor="forgot-email" className="form-label mb-2">Registered Email</label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="john@example.com"
                    className="form-input-lg"
                    required
                  />
                </div>
                {error && <p className="form-error-msg">{error}</p>}
              </div>

              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full !rounded-2xl">
                Send Reset OTP
              </Button>
            </form>
          )}

          {/* STEP 2: Verify OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="form-label mb-3 block text-center">6-Digit OTP Code</label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`reset-otp-${idx}`}
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
                Verify OTP
              </Button>

              <div className="text-center text-sm text-gray-500">
                Didn't receive the code?{" "}
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resending}
                    className="font-semibold text-primary-600 hover:text-primary-700 underline disabled:opacity-50"
                  >
                    {resending ? "Resending..." : "Resend OTP"}
                  </button>
                ) : (
                  <span className="text-gray-400">Resend in <strong>{cooldown}s</strong></span>
                )}
              </div>
            </form>
          )}

          {/* STEP 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label htmlFor="new-password" className="form-label mb-2">New Password</label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z" />
                  </svg>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Minimum 6 characters"
                    className="form-input-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-new-password" className="form-label mb-2">Confirm New Password</label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z" />
                  </svg>
                  <input
                    id="confirm-new-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Confirm new password"
                    className="form-input-lg"
                    required
                  />
                </div>
                {error && <p className="form-error-msg">{error}</p>}
              </div>

              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full !rounded-2xl">
                Reset Password
              </Button>
            </form>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">You can now sign in using your new password.</p>
              <Button onClick={() => navigate("/login")} variant="primary" size="lg" className="w-full !rounded-2xl">
                Go to Sign In
              </Button>
            </div>
          )}

          {step !== 4 && (
            <p className="mt-7 text-center text-sm text-gray-500">
              Remember your password?{" "}
              <Link to="/login" className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
