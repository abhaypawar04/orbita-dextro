import { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const UserForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        phone: user.phone || "",
        isActive: user.isActive !== undefined ? user.isActive : true,
      });
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      age: parseInt(formData.age),
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/90">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-7 py-5 dark:border-gray-700">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {user ? "Edit User" : "Create User"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-7">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white dark:bg-gray-800 dark:text-white dark:focus:border-white ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white dark:bg-gray-800 dark:text-white dark:focus:border-white ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              max="120"
              placeholder="25"
              className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white dark:bg-gray-800 dark:text-white dark:focus:border-white ${
                errors.age
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />

            {errors.age && (
              <p className="mt-2 text-sm text-red-500">{errors.age}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-white"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 text-black focus:ring-0 dark:border-gray-600"
            />

            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active User
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <FaSave />
              {user ? "Update User" : "Create User"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-gray-200 bg-gray-100 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
