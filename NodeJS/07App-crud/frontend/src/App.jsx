import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useUsers } from "./hooks/useUsers";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const { users, loading, createUser, updateUser, deleteUser } = useUsers();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleCreate = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSubmit = async (userData) => {
    if (editingUser) {
      await updateUser(editingUser._id, userData);
    } else {
      await createUser(userData);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(255,255,255,0.85)",
            color: "#111827",
            border: "1px solid #E5E7EB",
            borderRadius: "18px",
            backdropFilter: "blur(18px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: "14px 16px",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#ffffff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <main className="mx-auto max-w-7xl">
        <UserList
          users={users}
          loading={loading}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
