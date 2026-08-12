import { useCart as useCartContext } from "../context/CartContext";

export const useCart = () => {
  return useCartContext();
};

export default useCart;
