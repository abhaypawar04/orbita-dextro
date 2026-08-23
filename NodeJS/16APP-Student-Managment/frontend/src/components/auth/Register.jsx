import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { registerValidationSchema } from "../../utils/validation";
import Button from "../../components/common/Button";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerValidationSchema.validate(formData, { abortEarly: false });
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `form-input-lg ${errors[field] ? "border-red-400 focus:ring-red-100" : ""}`;

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
              <svg className="h-7 w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-500">Join us and start managing students</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="form-label mb-2">Full Name</label>
              <div className="relative">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0" />
                </svg>
                <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="name" placeholder="John Doe" className={inputClass("name")} />
              </div>
              {errors.name && <p className="form-error-msg">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="form-label mb-2">Email Address</label>
              <div className="relative">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="john@example.com" className={inputClass("email")} />
              </div>
              {errors.email && <p className="form-error-msg">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="form-label mb-2">Password</label>
              <div className="relative">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z" />
                </svg>
                <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" placeholder="Create a password" className={inputClass("password")} />
              </div>
              {errors.password && <p className="form-error-msg">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label mb-2">Confirm Password</label>
              <div className="relative">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z" />
                </svg>
                <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" placeholder="Confirm your password" className={inputClass("confirmPassword")} />
              </div>
              {errors.confirmPassword && <p className="form-error-msg">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="mt-7 w-full !rounded-2xl">
              Create Account
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900 transition-colors hover:text-primary-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
