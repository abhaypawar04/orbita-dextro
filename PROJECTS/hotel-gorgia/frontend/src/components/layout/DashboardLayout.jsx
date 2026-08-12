import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
  HeartIcon,
  StarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChartBarIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isAdmin = user?.role === "admin";

  const customerNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBagIcon },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: HeartIcon },
    { name: "Reviews", href: "/dashboard/reviews", icon: StarIcon },
    { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  ];

  const adminNavItems = [
    { name: "Dashboard", href: "/admin", icon: ChartBarIcon },
    { name: "Orders", href: "/admin/orders", icon: ClipboardDocumentListIcon },
    { name: "Customers", href: "/admin/customers", icon: UsersIcon },
    { name: "Food Items", href: "/admin/foods", icon: HomeIcon },
    { name: "Categories", href: "/admin/categories", icon: TagIcon },
    { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
  ];

  const navItems = isAdmin ? adminNavItems : customerNavItems;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } overflow-hidden`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isSidebarOpen ? "◀" : "▶"}
            </button>
          </div>
          <nav className="mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="h-6 w-6 flex-shrink-0" />
                  {isSidebarOpen && (
                    <span className="ml-3 truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 mx-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 flex-shrink-0" />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } p-6`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
