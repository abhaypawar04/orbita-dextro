import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaPhone,
} from "react-icons/fa";

const UserCard = ({ user, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
            <FaUser className="text-xl text-gray-700 dark:text-gray-200" />
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {user.name}
            </h3>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                user.isActive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div
          className={`flex gap-2 transition-all duration-200 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <button
            onClick={() => onEdit(user)}
            title="Edit"
            className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(user._id)}
            title="Delete"
            className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <FaEnvelope className="text-gray-400" />
          <span>{user.email}</span>
        </div>

        {user.phone && (
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <FaPhone className="text-gray-400" />
            <span>{user.phone}</span>
          </div>
        )}

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <FaCalendar className="text-gray-400" />
          <span>{user.age} years old</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <span>{new Date(user.createdAt).toLocaleDateString()}</span>

        <span className="rounded-full bg-gray-100 px-3 py-1 font-mono dark:bg-gray-800">
          #{user._id.slice(-6)}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
