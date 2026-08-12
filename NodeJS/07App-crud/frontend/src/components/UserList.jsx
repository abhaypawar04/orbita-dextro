import { useState } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
import { FaPlus, FaSearch } from "react-icons/fa";

const UserList = ({ users, loading, onEdit, onDelete, onCreate }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading && users.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your users with a clean and modern interface.
          </p>
        </div>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <FaPlus className="text-xs" />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white/80 py-3 pl-14 pr-5 text-gray-900 shadow-sm backdrop-blur-md outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-white"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
        <span>
          Showing <strong>{filteredUsers.length}</strong> of{" "}
          <strong>{users.length}</strong> users
        </span>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            No users found
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {users.length === 0
              ? "Create your first user to get started."
              : "Try a different search keyword."}
          </p>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
