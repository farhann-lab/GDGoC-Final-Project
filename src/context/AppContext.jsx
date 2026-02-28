import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const addToWishlist = (product) => {
    const alreadyAdded = wishlist.find((item) => item.id === product.id);
    if (!alreadyAdded) {
      setWishlist([...wishlist, product]);
      toast.success(`${product.name} ditambahkan ke Wishlist!`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
    toast.error("Produk dihapus dari Wishlist");
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const orderProduct = (product, quantity = 1) => {
    const newTransaction = {
      id: Date.now(),
      product,
      quantity,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      orderId: `ORD-${Date.now()}`,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    toast.success(`${product.name} x${quantity} berhasil dipesan! 🛒`);
  };

  return (
    <AppContext.Provider
      value={{
        wishlist,
        transactions,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        orderProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);