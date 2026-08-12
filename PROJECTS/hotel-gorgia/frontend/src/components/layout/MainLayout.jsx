import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "../../context/CartContext";

const MainLayout = () => {
  const { cartItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      {cartItems.length > 0 && <CartDrawer />}
    </div>
  );
};

export default MainLayout;
